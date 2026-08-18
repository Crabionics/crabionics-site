import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="flex min-h-[calc(100vh-5rem)] items-center justify-center px-5 py-12">
      <SignIn
        path="/sign-in"
        routing="path"
        fallbackRedirectUrl="/control-tower"
        signUpUrl="/sign-up"
        signUpFallbackRedirectUrl="/control-tower"
      />
    </div>
  );
}
