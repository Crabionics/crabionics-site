import { Intro, Page, Section } from "../../components/public/Experience";
import DemandReview from "../../components/public/DemandReview";
import AuthProviders from "../../components/auth/AuthProviders";
import { staffAccessConfigured } from "../../lib/registration-access";
import { auth } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";
export const dynamic = "force-dynamic";
export const metadata = {title:"Early-access Team Review",robots:{index:false,follow:false}};
export default async function ReviewPage() {
  const identityAccess = staffAccessConfigured();
  if (identityAccess) {
    await auth.protect();
    const {userId} = await auth();
    if (!(process.env.REGISTRATION_STAFF_USER_IDS || "").split(",").map(id => id.trim()).includes(userId || "")) notFound();
  }
  const content = <Page name="team-review"><Intro eyebrow="Private team review" title="Understand confirmed producer interest."><p>Review roles, regions and needs after email verification.</p></Intro><Section><DemandReview identityAccess={identityAccess}/></Section></Page>;
  return identityAccess ? <AuthProviders>{content}</AuthProviders> : content;
}
