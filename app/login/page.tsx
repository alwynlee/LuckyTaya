import { Suspense } from "react";
import type { Metadata } from "next";
import LoginForm from "./LoginForm";

export const metadata: Metadata = {
  title: "Sign in — iGaming Philippines Internal Wiki",
  description: "Sign in to access the iGaming Philippines internal wiki.",
};

export default function LoginPage() {
  // Suspense boundary is required because LoginForm calls useSearchParams()
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}
