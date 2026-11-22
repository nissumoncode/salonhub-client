import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import ThemeToggle from "@/components/ThemeToggle";
import AdminSidebar from "@/app/dashboard/admin/components/AdminSidebar";
import AdminRouteProtect from "@/app/dashboard/admin/components/AdminRouteProtect";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <AdminRouteProtect>
      <SidebarProvider>
        <AdminSidebar />

        <main className="min-h-screen min-w-0 flex-1 bg-background">
          <div className="flex items-center justify-between border-b bg-card px-3 py-3 sm:px-4 sm:py-4">
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

