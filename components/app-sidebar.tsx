"use client"

import * as React from "react"
import {
  // AudioWaveform,
  // BookOpen,
  // Bot,
  // Command,
  // Frame,
  // GalleryVerticalEnd,
  // Map,
  // PieChart,
  // Settings2,
  SquareTerminal,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
// import { NavProjects } from "@/components/nav-projects"
// import { NavUser } from "@/components/nav-user"
// import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import ThemeSwitch from "./Switch"

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Admin Panel",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Blog Posts",
          url: "/admin/studio/structure",
        },
        {
          title: "Parkings",
          url: "/admin/parkings",
        }
      ],
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props} className="">
      <SidebarHeader>
        Parkito Admin
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter className="flex flex-row items-center justify-center">
        {/* <NavUser user={data.user} /> */}
        <ThemeSwitch />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
