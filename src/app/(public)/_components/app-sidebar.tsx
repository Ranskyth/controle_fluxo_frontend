"use client";

import { Home, BaggageClaim, LogOut, ChartNoAxesCombined } from "lucide-react";
import Link from "next/link";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { ButtonThemeProvider } from "@/components/button-theme-provider";
import { useContext } from "react";
import { ContextApp } from "./context-app";

const items = [
  {
    url: "/",
    icon: Home,
  },
  {
    url: "/estoque",
    icon: BaggageClaim,
  },
  {
    url: "/dashboard",
    icon: ChartNoAxesCombined,
  },
];

export function AppSidebar() {
  const { Logout } = useContext(ContextApp);

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="flex mt-16 flex-col items-center">
              {items.map((item, index) => (
                <SidebarMenuItem key={index}>
                  <SidebarMenuButton className="hover:bg-[#b8b8b8]" asChild>
                    <Link href={item.url}>
                      <item.icon />
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarGroup className="flex flex-col gap-4">
          <ButtonThemeProvider />

          <SidebarMenuButton onClick={Logout}>
            <LogOut />
          </SidebarMenuButton>
        </SidebarGroup>
      </SidebarFooter>
    </Sidebar>
  );
}
