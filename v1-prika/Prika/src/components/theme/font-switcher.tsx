"use client"

import * as React from "react"
import { Type } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useFont } from "./font-provider"
import { serifOptions, sansOptions } from "@/lib/fonts"

export function FontSwitcher() {
  const { currentSerif, currentSans, setSerifFont, setSansFont } = useFont()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-9 w-9">
          <Type className="h-4 w-4" />
          <span className="sr-only">Switch font</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuLabel>Heading Font</DropdownMenuLabel>
        {serifOptions.map((font) => (
          <DropdownMenuItem
            key={font.value}
            onClick={() => setSerifFont(font)}
            className={currentSerif.value === font.value ? "bg-accent" : ""}
          >
            {font.name}
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuLabel>Body Font</DropdownMenuLabel>
        {sansOptions.map((font) => (
          <DropdownMenuItem
            key={font.value}
            onClick={() => setSansFont(font)}
            className={currentSans.value === font.value ? "bg-accent" : ""}
          >
            {font.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
