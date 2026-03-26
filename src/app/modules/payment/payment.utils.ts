import PDFDocument from "pdfkit";
import { ICinemaniaInvoiceData } from "./payment.interface";

export const generateCinemaniaInvoicePdf = async (
  data: ICinemaniaInvoiceData,
): Promise<Buffer> => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ size: "A4", margin: 50 });
      const chunks: Buffer[] = [];
      doc.on("data", (chunk) => chunks.push(chunk));
      doc.on("end", () => resolve(Buffer.concat(chunks)));
      doc.on("error", (err) => reject(err));

      // Header Branding
      doc
        .fillColor("#4F46E5")
        .fontSize(26)
        .font("Helvetica-Bold")
        .text("CINEMANIA", { align: "left" });
      doc
        .fillColor("#64748B")
        .fontSize(10)
        .font("Helvetica")
        .text("Your Access to Infinite Stories", { align: "left" });

      doc
        .moveDown()
        .fontSize(20)
        .fillColor("#000000")
        .text("OFFICIAL RECEIPT", { align: "right" });
      doc.moveTo(50, doc.y).lineTo(545, doc.y).stroke("#E2E8F0");
      doc.moveDown();

      // Info Grid
      const currentY = doc.y;
      doc
        .fontSize(10)
        .font("Helvetica-Bold")
        .text("Customer Info:", 50, currentY);
      doc
        .font("Helvetica")
        .text(data.userName, 50, currentY + 15)
        .text(data.userEmail, 50, currentY + 30);

      doc.font("Helvetica-Bold").text("Payment Info:", 350, currentY);
      doc
        .font("Helvetica")
        .text(`Ref: #${data.invoiceId}`, 350, currentY + 15)
        .text(
          `Date: ${new Date(data.paymentDate).toLocaleDateString()}`,
          350,
          currentY + 30,
        )
        .text(
          `TX: ${data.transactionId.substring(0, 12)}...`,
          350,
          currentY + 45,
        );

      doc.moveDown(5);

      // Subscription Table
      const tableTop = doc.y;
      doc
        .font("Helvetica-Bold")
        .text("Description", 50, tableTop)
        .text("Period", 250, tableTop)
        .text("Total", 450, tableTop, { align: "right" });
      doc
        .moveTo(50, doc.y + 10)
        .lineTo(545, doc.y + 10)
        .stroke("#E2E8F0");

      doc.moveDown(1.5).font("Helvetica");
      const rowY = doc.y;
      doc.text(`Cinemania ${data.planName} Membership`, 50, rowY);
      doc.text("30 Days", 250, rowY);
      doc.text(`${data.amount.toFixed(2)} USD`, 450, rowY, { align: "right" });

      doc.moveDown(6);
      doc
        .fillColor("#4F46E5")
        .font("Helvetica-Bold")
        .text(
          `Access Valid Until: ${new Date(data.expiryDate).toLocaleDateString()}`,
          { align: "center" },
        );

      doc.end();
    } catch (err) {
      reject(err);
    }
  });
};
