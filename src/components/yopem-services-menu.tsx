"use client"

import { MenuIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Menu, MenuItem, MenuPopup, MenuTrigger } from "@/components/ui/menu"

const services = [
  { name: "Search", url: "https://search.yopem.com" },
  { name: "Read", url: "https://read.yopem.com" },
  { name: "QR", url: "https://qr.yopem.com" },
] as const

const YopemServicesMenu = () => {
  return (
    <Menu>
      <MenuTrigger
        render={
          <Button variant="ghost" className="size-10 cursor-pointer px-0">
            <MenuIcon className="size-5" />
            <span className="sr-only">Yopem Services</span>
          </Button>
        }
      />
      <MenuPopup align="end">
        {services.map((service) => (
          <MenuItem
            key={service.name}
            render={<a href={service.url} target="_blank" rel="noopener" />}
          >
            {service.name}
          </MenuItem>
        ))}
      </MenuPopup>
    </Menu>
  )
}

export default YopemServicesMenu
