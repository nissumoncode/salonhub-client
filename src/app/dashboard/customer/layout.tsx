import CustomerRouteProtect from "@/app/dashboard/components/CustomerRouteProtect";
import CustomerSidebar from "@/app/dashboard/components/CustomerSidebar";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

const CustomerLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <CustomerRouteProtect>
      <SidebarProvider>
        <CustomerSidebar />

        <main className="min-h-screen flex-1 bg-[#FAF7F4]">
          <div className="border-b bg-white p-4">
            <SidebarTrigger />
          </div>

          <div className="p-6">{children}</div>
        </main>
      </SidebarProvider>
    </CustomerRouteProtect>
  );
};

export default CustomerLayout;
