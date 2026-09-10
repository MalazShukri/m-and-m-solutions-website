"use client"

import { Button } from "@/components/ui/button"
import { useLanguage } from "./language-context"
import { Globe } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function LanguageSwitcher() {
  const { language, toggleLanguage } = useLanguage()

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleLanguage}
            className="relative text-foreground/85 hover:text-brand-light hover:bg-white/10 transition-all duration-200 border border-white/15 bg-white/5 min-h-[40px] min-w-[40px]"
            aria-label={language === "en" ? "Switch to Arabic" : "Switch to English"}
          >
            <Globe className="h-[1.2rem] w-[1.2rem]" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Change language</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
