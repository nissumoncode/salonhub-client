import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import ThemeToggle from "@/components/ThemeToggle";
import AdminSidebar from "@/app/dashboard/admin/components/AdminSidebar";
import AdminRouteProtect from "@/app/dashboard/admin/components/AdminRouteProtect";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <AdminRouteProtect>
      <SidebarProvider>
        <AdminSidebar />

        <main className="min-h-screen flex-1 bg-background">
          <div className="border-b bg-card p-4 flex items-center justify-between">
            <SidebarTrigger />
            <ThemeToggle />
          </div>

          {children}
        </main>
      </SidebarProvider>
    </AdminRouteProtect>
  );
};

export default AdminLayout;
