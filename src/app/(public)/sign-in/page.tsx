import { Suspense } from "react";
import SignInForm from "@/components/auth/Sign In Form";

const SignInPage = () => {
  return (
    <main className="min-h-screen bg-background flex items-center justify-center p-4 md:p-8">
      <Suspense
        fallback={
          <p className="text-center text-[#6B5B50]">Loading sign in...</p>
        }
      >
        <SignInForm />
      </Suspense>
    </main>
  );
};

export default SignInPage;
