import CustomerRouteProtect from "@/app/dashboard/customer/components/CustomerRouteProtect";
import CustomerSidebar from "@/app/dashboard/customer/components/CustomerSidebar";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import ThemeToggle from "@/components/ThemeToggle";

const CustomerLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <CustomerRouteProtect>
      <SidebarProvider>
        <CustomerSidebar />

        <main className="min-h-screen flex-1 bg-background">
          <div className="border-b bg-card p-4 flex items-center justify-between">
            <SidebarTrigger />
            <ThemeToggle />
          </div>

          <div className="p-6">{children}</div>
        </main>
      </SidebarProvider>
    </CustomerRouteProtect>
  );
};

export default CustomerLayout;
