import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="flex min-h-[calc(100vh-5rem)] items-center justify-center px-5 py-12">
      <SignUp
        path="/sign-up"
        routing="path"
        fallbackRedirectUrl="/control-tower"
        signInUrl="/sign-in"
        signInFallbackRedirectUrl="/control-tower"
      />
    </div>
  );
}
