import { Intro, Page } from "../../components/public/Experience";
import ConfirmInterest from "../../components/public/ConfirmInterest";
export const metadata = {
  title: "Confirm Early-access Interest",
  robots: { index: false, follow: false },
  referrer: "no-referrer" as const,
};
export default async function ConfirmPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await searchParams;
  return (
    <Page name="confirm-interest">
      <Intro
        eyebrow="Crabionics / Email confirmation"
        title="One step to confirm your interest."
      >
        {token && /^[a-f0-9]{64}$/.test(token) ? (
          <ConfirmInterest token={token} />
        ) : (
          <p>
            This link is incomplete. Please use the link in your confirmation
            email.
          </p>
        )}
      </Intro>
    </Page>
  );
}
