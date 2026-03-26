/* eslint-disable @typescript-eslint/no-explicit-any */
import { uploadFileToCloudinary } from "../../../config/cloudinary.config";
import { sendEmail } from "../../utils/email";
import { prisma } from "../../lib/prisma";
import { generateCinemaniaInvoicePdf } from "../../modules/payment/payment.utils";

/**
 * Handles background tasks after a successful payment reconciliation.
 * Rejections are handled by the caller.
 */
const processPostPaymentTasks = async (result: any, planName: string) => {
  const { user, payment, subscription } = result;

  // 1. Generate PDF (In-memory buffer)
  const pdfBuffer = await generateCinemaniaInvoicePdf({
    invoiceId: payment.id,
    userName: user.name,
    userEmail: user.email,
    planName,
    amount: payment.amount,
    transactionId: payment.transactionId,
    paymentDate: payment.updatedAt.toISOString(),
    expiryDate: subscription.endDate.toISOString(),
    currency: "USD",
  });

  // 2. Cloudinary Upload (Stream from buffer)
  const upload = await uploadFileToCloudinary(
    pdfBuffer,
    `invoice-${payment.id}`,
  );

  // 3. Persist the Invoice URL
  await prisma.payment.update({
    where: { id: payment.id },
    data: { invoiceUrl: upload.secure_url },
  });

  // 4. Dispatch Confirmation Email with Receipt Attachment
  await sendEmail({
    to: user.email,
    subject: `Your Cinemania ${planName} Access is Live!`,
    templateName: "invoice",
    templateData: {
      userName: user.name,
      planName,
      amount: payment.amount.toFixed(2),
      invoiceUrl: upload.secure_url,
      invoiceId: payment.id,
      expiryDate: subscription.endDate.toLocaleDateString(),
    },
    attachments: [
      {
        filename: `Cinemania-Receipt-${payment.id}.pdf`,
        content: pdfBuffer,
        contentType: "application/pdf",
      },
    ],
  });
};

export const PaymentHelper = { processPostPaymentTasks };
