import { Home, BaggageClaim } from "lucide-react"
import Link from "next/link"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"


// Menu items.
const items = [
  {
    url: "/",
    icon: Home,
  },
  {
    url: "/estoque",
    icon: BaggageClaim,
  }
]

export function AppSidebar() {
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
                      <item.icon/>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
