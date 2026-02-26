"use client"

import * as React from "react"
import { Type, Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useFont } from "@/components/theme/font-provider"
import { serifOptions, sansOptions } from "@/lib/fonts"

export function FontSwitcher() {
    const { currentSerif, currentSans, setSerif, setSans } = useFont()

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="w-9 px-0">
                    <Type className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
                    <span className="sr-only">Toggle font</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Serif Font (Headings)</DropdownMenuLabel>
                <DropdownMenuGroup>
                    {serifOptions.map((font) => (
                        <DropdownMenuItem key={font.value} onClick={() => setSerif(font.value)}>
                            <span className={font.value === currentSerif.value ? "font-bold" : ""}>
                                {font.name}
                            </span>
                            {font.value === currentSerif.value && <Check className="ml-auto h-4 w-4" />}
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuLabel>Sans Font (Body)</DropdownMenuLabel>
                <DropdownMenuGroup>
                    {sansOptions.map((font) => (
                        <DropdownMenuItem key={font.value} onClick={() => setSans(font.value)}>
                            <span className={font.value === currentSans.value ? "font-bold" : ""}>
                                {font.name}
                            </span>
                            {font.value === currentSans.value && <Check className="ml-auto h-4 w-4" />}
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
