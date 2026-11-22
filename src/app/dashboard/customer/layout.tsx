import CustomerRouteProtect from "@/app/dashboard/customer/components/CustomerRouteProtect";
import CustomerSidebar from "@/app/dashboard/customer/components/CustomerSidebar";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import ThemeToggle from "@/components/ThemeToggle";

const CustomerLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <CustomerRouteProtect>
      <SidebarProvider>
        <CustomerSidebar />

        <main className="min-h-screen min-w-0 flex-1 bg-background">
          <div className="flex items-center justify-between border-b bg-card px-3 py-3 sm:px-4 sm:py-4">
            <SidebarTrigger />
            <ThemeToggle />
          </div>

          <div className="min-w-0 p-3 sm:p-4 md:p-6">{children}</div>
        </main>
      </SidebarProvider>
    </CustomerRouteProtect>
  );
};

export default CustomerLayout;

