import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <main className="relative min-h-screen px-5 pb-20 pt-24 sm:px-8 lg:px-12">
      <div className="mx-auto flex max-w-md justify-center">
        <SignIn forceRedirectUrl="/control-tower" />
      </div>
    </main>
  );
}
