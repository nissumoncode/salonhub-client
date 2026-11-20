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

import { LayoutDashboard, CalendarDays, UserRound } from "lucide-react";

const CustomerSidebar = () => {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarContent className="bg-[#4A382E] text-white">
        <SidebarGroup>
          <SidebarGroupLabel className="mb-6 px-4 text-xl font-bold text-white">
            SalonHub Customer
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem className="mb-2">
                <SidebarMenuButton
                  isActive={pathname === "/dashboard/customer"}
                >
                  <Link
                    href="/dashboard/customer"
                    className="flex w-full items-center gap-2"
                  >
                    <LayoutDashboard />
                    <span>Overview</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem className="mb-2">
                <SidebarMenuButton
                  isActive={pathname === "/dashboard/customer/appointments"}
                >
                  <Link
                    href="/dashboard/customer/appointments"
                    className="flex w-full items-center gap-2"
                  >
                    <CalendarDays />
                    <span>My Appointments</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem className="mb-2">
                <SidebarMenuButton
                  isActive={pathname === "/dashboard/customer/profile"}
                >
                  <Link
                    href="/dashboard/customer/profile"
                    className="flex w-full items-center gap-2"
                  >
                    <UserRound />
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

export default CustomerSidebar;
