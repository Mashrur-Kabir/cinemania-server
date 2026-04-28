--
-- PostgreSQL database dump
--

\restrict ZSgtUAx2QKHeJ1lmC7vpNbH0UvThh4LJdoy2ytk5TJDMohdqqEVs0gzJ1SgN1MF

-- Dumped from database version 18.1
-- Dumped by pg_dump version 18.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

ALTER TABLE IF EXISTS ONLY public.session DROP CONSTRAINT IF EXISTS "session_userId_fkey";
ALTER TABLE IF EXISTS ONLY public.payments DROP CONSTRAINT IF EXISTS "payments_userId_fkey";
ALTER TABLE IF EXISTS ONLY public.payments DROP CONSTRAINT IF EXISTS "payments_subscriptionId_fkey";
ALTER TABLE IF EXISTS ONLY public.account DROP CONSTRAINT IF EXISTS "account_userId_fkey";
ALTER TABLE IF EXISTS ONLY public."Watchlist" DROP CONSTRAINT IF EXISTS "Watchlist_userId_fkey";
ALTER TABLE IF EXISTS ONLY public."Watchlist" DROP CONSTRAINT IF EXISTS "Watchlist_mediaId_fkey";
ALTER TABLE IF EXISTS ONLY public."WatchedHistory" DROP CONSTRAINT IF EXISTS "WatchedHistory_userId_fkey";
ALTER TABLE IF EXISTS ONLY public."WatchedHistory" DROP CONSTRAINT IF EXISTS "WatchedHistory_mediaId_fkey";
ALTER TABLE IF EXISTS ONLY public."UserBadge" DROP CONSTRAINT IF EXISTS "UserBadge_userId_fkey";
ALTER TABLE IF EXISTS ONLY public."UserBadge" DROP CONSTRAINT IF EXISTS "UserBadge_badgeId_fkey";
ALTER TABLE IF EXISTS ONLY public."Subscription" DROP CONSTRAINT IF EXISTS "Subscription_userId_fkey";
ALTER TABLE IF EXISTS ONLY public."Review" DROP CONSTRAINT IF EXISTS "Review_userId_fkey";
ALTER TABLE IF EXISTS ONLY public."Review" DROP CONSTRAINT IF EXISTS "Review_mediaId_fkey";
ALTER TABLE IF EXISTS ONLY public."ReviewReport" DROP CONSTRAINT IF EXISTS "ReviewReport_userId_fkey";
ALTER TABLE IF EXISTS ONLY public."ReviewReport" DROP CONSTRAINT IF EXISTS "ReviewReport_reviewId_fkey";
ALTER TABLE IF EXISTS ONLY public."Notification" DROP CONSTRAINT IF EXISTS "Notification_userId_fkey";
ALTER TABLE IF EXISTS ONLY public."Notification" DROP CONSTRAINT IF EXISTS "Notification_actorId_fkey";
ALTER TABLE IF EXISTS ONLY public."MediaGenre" DROP CONSTRAINT IF EXISTS "MediaGenre_mediaId_fkey";
ALTER TABLE IF EXISTS ONLY public."MediaGenre" DROP CONSTRAINT IF EXISTS "MediaGenre_genreId_fkey";
ALTER TABLE IF EXISTS ONLY public."Like" DROP CONSTRAINT IF EXISTS "Like_userId_fkey";
ALTER TABLE IF EXISTS ONLY public."Like" DROP CONSTRAINT IF EXISTS "Like_reviewId_fkey";
ALTER TABLE IF EXISTS ONLY public."Follow" DROP CONSTRAINT IF EXISTS "Follow_followingId_fkey";
ALTER TABLE IF EXISTS ONLY public."Follow" DROP CONSTRAINT IF EXISTS "Follow_followerId_fkey";
ALTER TABLE IF EXISTS ONLY public."Comment" DROP CONSTRAINT IF EXISTS "Comment_userId_fkey";
ALTER TABLE IF EXISTS ONLY public."Comment" DROP CONSTRAINT IF EXISTS "Comment_reviewId_fkey";
ALTER TABLE IF EXISTS ONLY public."Comment" DROP CONSTRAINT IF EXISTS "Comment_parentId_fkey";
ALTER TABLE IF EXISTS ONLY public."ActivityLog" DROP CONSTRAINT IF EXISTS "ActivityLog_userId_fkey";
DROP INDEX IF EXISTS public.verification_identifier_idx;
DROP INDEX IF EXISTS public.user_status_idx;
DROP INDEX IF EXISTS public."user_isDeleted_idx";
DROP INDEX IF EXISTS public.user_email_key;
DROP INDEX IF EXISTS public."session_userId_idx";
DROP INDEX IF EXISTS public.session_token_key;
DROP INDEX IF EXISTS public."payments_userId_idx";
DROP INDEX IF EXISTS public."payments_transactionId_key";
DROP INDEX IF EXISTS public."payments_transactionId_idx";
DROP INDEX IF EXISTS public."payments_stripeEventId_key";
DROP INDEX IF EXISTS public.payments_status_idx;
DROP INDEX IF EXISTS public."account_userId_idx";
DROP INDEX IF EXISTS public."Watchlist_userId_mediaId_key";
DROP INDEX IF EXISTS public."WatchedHistory_userId_idx";
DROP INDEX IF EXISTS public."WatchedHistory_mediaId_idx";
DROP INDEX IF EXISTS public."UserBadge_userId_badgeId_key";
DROP INDEX IF EXISTS public."Subscription_userId_idx";
DROP INDEX IF EXISTS public."Review_userId_idx";
DROP INDEX IF EXISTS public."Review_status_idx";
DROP INDEX IF EXISTS public."Review_mediaId_idx";
DROP INDEX IF EXISTS public."Notification_userId_idx";
DROP INDEX IF EXISTS public."Notification_createdAt_idx";
DROP INDEX IF EXISTS public."Media_title_idx";
DROP INDEX IF EXISTS public."Media_slug_key";
DROP INDEX IF EXISTS public."Media_releaseYear_idx";
DROP INDEX IF EXISTS public."Media_pricing_idx";
DROP INDEX IF EXISTS public."Media_platform_idx";
DROP INDEX IF EXISTS public."MediaGenre_mediaId_genreId_key";
DROP INDEX IF EXISTS public."Like_userId_reviewId_key";
DROP INDEX IF EXISTS public."Like_userId_idx";
DROP INDEX IF EXISTS public."Like_reviewId_idx";
DROP INDEX IF EXISTS public."Genre_name_key";
DROP INDEX IF EXISTS public."Follow_followingId_idx";
DROP INDEX IF EXISTS public."Follow_followerId_idx";
DROP INDEX IF EXISTS public."Follow_followerId_followingId_key";
DROP INDEX IF EXISTS public."Badge_name_key";
DROP INDEX IF EXISTS public."ActivityLog_userId_idx";
DROP INDEX IF EXISTS public."ActivityLog_createdAt_idx";
ALTER TABLE IF EXISTS ONLY public.verification DROP CONSTRAINT IF EXISTS verification_pkey;
ALTER TABLE IF EXISTS ONLY public."user" DROP CONSTRAINT IF EXISTS user_pkey;
ALTER TABLE IF EXISTS ONLY public.session DROP CONSTRAINT IF EXISTS session_pkey;
ALTER TABLE IF EXISTS ONLY public.payments DROP CONSTRAINT IF EXISTS payments_pkey;
ALTER TABLE IF EXISTS ONLY public.account DROP CONSTRAINT IF EXISTS account_pkey;
ALTER TABLE IF EXISTS ONLY public._prisma_migrations DROP CONSTRAINT IF EXISTS _prisma_migrations_pkey;
ALTER TABLE IF EXISTS ONLY public."Watchlist" DROP CONSTRAINT IF EXISTS "Watchlist_pkey";
ALTER TABLE IF EXISTS ONLY public."WatchedHistory" DROP CONSTRAINT IF EXISTS "WatchedHistory_pkey";
ALTER TABLE IF EXISTS ONLY public."UserBadge" DROP CONSTRAINT IF EXISTS "UserBadge_pkey";
ALTER TABLE IF EXISTS ONLY public."Subscription" DROP CONSTRAINT IF EXISTS "Subscription_pkey";
ALTER TABLE IF EXISTS ONLY public."Review" DROP CONSTRAINT IF EXISTS "Review_pkey";
ALTER TABLE IF EXISTS ONLY public."ReviewReport" DROP CONSTRAINT IF EXISTS "ReviewReport_pkey";
ALTER TABLE IF EXISTS ONLY public."Notification" DROP CONSTRAINT IF EXISTS "Notification_pkey";
ALTER TABLE IF EXISTS ONLY public."Media" DROP CONSTRAINT IF EXISTS "Media_pkey";
ALTER TABLE IF EXISTS ONLY public."MediaGenre" DROP CONSTRAINT IF EXISTS "MediaGenre_pkey";
ALTER TABLE IF EXISTS ONLY public."Like" DROP CONSTRAINT IF EXISTS "Like_pkey";
ALTER TABLE IF EXISTS ONLY public."Genre" DROP CONSTRAINT IF EXISTS "Genre_pkey";
ALTER TABLE IF EXISTS ONLY public."Follow" DROP CONSTRAINT IF EXISTS "Follow_pkey";
ALTER TABLE IF EXISTS ONLY public."Comment" DROP CONSTRAINT IF EXISTS "Comment_pkey";
ALTER TABLE IF EXISTS ONLY public."Badge" DROP CONSTRAINT IF EXISTS "Badge_pkey";
ALTER TABLE IF EXISTS ONLY public."ActivityLog" DROP CONSTRAINT IF EXISTS "ActivityLog_pkey";
DROP TABLE IF EXISTS public.verification;
DROP TABLE IF EXISTS public."user";
DROP TABLE IF EXISTS public.session;
DROP TABLE IF EXISTS public.payments;
DROP TABLE IF EXISTS public.account;
DROP TABLE IF EXISTS public._prisma_migrations;
DROP TABLE IF EXISTS public."Watchlist";
DROP TABLE IF EXISTS public."WatchedHistory";
DROP TABLE IF EXISTS public."UserBadge";
DROP TABLE IF EXISTS public."Subscription";
DROP TABLE IF EXISTS public."ReviewReport";
DROP TABLE IF EXISTS public."Review";
DROP TABLE IF EXISTS public."Notification";
DROP TABLE IF EXISTS public."MediaGenre";
DROP TABLE IF EXISTS public."Media";
DROP TABLE IF EXISTS public."Like";
DROP TABLE IF EXISTS public."Genre";
DROP TABLE IF EXISTS public."Follow";
DROP TABLE IF EXISTS public."Comment";
DROP TABLE IF EXISTS public."Badge";
DROP TABLE IF EXISTS public."ActivityLog";
DROP TYPE IF EXISTS public."UserStatus";
DROP TYPE IF EXISTS public."SubscriptionType";
DROP TYPE IF EXISTS public."Role";
DROP TYPE IF EXISTS public."ReviewStatus";
DROP TYPE IF EXISTS public."Pricing";
DROP TYPE IF EXISTS public."PaymentStatus";
DROP TYPE IF EXISTS public."NotificationType";
DROP TYPE IF EXISTS public."ActivityAction";
--
-- Name: ActivityAction; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."ActivityAction" AS ENUM (
    'FOLLOW',
    'UNFOLLOW',
    'WATCHLIST_ADD',
    'WATCHLIST_REMOVE',
    'REVIEW_CREATE',
    'DIARY_LOG',
    'LIKE_REVIEW'
);


--
-- Name: NotificationType; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."NotificationType" AS ENUM (
    'FOLLOW',
    'LIKE_REVIEW',
    'COMMENT_ADD',
    'COMMENT_REPLY',
    'REVIEW_APPROVED',
    'REVIEW_REJECTED',
    'WATCHED_MEDIA',
    'REPORT_ALERT',
    'SYSTEM_ANNOUNCEMENT'
);


--
-- Name: PaymentStatus; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."PaymentStatus" AS ENUM (
    'PENDING',
    'PAID',
    'FAILED',
    'CANCELLED'
);


--
-- Name: Pricing; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."Pricing" AS ENUM (
    'FREE',
    'PREMIUM',
    'BASIC',
    'PRO'
);


--
-- Name: ReviewStatus; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."ReviewStatus" AS ENUM (
    'PENDING',
    'APPROVED',
    'REJECTED'
);


--
-- Name: Role; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."Role" AS ENUM (
    'USER',
    'ADMIN'
);


--
-- Name: SubscriptionType; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."SubscriptionType" AS ENUM (
    'BASIC',
    'PRO',
    'PREMIUM'
);


--
-- Name: UserStatus; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."UserStatus" AS ENUM (
    'ACTIVE',
    'BLOCKED',
    'DELETED'
);


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: ActivityLog; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."ActivityLog" (
    id text NOT NULL,
    "userId" text,
    entity text NOT NULL,
    "entityId" text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    metadata jsonb,
    action public."ActivityAction" NOT NULL
);


--
-- Name: Badge; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Badge" (
    id text NOT NULL,
    name text NOT NULL,
    description text NOT NULL,
    icon text NOT NULL,
    category text NOT NULL,
    criteria jsonb NOT NULL
);


--
-- Name: Comment; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Comment" (
    id text NOT NULL,
    content text NOT NULL,
    "userId" text NOT NULL,
    "reviewId" text NOT NULL,
    "parentId" text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "deletedAt" timestamp(3) without time zone,
    "isDeleted" boolean DEFAULT false NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "isEdited" boolean DEFAULT false NOT NULL
);


--
-- Name: Follow; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Follow" (
    id text NOT NULL,
    "followerId" text NOT NULL,
    "followingId" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


--
-- Name: Genre; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Genre" (
    id text NOT NULL,
    name text NOT NULL
);


--
-- Name: Like; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Like" (
    id text NOT NULL,
    "userId" text NOT NULL,
    "reviewId" text NOT NULL
);


--
-- Name: Media; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Media" (
    id text NOT NULL,
    title text NOT NULL,
    description text NOT NULL,
    "releaseYear" integer NOT NULL,
    director text NOT NULL,
    "cast" text[],
    platform text NOT NULL,
    pricing public."Pricing" DEFAULT 'FREE'::public."Pricing" NOT NULL,
    "streamingUrl" text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "averageRating" double precision DEFAULT 0 NOT NULL,
    "deletedAt" timestamp(3) without time zone,
    "isDeleted" boolean DEFAULT false NOT NULL,
    "likeCount" integer DEFAULT 0 NOT NULL,
    "reviewCount" integer DEFAULT 0 NOT NULL,
    slug text NOT NULL,
    "viewCount" integer DEFAULT 0 NOT NULL,
    "watchCount" integer DEFAULT 0 NOT NULL,
    "posterUrl" text NOT NULL
);


--
-- Name: MediaGenre; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."MediaGenre" (
    id text NOT NULL,
    "mediaId" text NOT NULL,
    "genreId" text NOT NULL
);


--
-- Name: Notification; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Notification" (
    id text NOT NULL,
    "userId" text NOT NULL,
    message text NOT NULL,
    "isRead" boolean DEFAULT false NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "actorId" text,
    link text,
    type public."NotificationType" NOT NULL
);


--
-- Name: Review; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Review" (
    id text NOT NULL,
    rating double precision NOT NULL,
    content text NOT NULL,
    "isSpoiler" boolean DEFAULT false NOT NULL,
    tags text[],
    status public."ReviewStatus" DEFAULT 'PENDING'::public."ReviewStatus" NOT NULL,
    "userId" text NOT NULL,
    "mediaId" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "commentCount" integer DEFAULT 0 NOT NULL,
    "deletedAt" timestamp(3) without time zone,
    "isDeleted" boolean DEFAULT false NOT NULL,
    "likeCount" integer DEFAULT 0 NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "rejectionReason" text
);


--
-- Name: ReviewReport; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."ReviewReport" (
    id text NOT NULL,
    "reviewId" text NOT NULL,
    "userId" text NOT NULL,
    reason text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


--
-- Name: Subscription; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Subscription" (
    id text NOT NULL,
    "userId" text NOT NULL,
    type public."SubscriptionType" NOT NULL,
    "startDate" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "endDate" timestamp(3) without time zone NOT NULL,
    "isActive" boolean DEFAULT true NOT NULL
);


--
-- Name: UserBadge; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."UserBadge" (
    id text NOT NULL,
    "userId" text NOT NULL,
    "badgeId" text NOT NULL,
    "earnedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


--
-- Name: WatchedHistory; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."WatchedHistory" (
    id text NOT NULL,
    "userId" text NOT NULL,
    "mediaId" text NOT NULL,
    "watchedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    notes text,
    "isRewatch" boolean DEFAULT false NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    duration integer DEFAULT 0 NOT NULL,
    "isCompleted" boolean DEFAULT false NOT NULL,
    "lastPosition" integer DEFAULT 0 NOT NULL
);


--
-- Name: Watchlist; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Watchlist" (
    id text NOT NULL,
    "userId" text NOT NULL,
    "mediaId" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


--
-- Name: account; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.account (
    id text NOT NULL,
    "accountId" text NOT NULL,
    "providerId" text NOT NULL,
    "userId" text NOT NULL,
    "accessToken" text,
    "refreshToken" text,
    "idToken" text,
    "accessTokenExpiresAt" timestamp(3) without time zone,
    "refreshTokenExpiresAt" timestamp(3) without time zone,
    scope text,
    password text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


--
-- Name: payments; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.payments (
    id text NOT NULL,
    amount double precision NOT NULL,
    "transactionId" text NOT NULL,
    "stripeEventId" text,
    status public."PaymentStatus" DEFAULT 'PENDING'::public."PaymentStatus" NOT NULL,
    "invoiceUrl" text,
    "paymentGatewayData" jsonb,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "userId" text NOT NULL,
    "subscriptionId" text
);


--
-- Name: session; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.session (
    id text NOT NULL,
    "expiresAt" timestamp(3) without time zone NOT NULL,
    token text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "ipAddress" text,
    "userAgent" text,
    "userId" text NOT NULL
);


--
-- Name: user; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."user" (
    id text NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    "emailVerified" boolean DEFAULT false NOT NULL,
    image text,
    role public."Role" DEFAULT 'USER'::public."Role" NOT NULL,
    status public."UserStatus" DEFAULT 'ACTIVE'::public."UserStatus" NOT NULL,
    "needPasswordChange" boolean DEFAULT false NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "isDeleted" boolean DEFAULT false NOT NULL,
    "deletedAt" timestamp(3) without time zone
);


--
-- Name: verification; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.verification (
    id text NOT NULL,
    identifier text NOT NULL,
    value text NOT NULL,
    "expiresAt" timestamp(3) without time zone NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


--
-- Data for Name: ActivityLog; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."ActivityLog" (id, "userId", entity, "entityId", "createdAt", metadata, action) FROM stdin;
b008575f-191a-4c49-86d5-fbc8f82e56ce	jdTe8ynOdeF5kgfhXSgUCFmBCkS04UmR	Media	abb20634-ef7e-4d15-b01d-2b49336167f8	2026-04-07 05:50:31.116	{"title": "The Super Mario Bros. Movie"}	WATCHLIST_ADD
a2ad6f0f-c019-40ad-97e7-f410c5e9d607	jdTe8ynOdeF5kgfhXSgUCFmBCkS04UmR	Media	abb20634-ef7e-4d15-b01d-2b49336167f8	2026-04-07 05:52:47.214	{"title": "The Super Mario Bros. Movie"}	WATCHLIST_ADD
16f42458-5995-489c-a3a1-c13fbe1bbdd1	jdTe8ynOdeF5kgfhXSgUCFmBCkS04UmR	Media	d5711673-b9b0-4ab9-b35f-80647c9b10ad	2026-04-07 05:52:59.503	{"title": "Zootopia 2"}	WATCHLIST_ADD
1921878f-84a7-486d-8179-50b1fddb1cd4	jdTe8ynOdeF5kgfhXSgUCFmBCkS04UmR	Media	06acf591-813a-411c-862a-bbe38a3f296d	2026-04-07 05:53:13.342	{"title": "Spider-Man: Homecoming"}	WATCHLIST_ADD
d85cd750-9dab-472c-8869-ea6c539ae40d	jdTe8ynOdeF5kgfhXSgUCFmBCkS04UmR	Media	06acf591-813a-411c-862a-bbe38a3f296d	2026-04-07 05:57:01.985	{"title": "Spider-Man: Homecoming"}	DIARY_LOG
07c2f8a3-0d26-4948-b522-864c9259a7b1	jdTe8ynOdeF5kgfhXSgUCFmBCkS04UmR	Review	759d6668-779d-41e5-8261-646954011545	2026-04-07 09:36:10.496	{"rating": 8.5, "mediaTitle": "Dune: Part Two"}	REVIEW_CREATE
fec06dbf-0a8a-4cdf-aa3e-cea2dfa6d502	jdTe8ynOdeF5kgfhXSgUCFmBCkS04UmR	Review	759d6668-779d-41e5-8261-646954011545	2026-04-07 09:39:18.51	{"mediaId": "fb9675a4-7de4-4798-b0fb-d2cc014a90bd", "authorName": "riyen user"}	LIKE_REVIEW
2898c991-969f-467e-bb7c-729e27319d03	jdTe8ynOdeF5kgfhXSgUCFmBCkS04UmR	Media	abb20634-ef7e-4d15-b01d-2b49336167f8	2026-04-08 08:26:03.647	{"title": "The Super Mario Bros. Movie"}	WATCHLIST_REMOVE
9ed33259-4dba-4cf6-bc49-51bc0ccdc3b7	jdTe8ynOdeF5kgfhXSgUCFmBCkS04UmR	Media	f47ed5ff-d190-4a5d-ba51-22387dde4872	2026-04-09 04:11:05.496	{"title": "Spider-Man: Beyond the Spider-Verse"}	WATCHLIST_ADD
30964410-dd14-4f4a-ad5c-8ad048393ccb	jdTe8ynOdeF5kgfhXSgUCFmBCkS04UmR	Media	f47ed5ff-d190-4a5d-ba51-22387dde4872	2026-04-09 04:13:19.665	{"title": "Spider-Man: Beyond the Spider-Verse"}	WATCHLIST_REMOVE
03afb85a-07fd-4454-bbb1-14f57d78929e	jdTe8ynOdeF5kgfhXSgUCFmBCkS04UmR	Media	076ffeae-3d9e-48f1-a0da-3a0f8375950e	2026-04-09 04:13:28.549	{"title": "Project Hail Mary"}	WATCHLIST_ADD
67bf55b4-2deb-467b-be67-8bfcf3480e84	jdTe8ynOdeF5kgfhXSgUCFmBCkS04UmR	Media	076ffeae-3d9e-48f1-a0da-3a0f8375950e	2026-04-09 04:13:34.228	{"title": "Project Hail Mary"}	WATCHLIST_REMOVE
8bdf8551-85a9-41f8-9ec1-68df43353941	jdTe8ynOdeF5kgfhXSgUCFmBCkS04UmR	Media	fb9675a4-7de4-4798-b0fb-d2cc014a90bd	2026-04-09 04:13:41.612	{"title": "Dune: Part Two"}	WATCHLIST_ADD
853ff548-01ac-49c0-9890-3a8e680c6a0b	jdTe8ynOdeF5kgfhXSgUCFmBCkS04UmR	Media	fb9675a4-7de4-4798-b0fb-d2cc014a90bd	2026-04-09 04:13:46.894	{"title": "Dune: Part Two"}	WATCHLIST_REMOVE
6a50e054-cf43-4d7d-81f7-ec6d94aaf62c	jdTe8ynOdeF5kgfhXSgUCFmBCkS04UmR	Media	f47ed5ff-d190-4a5d-ba51-22387dde4872	2026-04-09 04:15:05.013	{"title": "Spider-Man: Beyond the Spider-Verse"}	WATCHLIST_ADD
c94ad234-a96e-41d2-8d3e-a2bf2c57cb01	jdTe8ynOdeF5kgfhXSgUCFmBCkS04UmR	Media	f47ed5ff-d190-4a5d-ba51-22387dde4872	2026-04-09 04:15:13.074	{"title": "Spider-Man: Beyond the Spider-Verse"}	WATCHLIST_REMOVE
ce6e1198-176f-48fe-8c76-cde0227d77e5	jdTe8ynOdeF5kgfhXSgUCFmBCkS04UmR	Media	f47ed5ff-d190-4a5d-ba51-22387dde4872	2026-04-09 04:17:59.349	{"title": "Spider-Man: Beyond the Spider-Verse"}	WATCHLIST_ADD
c538c94a-0beb-4c69-954c-fcb5122774f7	jdTe8ynOdeF5kgfhXSgUCFmBCkS04UmR	Media	f47ed5ff-d190-4a5d-ba51-22387dde4872	2026-04-09 04:21:40.645	{"title": "Spider-Man: Beyond the Spider-Verse"}	WATCHLIST_REMOVE
57efc7c2-ff52-4e94-94ef-2d5acb2672cb	jdTe8ynOdeF5kgfhXSgUCFmBCkS04UmR	Media	799e3b2b-5936-4034-bca5-d4124e7516a0	2026-04-09 04:21:45.7	{"title": "Daredevil: Born Again"}	WATCHLIST_ADD
f67ce9ed-495d-415c-af2f-cd95a1490c3e	jdTe8ynOdeF5kgfhXSgUCFmBCkS04UmR	Media	799e3b2b-5936-4034-bca5-d4124e7516a0	2026-04-09 04:21:50.895	{"title": "Daredevil: Born Again"}	WATCHLIST_REMOVE
440248ad-1875-4236-b66c-9e4c5f303640	jdTe8ynOdeF5kgfhXSgUCFmBCkS04UmR	Media	076ffeae-3d9e-48f1-a0da-3a0f8375950e	2026-04-09 04:22:01.772	{"title": "Project Hail Mary"}	WATCHLIST_ADD
e2f79cb1-006b-440b-bfcd-2446fbb5c151	jdTe8ynOdeF5kgfhXSgUCFmBCkS04UmR	Media	06acf591-813a-411c-862a-bbe38a3f296d	2026-04-09 04:46:28.045	{"title": "Spider-Man: Homecoming"}	DIARY_LOG
a06ac0ce-7d2f-47ce-acce-c27c11b2dcd3	jdTe8ynOdeF5kgfhXSgUCFmBCkS04UmR	Media	f47ed5ff-d190-4a5d-ba51-22387dde4872	2026-04-09 08:10:56.535	{"title": "Spider-Man: Beyond the Spider-Verse"}	DIARY_LOG
d52d78d6-42c5-427a-83d8-b3ed9511964f	jdTe8ynOdeF5kgfhXSgUCFmBCkS04UmR	Media	f47ed5ff-d190-4a5d-ba51-22387dde4872	2026-04-09 08:13:06.35	{"title": "Spider-Man: Beyond the Spider-Verse"}	DIARY_LOG
18a96fe1-a7e0-4ac7-a674-216790c91274	jdTe8ynOdeF5kgfhXSgUCFmBCkS04UmR	Media	f47ed5ff-d190-4a5d-ba51-22387dde4872	2026-04-09 08:54:49.839	{"title": "Spider-Man: Beyond the Spider-Verse"}	DIARY_LOG
2b264c56-b3f5-4c57-b436-c13863e6bbb0	jdTe8ynOdeF5kgfhXSgUCFmBCkS04UmR	Media	f47ed5ff-d190-4a5d-ba51-22387dde4872	2026-04-09 08:55:11.722	{"title": "Spider-Man: Beyond the Spider-Verse"}	DIARY_LOG
694d9c29-c365-4afc-82ee-7dcf8fcd8498	jdTe8ynOdeF5kgfhXSgUCFmBCkS04UmR	Media	f47ed5ff-d190-4a5d-ba51-22387dde4872	2026-04-09 09:05:11.371	{"title": "Spider-Man: Beyond the Spider-Verse"}	DIARY_LOG
a5f98769-5d6a-47ae-83cb-d4eb31bc2d90	jdTe8ynOdeF5kgfhXSgUCFmBCkS04UmR	Media	076ffeae-3d9e-48f1-a0da-3a0f8375950e	2026-04-09 09:12:48.681	{"title": "Project Hail Mary"}	DIARY_LOG
ab514900-1d46-47a8-aff6-3f92bea2a43f	jdTe8ynOdeF5kgfhXSgUCFmBCkS04UmR	Media	076ffeae-3d9e-48f1-a0da-3a0f8375950e	2026-04-09 09:13:41.531	{"title": "Project Hail Mary"}	DIARY_LOG
1358c5c0-53d7-4b14-96fc-18286cf81b68	jdTe8ynOdeF5kgfhXSgUCFmBCkS04UmR	Review	7e74ab3e-4d3a-4d7e-99c1-773dfcdf8f24	2026-04-09 09:29:54.833	{"rating": 8.5, "mediaTitle": "Spider-Man: Beyond the Spider-Verse"}	REVIEW_CREATE
4526fe90-d864-48fc-a5ff-389c4452caf3	jdTe8ynOdeF5kgfhXSgUCFmBCkS04UmR	Review	759d6668-779d-41e5-8261-646954011545	2026-04-09 09:30:27.222	{"mediaId": "fb9675a4-7de4-4798-b0fb-d2cc014a90bd", "authorName": "riyen user"}	LIKE_REVIEW
5b2c9a35-0407-413b-a463-3ff3eebb66f0	jdTe8ynOdeF5kgfhXSgUCFmBCkS04UmR	Review	439ed48b-14d8-4952-b571-e4fc13c07d5e	2026-04-09 11:25:34.841	{"mediaId": "37f66465-1de8-434e-8995-9595f4517d6b", "authorName": "riyen user"}	LIKE_REVIEW
7456bf16-8599-43c9-9544-7efeb9dc9afb	jdTe8ynOdeF5kgfhXSgUCFmBCkS04UmR	Review	420e0b80-1bc7-4763-97fc-534cec783d47	2026-04-09 12:22:25.379	{"rating": 6.5, "mediaTitle": "The Super Mario Bros. Movie"}	REVIEW_CREATE
5ea27bfa-611e-45ea-b6ab-92dd8834afc2	LOgIAJ3Yb6QnXDadriQLjyTv2WpZvq9d	User	jdTe8ynOdeF5kgfhXSgUCFmBCkS04UmR	2026-04-11 06:13:48.459	{"name": "riyen user"}	FOLLOW
99ffd661-2f44-48be-8977-27485b915e4a	jdTe8ynOdeF5kgfhXSgUCFmBCkS04UmR	User	YvAyddVIeE21PyIppWx9rV7jTIxWQNws	2026-04-11 15:45:14.053	{"name": "horus lupercal"}	UNFOLLOW
e5f22002-ac05-493d-87eb-eee466720488	jdTe8ynOdeF5kgfhXSgUCFmBCkS04UmR	User	LOgIAJ3Yb6QnXDadriQLjyTv2WpZvq9d	2026-04-11 15:45:19.304	{"name": "harry potter"}	FOLLOW
1c47234e-a221-4fce-beca-f9a943483938	jdTe8ynOdeF5kgfhXSgUCFmBCkS04UmR	User	LOgIAJ3Yb6QnXDadriQLjyTv2WpZvq9d	2026-04-11 15:45:31.72	{"name": "harry potter"}	UNFOLLOW
4743861e-6e73-4d33-b5d3-f4a53b4fbd5d	jdTe8ynOdeF5kgfhXSgUCFmBCkS04UmR	User	LOgIAJ3Yb6QnXDadriQLjyTv2WpZvq9d	2026-04-11 15:45:33.889	{"name": "harry potter"}	FOLLOW
de24d94d-0f52-46a0-bbe6-fe3a1bbbd22d	jdTe8ynOdeF5kgfhXSgUCFmBCkS04UmR	Media	f47ed5ff-d190-4a5d-ba51-22387dde4872	2026-04-13 10:16:03.745	{"title": "Spider-Man: Beyond the Spider-Verse"}	WATCHLIST_ADD
57b4ee0e-4b01-440b-9d41-6e06b06d3c07	jdTe8ynOdeF5kgfhXSgUCFmBCkS04UmR	Media	076ffeae-3d9e-48f1-a0da-3a0f8375950e	2026-04-13 10:16:10.77	{"title": "Project Hail Mary"}	WATCHLIST_REMOVE
f8294b2d-6ebc-486d-8f16-8ad9d384c801	jdTe8ynOdeF5kgfhXSgUCFmBCkS04UmR	Media	abb20634-ef7e-4d15-b01d-2b49336167f8	2026-04-13 11:14:04.621	{"title": "The Super Mario Bros. Movie"}	WATCHLIST_ADD
33fd4aca-d956-4498-85f5-6184e099a7de	LOgIAJ3Yb6QnXDadriQLjyTv2WpZvq9d	Review	dcee330d-6d44-47a0-be95-d3bde183bd19	2026-04-17 10:10:50.532	{"rating": 8, "mediaTitle": "Spider-Man: Beyond the Spider-Verse"}	REVIEW_CREATE
ee87c1d8-a2b0-4447-aa4e-67c0058c9f0a	YvAyddVIeE21PyIppWx9rV7jTIxWQNws	User	jdTe8ynOdeF5kgfhXSgUCFmBCkS04UmR	2026-04-18 08:41:07.58	{"name": "riyen user"}	FOLLOW
890d6cbe-eb50-4ba7-9b65-6adbb8265ae1	jdTe8ynOdeF5kgfhXSgUCFmBCkS04UmR	Review	13c9ccf0-01e3-4443-a514-64a45858a7b3	2026-04-22 17:20:26.569	{"rating": 8, "mediaTitle": "Marty Supreme"}	REVIEW_CREATE
78dbdb22-6994-425c-9e12-8807d6911edc	jdTe8ynOdeF5kgfhXSgUCFmBCkS04UmR	Review	0ff366ba-a3bf-4405-b343-e55808956b2c	2026-04-22 17:21:18.701	{"rating": 5, "mediaTitle": "Marty Supreme"}	REVIEW_CREATE
b885588e-dabf-4483-a98e-8ec4cfdf7e18	jdTe8ynOdeF5kgfhXSgUCFmBCkS04UmR	Review	fce2af87-9685-48a3-8d00-eea56c6c2e2f	2026-04-22 17:31:15.61	{"rating": 8, "mediaTitle": "Marty Supreme"}	REVIEW_CREATE
4847c80d-cc79-46b6-8071-286c47eff6f3	jdTe8ynOdeF5kgfhXSgUCFmBCkS04UmR	Review	13467ebf-3aa3-4405-9527-b6d8a3404fc5	2026-04-22 17:41:13.339	{"rating": 5, "mediaTitle": "Marty Supreme"}	REVIEW_CREATE
4558170b-dfba-4636-a2ce-d5a75cf0c61d	jdTe8ynOdeF5kgfhXSgUCFmBCkS04UmR	Review	dcee330d-6d44-47a0-be95-d3bde183bd19	2026-04-23 19:04:31.387	{"mediaId": "f47ed5ff-d190-4a5d-ba51-22387dde4872", "authorName": "harry potter"}	LIKE_REVIEW
935308fa-a468-4014-964b-ec465c1f9f6f	jdTe8ynOdeF5kgfhXSgUCFmBCkS04UmR	Review	7e74ab3e-4d3a-4d7e-99c1-773dfcdf8f24	2026-04-23 19:31:35.958	{"mediaId": "f47ed5ff-d190-4a5d-ba51-22387dde4872", "authorName": "riyen user"}	LIKE_REVIEW
0d7296c8-f174-46f9-b93f-a57f12e35475	jdTe8ynOdeF5kgfhXSgUCFmBCkS04UmR	Review	7e74ab3e-4d3a-4d7e-99c1-773dfcdf8f24	2026-04-23 19:35:58.929	{"mediaId": "f47ed5ff-d190-4a5d-ba51-22387dde4872", "authorName": "riyen user"}	LIKE_REVIEW
41eb7f50-1c45-4fbf-b5af-0a0ed7936d82	jdTe8ynOdeF5kgfhXSgUCFmBCkS04UmR	Review	7e74ab3e-4d3a-4d7e-99c1-773dfcdf8f24	2026-04-25 06:17:00.143	{"mediaId": "f47ed5ff-d190-4a5d-ba51-22387dde4872", "authorName": "riyen user"}	LIKE_REVIEW
717604b5-d5cb-44d6-8fe8-a7b7592a023d	jdTe8ynOdeF5kgfhXSgUCFmBCkS04UmR	Review	dcee330d-6d44-47a0-be95-d3bde183bd19	2026-04-26 18:39:53.404	{"mediaId": "f47ed5ff-d190-4a5d-ba51-22387dde4872", "authorName": "harry potter"}	LIKE_REVIEW
\.


--
-- Data for Name: Badge; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Badge" (id, name, description, icon, category, criteria) FROM stdin;
30e81c1e-7c09-4050-8dbf-d4a9deeb0f66	First Cut	Watch your 1st movie	badge_first_cut	VOLUME	{"type": "WATCH_COUNT", "value": 1}
c5a7c45d-4fee-4f68-86c0-d503d54a48ff	Cinephile	Watch 50 movies	badge_cinephile	VOLUME	{"type": "WATCH_COUNT", "value": 50}
6b47498c-a7a9-4494-8c82-6e30e092484a	Cinema Legend	Watch 200 movies	badge_legend	VOLUME	{"type": "WATCH_COUNT", "value": 200}
46ecc477-6d48-4c1f-a2db-5bb37e83924e	Scream Queen/King	Watch 10 Horror movies	badge_horror	GENRE	{"type": "GENRE_COUNT", "value": 10, "genreName": "Horror"}
50b277ec-00e8-4c53-a077-856788c4ee6b	Adrenaline Junkie	Watch 10 Action movies	badge_action	GENRE	{"type": "GENRE_COUNT", "value": 10, "genreName": "Action"}
ec9283ab-de3b-487f-9604-ef04362debfe	Space Cadet	Watch 10 Sci-Fi movies	badge_scifi	GENRE	{"type": "GENRE_COUNT", "value": 10, "genreName": "Sci-Fi"}
8d5f10a6-6bc2-4a56-8a7c-1c6db3aae6a4	Rising Star	Gain 50 followers	badge_followers	SOCIAL	{"type": "FOLLOWER_COUNT", "value": 50}
c2a97e2f-aac1-4506-8232-8b756b68ed84	Socialite	Follow 50 users	badge_following	SOCIAL	{"type": "FOLLOWING_COUNT", "value": 50}
740cbcdf-138a-4904-810f-df7bd9d5132c	The Critic	Write 10 reviews	badge_critic	REVIEWING	{"type": "REVIEW_COUNT", "value": 10}
3aa150c4-00ac-4ffe-af76-2ae9ebf16104	Marathoner	Watch 3 movies in 24 hours	badge_marathon	STYLE	{"type": "MARATHONER", "value": 3}
ce8ccb39-53f8-4ccb-bdef-9a5a40561c3a	Completionist	Finish 50 movies to 100% progress	badge_complete	STYLE	{"type": "COMPLETIONIST", "value": 50}
c57b4aae-a424-4522-ad1b-3c17d04a6e05	Rewatch King	Log the same movie 3 times	badge_rewatch	STYLE	{"type": "REWATCH_KING", "value": 3}
060ec775-8ee6-4bf8-ac31-d030ba5f4b0a	Night Owl	Watch 5 movies between 12 AM ΓÇô 5 AM	badge_night_owl	TIMING	{"type": "NIGHT_OWL", "value": 5}
e95f8712-a45c-4d71-b9aa-1c78f95a1891	Premium Pass	Active Premium Subscriber	badge_premium	LOYALTY	{"tier": "PREMIUM", "type": "SUBSCRIPTION_TIER", "value": 1}
\.


--
-- Data for Name: Comment; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Comment" (id, content, "userId", "reviewId", "parentId", "createdAt", "deletedAt", "isDeleted", "updatedAt", "isEdited") FROM stdin;
f26fe016-04c4-4351-8fbe-f0c8282d28ce	I think the film takes a lot of inspiration from satoshi kon's paprika. still a very solid masterpiece in the realm of cinema	jdTe8ynOdeF5kgfhXSgUCFmBCkS04UmR	439ed48b-14d8-4952-b571-e4fc13c07d5e	\N	2026-03-24 16:03:53.66	\N	f	2026-03-24 16:03:53.66	f
e4ebfcfd-24fd-405c-88f0-910005c73528	great job on noticing that! i love paprika too. satoshi kon was a true visionary auteur	YvAyddVIeE21PyIppWx9rV7jTIxWQNws	439ed48b-14d8-4952-b571-e4fc13c07d5e	f26fe016-04c4-4351-8fbe-f0c8282d28ce	2026-03-24 16:05:21.552	\N	f	2026-03-24 16:07:56.815	f
f7bdd7e7-0033-4e69-89b3-ddd994384b42	did someone say paprika? at this economoy? :O im a fan of satoshi kon too man. love to see satoshi kon fans gathering!	pLcU673SVxY3sYc3iDXu2zbFuNel1pXe	439ed48b-14d8-4952-b571-e4fc13c07d5e	f26fe016-04c4-4351-8fbe-f0c8282d28ce	2026-04-16 08:36:32.664	\N	f	2026-04-16 08:38:09.158	t
9cf28307-cc73-4661-bc83-af542791f293	Timmy especially, he is getting better and better with each project	jdTe8ynOdeF5kgfhXSgUCFmBCkS04UmR	759d6668-779d-41e5-8261-646954011545	\N	2026-04-16 14:16:44.315	\N	f	2026-04-16 14:16:44.315	f
5c28d8a8-9ac4-47e3-b200-8c1841638fe1	[This comment has been deleted]	jdTe8ynOdeF5kgfhXSgUCFmBCkS04UmR	759d6668-779d-41e5-8261-646954011545	9cf28307-cc73-4661-bc83-af542791f293	2026-04-16 14:25:16.638	2026-04-16 14:25:37.846	t	2026-04-16 14:25:37.848	f
8306e53a-5ed2-4ce5-9250-a33d8523bd77	[This comment has been deleted]	jdTe8ynOdeF5kgfhXSgUCFmBCkS04UmR	759d6668-779d-41e5-8261-646954011545	9cf28307-cc73-4661-bc83-af542791f293	2026-04-16 14:27:13.368	2026-04-16 14:36:49.717	t	2026-04-16 14:36:49.718	f
1176d3e8-3449-4ecb-975e-c506ad003585	[This comment has been deleted]	jdTe8ynOdeF5kgfhXSgUCFmBCkS04UmR	759d6668-779d-41e5-8261-646954011545	9cf28307-cc73-4661-bc83-af542791f293	2026-04-16 14:37:14.742	2026-04-16 14:37:18.409	t	2026-04-16 14:37:18.41	f
82735190-ab74-4e32-a806-7f48292772bb	[This comment has been deleted]	jdTe8ynOdeF5kgfhXSgUCFmBCkS04UmR	759d6668-779d-41e5-8261-646954011545	70407649-9a00-4eb7-8168-525f57ef992a	2026-04-16 14:39:24.135	2026-04-16 14:39:34.693	t	2026-04-16 14:39:34.694	f
70407649-9a00-4eb7-8168-525f57ef992a	[This comment has been deleted]	jdTe8ynOdeF5kgfhXSgUCFmBCkS04UmR	759d6668-779d-41e5-8261-646954011545	9cf28307-cc73-4661-bc83-af542791f293	2026-04-16 14:39:03.288	2026-04-16 14:56:52.239	t	2026-04-16 14:56:52.24	f
db8ef0f0-1e6b-41a1-89c0-895be05f7fd6	[This comment has been deleted]	jdTe8ynOdeF5kgfhXSgUCFmBCkS04UmR	759d6668-779d-41e5-8261-646954011545	9cf28307-cc73-4661-bc83-af542791f293	2026-04-16 14:57:03.83	2026-04-16 14:57:36.251	t	2026-04-16 14:57:36.252	f
31a21448-e333-4ca7-a09e-3aa283ed4c18	and i mean it	jdTe8ynOdeF5kgfhXSgUCFmBCkS04UmR	759d6668-779d-41e5-8261-646954011545	\N	2026-04-16 14:57:51.43	\N	f	2026-04-16 14:57:51.43	f
e526f009-fa90-4f5b-ac59-9a6ff148a58c	[This comment has been deleted]	jdTe8ynOdeF5kgfhXSgUCFmBCkS04UmR	759d6668-779d-41e5-8261-646954011545	31a21448-e333-4ca7-a09e-3aa283ed4c18	2026-04-16 14:58:06.106	2026-04-16 14:58:12.604	t	2026-04-16 14:58:12.604	f
a017f24d-959f-43e8-9460-fa9e3d1b7a12	[This comment has been deleted]	jdTe8ynOdeF5kgfhXSgUCFmBCkS04UmR	759d6668-779d-41e5-8261-646954011545	31a21448-e333-4ca7-a09e-3aa283ed4c18	2026-04-16 15:14:30.135	2026-04-16 15:14:36.591	t	2026-04-16 15:14:36.591	f
895771b4-19b4-435f-9a7a-f0e10b63e183	test comment	jdTe8ynOdeF5kgfhXSgUCFmBCkS04UmR	759d6668-779d-41e5-8261-646954011545	\N	2026-04-16 15:29:17.165	\N	f	2026-04-16 15:29:17.165	f
401c3f8e-abff-47fd-94a5-730750b6c4f6	test-reply	jdTe8ynOdeF5kgfhXSgUCFmBCkS04UmR	759d6668-779d-41e5-8261-646954011545	895771b4-19b4-435f-9a7a-f0e10b63e183	2026-04-16 15:29:28.806	\N	f	2026-04-16 15:29:28.806	f
3384af2b-2c1d-4c1c-93bc-0a4962dfc250	Nice observation!	jdTe8ynOdeF5kgfhXSgUCFmBCkS04UmR	dcee330d-6d44-47a0-be95-d3bde183bd19	\N	2026-04-17 10:40:00.331	\N	f	2026-04-17 10:40:00.331	f
3c65444c-22b2-45c8-be91-48812e0bacbd	Gotta see it again	jdTe8ynOdeF5kgfhXSgUCFmBCkS04UmR	7e74ab3e-4d3a-4d7e-99c1-773dfcdf8f24	\N	2026-04-23 19:36:20.411	\N	f	2026-04-23 19:36:20.411	f
\.


--
-- Data for Name: Follow; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Follow" (id, "followerId", "followingId", "createdAt") FROM stdin;
f346413b-6503-4b57-8b64-0446b2dfb2e3	LOgIAJ3Yb6QnXDadriQLjyTv2WpZvq9d	jdTe8ynOdeF5kgfhXSgUCFmBCkS04UmR	2026-04-11 06:13:48.452
28d2997c-7ab0-4a62-af04-f729b5d7be49	jdTe8ynOdeF5kgfhXSgUCFmBCkS04UmR	LOgIAJ3Yb6QnXDadriQLjyTv2WpZvq9d	2026-04-11 15:45:33.883
2bb8a3ae-cd2d-48ec-ad52-b56739c31fe9	YvAyddVIeE21PyIppWx9rV7jTIxWQNws	jdTe8ynOdeF5kgfhXSgUCFmBCkS04UmR	2026-04-18 08:41:07.575
\.


--
-- Data for Name: Genre; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Genre" (id, name) FROM stdin;
832b848a-0db7-4f4d-af74-8d9681040419	sci-fi
6608d104-4702-40fb-8348-28280d89ced2	action
e11c1f59-813f-4e2c-953e-0aff9e94d70d	adventure
b3247798-917d-49df-a8ed-0536ea69f67e	horror
0e772151-92c1-4779-8d37-5b68b7b5f7d8	mystery
e8376211-63bf-4a91-97f9-394383f5f518	post-apocalyptic
a103b838-a967-4cd8-9cb3-aea676283531	gore
c4370eaa-9259-491b-9c33-a9734754e11c	comedy
1cb7538a-2893-4b8d-8fbe-ee837eff99c6	animation
4ad8cb92-681f-49ab-a46f-992c7318308b	documentary
099ba751-1c87-42a4-8272-add185d88657	superhero
583065e1-dc70-4475-9d2b-1e168c9840e0	space
9c9ec1c9-c721-435a-b29a-9fa3f70ae7e6	sports
3fa06a6f-24d9-4896-a0e5-d7b2241ccf71	dark comedy
7e137f89-0358-406f-afc4-48bfaaf3adb1	Steampunk
\.


--
-- Data for Name: Like; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Like" (id, "userId", "reviewId") FROM stdin;
63db3ceb-541d-4606-b94d-67c22488c153	jdTe8ynOdeF5kgfhXSgUCFmBCkS04UmR	2536a2f9-bec4-4660-ba31-2a44024c3ded
0b73bbce-9b14-48a8-829a-304b370d551f	YvAyddVIeE21PyIppWx9rV7jTIxWQNws	0fa02f47-c491-4613-a19d-d0d13ee42935
57f55917-20dc-42ca-ad47-18c28cb78271	jdTe8ynOdeF5kgfhXSgUCFmBCkS04UmR	759d6668-779d-41e5-8261-646954011545
4411f6ce-ad7c-4de9-a5f4-bc831c73b292	jdTe8ynOdeF5kgfhXSgUCFmBCkS04UmR	7e74ab3e-4d3a-4d7e-99c1-773dfcdf8f24
72990aed-fcb8-4c66-aa21-eb89eb10995e	jdTe8ynOdeF5kgfhXSgUCFmBCkS04UmR	dcee330d-6d44-47a0-be95-d3bde183bd19
\.


--
-- Data for Name: Media; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Media" (id, title, description, "releaseYear", director, "cast", platform, pricing, "streamingUrl", "createdAt", "updatedAt", "averageRating", "deletedAt", "isDeleted", "likeCount", "reviewCount", slug, "viewCount", "watchCount", "posterUrl") FROM stdin;
d5711673-b9b0-4ab9-b35f-80647c9b10ad	Zootopia 2	Brave officers Judy Hopps and Nick Wilde find themselves on the trail of a mysterious reptile who arrives in the city and turns the mammal metropolis upside down.	2025	Byron Howard	{"Ginnifer Goodwin","Jason Bateman","Ke Huy Quan"}	Disney+	PREMIUM	https://www.disneyplus.com	2026-03-25 11:24:13.273	2026-04-21 11:05:04.253	7.5	\N	f	0	1	zootopia-2-2025	2	1	https://image.tmdb.org/t/p/w1280/bjUWGw0Ao0qVWxagN3VCwBJHVo6.jpg
799e3b2b-5936-4034-bca5-d4124e7516a0	Daredevil: Born Again	Matt Murdock and Wilson Fisk try to put their rivalry aside to help the people of New York, but their pasts quickly catch up to them.	2025	Michael Cuesta	{"Charlie Cox","Vincent D'Onofrio","Jon Bernthal"}	Disney+ / Hulu	PREMIUM	https://www.netflix.com	2026-03-26 15:46:46.735	2026-04-21 11:03:03.191	0	\N	f	0	0	daredevil-born-again-2025	1	0	https://image.tmdb.org/t/p/w1280/xDUoAsU8lQHOOoRkFiBuarmACDN.jpg
06acf591-813a-411c-862a-bbe38a3f296d	Spider-Man: Homecoming	Peter Parker balances his life as an ordinary high school student in Queens with his superhero alter-ego Spider-Man.	2017	Jon Watts	{"Tom Holland","Michael Keaton",Zendaya}	Disney+ / Hulu / HBO Max	FREE	https://www.hulu.com	2026-03-26 15:45:00.696	2026-04-21 11:04:12.213	0	\N	f	0	0	spider-man-homecoming-2017	5	1	https://image.tmdb.org/t/p/w1280/wFNNv1ZHglNdXJLYiEgpLY5sa9S.jpg
37f66465-1de8-434e-8995-9595f4517d6b	Inception	A thief who steals corporate secrets through the use of dream-sharing technology.	2010	Christopher Nolan	{"Leonardo DiCaprio","Elliot Page","Joseph Gordon-Levitt","Cillian Murphy","Marion Cotillard","Tom Hardy"}	HBO Max	FREE	https://www.disneyplus.com	2026-03-23 12:46:40.987	2026-04-26 10:26:23.545	9	\N	f	0	1	inception-2010	15	0	https://image.tmdb.org/t/p/w1280/xlaY2zyzMfkhk0HSC5VUwzoZPU1.jpg
bf31e7dd-8652-4369-b700-66b1b18e25a1	Avatar 5	The epic conclusion to the saga set on the distant moon of Pandora.	2029	James Cameron	{"Sam Worthington","Zoe Saldana"}	Disney+	PREMIUM	https://disneyplus.com	2026-03-23 13:42:35.586	2026-04-22 06:04:18.77	0	\N	f	0	0	avatar-5-2029	8	0	https://image.tmdb.org/t/p/w1280/rtmmvqkIC5zDMEd638Es2woxbz8.jpg
f47ed5ff-d190-4a5d-ba51-22387dde4872	Spider-Man: Beyond the Spider-Verse	The epic conclusion to Miles Morales' journey through the multiverse as he faces his most dangerous threat yet.	2026	 Joaquim Dos Santos	{"Shameik Moore","Hailee Steinfeld","Oscar Isaac"}	Sony Pictures	BASIC	https://www.sonypictures.com	2026-03-26 15:52:14.243	2026-04-26 17:55:19.519	8.5	\N	f	0	2	spider-man-beyond-the-spider-verse-2026	9	1	https://image.tmdb.org/t/p/w1280/4goL6NMtUXYUDjI9N8CUBk9SrEt.jpg
abb20634-ef7e-4d15-b01d-2b49336167f8	The Super Mario Bros. Movie	A plumber named Mario travels through an underground labyrinth with his brother, Luigi, trying to save a captured princess.	2023	Aaron Horvath	{"Chris Pratt","Anya Taylor-Joy","Charlie Day","Jack Black"}	Netflix	FREE	https://www.netflix.com	2026-03-26 15:49:28.249	2026-04-22 10:12:49.165	0	\N	f	0	0	the-super-mario-bros-movie-2023	3	1	https://image.tmdb.org/t/p/w1280/qNBAXBIQlnOThrVvA6mA2B5ggV6.jpg
fb9675a4-7de4-4798-b0fb-d2cc014a90bd	Dune: Part Two	Paul Atreides unites with Chani and the Fremen while on a warpath of revenge against the conspirators who destroyed his family.	2024	Denis Villeneuve	{"Timoth├⌐e Chalamet",Zendaya,"Rebecca Ferguson","Austin Butler"}	Theaters Only	PRO	http://netflix.com/	2026-03-26 15:51:08.387	2026-04-21 11:00:55.358	0	\N	f	0	0	dune-part-two-2024	20	0	https://image.tmdb.org/t/p/w1280/6izwz7rsy95ARzTR3poZ8H6c5pp.jpg
076ffeae-3d9e-48f1-a0da-3a0f8375950e	Project Hail Mary	An astronaut wakes up on a spaceship with no memory of how he got there, realizing he is humanity's last hope for survival.	2026	Phil Lord, Christopher Miller	{"Ryan Gosling","Sandra H├╝ller"}	Amazon MGM Studios	BASIC	https://amazon.com	2026-04-07 16:18:12.066	2026-04-21 14:06:16.721	0	\N	f	0	0	project-hail-mary-2026	5	0	https://image.tmdb.org/t/p/w1280/pFFogE9zirdb8wJVhch0mvLdIsz.jpg
f4f76701-e458-44cc-81e8-a54b6a1132e9	Marty Supreme	The story follows Marty Mauser, a young New Yorker with dreams of table tennis glory, as he navigates ambition, love, and moral dilemmas on his journey to international recognition.	2025	 Josh Safdie	{"Timoth├⌐e Chalamet","Gwyneth Paltrow","Odessa AΓÇÖzion","Kevin OΓÇÖLeary","Tyler Okonma"}	Netflix	BASIC	http://netflix.com/	2026-04-21 07:47:25.777	2026-04-25 06:09:47.51	0	\N	f	0	0	marty-supreme-2025	9	0	https://image.tmdb.org/t/p/w1280/lYWEXbQgRTR4ZQleSXAgRbxAjvq.jpg
03740635-e24a-42d1-aa5f-9f9126aaa1e5	Alien: Romulus	A group of young space colonizers scavenging a derelict space station encounter the most terrifying life form in the universe, forcing them to fight for survival in the darkest corners of deep space.	2024	Fede ├ülvarez	{"Cailee Spaeny","David Jonsson","Archie Renaux","Isabela Merced","Spike Fearn"}	20th Century Studios	PREMIUM	https://www.disneyplus.com/movies/alien-romulus	2026-04-20 10:54:24.865	2026-04-20 10:54:24.865	0	\N	f	0	0	alien-romulus-2024	0	0	https://image.tmdb.org/t/p/w1280/2uSWRTtCG336nuBiG8jOTEUKSy8.jpg
\.


--
-- Data for Name: MediaGenre; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."MediaGenre" (id, "mediaId", "genreId") FROM stdin;
cf1942b6-4643-4c0f-bc2c-7bf0aa9e99ca	37f66465-1de8-434e-8995-9595f4517d6b	6608d104-4702-40fb-8348-28280d89ced2
88fa93cd-b090-4296-b318-7399e69665d7	37f66465-1de8-434e-8995-9595f4517d6b	832b848a-0db7-4f4d-af74-8d9681040419
4b80916b-c9e5-4698-a9e3-c33bf65607b1	bf31e7dd-8652-4369-b700-66b1b18e25a1	e11c1f59-813f-4e2c-953e-0aff9e94d70d
d50ed2ab-546d-4280-bd25-db22e947a26a	bf31e7dd-8652-4369-b700-66b1b18e25a1	6608d104-4702-40fb-8348-28280d89ced2
fa8577cb-7663-4744-84e3-4cf02502a991	d5711673-b9b0-4ab9-b35f-80647c9b10ad	c4370eaa-9259-491b-9c33-a9734754e11c
5e1c2416-500b-4ff0-8e66-8bfb867e0ffe	d5711673-b9b0-4ab9-b35f-80647c9b10ad	1cb7538a-2893-4b8d-8fbe-ee837eff99c6
3d952303-1e38-4c03-958c-cfbd5f555e41	06acf591-813a-411c-862a-bbe38a3f296d	6608d104-4702-40fb-8348-28280d89ced2
caab90c7-bf45-42aa-9043-6c75f1e33d11	06acf591-813a-411c-862a-bbe38a3f296d	e11c1f59-813f-4e2c-953e-0aff9e94d70d
4c985727-5ba7-43d4-afc7-8141aa2e55c2	06acf591-813a-411c-862a-bbe38a3f296d	099ba751-1c87-42a4-8272-add185d88657
2a7a7550-4e1a-4931-a719-a6c5a2e5d8c0	799e3b2b-5936-4034-bca5-d4124e7516a0	6608d104-4702-40fb-8348-28280d89ced2
b16af64e-2f07-4526-b8cf-4216b6a9cf8b	799e3b2b-5936-4034-bca5-d4124e7516a0	099ba751-1c87-42a4-8272-add185d88657
1bdb4bbf-c6d7-4a30-8b34-24cd42024d88	abb20634-ef7e-4d15-b01d-2b49336167f8	e11c1f59-813f-4e2c-953e-0aff9e94d70d
f1bc39de-ee1a-4622-903a-6871b084a93b	abb20634-ef7e-4d15-b01d-2b49336167f8	1cb7538a-2893-4b8d-8fbe-ee837eff99c6
00089a4a-6ef9-4662-a448-6e8eca865a76	abb20634-ef7e-4d15-b01d-2b49336167f8	c4370eaa-9259-491b-9c33-a9734754e11c
c4f0a17f-4586-4291-9223-a68191f0af4e	fb9675a4-7de4-4798-b0fb-d2cc014a90bd	e11c1f59-813f-4e2c-953e-0aff9e94d70d
606f5fc9-7ac6-4df8-845a-4da9c5237106	fb9675a4-7de4-4798-b0fb-d2cc014a90bd	832b848a-0db7-4f4d-af74-8d9681040419
261cd275-debe-4d7c-8ec9-fe9c7300f4ca	f47ed5ff-d190-4a5d-ba51-22387dde4872	e11c1f59-813f-4e2c-953e-0aff9e94d70d
47d5da66-9b3c-47dd-8935-6879c9313cbb	f47ed5ff-d190-4a5d-ba51-22387dde4872	1cb7538a-2893-4b8d-8fbe-ee837eff99c6
4548be7c-46dd-4bb7-b1b4-c3a2522ca0f0	f47ed5ff-d190-4a5d-ba51-22387dde4872	099ba751-1c87-42a4-8272-add185d88657
99df8827-f3c6-42ac-adfc-c87e5de0e01b	076ffeae-3d9e-48f1-a0da-3a0f8375950e	e11c1f59-813f-4e2c-953e-0aff9e94d70d
29e1e3ec-4847-43e7-a941-aa94cf18e7da	076ffeae-3d9e-48f1-a0da-3a0f8375950e	832b848a-0db7-4f4d-af74-8d9681040419
6027ef44-f924-4cb1-85be-611c5912e5e2	03740635-e24a-42d1-aa5f-9f9126aaa1e5	583065e1-dc70-4475-9d2b-1e168c9840e0
bb40cdff-c4b4-435d-80c6-a8fdd833e25b	03740635-e24a-42d1-aa5f-9f9126aaa1e5	b3247798-917d-49df-a8ed-0536ea69f67e
572ad044-db8f-4bb8-a125-a7c772513620	03740635-e24a-42d1-aa5f-9f9126aaa1e5	832b848a-0db7-4f4d-af74-8d9681040419
e18a5203-4640-420a-bf5a-fd1900f26583	f4f76701-e458-44cc-81e8-a54b6a1132e9	4ad8cb92-681f-49ab-a46f-992c7318308b
3cc265c5-5c47-4ee3-91db-6f898621331b	f4f76701-e458-44cc-81e8-a54b6a1132e9	9c9ec1c9-c721-435a-b29a-9fa3f70ae7e6
\.


--
-- Data for Name: Notification; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Notification" (id, "userId", message, "isRead", "createdAt", "actorId", link, type) FROM stdin;
46a179bd-f163-4c37-8cae-98e12723e6a8	jdTe8ynOdeF5kgfhXSgUCFmBCkS04UmR	Marty Supreme (Rejected: try again)	t	2026-04-23 09:05:20.012	\N	/dashboard/my-reviews/archive/13467ebf-3aa3-4405-9527-b6d8a3404fc5	REVIEW_REJECTED
120c905d-c91b-4c19-bf4d-eb833927e314	JARRyO3IDRwP3lxMQUEAlTVw1sUameeK	misinformation about the movie.	f	2026-04-07 09:45:48.212	jdTe8ynOdeF5kgfhXSgUCFmBCkS04UmR	/admin/reports	REPORT_ALERT
66c07d52-6925-4666-84a9-83d0dffde97b	JARRyO3IDRwP3lxMQUEAlTVw1sUameeK	misinformation about the movie.	f	2026-04-09 09:33:31.868	jdTe8ynOdeF5kgfhXSgUCFmBCkS04UmR	/admin/reports	REPORT_ALERT
be7db591-da1d-442c-985a-3566454de7c1	LOgIAJ3Yb6QnXDadriQLjyTv2WpZvq9d	started following you.	f	2026-04-11 15:45:19.309	jdTe8ynOdeF5kgfhXSgUCFmBCkS04UmR	/profile/jdTe8ynOdeF5kgfhXSgUCFmBCkS04UmR	FOLLOW
e37dbdc3-903a-49b8-96a9-629cf8d2e7fc	LOgIAJ3Yb6QnXDadriQLjyTv2WpZvq9d	started following you.	f	2026-04-11 15:45:33.894	jdTe8ynOdeF5kgfhXSgUCFmBCkS04UmR	/profile/jdTe8ynOdeF5kgfhXSgUCFmBCkS04UmR	FOLLOW
a12d259a-3946-4622-872b-138f9883b110	LOgIAJ3Yb6QnXDadriQLjyTv2WpZvq9d	liked your review.	f	2026-04-26 18:39:53.409	jdTe8ynOdeF5kgfhXSgUCFmBCkS04UmR	/dashboard/my-reviews/dcee330d-6d44-47a0-be95-d3bde183bd19	LIKE_REVIEW
be9bfce8-fe0c-41b1-be9e-828ecdd5dc2d	jdTe8ynOdeF5kgfhXSgUCFmBCkS04UmR	≡ƒÅå Achievement Unlocked: First Cut!	t	2026-04-07 05:57:02.014	\N	/profile/achievements	SYSTEM_ANNOUNCEMENT
e825c960-eced-4f89-87ad-3ff669ab545c	jdTe8ynOdeF5kgfhXSgUCFmBCkS04UmR	Dune: Part Two	t	2026-04-07 09:37:52.338	\N	/reviews/759d6668-779d-41e5-8261-646954011545	REVIEW_APPROVED
b2a5829f-c0e4-495f-99b8-1e2ebfd49c45	jdTe8ynOdeF5kgfhXSgUCFmBCkS04UmR	Dune: Part Two	t	2026-04-07 09:50:41.814	\N	/reviews/759d6668-779d-41e5-8261-646954011545	REVIEW_APPROVED
e51b2ae3-8729-46f4-890c-1223ba8687e3	jdTe8ynOdeF5kgfhXSgUCFmBCkS04UmR	started following you.	t	2026-04-11 06:13:48.467	LOgIAJ3Yb6QnXDadriQLjyTv2WpZvq9d	/profile/LOgIAJ3Yb6QnXDadriQLjyTv2WpZvq9d	FOLLOW
a8e1725c-15b4-4e01-80c7-573113f60f2d	jdTe8ynOdeF5kgfhXSgUCFmBCkS04UmR	replied to your comment.	t	2026-04-16 08:36:32.678	pLcU673SVxY3sYc3iDXu2zbFuNel1pXe	/reviews/439ed48b-14d8-4952-b571-e4fc13c07d5e	COMMENT_REPLY
4af59752-1dcd-4a74-9ba3-8c257994dba2	LOgIAJ3Yb6QnXDadriQLjyTv2WpZvq9d	Spider-Man: Beyond the Spider-Verse	f	2026-04-17 10:11:17.347	\N	/dashboard/my-reviews/dcee330d-6d44-47a0-be95-d3bde183bd19	REVIEW_APPROVED
8d09a6b2-e45c-4ff8-b549-5814f99c8a96	LOgIAJ3Yb6QnXDadriQLjyTv2WpZvq9d	Spider-Man: Beyond the Spider-Verse	f	2026-04-17 10:40:00.345	jdTe8ynOdeF5kgfhXSgUCFmBCkS04UmR	/dashboard/my-reviews/dcee330d-6d44-47a0-be95-d3bde183bd19	COMMENT_ADD
ddd541f5-64cb-4d5b-bb24-e05a3161ddba	jdTe8ynOdeF5kgfhXSgUCFmBCkS04UmR	started following you.	f	2026-04-18 08:41:07.585	YvAyddVIeE21PyIppWx9rV7jTIxWQNws	/profile/YvAyddVIeE21PyIppWx9rV7jTIxWQNws	FOLLOW
aca41684-0e20-43c3-a831-50700f14db06	jdTe8ynOdeF5kgfhXSgUCFmBCkS04UmR	Spider-Man: Beyond the Spider-Verse	f	2026-04-20 10:44:29.972	\N	/dashboard/my-reviews/7e74ab3e-4d3a-4d7e-99c1-773dfcdf8f24	REVIEW_APPROVED
e433d58c-1230-41d8-ba82-dd5a2c009b60	YvAyddVIeE21PyIppWx9rV7jTIxWQNws	Avatar 5	f	2026-04-22 06:04:18.785	\N	/dashboard/my-reviews/2536a2f9-bec4-4660-ba31-2a44024c3ded	REVIEW_REJECTED
609e9e2a-8fda-41b0-b5fd-cbad1767c998	jdTe8ynOdeF5kgfhXSgUCFmBCkS04UmR	The Super Mario Bros. Movie	f	2026-04-22 06:29:07.461	\N	/dashboard/my-reviews/420e0b80-1bc7-4763-97fc-534cec783d47	REVIEW_REJECTED
c3d50a48-a02d-4ea2-b26e-fee457304df7	jdTe8ynOdeF5kgfhXSgUCFmBCkS04UmR	The Super Mario Bros. Movie (Rejected: Violation of guidelines)	f	2026-04-22 10:12:49.172	\N	/dashboard/my-reviews/archive/420e0b80-1bc7-4763-97fc-534cec783d47	REVIEW_REJECTED
81e7d313-9453-4483-8fc2-e218ecdc465e	jdTe8ynOdeF5kgfhXSgUCFmBCkS04UmR	Marty Supreme (Rejected: not appropriate for reviews. change)	t	2026-04-23 05:08:40.725	\N	/dashboard/my-reviews/archive/13467ebf-3aa3-4405-9527-b6d8a3404fc5	REVIEW_REJECTED
414d8b82-d1af-4861-b896-36be748a1c14	jdTe8ynOdeF5kgfhXSgUCFmBCkS04UmR	Marty Supreme (Rejected: still inappropriate. chnaage)	t	2026-04-23 08:49:22.288	\N	/dashboard/my-reviews/archive/13467ebf-3aa3-4405-9527-b6d8a3404fc5	REVIEW_REJECTED
263bb288-82ec-4a05-89f8-dbeb08c615cc	T9AXsDbJTf8PkYlP1qpXKFMieAlUXsoS	User riyen user appealed rejection for Marty Supreme.	f	2026-04-23 08:50:44.997	jdTe8ynOdeF5kgfhXSgUCFmBCkS04UmR	/admin/dashboard/reports?tab=pending	REPORT_ALERT
430a8685-8c2a-4513-85c9-29a24695922c	JARRyO3IDRwP3lxMQUEAlTVw1sUameeK	User riyen user appealed rejection for Marty Supreme.	t	2026-04-23 08:50:44.99	jdTe8ynOdeF5kgfhXSgUCFmBCkS04UmR	/admin/dashboard/reports?tab=pending	REPORT_ALERT
7f44ccf5-ebd4-4daa-b161-db07433754a6	T9AXsDbJTf8PkYlP1qpXKFMieAlUXsoS	User riyen user appealed rejection for Marty Supreme.	f	2026-04-23 09:05:53.264	jdTe8ynOdeF5kgfhXSgUCFmBCkS04UmR	/admin/dashboard/reports?tab=pending	REPORT_ALERT
cda61d30-edd6-4ff0-9b2f-7608d807ab0f	JARRyO3IDRwP3lxMQUEAlTVw1sUameeK	User riyen user appealed rejection for Marty Supreme.	t	2026-04-23 09:05:53.257	jdTe8ynOdeF5kgfhXSgUCFmBCkS04UmR	/admin/dashboard/reports?tab=pending	REPORT_ALERT
36cffdab-29cc-45a9-92c2-f45721775489	jdTe8ynOdeF5kgfhXSgUCFmBCkS04UmR	Marty Supreme (Rejected: try again please)	t	2026-04-23 09:15:26.767	\N	/dashboard/my-reviews/archive/13467ebf-3aa3-4405-9527-b6d8a3404fc5	REVIEW_REJECTED
a450dcb2-28fc-4d03-89d2-4389f41048b7	T9AXsDbJTf8PkYlP1qpXKFMieAlUXsoS	User riyen user appealed rejection for Marty Supreme.	f	2026-04-23 09:16:19.715	jdTe8ynOdeF5kgfhXSgUCFmBCkS04UmR	/admin/dashboard/reports?tab=pending&targetId=13467ebf-3aa3-4405-9527-b6d8a3404fc5	REPORT_ALERT
7b1f9948-9493-412b-8f7f-b716595c0b7c	JARRyO3IDRwP3lxMQUEAlTVw1sUameeK	User riyen user appealed rejection for Marty Supreme.	t	2026-04-23 09:16:19.708	jdTe8ynOdeF5kgfhXSgUCFmBCkS04UmR	/admin/dashboard/reports?tab=pending&targetId=13467ebf-3aa3-4405-9527-b6d8a3404fc5	REPORT_ALERT
f3c5be88-8967-4891-bf96-9ee3a506e531	LOgIAJ3Yb6QnXDadriQLjyTv2WpZvq9d	liked your review.	f	2026-04-23 19:04:31.398	jdTe8ynOdeF5kgfhXSgUCFmBCkS04UmR	/dashboard/my-reviews/dcee330d-6d44-47a0-be95-d3bde183bd19	LIKE_REVIEW
35ba5fd6-ddd6-40a3-b9a4-4a3aaba04467	jdTe8ynOdeF5kgfhXSgUCFmBCkS04UmR	Marty Supreme (Rejected: Violation of guidelines)	f	2026-04-25 06:09:47.526	\N	/dashboard/my-reviews/archive/13467ebf-3aa3-4405-9527-b6d8a3404fc5	REVIEW_REJECTED
cf9cdee3-46b9-4deb-ab17-4fcaeaafea7b	JARRyO3IDRwP3lxMQUEAlTVw1sUameeK	misinformation about the movie.	f	2026-04-26 04:42:09.148	jdTe8ynOdeF5kgfhXSgUCFmBCkS04UmR	/admin/reports	REPORT_ALERT
127799c6-503a-4f7a-a9ca-d6ca7a8e7a07	T9AXsDbJTf8PkYlP1qpXKFMieAlUXsoS	misinformation about the movie.	f	2026-04-26 04:42:09.15	jdTe8ynOdeF5kgfhXSgUCFmBCkS04UmR	/admin/reports	REPORT_ALERT
b4c724bf-3e3e-4750-b426-fec07a2ef92b	jdTe8ynOdeF5kgfhXSgUCFmBCkS04UmR	Inception	f	2026-04-26 09:13:02.963	\N	/dashboard/my-reviews/439ed48b-14d8-4952-b571-e4fc13c07d5e	REVIEW_APPROVED
7834258a-ebc7-414b-9f7a-b228cdfa1409	jdTe8ynOdeF5kgfhXSgUCFmBCkS04UmR	Inception	f	2026-04-26 09:14:57.911	\N	/dashboard/my-reviews/439ed48b-14d8-4952-b571-e4fc13c07d5e	REVIEW_APPROVED
0813652b-d308-4bf8-b456-f562fedfa866	jdTe8ynOdeF5kgfhXSgUCFmBCkS04UmR	Inception (Rejected: its not aligned with community guidelines. please redo.)	t	2026-04-26 09:25:14.369	\N	/dashboard/my-reviews/archive/439ed48b-14d8-4952-b571-e4fc13c07d5e	REVIEW_REJECTED
402e1e82-5352-4f9c-b189-f352f78eb718	jdTe8ynOdeF5kgfhXSgUCFmBCkS04UmR	Inception	f	2026-04-26 10:26:23.582	\N	/dashboard/my-reviews/439ed48b-14d8-4952-b571-e4fc13c07d5e	REVIEW_APPROVED
d92a620a-fef4-4c40-93a8-0928fc61c5da	JARRyO3IDRwP3lxMQUEAlTVw1sUameeK	this is hateful	f	2026-04-26 18:53:03.162	jdTe8ynOdeF5kgfhXSgUCFmBCkS04UmR	/admin/reports	REPORT_ALERT
b337e1a4-12e7-4d86-8ce1-199db6327caf	T9AXsDbJTf8PkYlP1qpXKFMieAlUXsoS	this is hateful	f	2026-04-26 18:53:03.165	jdTe8ynOdeF5kgfhXSgUCFmBCkS04UmR	/admin/reports	REPORT_ALERT
\.


--
-- Data for Name: Review; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Review" (id, rating, content, "isSpoiler", tags, status, "userId", "mediaId", "createdAt", "commentCount", "deletedAt", "isDeleted", "likeCount", "updatedAt", "rejectionReason") FROM stdin;
439ed48b-14d8-4952-b571-e4fc13c07d5e	9	A mind-bending masterpiece that explores the depths of the subconscious. Christopher Nolan's direction is flawless, and the ending still sparks debate today. I personally loved the twist and turns that shapes the overall storytelling. Nolans absolute best	f	{sci-fi,thriller,masterpiece,mind-twisting}	APPROVED	jdTe8ynOdeF5kgfhXSgUCFmBCkS04UmR	37f66465-1de8-434e-8995-9595f4517d6b	2026-03-24 06:40:39.314	3	\N	f	0	2026-04-26 10:26:23.481	\N
759d6668-779d-41e5-8261-646954011545	8.5	The cinematography during the water-of-life sequence is mind-blowing. Seeing Paul fully embrace the Lisan al-Gaib mantle gave me chills, especially that final standoff in the throne room. All the cast members delivered an excellent performance	t	{DunePartTwo,Arrakis,SciFiMasterpiece,Chalamet}	APPROVED	jdTe8ynOdeF5kgfhXSgUCFmBCkS04UmR	fb9675a4-7de4-4798-b0fb-d2cc014a90bd	2026-04-07 09:36:10.474	12	\N	f	1	2026-04-16 15:29:28.81	\N
420e0b80-1bc7-4763-97fc-534cec783d47	6.5	Crisp Rat is actually hilarious. there is not a lot of things this movie did wrong. pretty fun flick	f	{mario,supermario,bowser,peach,nintendo}	REJECTED	jdTe8ynOdeF5kgfhXSgUCFmBCkS04UmR	abb20634-ef7e-4d15-b01d-2b49336167f8	2026-04-09 12:22:25.36	0	\N	f	0	2026-04-22 10:12:49.147	\N
0fa02f47-c491-4613-a19d-d0d13ee42935	7.5	The introduction of Gary the reptile adds such a fresh dynamic! I didn't expect the twist regarding the mammal-reptile truce in the second act. Id love to watch it again	t	{sequel,zootopia2,spoiler-alert,new-characters}	APPROVED	jdTe8ynOdeF5kgfhXSgUCFmBCkS04UmR	d5711673-b9b0-4ab9-b35f-80647c9b10ad	2026-03-25 11:51:25.117	0	\N	f	1	2026-04-09 13:11:59.392	\N
13467ebf-3aa3-4405-9527-b6d8a3404fc5	5	timothy shined brighter than ever. terrific performance. robbed from oscar! cant wait to see him in dune 3. next big thing!	f	{timothy,sports,oscar}	REJECTED	jdTe8ynOdeF5kgfhXSgUCFmBCkS04UmR	f4f76701-e458-44cc-81e8-a54b6a1132e9	2026-04-22 17:41:13.326	0	\N	f	0	2026-04-25 06:09:47.457	try again please
13c9ccf0-01e3-4443-a514-64a45858a7b3	8	timothy shined brighter than ever. terrific performance	f	{timothy,oscar,sports}	REJECTED	jdTe8ynOdeF5kgfhXSgUCFmBCkS04UmR	f4f76701-e458-44cc-81e8-a54b6a1132e9	2026-04-22 17:20:26.545	0	2026-04-22 17:20:57.883	t	0	2026-04-22 17:20:57.893	\N
2536a2f9-bec4-4660-ba31-2a44024c3ded	7	Visually stunning with groundbreaking CGI that still holds up. While the story is familiar, the world-building of Pandora is absolutely immersive. It is perfect for a family outing	f	{avatar,adventure,visuals,CGI,theatrical}	PENDING	YvAyddVIeE21PyIppWx9rV7jTIxWQNws	bf31e7dd-8652-4369-b700-66b1b18e25a1	2026-03-24 07:01:50.329	0	\N	f	1	2026-04-22 06:04:18.742	\N
0ff366ba-a3bf-4405-b343-e55808956b2c	5	timothy shined brighter than ever. terrific performance. robbed!	f	{timothy,sports,oscar}	REJECTED	jdTe8ynOdeF5kgfhXSgUCFmBCkS04UmR	f4f76701-e458-44cc-81e8-a54b6a1132e9	2026-04-22 17:21:18.68	0	2026-04-22 17:30:47.175	t	0	2026-04-22 17:30:47.176	\N
fce2af87-9685-48a3-8d00-eea56c6c2e2f	8	timothy shined brighter than ever. terrific performance. robbed!	f	{timothy,oscar,marty,snubbed}	REJECTED	jdTe8ynOdeF5kgfhXSgUCFmBCkS04UmR	f4f76701-e458-44cc-81e8-a54b6a1132e9	2026-04-22 17:31:15.596	0	2026-04-22 17:40:55.727	t	0	2026-04-22 17:40:55.728	\N
7e74ab3e-4d3a-4d7e-99c1-773dfcdf8f24	9	The emotional weight of Miguel O'Hara's redemption arc caught me off guard. That scene where he finally understands 'Canon Events' aren't absolute made the whole theater gasp. Also, miles character had a tremendous developement as well. the film is stacked all around	t	{SpiderMan2099,CanonEvent,Emotional,spider-gwen}	APPROVED	jdTe8ynOdeF5kgfhXSgUCFmBCkS04UmR	f47ed5ff-d190-4a5d-ba51-22387dde4872	2026-04-09 09:29:54.825	1	\N	f	1	2026-04-25 06:17:00.135	\N
dcee330d-6d44-47a0-be95-d3bde183bd19	8	The visual storytelling in the Prowler sequence was absolute perfection. Seeing Miles face a version of himself that never became Spider-Man added such a dark, compelling layer to the multiverse stakes.	t	{MilesMorales,Earth42,Multiverse,Animation}	APPROVED	LOgIAJ3Yb6QnXDadriQLjyTv2WpZvq9d	f47ed5ff-d190-4a5d-ba51-22387dde4872	2026-04-17 10:10:50.519	1	\N	f	1	2026-04-26 18:39:53.397	\N
\.


--
-- Data for Name: ReviewReport; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."ReviewReport" (id, "reviewId", "userId", reason, "createdAt", "updatedAt") FROM stdin;
55458ba0-af22-4f8e-ae84-1e1c196eedca	439ed48b-14d8-4952-b571-e4fc13c07d5e	YvAyddVIeE21PyIppWx9rV7jTIxWQNws	misinformation about the movie.	2026-03-24 06:52:29.531	2026-03-24 06:52:29.531
5642f87c-5a2e-48d5-bf21-b1499883abbf	759d6668-779d-41e5-8261-646954011545	jdTe8ynOdeF5kgfhXSgUCFmBCkS04UmR	misinformation about the movie.	2026-04-07 09:45:48.206	2026-04-07 09:45:48.206
1417a4a3-e4e0-461d-ad3c-9d287d28e8ed	439ed48b-14d8-4952-b571-e4fc13c07d5e	jdTe8ynOdeF5kgfhXSgUCFmBCkS04UmR	misinformation about the movie.	2026-04-09 09:33:31.859	2026-04-09 09:33:31.859
55718afc-d36b-4c18-8217-33054dd78879	439ed48b-14d8-4952-b571-e4fc13c07d5e	jdTe8ynOdeF5kgfhXSgUCFmBCkS04UmR	misinformation about the movie.	2026-04-26 04:42:09.13	2026-04-26 04:42:09.13
4acfb06d-13cc-4b5e-a342-9a8a60d4e253	dcee330d-6d44-47a0-be95-d3bde183bd19	jdTe8ynOdeF5kgfhXSgUCFmBCkS04UmR	this is hateful	2026-04-26 18:53:03.15	2026-04-26 18:53:03.15
\.


--
-- Data for Name: Subscription; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Subscription" (id, "userId", type, "startDate", "endDate", "isActive") FROM stdin;
4afa280b-abbc-4470-be1a-cb1eab2e7d95	jdTe8ynOdeF5kgfhXSgUCFmBCkS04UmR	PRO	2026-03-26 09:20:44.304	2026-05-25 09:20:44.304	t
32114c99-72bb-4b99-94c1-88894536957b	YvAyddVIeE21PyIppWx9rV7jTIxWQNws	PREMIUM	2026-03-26 10:36:18.306	2026-04-25 10:36:18.306	f
2cc30fb6-e6b7-4834-aa77-db24da342c1d	T9AXsDbJTf8PkYlP1qpXKFMieAlUXsoS	PREMIUM	2026-03-26 10:42:03.425	2026-04-25 10:42:03.425	f
297223f3-8b14-4ccb-b9c5-0f523669647e	sjq1aFqo5WTr4Mp0Quqdm80gNPaiJne8	PREMIUM	2026-03-26 10:59:37.395	2026-04-25 10:59:37.395	f
53379e44-4500-496f-84e1-97d0f9820dbb	pLcU673SVxY3sYc3iDXu2zbFuNel1pXe	PREMIUM	2026-03-26 11:17:29.521	2026-04-25 11:17:29.521	f
\.


--
-- Data for Name: UserBadge; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."UserBadge" (id, "userId", "badgeId", "earnedAt") FROM stdin;
74ad2002-ed42-4d71-b900-647b5e9eaa61	jdTe8ynOdeF5kgfhXSgUCFmBCkS04UmR	30e81c1e-7c09-4050-8dbf-d4a9deeb0f66	2026-04-07 05:57:02.008
\.


--
-- Data for Name: WatchedHistory; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."WatchedHistory" (id, "userId", "mediaId", "watchedAt", notes, "isRewatch", "createdAt", "updatedAt", duration, "isCompleted", "lastPosition") FROM stdin;
b38036c2-01c0-4c89-909d-10b36e3e79f8	jdTe8ynOdeF5kgfhXSgUCFmBCkS04UmR	bf31e7dd-8652-4369-b700-66b1b18e25a1	2026-03-21 00:00:00	it was fine rainy day to watch this movie. i have the physical blu-ray copy of this as well	t	2026-03-25 08:15:30.232	2026-03-25 08:19:22.756	0	f	0
fcb4d9fa-1321-448a-a01a-121b49949446	jdTe8ynOdeF5kgfhXSgUCFmBCkS04UmR	fb9675a4-7de4-4798-b0fb-d2cc014a90bd	2026-03-26 00:00:00	the movie really exceeded my expectations. matt came over today for a party and we watched it together	t	2026-03-26 16:12:28.656	2026-03-26 16:12:28.656	0	f	0
a2394e60-fc79-45f8-8036-0af7b14972e7	YvAyddVIeE21PyIppWx9rV7jTIxWQNws	abb20634-ef7e-4d15-b01d-2b49336167f8	2026-03-26 16:15:56.604	\N	f	2026-03-26 16:15:56.604	2026-03-26 16:15:56.604	2800	f	300
7a46590f-13f6-4bd2-b045-41a1c659e2da	LOgIAJ3Yb6QnXDadriQLjyTv2WpZvq9d	799e3b2b-5936-4034-bca5-d4124e7516a0	2026-03-26 16:21:40.315	\N	f	2026-03-26 16:21:40.315	2026-03-26 16:21:40.315	2110	f	120
4f29d77b-94c7-4cbc-9a1d-841992c45d1a	jdTe8ynOdeF5kgfhXSgUCFmBCkS04UmR	06acf591-813a-411c-862a-bbe38a3f296d	2026-04-07 00:00:00	just when i thought i couldn't rewatch this any time soon. i had to watch it just to get the thrill again	t	2026-04-07 05:57:01.97	2026-04-07 06:06:44.885	0	f	0
18b2de2d-888e-4896-a714-ec94a630323d	jdTe8ynOdeF5kgfhXSgUCFmBCkS04UmR	37f66465-1de8-434e-8995-9595f4517d6b	2026-03-24 00:00:00	watched it with my friends this time	t	2026-03-25 08:17:33.986	2026-04-07 16:29:32.892	3010	f	2100
365afcca-ef24-4a00-8e7d-89e7165a7811	jdTe8ynOdeF5kgfhXSgUCFmBCkS04UmR	06acf591-813a-411c-862a-bbe38a3f296d	2026-04-08 00:00:00	i watched this again today with Kate. such a good experience	t	2026-04-09 04:46:28.038	2026-04-09 04:47:41.002	0	f	0
018bbbed-45fb-4d34-8d43-71b4f79a90eb	jdTe8ynOdeF5kgfhXSgUCFmBCkS04UmR	06acf591-813a-411c-862a-bbe38a3f296d	2026-03-25 00:00:00	This was a memorable watch as long term spider-man fan	f	2026-03-26 16:09:00.054	2026-04-09 08:10:13.281	0	f	0
be6ef246-f8a3-474d-842d-f1bc0571a6e4	jdTe8ynOdeF5kgfhXSgUCFmBCkS04UmR	d5711673-b9b0-4ab9-b35f-80647c9b10ad	2026-03-26 00:00:00	fun movie. watched at matts house. he made caramel popcorn. it was good	f	2026-03-26 16:14:01.459	2026-04-09 08:41:52.129	3600	f	500
c696f363-6976-42c0-89c8-527058111e95	jdTe8ynOdeF5kgfhXSgUCFmBCkS04UmR	076ffeae-3d9e-48f1-a0da-3a0f8375950e	2026-04-09 00:00:00	big theater experience was a blast	f	2026-04-09 09:13:41.516	2026-04-09 09:13:41.516	0	f	0
\.


--
-- Data for Name: Watchlist; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Watchlist" (id, "userId", "mediaId", "createdAt", "updatedAt") FROM stdin;
718af765-20d9-4250-a6f9-914e874c935f	jdTe8ynOdeF5kgfhXSgUCFmBCkS04UmR	d5711673-b9b0-4ab9-b35f-80647c9b10ad	2026-04-07 05:52:59.498	2026-04-07 05:52:59.498
e0c70d71-876b-4ae6-b81f-061a4b4d50d6	jdTe8ynOdeF5kgfhXSgUCFmBCkS04UmR	06acf591-813a-411c-862a-bbe38a3f296d	2026-04-07 05:53:13.337	2026-04-07 05:53:13.337
4017ea6b-dcc4-498e-9cc0-73daa5d246d3	jdTe8ynOdeF5kgfhXSgUCFmBCkS04UmR	f47ed5ff-d190-4a5d-ba51-22387dde4872	2026-04-13 10:16:03.679	2026-04-13 10:16:03.679
98460b37-38e8-44df-9744-4e5a375484cc	jdTe8ynOdeF5kgfhXSgUCFmBCkS04UmR	abb20634-ef7e-4d15-b01d-2b49336167f8	2026-04-13 11:14:04.599	2026-04-13 11:14:04.599
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
bb44fd13-491f-4229-9102-c3c90bf6ee7a	0f008717c4724669b4d3055dd9b1efff8c36b650af0cd1504db8d526137f35ba	2026-03-18 12:29:05.876567+06	20260318062905_cinemania_init	\N	\N	2026-03-18 12:29:05.867687+06	1
01259e19-2ae4-47c5-a017-c9249c08b356	c5bef6fac5a64092dad875fa31b2a3acf3fd1553a9cea97ecf97ffd9618577e9	2026-03-26 16:15:44.831083+06	20260326101544_enum_update	\N	\N	2026-03-26 16:15:44.826934+06	1
d84234e5-bca0-4d9f-8283-a4ac81e4c9b7	acf829987240308301e781013a08c6cf44202e398301052891359b0b2fdd8660	2026-03-18 13:22:57.248168+06	20260318072257_all_models	\N	\N	2026-03-18 13:22:57.145333+06	1
b452a709-9c31-4974-86f9-8aaa0d32dbbc	2190f1738882747a982d322c6b094fea533507d80e3645a1417fbe08ae6ecf87	2026-03-19 13:12:58.277665+06	20260319071258_final_schema_v1	\N	\N	2026-03-19 13:12:58.166192+06	1
5d0a7780-2f86-4f74-8dfb-e20906f29d4b	205299a12675007695739e8444f253c8ab092bc25911c5f1538ad86947d20122	2026-03-25 11:30:28.462328+06	20260325053028_follow_model_added	\N	\N	2026-03-25 11:30:28.43281+06	1
4b4650d0-d1a5-49db-8e5a-2d334f67ebc5	a89fd087ff0c0488b31904613b2d8103931491a2627de59a15625f6aafbf4a73	2026-03-26 17:47:25.781424+06	20260326114725_watched_history_update	\N	\N	2026-03-26 17:47:25.772773+06	1
53eb13a8-0616-44e2-8567-25a7d431c88f	95669bdddba129a0afd8aa9eda0000b02a79dc223ea2f5f3a09dff2da69fdcc9	2026-03-25 12:50:28.217112+06	20260325065028_watched_history_added	\N	\N	2026-03-25 12:50:28.199025+06	1
6a264860-18fb-4652-b195-6daafa40acfc	193057083df310dcde488be383c8ad760b0946f3df2e99e90a74a7964fbf9dd9	2026-03-25 16:18:35.672086+06	20260325101835_activity_log_update	\N	\N	2026-03-25 16:18:35.663489+06	1
c3ff3d96-1b92-49ae-948f-e8dec60de17d	6bb3e2bd629f3fe2729472441ca6486a6aef38ce076e353e68827ec631bacf46	2026-03-25 17:51:00.953605+06	20260325115100_rating_type_change	\N	\N	2026-03-25 17:51:00.908136+06	1
35a227e3-14b0-4ed2-b9c3-4791e7280619	aef807534d0d9e176645f3e30c0651f97b97ab402b02e308f30d05e5ab03c900	2026-03-26 22:49:57.624935+06	20260326164957_badge_model_a_dd	\N	\N	2026-03-26 22:49:57.597445+06	1
e2841c97-dbf3-440b-8f29-7af14ba07340	0902329477ed8425e0febddda1489898b26f266585de80244166c976f0e0a5a4	2026-03-25 21:32:11.564461+06	20260325153211_notification_update	\N	\N	2026-03-25 21:32:11.551242+06	1
09f1e618-ebe5-439e-aa46-ce631aa2d4bb	4e96aeb9df388873b4ed8315514d7a5124213dfd9c384516f54ab6a1e1c2e878	2026-03-25 21:41:53.8216+06	20260325154153_enum_update	\N	\N	2026-03-25 21:41:53.814536+06	1
aff50927-d007-4926-839b-32a6328efbea	02a61bc1a9a394c6a437917da845a76fbc26986c37de5bf5ea7fcc821070bf79	2026-03-25 21:57:40.036472+06	20260325155740_enum_update	\N	\N	2026-03-25 21:57:40.033646+06	1
81195cde-6212-43e4-9cbd-2f1c99c67387	70a2551d2b96aa5db981d980e3da8a2ab4ab7ba24e019b74bf9a77f7d744cdf5	2026-04-03 20:21:00.852678+06	20260403142100_media_update	\N	\N	2026-04-03 20:21:00.843474+06	1
1db52c7f-feda-49ae-8151-132d37914d17	8e8745a221b49c5ae8f640fd0ce666759cf888f68eb91193bf3c554f91be7dfd	2026-03-25 22:09:27.203158+06	20260325160927_comment_field_add	\N	\N	2026-03-25 22:09:27.197583+06	1
fff60855-a9a4-4096-b584-85c3cd05d240	44c838148693744c8d74945469056912a0d2d722e103b6c242da30499fe60c29	2026-03-25 22:25:13.688909+06	20260325162513_enum_update	\N	\N	2026-03-25 22:25:13.668333+06	1
ca766495-c15f-47f3-bdd4-527772b93693	058eb2894f5497c20e1aad5728f1486627e7295dc3b6132514f5751a7bf70a83	2026-03-26 11:00:42.851831+06	20260326050042_enum_update	\N	\N	2026-03-26 11:00:42.816162+06	1
e7a5ab35-aa4b-4366-b15e-74f9e5bac944	d672ec53c3ad2f22a490defe331a79ad77b8376f434baefd3d8d302c4ad577a9	2026-04-03 20:35:35.216922+06	20260403143535_poster_url_must	\N	\N	2026-04-03 20:35:35.211552+06	1
b104faf9-d8bf-42bc-9c6c-8188162f67d9	4e9a900100cf24abda8419faff6893b5b3838740cfb722e6a2aff0390b3307a7	2026-04-22 15:15:55.594705+06	20260422091555_added_reason_field_to_review	\N	\N	2026-04-22 15:15:55.580661+06	1
\.


--
-- Data for Name: account; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.account (id, "accountId", "providerId", "userId", "accessToken", "refreshToken", "idToken", "accessTokenExpiresAt", "refreshTokenExpiresAt", scope, password, "createdAt", "updatedAt") FROM stdin;
sfIpdJONaRP1DS2ZcFllOI7Fz8zHrdJ5	JARRyO3IDRwP3lxMQUEAlTVw1sUameeK	credential	JARRyO3IDRwP3lxMQUEAlTVw1sUameeK	\N	\N	\N	\N	\N	\N	e0c8549ade7c6357c134dccc23686733:9820d7ce10826fc6b70f5d46a0b311e6b3291fb62b55406053678bc927bd3beb37e8b9f4b294d8a5fcab4bcfc61be3317062637171e1285c804b3db80a5ab7a0	2026-03-23 07:54:57.231	2026-03-23 07:54:57.231
1ec2hMXWY0Dys2ocP3Mb9MCge8hnG1VL	YvAyddVIeE21PyIppWx9rV7jTIxWQNws	credential	YvAyddVIeE21PyIppWx9rV7jTIxWQNws	\N	\N	\N	\N	\N	\N	4bb24f3a40dc5ee2f2747e3fb047f1d8:54a9b2d5522f21d8bdc6d78a29ac32c8bb6f3c3b735e3f9b4c9f74cb89c1b924a50459030981b901c636b79430d12c344e1a1dc3509a7e12c2cf88a750810a0b	2026-03-24 06:47:53.333	2026-03-24 06:47:53.333
V3UYufNvDbJSOXCXOhBdwlTgEA0AzGUq	T9AXsDbJTf8PkYlP1qpXKFMieAlUXsoS	credential	T9AXsDbJTf8PkYlP1qpXKFMieAlUXsoS	\N	\N	\N	\N	\N	\N	43a837c0372eb328d57658a19191c316:e0021d0ab837fe4d99b6d18245c8203642aee5b5b809f79586c55a6be744d612374ad9625415ed5d96a7edbd96801f86c86f2079e91e1beb14b2b172566e25e0	2026-03-26 10:40:20.554	2026-03-26 10:40:20.554
XcIuoHKCsvourK1A5dANfZabv9Nu3PKA	sjq1aFqo5WTr4Mp0Quqdm80gNPaiJne8	credential	sjq1aFqo5WTr4Mp0Quqdm80gNPaiJne8	\N	\N	\N	\N	\N	\N	778e44256d7d004e1480a9bfac70bb59:33a0e47e53100e619cb004ee5b9e958bb5edd0230b6275918b43857ba547a5b2abeb9c39a058c6ef738da17de0db8db8166ec0c55e21f03f470d453cbfcb07e3	2026-03-26 10:57:53.741	2026-03-26 10:57:53.741
jBpYwuGimxPxEyLoXwHcTOF7d2FUSq6i	pLcU673SVxY3sYc3iDXu2zbFuNel1pXe	credential	pLcU673SVxY3sYc3iDXu2zbFuNel1pXe	\N	\N	\N	\N	\N	\N	f93e7cfdfa93aa59f79238fdb79640a1:579adaeb0ca5dea1b5f6674b1cfd987aa5f84cbdbaf3ec90306205d6ce89813238d8b4941376244e283ca7669525dc336cd288257f7e261e815543c6809b647a	2026-03-26 11:15:57.246	2026-03-26 11:15:57.246
IvwbnzI1VVZ4ZBGI2q8Rj4xk5dR1AN2j	LOgIAJ3Yb6QnXDadriQLjyTv2WpZvq9d	credential	LOgIAJ3Yb6QnXDadriQLjyTv2WpZvq9d	\N	\N	\N	\N	\N	\N	28a53f694ba7dfe2747e41bb22ba3bb3:5467deb1405515ed470d071f43de74132d00b3ffc0d98c7f6728c251825605dd8ec8d7524eeb3878b0d49aad0d56ee2d1629feb6d9c416fcb7a333ecde4f40b8	2026-03-26 16:20:00.835	2026-03-26 16:20:00.835
Whf9j8uUAa8ZoGF9hKxmBhimMMAu3jgR	jdTe8ynOdeF5kgfhXSgUCFmBCkS04UmR	credential	jdTe8ynOdeF5kgfhXSgUCFmBCkS04UmR	\N	\N	\N	\N	\N	\N	75ef83d47569ab7b519593ebc5e5fe48:744e9e1c1d232b3929994e30d1e13709c6d0c1532aaa41003fc9a00ad7e169430332d3f61448a549ba1888fa2b9826b882ad604242a408a09f9fe1aa55951726	2026-03-24 05:59:00.059	2026-04-14 17:19:40.412
\.


--
-- Data for Name: payments; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.payments (id, amount, "transactionId", "stripeEventId", status, "invoiceUrl", "paymentGatewayData", "createdAt", "updatedAt", "userId", "subscriptionId") FROM stdin;
2178ff29-5a4d-409d-a674-4e158ef057b0	9.99	pi_3TFA5mRtoEr0V6xC1uCay0Fc	evt_1TFA5nRtoEr0V6xCVbn0OYFq	PAID	https://res.cloudinary.com/dpahuuu4c/image/upload/v1774516846/cinemania/invoices/lj9rjr-1774516844382-invoice-2178ff29-5a4d-409d-a674-4e158ef057b0.pdf.pdf	{"id": "cs_test_a1HXI6gc8wcQumCs7UxbwPuvw9zR0NxNqjeFM1dw0xtyPcfRZcJeJf5Bto", "url": null, "mode": "payment", "locale": null, "object": "checkout.session", "status": "complete", "consent": null, "created": 1774516767, "invoice": null, "ui_mode": "hosted", "currency": "usd", "customer": null, "livemode": false, "metadata": {"userId": "jdTe8ynOdeF5kgfhXSgUCFmBCkS04UmR", "paymentId": "2178ff29-5a4d-409d-a674-4e158ef057b0", "subscriptionType": "BASIC"}, "discounts": [], "cancel_url": "http://localhost:3000/payment/cancel", "expires_at": 1774603166, "custom_text": {"submit": null, "after_submit": null, "shipping_address": null, "terms_of_service_acceptance": null}, "permissions": null, "submit_type": null, "success_url": "http://localhost:3000/payment/success?session_id={CHECKOUT_SESSION_ID}", "amount_total": 999, "payment_link": null, "setup_intent": null, "subscription": null, "automatic_tax": {"status": null, "enabled": false, "provider": null, "liability": null}, "client_secret": null, "custom_fields": [], "shipping_cost": null, "total_details": {"amount_tax": 0, "amount_discount": 0, "amount_shipping": 0}, "customer_email": null, "origin_context": null, "payment_intent": "pi_3TFA5mRtoEr0V6xC1uCay0Fc", "payment_status": "paid", "recovered_from": null, "wallet_options": null, "amount_subtotal": 999, "adaptive_pricing": {"enabled": true}, "after_expiration": null, "customer_account": null, "customer_details": {"name": "fulgrim", "email": "riyen16-657@s.diu.edu.bd", "phone": null, "address": {"city": null, "line1": null, "line2": null, "state": null, "country": "BD", "postal_code": null}, "tax_ids": [], "tax_exempt": "none", "business_name": null, "individual_name": null}, "invoice_creation": {"enabled": false, "invoice_data": {"footer": null, "issuer": null, "metadata": {}, "description": null, "custom_fields": null, "account_tax_ids": null, "rendering_options": null}}, "shipping_options": [], "branding_settings": {"icon": null, "logo": null, "font_family": "default", "border_style": "rounded", "button_color": "#0074d4", "display_name": "Kabir sandbox", "background_color": "#ffffff"}, "customer_creation": "if_required", "consent_collection": null, "client_reference_id": null, "currency_conversion": null, "payment_method_types": ["card"], "allow_promotion_codes": null, "collected_information": null, "integration_identifier": null, "payment_method_options": {"card": {"request_three_d_secure": "automatic"}}, "phone_number_collection": {"enabled": false}, "payment_method_collection": "if_required", "billing_address_collection": null, "shipping_address_collection": null, "saved_payment_method_options": null, "payment_method_configuration_details": null}	2026-03-26 09:19:26.015	2026-03-26 09:20:47.84	jdTe8ynOdeF5kgfhXSgUCFmBCkS04UmR	4afa280b-abbc-4470-be1a-cb1eab2e7d95
2c1a8946-1588-4f4c-a9bd-b3c98f3d020a	29.99	pi_3TFBGuRtoEr0V6xC1U8nqjVn	evt_1TFBGvRtoEr0V6xCLdhfFz8H	PAID	https://res.cloudinary.com/dpahuuu4c/image/upload/v1774521380/cinemania/media/92f2y8-1774521378367-invoice-2c1a8946-1588-4f4c-a9bd-b3c98f3d020a..pdf	{"id": "cs_test_a1ktB2IEMYUrvustSiOMORX8nr87XG2j6U6blii8D2lgzKxvAG3TvPRERR", "url": null, "mode": "payment", "locale": null, "object": "checkout.session", "status": "complete", "consent": null, "created": 1774521358, "invoice": null, "ui_mode": "hosted", "currency": "usd", "customer": null, "livemode": false, "metadata": {"userId": "YvAyddVIeE21PyIppWx9rV7jTIxWQNws", "paymentId": "2c1a8946-1588-4f4c-a9bd-b3c98f3d020a", "subscriptionType": "PREMIUM"}, "discounts": [], "cancel_url": "http://localhost:3000/payment/cancel", "expires_at": 1774607758, "custom_text": {"submit": null, "after_submit": null, "shipping_address": null, "terms_of_service_acceptance": null}, "permissions": null, "submit_type": null, "success_url": "http://localhost:3000/payment/success?session_id={CHECKOUT_SESSION_ID}", "amount_total": 2999, "payment_link": null, "setup_intent": null, "subscription": null, "automatic_tax": {"status": null, "enabled": false, "provider": null, "liability": null}, "client_secret": null, "custom_fields": [], "shipping_cost": null, "total_details": {"amount_tax": 0, "amount_discount": 0, "amount_shipping": 0}, "customer_email": null, "origin_context": null, "payment_intent": "pi_3TFBGuRtoEr0V6xC1U8nqjVn", "payment_status": "paid", "recovered_from": null, "wallet_options": null, "amount_subtotal": 2999, "adaptive_pricing": {"enabled": true}, "after_expiration": null, "customer_account": null, "customer_details": {"name": "fulgrim", "email": "riyen16-657@s.diu.edu.bd", "phone": null, "address": {"city": null, "line1": null, "line2": null, "state": null, "country": "BD", "postal_code": null}, "tax_ids": [], "tax_exempt": "none", "business_name": null, "individual_name": null}, "invoice_creation": {"enabled": false, "invoice_data": {"footer": null, "issuer": null, "metadata": {}, "description": null, "custom_fields": null, "account_tax_ids": null, "rendering_options": null}}, "shipping_options": [], "branding_settings": {"icon": null, "logo": null, "font_family": "default", "border_style": "rounded", "button_color": "#0074d4", "display_name": "Kabir sandbox", "background_color": "#ffffff"}, "customer_creation": "if_required", "consent_collection": null, "client_reference_id": null, "currency_conversion": null, "presentment_details": {"presentment_amount": 382837, "presentment_currency": "bdt"}, "payment_method_types": ["card"], "allow_promotion_codes": null, "collected_information": null, "integration_identifier": null, "payment_method_options": {"card": {"request_three_d_secure": "automatic"}}, "phone_number_collection": {"enabled": false}, "payment_method_collection": "if_required", "billing_address_collection": null, "shipping_address_collection": null, "saved_payment_method_options": null, "payment_method_configuration_details": null}	2026-03-26 10:35:58.51	2026-03-26 10:36:21.272	YvAyddVIeE21PyIppWx9rV7jTIxWQNws	32114c99-72bb-4b99-94c1-88894536957b
cff04f77-a486-46c9-8557-c8ce2d4f515a	29.99	pi_3TFBMTRtoEr0V6xC0Q69SmFp	evt_1TFBMURtoEr0V6xCo5MmTxVf	PAID	https://res.cloudinary.com/dpahuuu4c/image/upload/v1774521726/cinemania/media/eoq7a6-1774521723454-invoice-cff04f77-a486-46c9-8557-c8ce2d4f515a..pdf	{"id": "cs_test_a1TWHvbYON94jDmJxlxjch7DL3Awp0MowEG3cNmUVOOxGcHaj8VvQ2qS06", "url": null, "mode": "payment", "locale": null, "object": "checkout.session", "status": "complete", "consent": null, "created": 1774521666, "invoice": null, "ui_mode": "hosted", "currency": "usd", "customer": null, "livemode": false, "metadata": {"userId": "T9AXsDbJTf8PkYlP1qpXKFMieAlUXsoS", "paymentId": "cff04f77-a486-46c9-8557-c8ce2d4f515a", "subscriptionType": "PREMIUM"}, "discounts": [], "cancel_url": "http://localhost:3000/payment/cancel", "expires_at": 1774608066, "custom_text": {"submit": null, "after_submit": null, "shipping_address": null, "terms_of_service_acceptance": null}, "permissions": null, "submit_type": null, "success_url": "http://localhost:3000/payment/success?session_id={CHECKOUT_SESSION_ID}", "amount_total": 2999, "payment_link": null, "setup_intent": null, "subscription": null, "automatic_tax": {"status": null, "enabled": false, "provider": null, "liability": null}, "client_secret": null, "custom_fields": [], "shipping_cost": null, "total_details": {"amount_tax": 0, "amount_discount": 0, "amount_shipping": 0}, "customer_email": null, "origin_context": null, "payment_intent": "pi_3TFBMTRtoEr0V6xC0Q69SmFp", "payment_status": "paid", "recovered_from": null, "wallet_options": null, "amount_subtotal": 2999, "adaptive_pricing": {"enabled": true}, "after_expiration": null, "customer_account": null, "customer_details": {"name": "sinister", "email": "ryderdraconic@gmail.com", "phone": null, "address": {"city": null, "line1": null, "line2": null, "state": null, "country": "BD", "postal_code": null}, "tax_ids": [], "tax_exempt": "none", "business_name": null, "individual_name": null}, "invoice_creation": {"enabled": false, "invoice_data": {"footer": null, "issuer": null, "metadata": {}, "description": null, "custom_fields": null, "account_tax_ids": null, "rendering_options": null}}, "shipping_options": [], "branding_settings": {"icon": null, "logo": null, "font_family": "default", "border_style": "rounded", "button_color": "#0074d4", "display_name": "Kabir sandbox", "background_color": "#ffffff"}, "customer_creation": "if_required", "consent_collection": null, "client_reference_id": null, "currency_conversion": null, "presentment_details": {"presentment_amount": 382837, "presentment_currency": "bdt"}, "payment_method_types": ["card"], "allow_promotion_codes": null, "collected_information": null, "integration_identifier": null, "payment_method_options": {"card": {"request_three_d_secure": "automatic"}}, "phone_number_collection": {"enabled": false}, "payment_method_collection": "if_required", "billing_address_collection": null, "shipping_address_collection": null, "saved_payment_method_options": null, "payment_method_configuration_details": null}	2026-03-26 10:41:06.202	2026-03-26 10:42:07.183	T9AXsDbJTf8PkYlP1qpXKFMieAlUXsoS	2cc30fb6-e6b7-4834-aa77-db24da342c1d
abe967ca-5107-4376-92a4-813812f96301	29.99	pi_3TFBdTRtoEr0V6xC1lYggXVU	evt_1TFBdURtoEr0V6xCRWp6mfrG	PAID	https://res.cloudinary.com/dpahuuu4c/image/upload/v1774522779/cinemania/invoices/edxlr2-1774522777446-invoice-abe967ca-5107-4376-92a4-813812f96301.pdf.pdf	{"id": "cs_test_a1xXxLuA4eBRSflq6hDrCOsNXp74gSDYF8vVppCUEGVcvrUCiVqLwxUNYH", "url": null, "mode": "payment", "locale": null, "object": "checkout.session", "status": "complete", "consent": null, "created": 1774522721, "invoice": null, "ui_mode": "hosted", "currency": "usd", "customer": null, "livemode": false, "metadata": {"userId": "sjq1aFqo5WTr4Mp0Quqdm80gNPaiJne8", "paymentId": "abe967ca-5107-4376-92a4-813812f96301", "subscriptionType": "PREMIUM"}, "discounts": [], "cancel_url": "http://localhost:3000/payment/cancel", "expires_at": 1774609121, "custom_text": {"submit": null, "after_submit": null, "shipping_address": null, "terms_of_service_acceptance": null}, "permissions": null, "submit_type": null, "success_url": "http://localhost:3000/payment/success?session_id={CHECKOUT_SESSION_ID}", "amount_total": 2999, "payment_link": null, "setup_intent": null, "subscription": null, "automatic_tax": {"status": null, "enabled": false, "provider": null, "liability": null}, "client_secret": null, "custom_fields": [], "shipping_cost": null, "total_details": {"amount_tax": 0, "amount_discount": 0, "amount_shipping": 0}, "customer_email": null, "origin_context": null, "payment_intent": "pi_3TFBdTRtoEr0V6xC1lYggXVU", "payment_status": "paid", "recovered_from": null, "wallet_options": null, "amount_subtotal": 2999, "adaptive_pricing": {"enabled": true}, "after_expiration": null, "customer_account": null, "customer_details": {"name": "hash", "email": "hashmonster767@gmail.com", "phone": null, "address": {"city": null, "line1": null, "line2": null, "state": null, "country": "BD", "postal_code": null}, "tax_ids": [], "tax_exempt": "none", "business_name": null, "individual_name": null}, "invoice_creation": {"enabled": false, "invoice_data": {"footer": null, "issuer": null, "metadata": {}, "description": null, "custom_fields": null, "account_tax_ids": null, "rendering_options": null}}, "shipping_options": [], "branding_settings": {"icon": null, "logo": null, "font_family": "default", "border_style": "rounded", "button_color": "#0074d4", "display_name": "Kabir sandbox", "background_color": "#ffffff"}, "customer_creation": "if_required", "consent_collection": null, "client_reference_id": null, "currency_conversion": null, "presentment_details": {"presentment_amount": 382837, "presentment_currency": "bdt"}, "payment_method_types": ["card"], "allow_promotion_codes": null, "collected_information": null, "integration_identifier": null, "payment_method_options": {"card": {"request_three_d_secure": "automatic"}}, "phone_number_collection": {"enabled": false}, "payment_method_collection": "if_required", "billing_address_collection": null, "shipping_address_collection": null, "saved_payment_method_options": null, "payment_method_configuration_details": null}	2026-03-26 10:58:41.251	2026-03-26 10:59:40.173	sjq1aFqo5WTr4Mp0Quqdm80gNPaiJne8	297223f3-8b14-4ccb-b9c5-0f523669647e
61e5970f-db20-4d1b-901f-f1ceb9a7c64e	29.99	pi_3TFBulRtoEr0V6xC0cRhU02x	evt_1TFBunRtoEr0V6xCVB5jlhOw	PAID	https://res.cloudinary.com/dpahuuu4c/image/upload/v1774523851/cinemania/invoices/iruw50-1774523849565-invoice-61e5970f-db20-4d1b-901f-f1ceb9a7c64e.pdf	{"id": "cs_test_a14t0gElipXAMuH3XUwYCOnQ2ib6Ti020S1svRQ0Pdm9xLrGcqcPbG0P9S", "url": null, "mode": "payment", "locale": null, "object": "checkout.session", "status": "complete", "consent": null, "created": 1774523798, "invoice": null, "ui_mode": "hosted", "currency": "usd", "customer": null, "livemode": false, "metadata": {"userId": "pLcU673SVxY3sYc3iDXu2zbFuNel1pXe", "paymentId": "61e5970f-db20-4d1b-901f-f1ceb9a7c64e", "subscriptionType": "PREMIUM"}, "discounts": [], "cancel_url": "http://localhost:3000/payment/cancel", "expires_at": 1774610197, "custom_text": {"submit": null, "after_submit": null, "shipping_address": null, "terms_of_service_acceptance": null}, "permissions": null, "submit_type": null, "success_url": "http://localhost:3000/payment/success?session_id={CHECKOUT_SESSION_ID}", "amount_total": 2999, "payment_link": null, "setup_intent": null, "subscription": null, "automatic_tax": {"status": null, "enabled": false, "provider": null, "liability": null}, "client_secret": null, "custom_fields": [], "shipping_cost": null, "total_details": {"amount_tax": 0, "amount_discount": 0, "amount_shipping": 0}, "customer_email": null, "origin_context": null, "payment_intent": "pi_3TFBulRtoEr0V6xC0cRhU02x", "payment_status": "paid", "recovered_from": null, "wallet_options": null, "amount_subtotal": 2999, "adaptive_pricing": {"enabled": true}, "after_expiration": null, "customer_account": null, "customer_details": {"name": "mash", "email": "mashrurkabir9510@gmail.com", "phone": null, "address": {"city": null, "line1": null, "line2": null, "state": null, "country": "BD", "postal_code": null}, "tax_ids": [], "tax_exempt": "none", "business_name": null, "individual_name": null}, "invoice_creation": {"enabled": false, "invoice_data": {"footer": null, "issuer": null, "metadata": {}, "description": null, "custom_fields": null, "account_tax_ids": null, "rendering_options": null}}, "shipping_options": [], "branding_settings": {"icon": null, "logo": null, "font_family": "default", "border_style": "rounded", "button_color": "#0074d4", "display_name": "Kabir sandbox", "background_color": "#ffffff"}, "customer_creation": "if_required", "consent_collection": null, "client_reference_id": null, "currency_conversion": null, "presentment_details": {"presentment_amount": 382837, "presentment_currency": "bdt"}, "payment_method_types": ["card"], "allow_promotion_codes": null, "collected_information": null, "integration_identifier": null, "payment_method_options": {"card": {"request_three_d_secure": "automatic"}}, "phone_number_collection": {"enabled": false}, "payment_method_collection": "if_required", "billing_address_collection": null, "shipping_address_collection": null, "saved_payment_method_options": null, "payment_method_configuration_details": null}	2026-03-26 11:16:37.626	2026-03-26 11:17:32.389	pLcU673SVxY3sYc3iDXu2zbFuNel1pXe	53379e44-4500-496f-84e1-97d0f9820dbb
eeb6da20-0716-40a9-a991-dda0d0e333b7	29.99	tmp_1776498358182	\N	PENDING	\N	\N	2026-04-18 07:45:58.186	2026-04-18 07:45:58.186	jdTe8ynOdeF5kgfhXSgUCFmBCkS04UmR	\N
e2f22a5d-ba70-4eec-af07-e270f56ea803	19.99	tmp_1776501572333	\N	PENDING	\N	\N	2026-04-18 08:39:32.334	2026-04-18 08:39:32.334	jdTe8ynOdeF5kgfhXSgUCFmBCkS04UmR	\N
47dc668d-80f3-40c1-a4b3-97ce06bf8548	19.99	pi_3TPlviRtoEr0V6xC1MRix6Jb	evt_1TPlvjRtoEr0V6xCiQ1n1LDF	PAID	https://res.cloudinary.com/dpahuuu4c/image/upload/v1777045574/cinemania/invoices/r6oal0-1777045572245-invoice-47dc668d-80f3-40c1-a4b3-97ce06bf8548.pdf	{"id": "cs_test_a1FizJdooHPVQxFOdcTKhwZmUpreMFNJrKcPuyhsNDISmbElIRwOnzBi8E", "url": null, "mode": "payment", "locale": null, "object": "checkout.session", "status": "complete", "consent": null, "created": 1777045540, "invoice": null, "ui_mode": "hosted", "currency": "usd", "customer": null, "livemode": false, "metadata": {"userId": "jdTe8ynOdeF5kgfhXSgUCFmBCkS04UmR", "paymentId": "47dc668d-80f3-40c1-a4b3-97ce06bf8548", "subscriptionType": "PRO"}, "discounts": [], "cancel_url": "http://localhost:3000/payment/cancel", "expires_at": 1777131940, "custom_text": {"submit": null, "after_submit": null, "shipping_address": null, "terms_of_service_acceptance": null}, "permissions": null, "submit_type": null, "success_url": "http://localhost:3000/payment/success?session_id={CHECKOUT_SESSION_ID}", "amount_total": 1999, "payment_link": null, "setup_intent": null, "subscription": null, "automatic_tax": {"status": null, "enabled": false, "provider": null, "liability": null}, "client_secret": null, "custom_fields": [], "shipping_cost": null, "total_details": {"amount_tax": 0, "amount_discount": 0, "amount_shipping": 0}, "customer_email": null, "origin_context": null, "payment_intent": "pi_3TPlviRtoEr0V6xC1MRix6Jb", "payment_status": "paid", "recovered_from": null, "wallet_options": null, "amount_subtotal": 1999, "adaptive_pricing": {"enabled": true}, "after_expiration": null, "customer_account": null, "customer_details": {"name": "mash", "email": "mashrurkabirriyan@gmail.com", "phone": null, "address": {"city": null, "line1": null, "line2": null, "state": null, "country": "BD", "postal_code": null}, "tax_ids": [], "tax_exempt": "none", "business_name": null, "individual_name": null}, "invoice_creation": {"enabled": false, "invoice_data": {"footer": null, "issuer": null, "metadata": {}, "description": null, "custom_fields": null, "account_tax_ids": null, "rendering_options": null}}, "managed_payments": {"enabled": false}, "shipping_options": [], "branding_settings": {"icon": null, "logo": null, "font_family": "default", "border_style": "rounded", "button_color": "#0074d4", "display_name": "Kabir sandbox", "background_color": "#ffffff"}, "customer_creation": "if_required", "consent_collection": null, "client_reference_id": null, "currency_conversion": null, "presentment_details": {"presentment_amount": 255061, "presentment_currency": "bdt"}, "payment_method_types": ["card"], "allow_promotion_codes": null, "collected_information": null, "integration_identifier": null, "payment_method_options": {"card": {"request_three_d_secure": "automatic"}}, "phone_number_collection": {"enabled": false}, "payment_method_collection": "if_required", "billing_address_collection": null, "shipping_address_collection": null, "saved_payment_method_options": null, "payment_method_configuration_details": null}	2026-04-24 15:45:40.389	2026-04-24 15:46:15.311	jdTe8ynOdeF5kgfhXSgUCFmBCkS04UmR	4afa280b-abbc-4470-be1a-cb1eab2e7d95
6e8a4fca-f986-46a8-b249-444b8abc6a9c	29.99	tmp_1777097729430	\N	PENDING	\N	\N	2026-04-25 06:15:29.432	2026-04-25 06:15:29.432	jdTe8ynOdeF5kgfhXSgUCFmBCkS04UmR	\N
\.


--
-- Data for Name: session; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.session (id, "expiresAt", token, "createdAt", "updatedAt", "ipAddress", "userAgent", "userId") FROM stdin;
w6FZoJaj9US3UN4S1q4vjPe2uXaDx2Q8	2026-05-23 14:56:30.422	a7qqVl5CmEacU2z2ipjIYHZPvfOTHGgS	2026-04-23 14:56:30.423	2026-04-23 14:56:30.423			jdTe8ynOdeF5kgfhXSgUCFmBCkS04UmR
jOWi2GWdJ02kTtHjjjett9eDOG1lpRvU	2026-04-22 08:10:43.206	79VYiNo9HmoZbaw7pFVsgvafMfBkOR9B	2026-03-23 08:10:43.207	2026-03-23 08:10:43.207			JARRyO3IDRwP3lxMQUEAlTVw1sUameeK
fgQUJusgsS136ZXFaNggomgF6p96HCzj	2026-05-24 16:02:00.637	CTtEAGhhUHyidH4xLgbuAOhOZV1A3T53	2026-04-24 16:02:00.637	2026-04-24 16:02:00.637			jdTe8ynOdeF5kgfhXSgUCFmBCkS04UmR
kg06CwEVfPVZdQCRbmCwZofKynrzOUHE	2026-05-26 04:42:03.112	n5QMCpD6SlqwHoJUc1HnjWDFCEod4kUu	2026-04-26 04:42:03.112	2026-04-26 04:42:03.112			jdTe8ynOdeF5kgfhXSgUCFmBCkS04UmR
AeslArS9OuY8JzGhsCQ776FLiezE5LcZ	2026-04-23 06:12:42.989	jJsOLBschX1FOgJuDKATcgbEQdVYWC0D	2026-03-24 06:12:42.989	2026-03-24 06:12:42.989			JARRyO3IDRwP3lxMQUEAlTVw1sUameeK
sDgxH6pipf3zSs64ejFyfX2eI2TgUT0z	2026-04-23 06:18:50.886	7UgCJ6LlVkw18nmNjXllUUpUDPYdkJLM	2026-03-24 06:18:50.886	2026-03-24 06:18:50.886			JARRyO3IDRwP3lxMQUEAlTVw1sUameeK
QlXmPdDdYFkhxWM1XXWypzlSF3yW612U	2026-05-26 15:03:59.485	K0RL0MyTzpXskGcEjPO9P3CEXsjFLdON	2026-04-26 15:03:59.485	2026-04-26 15:03:59.485			jdTe8ynOdeF5kgfhXSgUCFmBCkS04UmR
VI7D3X4CE8C9vltgmmMcS5Lq1XbgwKk2	2026-04-23 06:44:06.198	uK8tI0PcYLQ0e0dTt5Uvb2PLmznqwFCC	2026-03-24 06:44:06.198	2026-03-24 06:44:06.198			JARRyO3IDRwP3lxMQUEAlTVw1sUameeK
RN9KIQrctroEhhPPoIOTPDVRGecimy6O	2026-04-23 06:48:44.489	WiMBXKY2yDK7fhl9LOxcgHMQQXaiG2sT	2026-03-24 06:48:44.489	2026-03-24 06:48:44.489			YvAyddVIeE21PyIppWx9rV7jTIxWQNws
Tadlg07bMFTTx67OuxgP7cwFiKHT8hR4	2026-05-26 18:57:52.267	LcH0QtUDeRi9kyy58UEgIoXijGt67rgi	2026-04-26 18:57:52.267	2026-04-26 18:57:52.267			JARRyO3IDRwP3lxMQUEAlTVw1sUameeK
K2g3u0ydFgr7lASZy3nOm7XvrkruS3Xa	2026-04-23 07:10:01.179	TWsA1Xfu1gE09KGuiznEKSdHwLqM2CXW	2026-03-24 07:10:01.18	2026-03-24 07:10:01.18			JARRyO3IDRwP3lxMQUEAlTVw1sUameeK
F70PlLeJK5OMv8CNMm17k81bGFXF04e0	2026-04-23 07:13:01.765	sZFMibamKcJjqXALdc3MlqwlCTXQ5VF5	2026-03-24 07:13:01.765	2026-03-24 07:13:01.765			JARRyO3IDRwP3lxMQUEAlTVw1sUameeK
SJ6qCVraFzkCbhdbKCYp49p0Pnqo33Qn	2026-04-23 07:46:05.864	80Upj5jgeKqAwaQAKNCRKMHdwrkVYPut	2026-03-24 07:46:05.865	2026-03-24 07:46:05.865			YvAyddVIeE21PyIppWx9rV7jTIxWQNws
JxbKMZ8LgRxqhW8Zs2ZgTm9Yj5rNr5Xf	2026-04-23 16:05:15.806	FnY5ekNf9Y8ffAhGmFOcnAskFuMYk6xD	2026-03-24 16:05:15.806	2026-03-24 16:05:15.806			YvAyddVIeE21PyIppWx9rV7jTIxWQNws
bktRw6o37qbsd940pS14Q9AnOZAL3PzL	2026-04-24 11:18:54.223	Nes3fO8prAkE706XvQDL7Scx15rqmGKh	2026-03-25 11:18:54.223	2026-03-25 11:18:54.223			JARRyO3IDRwP3lxMQUEAlTVw1sUameeK
IVW8uMXZluOwzF13ywRRUsLau37ZyWNH	2026-04-24 11:30:29.937	HGdGIefEhhUk6IrnTCTmYcghTa18FLh4	2026-03-25 11:30:29.938	2026-03-25 11:30:29.938			JARRyO3IDRwP3lxMQUEAlTVw1sUameeK
Acfn9G0vAKn2AI8RkRKGePoV3DKCnjf9	2026-04-24 11:31:54.068	yoniorADwA2FMYx2eW4C30jJbrpxX0Zx	2026-03-25 11:31:54.068	2026-03-25 11:31:54.068			JARRyO3IDRwP3lxMQUEAlTVw1sUameeK
yMBQAsZ48830sGtgCHzsIdJHwRLi4Qkl	2026-04-24 11:34:27.762	Iw3b7BNVHuiRmOqL87CoucPglJeeNDzk	2026-03-25 11:34:27.762	2026-03-25 11:34:27.762			JARRyO3IDRwP3lxMQUEAlTVw1sUameeK
7u9UJ2o8VnVGbu1Qn2XizpNb9ug9LreT	2026-04-24 11:52:52.364	xCLg3pxz3pAnu4mtf1jePOxLygcrPcqW	2026-03-25 11:52:52.364	2026-03-25 11:52:52.364			YvAyddVIeE21PyIppWx9rV7jTIxWQNws
iBzTK7H7d078kKZ7zbKIxcOfujzFr8xK	2026-04-24 11:58:17.097	a3fx8rTa6xoi5m9CUNjalT0z3pqZb0BE	2026-03-25 11:58:17.097	2026-03-25 11:58:17.097			JARRyO3IDRwP3lxMQUEAlTVw1sUameeK
r5QAxefPgXtSjpMrVPRiaQEvGlUhe7Jw	2026-04-24 11:59:07.166	PuGqbx5lavBmh49OZrwuydp134flWOHI	2026-03-25 11:59:07.167	2026-03-25 11:59:07.167			YvAyddVIeE21PyIppWx9rV7jTIxWQNws
ZQF4Re8hi0ArPy3WrTAfxx5R1zgvQxi6	2026-04-24 12:11:20.788	Vc0F6nTNCvepBMI9UUPul5Q6IVzMJngu	2026-03-25 12:11:20.789	2026-03-25 12:11:20.789			YvAyddVIeE21PyIppWx9rV7jTIxWQNws
07YGWhxVV5dM9xuFXDb9fQwhUJ7JmTwZ	2026-04-25 10:35:44.904	HLqwkF4LEzbkkpGXicfyof88V75KOBfj	2026-03-26 10:35:44.905	2026-03-26 10:35:44.905			YvAyddVIeE21PyIppWx9rV7jTIxWQNws
DrdPBW30aKRAtEtyz7VhAVytMzhnhL8G	2026-04-25 10:41:01.614	c0H2iH78grTCCGg6WA2gINN0JOqawZbd	2026-03-26 10:41:01.614	2026-03-26 10:41:01.614			T9AXsDbJTf8PkYlP1qpXKFMieAlUXsoS
MnTk90uSbNrfFeK9HUKEuCknJPx0mD3X	2026-04-25 10:58:21.315	erTkpG1wYivLsblGbQqy12VFU6psrZO1	2026-03-26 10:58:21.315	2026-03-26 10:58:21.315			sjq1aFqo5WTr4Mp0Quqdm80gNPaiJne8
FDYxB8v7c6xcmucJzhFfcrWqpv6yVNEM	2026-04-25 10:58:36.42	Ib4xXdKjODGYLKDFWcjN7jumMQE4DAW0	2026-03-26 10:58:36.421	2026-03-26 10:58:36.421			sjq1aFqo5WTr4Mp0Quqdm80gNPaiJne8
5H2U1EViZ6eBKPUGRTPxlEDIORizuJZc	2026-04-25 11:16:25.62	ztzW0aUvDJwjd8kTjtsNTOhjYQsviRrF	2026-03-26 11:16:25.62	2026-03-26 11:16:25.62			pLcU673SVxY3sYc3iDXu2zbFuNel1pXe
XST0xizz5TEaOOZqHzCFSjqfIQxy6O1V	2026-04-25 11:16:31.347	HuTqd1PRZdBOH88s1uXKtdYvioQRURXs	2026-03-26 11:16:31.348	2026-03-26 11:16:31.348			pLcU673SVxY3sYc3iDXu2zbFuNel1pXe
zzyVbuL5yhnXaX5rtIZCebZ8zcnOrFUH	2026-04-25 15:43:04.149	brMfhaSutzUEbJE2MnPTKGTSQsFZDUZO	2026-03-26 15:43:04.149	2026-03-26 15:43:04.149			JARRyO3IDRwP3lxMQUEAlTVw1sUameeK
TF6uorfsebAj2UA4L0J1GeRfJFGrPeZs	2026-04-25 16:15:19.959	znMxikgSUffkrFWlZowXe7JnxjXzBqLM	2026-03-26 16:15:19.959	2026-03-26 16:15:19.959			YvAyddVIeE21PyIppWx9rV7jTIxWQNws
UCQJRRgonY5h5SIaJaRNK0ZFYgjVe9hc	2026-04-25 16:20:35.985	YifovZn8N1Bicr9E9itxbFvQxfff0JnZ	2026-03-26 16:20:35.985	2026-03-26 16:20:35.985			LOgIAJ3Yb6QnXDadriQLjyTv2WpZvq9d
jH1c2t6heoqVYL1xYIKarIZH89tk4GNt	2026-04-26 11:56:03.336	NMeRKhsjOVD9Ma06vZW8ToUWCsvRrao0	2026-03-27 11:56:03.337	2026-03-27 11:56:03.337			JARRyO3IDRwP3lxMQUEAlTVw1sUameeK
fvN4p69oJL3OtbIHeISRp79vbNKJis3M	2026-05-23 19:09:35.348	GmdoN3QxjqTDh7jjMYaYoYe5Te99yMks	2026-04-23 19:09:35.348	2026-04-23 19:09:35.348			jdTe8ynOdeF5kgfhXSgUCFmBCkS04UmR
iHJc1SUHA1wBQPNg2GfMlBw49MxTkA2H	2026-05-26 04:42:47.195	t1DgzSd1BTa7jLzYV6VKJDOLvn0ZoNgg	2026-04-26 04:42:47.195	2026-04-26 04:42:47.195			JARRyO3IDRwP3lxMQUEAlTVw1sUameeK
OtxFHvdtrxDLVt0i2p6tgcz3ft1lJKo2	2026-05-07 09:37:25.87	I6py8d6V5xHxAohawyOVgZXzCoKGAbuG	2026-04-07 09:37:25.871	2026-04-07 09:37:25.871			JARRyO3IDRwP3lxMQUEAlTVw1sUameeK
G7sQSaLCykd8Cqp5Jo3M70iMGmALP63e	2026-05-07 09:50:34.047	iDi2L34g61BYIYG84za0vKpRiGjDLZxw	2026-04-07 09:50:34.047	2026-04-07 09:50:34.047			JARRyO3IDRwP3lxMQUEAlTVw1sUameeK
pxG9iBN1aYfX8pDRv9v5NqaZqXzfJZ5l	2026-05-07 09:51:44.515	Wwu6ZO0rnYWy5uhu7Daym4xmuwa8hHoZ	2026-04-07 09:51:44.515	2026-04-07 09:51:44.515			JARRyO3IDRwP3lxMQUEAlTVw1sUameeK
W1bB2zusGl9nN6L10VNGFQLS0hHFowOP	2026-05-07 16:15:25.685	JT52VDyXXU85aQVBOpdd958F9G17482k	2026-04-07 16:15:25.686	2026-04-07 16:15:25.686			JARRyO3IDRwP3lxMQUEAlTVw1sUameeK
WKBF7e1vHHRo8QXn94sm7jJEwNWXjJyX	2026-05-11 06:13:25.646	8itV01PDHH3SSWYHNGCmwryZOyLtJAm2	2026-04-11 06:13:25.647	2026-04-11 06:13:25.647			LOgIAJ3Yb6QnXDadriQLjyTv2WpZvq9d
dokkZe9mM92OjEtcfCQTWccerMlE0sX9	2026-05-13 10:33:40.434	e391lqy8pMehpQgHivTr5qm6Whnmp9ez	2026-04-13 10:33:40.434	2026-04-13 10:33:40.434			JARRyO3IDRwP3lxMQUEAlTVw1sUameeK
7j7FwR7UX9mNyJzVj1MUcBs0e21Jggel	2026-05-15 16:09:28.952	FOxmv3Urof1qnU79OzZEZSdNR9xfSbQ3	2026-04-15 16:09:28.952	2026-04-15 16:09:28.952			jdTe8ynOdeF5kgfhXSgUCFmBCkS04UmR
TeYuhso3S2OPj0Zu1H4eAE3MoHQenTri	2026-05-16 06:05:41.349	SuXjYlReiqFTsXEm22DbaQnqSqINRBex	2026-04-16 06:05:41.349	2026-04-16 06:05:41.349			jdTe8ynOdeF5kgfhXSgUCFmBCkS04UmR
VWqrQXKsn4GAPzQ6CQ6y6rMZJ2Ihq6yx	2026-05-16 08:36:26.62	bWkpi8sMVcuZdPFP0aZLSwptwrweS81D	2026-04-16 08:36:26.621	2026-04-16 08:36:26.621			pLcU673SVxY3sYc3iDXu2zbFuNel1pXe
ZqCb14d4Iq7EctU5qIvppOr0UiGa6xNP	2026-05-16 08:40:34.086	UZPx48yZMvCTIFXIWbkxDue2ZvAgoLUR	2026-04-16 08:40:34.086	2026-04-16 08:40:34.086			jdTe8ynOdeF5kgfhXSgUCFmBCkS04UmR
LFsKzWO1ZnK9ubRsuWjv9csKG9cLWBDv	2026-05-16 16:54:31.022	ACU7tjU9GFQPDV3YjauRYwadJWVBG0Mm	2026-04-16 16:54:31.022	2026-04-16 16:54:31.022			pLcU673SVxY3sYc3iDXu2zbFuNel1pXe
TdQJHuBeVoxxUgV8ic27MF511Udy9WOw	2026-05-16 16:54:42.934	XTIrbFoAolq6rlsyQ0hVBuDlRDRfOlce	2026-04-16 16:54:42.934	2026-04-16 16:54:42.934			jdTe8ynOdeF5kgfhXSgUCFmBCkS04UmR
RNrtlIpAwpCSYEzVnPfDJT2yZjnV5lrV	2026-05-17 09:01:17.238	p0kHI0AMWjPtLqxLGzKMTsZnQGRG0xEC	2026-04-17 09:01:17.238	2026-04-17 09:01:17.238			jdTe8ynOdeF5kgfhXSgUCFmBCkS04UmR
1qtM8vwBdOkR6U9EzijAQbRqfKxmJaQX	2026-05-17 10:06:35.498	F0Cjiltmz6YPSh7yAJnOjkQBzgg19a3E	2026-04-17 10:06:35.498	2026-04-17 10:06:35.498			pLcU673SVxY3sYc3iDXu2zbFuNel1pXe
XY4MOkvMsJWFlpw0CR18kr6gVpRKvNGj	2026-05-17 10:06:43.776	i1FooQuBwV2KNhPoRvrZKR7xDGC7ogp0	2026-04-17 10:06:43.776	2026-04-17 10:06:43.776			LOgIAJ3Yb6QnXDadriQLjyTv2WpZvq9d
brZJhKO8VfFgjC0ucj3n5J0vZsBw6HFN	2026-05-17 10:11:06.426	ZGee9SJVk7qzqRMSNDhYDODuP1yUBhbj	2026-04-17 10:11:06.426	2026-04-17 10:11:06.426			JARRyO3IDRwP3lxMQUEAlTVw1sUameeK
RMgF7WodTV1FISfrJlWsfqnTAujclJQ7	2026-05-17 10:11:23.281	vAVPlvhn00VEGTaIoL5wjTwCC9pDfznJ	2026-04-17 10:11:23.281	2026-04-17 10:11:23.281			jdTe8ynOdeF5kgfhXSgUCFmBCkS04UmR
qcAQ3BxypK6EyW7w5IhCm8xQbyse0gyL	2026-05-17 14:55:12.001	gcavpSbBdSd8CNm413AIByAK3FITUqUs	2026-04-17 14:55:12.001	2026-04-17 14:55:12.001			LOgIAJ3Yb6QnXDadriQLjyTv2WpZvq9d
VGtNpQxPDSEnoOZbJWyzLEusUantpmcd	2026-05-17 15:28:05.615	rfpzwdLJSvfbnTqpYfhPJJR80zQBg3be	2026-04-17 15:28:05.615	2026-04-17 15:28:05.615			jdTe8ynOdeF5kgfhXSgUCFmBCkS04UmR
e54NBJp3904Al9c07Uie56wXuCf5E9pP	2026-05-17 16:23:49.689	8l1TrosFefg5yiAwoUtQkam8ZN38vA4N	2026-04-17 16:23:49.689	2026-04-17 16:23:49.689			jdTe8ynOdeF5kgfhXSgUCFmBCkS04UmR
zkKThBPhRzVa6IG4E32isifpW8mpkY06	2026-05-18 05:18:26.601	YZrrSrPvpdqjOZznrTG3oRH5tZI6kYKO	2026-04-18 05:18:26.601	2026-04-18 05:18:26.601			jdTe8ynOdeF5kgfhXSgUCFmBCkS04UmR
ochoEVETmtSVPSi88jtYUVvGDVqzQUnX	2026-05-18 07:45:47.156	1012xEDTI34425R6GAhONDSm27tNrpck	2026-04-18 07:45:47.157	2026-04-18 07:45:47.157			jdTe8ynOdeF5kgfhXSgUCFmBCkS04UmR
6pvwL5eYlANqXwdPTrRcOgmtQ4c2wWPI	2026-05-18 08:40:36.501	OsiGztiGQ6wnSkn4U9bl786LFPYmsqkz	2026-04-18 08:40:36.501	2026-04-18 08:40:36.501			YvAyddVIeE21PyIppWx9rV7jTIxWQNws
kzZilLQ9lvOo7igkIIysZlM2pncujTbm	2026-05-18 08:41:12.69	NTnnbsI4O0psFMzmZJ5mFXc4UJHmZMD1	2026-04-18 08:41:12.69	2026-04-18 08:41:12.69			jdTe8ynOdeF5kgfhXSgUCFmBCkS04UmR
s9fprz9BYQfkJNwYRdVgdQthzqqB5ZLF	2026-05-18 16:15:26.17	edtX5k9ekjpOK8tGW76HpQSqw3brSrUf	2026-04-18 16:15:26.171	2026-04-18 16:15:26.171			jdTe8ynOdeF5kgfhXSgUCFmBCkS04UmR
WPKWFGGScxuuucnKgsdqVUm03j5wErxn	2026-05-19 14:55:35.322	ZjBonjOBLy48pPmkUJIyMZiqLLX9Bb6l	2026-04-19 14:55:35.323	2026-04-19 14:55:35.323			JARRyO3IDRwP3lxMQUEAlTVw1sUameeK
Ifgc5SZw4UBg9XeZ5910EtVd7JBcpQ33	2026-05-20 04:39:01.734	YhxTtqrHbB0XCAWz4ZW9UJ1wDPzTr5YB	2026-04-20 04:39:01.735	2026-04-20 04:39:01.735			jdTe8ynOdeF5kgfhXSgUCFmBCkS04UmR
LvwtW7gAwq5NxYlPAZ2oaLsL6Hs4WmWc	2026-05-20 04:55:19.416	yDfjotHwCOD2Foiu2uA2hzyYjRKEOxOR	2026-04-20 04:55:19.416	2026-04-20 04:55:19.416			JARRyO3IDRwP3lxMQUEAlTVw1sUameeK
pyTGRxWRR5djZ9muCyUzl9CekKfva9LS	2026-05-20 08:02:58.605	McA6UqJNUFaCYDbDVOnwxUKh6YvTJKyp	2026-04-20 08:02:58.605	2026-04-20 08:02:58.605			JARRyO3IDRwP3lxMQUEAlTVw1sUameeK
PbiaXXqCeLXx2qqyWNjABAmJyxYUHoHb	2026-05-21 08:56:06.421	gEArE2w8gi3iLdXjo3oWAHAnjCLL5KBJ	2026-04-21 08:56:06.421	2026-04-21 08:56:06.421			JARRyO3IDRwP3lxMQUEAlTVw1sUameeK
uY8JbccMa0KMDFfhwuuS5F0O2yMaLO62	2026-05-22 10:19:57.558	00LrWFBT3lcwG9zNvzz9shJe9sQUOKWm	2026-04-22 10:19:57.559	2026-04-22 10:19:57.559			jdTe8ynOdeF5kgfhXSgUCFmBCkS04UmR
EJX7GTc8sHs0jBG3elMEXykX7xD4tvUa	2026-05-22 10:20:50.824	kH8BCVHtYxAIWzhrrqpbaFHjX4Doh2mB	2026-04-22 10:20:50.824	2026-04-22 10:20:50.824			JARRyO3IDRwP3lxMQUEAlTVw1sUameeK
dyq9LYUT8qYtn81PlCkMjyZOYeztuKHS	2026-05-22 10:25:40.334	jHOLpTsPRT0c2weQJK0glmMXuX4lyg3e	2026-04-22 10:25:40.334	2026-04-22 10:25:40.334			jdTe8ynOdeF5kgfhXSgUCFmBCkS04UmR
WuoC1GSyfJ9317WbDG1ltf3MiG43y4js	2026-05-22 10:26:06.081	1BdmLruK8YdLDGib2u9gdrtYSVd7bk0a	2026-04-22 10:26:06.081	2026-04-22 10:26:06.081			JARRyO3IDRwP3lxMQUEAlTVw1sUameeK
\.


--
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."user" (id, name, email, "emailVerified", image, role, status, "needPasswordChange", "createdAt", "updatedAt", "isDeleted", "deletedAt") FROM stdin;
JARRyO3IDRwP3lxMQUEAlTVw1sUameeK	Admin	superadmincm@gmail.com	t	\N	ADMIN	ACTIVE	f	2026-03-23 07:54:57.213	2026-03-23 07:55:00.554	f	\N
YvAyddVIeE21PyIppWx9rV7jTIxWQNws	horus lupercal	horus@gmail.com	t	\N	USER	ACTIVE	f	2026-03-24 06:47:53.327	2026-03-24 06:47:53.327	f	\N
sjq1aFqo5WTr4Mp0Quqdm80gNPaiJne8	hash brownie	hashmonster767@gmail.com	t	\N	USER	ACTIVE	f	2026-03-26 10:57:53.725	2026-03-26 10:58:21.306	f	\N
pLcU673SVxY3sYc3iDXu2zbFuNel1pXe	mash kabir	mashrurkabir9510@gmail.com	t	\N	USER	ACTIVE	f	2026-03-26 11:15:57.23	2026-03-26 11:16:25.611	f	\N
LOgIAJ3Yb6QnXDadriQLjyTv2WpZvq9d	harry potter	potter1212@gmail.com	t	\N	USER	ACTIVE	f	2026-03-26 16:20:00.821	2026-03-26 16:20:00.821	f	\N
jdTe8ynOdeF5kgfhXSgUCFmBCkS04UmR	riyen user	riyen16-657@s.diu.edu.bd	t	https://images.unsplash.com/photo-1695927621677-ec96e048dce2?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D	USER	ACTIVE	f	2026-03-24 05:59:00.035	2026-03-24 06:11:35.399	f	\N
T9AXsDbJTf8PkYlP1qpXKFMieAlUXsoS	gren sinister	ryderdraconic@gmail.com	t	\N	ADMIN	ACTIVE	f	2026-03-26 10:40:20.548	2026-04-21 15:20:03.711	f	\N
\.


--
-- Data for Name: verification; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.verification (id, identifier, value, "expiresAt", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Name: ActivityLog ActivityLog_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."ActivityLog"
    ADD CONSTRAINT "ActivityLog_pkey" PRIMARY KEY (id);


--
-- Name: Badge Badge_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Badge"
    ADD CONSTRAINT "Badge_pkey" PRIMARY KEY (id);


--
-- Name: Comment Comment_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Comment"
    ADD CONSTRAINT "Comment_pkey" PRIMARY KEY (id);


--
-- Name: Follow Follow_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Follow"
    ADD CONSTRAINT "Follow_pkey" PRIMARY KEY (id);


--
-- Name: Genre Genre_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Genre"
    ADD CONSTRAINT "Genre_pkey" PRIMARY KEY (id);


--
-- Name: Like Like_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Like"
    ADD CONSTRAINT "Like_pkey" PRIMARY KEY (id);


--
-- Name: MediaGenre MediaGenre_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."MediaGenre"
    ADD CONSTRAINT "MediaGenre_pkey" PRIMARY KEY (id);


--
-- Name: Media Media_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Media"
    ADD CONSTRAINT "Media_pkey" PRIMARY KEY (id);


--
-- Name: Notification Notification_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Notification"
    ADD CONSTRAINT "Notification_pkey" PRIMARY KEY (id);


--
-- Name: ReviewReport ReviewReport_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."ReviewReport"
    ADD CONSTRAINT "ReviewReport_pkey" PRIMARY KEY (id);


--
-- Name: Review Review_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Review"
    ADD CONSTRAINT "Review_pkey" PRIMARY KEY (id);


--
-- Name: Subscription Subscription_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Subscription"
    ADD CONSTRAINT "Subscription_pkey" PRIMARY KEY (id);


--
-- Name: UserBadge UserBadge_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."UserBadge"
    ADD CONSTRAINT "UserBadge_pkey" PRIMARY KEY (id);


--
-- Name: WatchedHistory WatchedHistory_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."WatchedHistory"
    ADD CONSTRAINT "WatchedHistory_pkey" PRIMARY KEY (id);


--
-- Name: Watchlist Watchlist_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Watchlist"
    ADD CONSTRAINT "Watchlist_pkey" PRIMARY KEY (id);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: account account_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.account
    ADD CONSTRAINT account_pkey PRIMARY KEY (id);


--
-- Name: payments payments_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payments
    ADD CONSTRAINT payments_pkey PRIMARY KEY (id);


--
-- Name: session session_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.session
    ADD CONSTRAINT session_pkey PRIMARY KEY (id);


--
-- Name: user user_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);


--
-- Name: verification verification_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.verification
    ADD CONSTRAINT verification_pkey PRIMARY KEY (id);


--
-- Name: ActivityLog_createdAt_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "ActivityLog_createdAt_idx" ON public."ActivityLog" USING btree ("createdAt");


--
-- Name: ActivityLog_userId_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "ActivityLog_userId_idx" ON public."ActivityLog" USING btree ("userId");


--
-- Name: Badge_name_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "Badge_name_key" ON public."Badge" USING btree (name);


--
-- Name: Follow_followerId_followingId_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "Follow_followerId_followingId_key" ON public."Follow" USING btree ("followerId", "followingId");


--
-- Name: Follow_followerId_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "Follow_followerId_idx" ON public."Follow" USING btree ("followerId");


--
-- Name: Follow_followingId_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "Follow_followingId_idx" ON public."Follow" USING btree ("followingId");


--
-- Name: Genre_name_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "Genre_name_key" ON public."Genre" USING btree (name);


--
-- Name: Like_reviewId_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "Like_reviewId_idx" ON public."Like" USING btree ("reviewId");


--
-- Name: Like_userId_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "Like_userId_idx" ON public."Like" USING btree ("userId");


--
-- Name: Like_userId_reviewId_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "Like_userId_reviewId_key" ON public."Like" USING btree ("userId", "reviewId");


--
-- Name: MediaGenre_mediaId_genreId_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "MediaGenre_mediaId_genreId_key" ON public."MediaGenre" USING btree ("mediaId", "genreId");


--
-- Name: Media_platform_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "Media_platform_idx" ON public."Media" USING btree (platform);


--
-- Name: Media_pricing_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "Media_pricing_idx" ON public."Media" USING btree (pricing);


--
-- Name: Media_releaseYear_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "Media_releaseYear_idx" ON public."Media" USING btree ("releaseYear");


--
-- Name: Media_slug_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "Media_slug_key" ON public."Media" USING btree (slug);


--
-- Name: Media_title_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "Media_title_idx" ON public."Media" USING btree (title);


--
-- Name: Notification_createdAt_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "Notification_createdAt_idx" ON public."Notification" USING btree ("createdAt");


--
-- Name: Notification_userId_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "Notification_userId_idx" ON public."Notification" USING btree ("userId");


--
-- Name: Review_mediaId_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "Review_mediaId_idx" ON public."Review" USING btree ("mediaId");


--
-- Name: Review_status_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "Review_status_idx" ON public."Review" USING btree (status);


--
-- Name: Review_userId_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "Review_userId_idx" ON public."Review" USING btree ("userId");


--
-- Name: Subscription_userId_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "Subscription_userId_idx" ON public."Subscription" USING btree ("userId");


--
-- Name: UserBadge_userId_badgeId_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "UserBadge_userId_badgeId_key" ON public."UserBadge" USING btree ("userId", "badgeId");


--
-- Name: WatchedHistory_mediaId_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "WatchedHistory_mediaId_idx" ON public."WatchedHistory" USING btree ("mediaId");


--
-- Name: WatchedHistory_userId_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "WatchedHistory_userId_idx" ON public."WatchedHistory" USING btree ("userId");


--
-- Name: Watchlist_userId_mediaId_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "Watchlist_userId_mediaId_key" ON public."Watchlist" USING btree ("userId", "mediaId");


--
-- Name: account_userId_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "account_userId_idx" ON public.account USING btree ("userId");


--
-- Name: payments_status_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payments_status_idx ON public.payments USING btree (status);


--
-- Name: payments_stripeEventId_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "payments_stripeEventId_key" ON public.payments USING btree ("stripeEventId");


--
-- Name: payments_transactionId_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "payments_transactionId_idx" ON public.payments USING btree ("transactionId");


--
-- Name: payments_transactionId_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "payments_transactionId_key" ON public.payments USING btree ("transactionId");


--
-- Name: payments_userId_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "payments_userId_idx" ON public.payments USING btree ("userId");


--
-- Name: session_token_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX session_token_key ON public.session USING btree (token);


--
-- Name: session_userId_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "session_userId_idx" ON public.session USING btree ("userId");


--
-- Name: user_email_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX user_email_key ON public."user" USING btree (email);


--
-- Name: user_isDeleted_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX "user_isDeleted_idx" ON public."user" USING btree ("isDeleted");


--
-- Name: user_status_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX user_status_idx ON public."user" USING btree (status);


--
-- Name: verification_identifier_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX verification_identifier_idx ON public.verification USING btree (identifier);


--
-- Name: ActivityLog ActivityLog_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."ActivityLog"
    ADD CONSTRAINT "ActivityLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."user"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Comment Comment_parentId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Comment"
    ADD CONSTRAINT "Comment_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES public."Comment"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Comment Comment_reviewId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Comment"
    ADD CONSTRAINT "Comment_reviewId_fkey" FOREIGN KEY ("reviewId") REFERENCES public."Review"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Comment Comment_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Comment"
    ADD CONSTRAINT "Comment_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."user"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Follow Follow_followerId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Follow"
    ADD CONSTRAINT "Follow_followerId_fkey" FOREIGN KEY ("followerId") REFERENCES public."user"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Follow Follow_followingId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Follow"
    ADD CONSTRAINT "Follow_followingId_fkey" FOREIGN KEY ("followingId") REFERENCES public."user"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Like Like_reviewId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Like"
    ADD CONSTRAINT "Like_reviewId_fkey" FOREIGN KEY ("reviewId") REFERENCES public."Review"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Like Like_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Like"
    ADD CONSTRAINT "Like_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."user"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: MediaGenre MediaGenre_genreId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."MediaGenre"
    ADD CONSTRAINT "MediaGenre_genreId_fkey" FOREIGN KEY ("genreId") REFERENCES public."Genre"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: MediaGenre MediaGenre_mediaId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."MediaGenre"
    ADD CONSTRAINT "MediaGenre_mediaId_fkey" FOREIGN KEY ("mediaId") REFERENCES public."Media"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Notification Notification_actorId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Notification"
    ADD CONSTRAINT "Notification_actorId_fkey" FOREIGN KEY ("actorId") REFERENCES public."user"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Notification Notification_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Notification"
    ADD CONSTRAINT "Notification_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."user"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: ReviewReport ReviewReport_reviewId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."ReviewReport"
    ADD CONSTRAINT "ReviewReport_reviewId_fkey" FOREIGN KEY ("reviewId") REFERENCES public."Review"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: ReviewReport ReviewReport_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."ReviewReport"
    ADD CONSTRAINT "ReviewReport_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."user"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Review Review_mediaId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Review"
    ADD CONSTRAINT "Review_mediaId_fkey" FOREIGN KEY ("mediaId") REFERENCES public."Media"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Review Review_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Review"
    ADD CONSTRAINT "Review_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."user"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Subscription Subscription_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Subscription"
    ADD CONSTRAINT "Subscription_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."user"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: UserBadge UserBadge_badgeId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."UserBadge"
    ADD CONSTRAINT "UserBadge_badgeId_fkey" FOREIGN KEY ("badgeId") REFERENCES public."Badge"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: UserBadge UserBadge_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."UserBadge"
    ADD CONSTRAINT "UserBadge_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."user"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: WatchedHistory WatchedHistory_mediaId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."WatchedHistory"
    ADD CONSTRAINT "WatchedHistory_mediaId_fkey" FOREIGN KEY ("mediaId") REFERENCES public."Media"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: WatchedHistory WatchedHistory_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."WatchedHistory"
    ADD CONSTRAINT "WatchedHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."user"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Watchlist Watchlist_mediaId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Watchlist"
    ADD CONSTRAINT "Watchlist_mediaId_fkey" FOREIGN KEY ("mediaId") REFERENCES public."Media"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Watchlist Watchlist_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Watchlist"
    ADD CONSTRAINT "Watchlist_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."user"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: account account_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.account
    ADD CONSTRAINT "account_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."user"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: payments payments_subscriptionId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payments
    ADD CONSTRAINT "payments_subscriptionId_fkey" FOREIGN KEY ("subscriptionId") REFERENCES public."Subscription"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: payments payments_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payments
    ADD CONSTRAINT "payments_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."user"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: session session_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.session
    ADD CONSTRAINT "session_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."user"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

\unrestrict ZSgtUAx2QKHeJ1lmC7vpNbH0UvThh4LJdoy2ytk5TJDMohdqqEVs0gzJ1SgN1MF

