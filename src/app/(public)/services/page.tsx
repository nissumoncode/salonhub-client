import { Suspense } from "react";
import ServicesPageContent from "./ServicesPageContent";

const ServicesPage = () => {
  return (
    <Suspense
      fallback={
        <p className="py-16 text-center text-muted-foreground">Loading services...</p>
      }
    >
      <ServicesPageContent />
    </Suspense>
  );
};

export default ServicesPage;
