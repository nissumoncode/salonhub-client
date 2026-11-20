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

import { LayoutDashboard, CalendarDays, UserRound } from "lucide-react";

const CustomerSidebar = () => {
  return (
    <Sidebar>
      <SidebarContent className="bg-[#4A382E] text-white">
        <SidebarGroup>
          <SidebarGroupLabel className="mb-6 px-4 text-xl font-bold text-white">
            SalonHub Customer
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <Link href="/dashboard/customer">
                  <SidebarMenuButton>
                    <LayoutDashboard />
                    <span>Overview</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <Link href="/dashboard/customer/appointments">
                  <SidebarMenuButton>
                    <CalendarDays />
                    <span>My Appointments</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <Link href="/dashboard/customer/profile">
                  <SidebarMenuButton>
                    <UserRound />
                    <span>My Profile</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default CustomerSidebar;
