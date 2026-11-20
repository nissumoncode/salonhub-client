"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  Scissors,
  CalendarDays,
  Users,
  UserCircle,
  CreditCard,
} from "lucide-react";

const AdminSidebar = () => {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarContent className="bg-[#4A382E] text-white">
        <SidebarGroup>
          <SidebarGroupLabel className="mb-6 px-4 text-xl font-bold text-white">
            SalonHub Admin
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem className="mb-2">
                <SidebarMenuButton isActive={pathname === "/dashboard/admin"}>
                  <Link
                    href="/dashboard/admin"
                    className="flex w-full items-center gap-2"
                  >
                    <LayoutDashboard />
                    <span>Overview</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem className="mb-2">
                <SidebarMenuButton
                  isActive={pathname === "/dashboard/admin/services"}
                >
                  <Link
                    href="/dashboard/admin/services"
                    className="flex w-full items-center gap-2"
                  >
                    <Scissors />
                    <span>Manage Services</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem className="mb-2">
                <SidebarMenuButton
                  isActive={pathname === "/dashboard/admin/appointments"}
                >
                  <Link
                    href="/dashboard/admin/appointments"
                    className="flex w-full items-center gap-2"
                  >
                    <CalendarDays />
                    <span>Manage Appointments</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem className="mb-2">
                <SidebarMenuButton
                  isActive={pathname === "/dashboard/admin/users"}
                >
                  <Link
                    href="/dashboard/admin/users"
                    className="flex w-full items-center gap-2"
                  >
                    <Users />
                    <span>Manage Users</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem className="mb-2">
                <SidebarMenuButton
                  isActive={pathname === "/dashboard/admin/transactions"}
                >
                  <Link
                    href="/dashboard/admin/transactions"
                    className="flex w-full items-center gap-2"
                  >
                    <CreditCard />
                    <span>Transactions</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem className="mb-2">
                <SidebarMenuButton
                  isActive={pathname === "/dashboard/admin/profile"}
                >
                  <Link
                    href="/dashboard/admin/profile"
                    className="flex w-full items-center gap-2"
                  >
                    <UserCircle />
                    <span>My Profile</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default AdminSidebar;
