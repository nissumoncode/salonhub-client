"use client";

import Link from "next/link";
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
  return (
    <Sidebar>
      <SidebarContent className="bg-[#4A382E] text-white">
        <SidebarGroup>
          <SidebarGroupLabel className="mb-6 px-4 text-xl font-bold text-white">
            SalonHub Admin
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <Link
                    href="/dashboard/admin"
                    className="flex w-full items-center gap-2"
                  >
                    <LayoutDashboard />
                    <span>Overview</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton>
                  <Link
                    href="/dashboard/admin/services"
                    className="flex w-full items-center gap-2"
                  >
                    <Scissors />
                    <span>Manage Services</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton>
                  <Link
                    href="/dashboard/admin/appointments"
                    className="flex w-full items-center gap-2"
                  >
                    <CalendarDays />
                    <span>Manage Appointments</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton>
                  <Link
                    href="/dashboard/admin/users"
                    className="flex w-full items-center gap-2"
                  >
                    <Users />
                    <span>Manage Users</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton>
                  <Link
                    href="/dashboard/admin/transactions"
                    className="flex w-full items-center gap-2"
                  >
                    <CreditCard />
                    <span>Transactions</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton>
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
