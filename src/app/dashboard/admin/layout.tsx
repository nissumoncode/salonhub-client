import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AdminSidebar from "@/app/dashboard/components/AdminSidebar";
import AdminRouteProtect from "@/app/dashboard/components/AdminRouteProtect";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <AdminRouteProtect>
      <SidebarProvider>
        <AdminSidebar />

        <main className="min-h-screen flex-1 bg-[#F8F1E8]">
          <div className="border-b border-[#E8D8C3] p-3">
            <SidebarTrigger />
          </div>

          {children}
        </main>
      </SidebarProvider>
    </AdminRouteProtect>
  );
};

export default AdminLayout;
