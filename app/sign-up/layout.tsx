import AuthProviders from "../components/auth/AuthProviders";
import type { ReactNode } from "react";

export default function SignUpLayout({ children }: { children: ReactNode }) {
  return <AuthProviders>{children}</AuthProviders>;
}
