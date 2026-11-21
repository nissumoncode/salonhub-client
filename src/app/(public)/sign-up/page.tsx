import { Suspense } from "react";
import SignUpForm from "@/components/auth/SignUpForm";

const SignUpPage = () => {
  return (
    <main className="min-h-screen bg-background flex items-center justify-center p-4 md:p-8">
      <Suspense
        fallback={
          <p className="text-center text-muted-foreground">Loading sign up...</p>
        }
      >
        <SignUpForm />
      </Suspense>
    </main>
  );
};

export default SignUpPage;
