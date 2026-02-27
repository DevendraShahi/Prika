"use client"

import * as React from "react"
import { ChevronDownIcon } from "lucide-react"

import { cn } from "@/lib/utils"

type AccordionType = "single" | "multiple"
type AccordionValue = string | string[]

type AccordionContextValue = {
  type: AccordionType
  collapsible: boolean
  value: AccordionValue
  setValue: (nextValue: AccordionValue) => void
}

const AccordionContext = React.createContext<AccordionContextValue | null>(null)

type AccordionItemContextValue = {
  value: string
  open: boolean
  toggle: () => void
}

const AccordionItemContext = React.createContext<AccordionItemContextValue | null>(
  null
)

function useAccordionContext() {
  const context = React.useContext(AccordionContext)
  if (!context) {
    throw new Error("Accordion components must be used within <Accordion />")
  }
  return context
}

function useAccordionItemContext() {
  const context = React.useContext(AccordionItemContext)
  if (!context) {
    throw new Error(
      "AccordionTrigger and AccordionContent must be used within <AccordionItem />"
    )
  }
  return context
}

function normalizeInitialValue(type: AccordionType, value?: AccordionValue) {
  if (type === "multiple") {
    return Array.isArray(value) ? value : []
  }
  return typeof value === "string" ? value : ""
}

function Accordion({
  type = "single",
  collapsible = false,
  value,
  defaultValue,
  onValueChange,
  className,
  ...props
}: React.ComponentProps<"div"> & {
  type?: AccordionType
  collapsible?: boolean
  value?: AccordionValue
  defaultValue?: AccordionValue
  onValueChange?: (value: AccordionValue) => void
}) {
  const isControlled = value !== undefined
  const [internalValue, setInternalValue] = React.useState<AccordionValue>(() =>
    normalizeInitialValue(type, defaultValue)
  )

  const currentValue = isControlled
    ? normalizeInitialValue(type, value)
    : internalValue

  const setValue = React.useCallback(
    (nextValue: AccordionValue) => {
      if (!isControlled) {
        setInternalValue(nextValue)
      }
      onValueChange?.(nextValue)
    },
    [isControlled, onValueChange]
  )

  return (
    <AccordionContext.Provider
      value={{ type, collapsible, value: currentValue, setValue }}
    >
      <div
        data-slot="accordion"
        className={className}
        {...props}
      />
    </AccordionContext.Provider>
  )
}

function AccordionItem({
  className,
  value,
  ...props
}: React.ComponentProps<"div"> & { value: string }) {
  const { type, collapsible, value: accordionValue, setValue } = useAccordionContext()

  const open =
    type === "multiple"
      ? Array.isArray(accordionValue) && accordionValue.includes(value)
      : accordionValue === value

  const toggle = React.useCallback(() => {
    if (type === "multiple") {
      const currentValues = Array.isArray(accordionValue) ? accordionValue : []
      setValue(
        open
          ? currentValues.filter((itemValue) => itemValue !== value)
          : [...currentValues, value]
      )
      return
    }

    if (open && !collapsible) return
    setValue(open ? "" : value)
  }, [type, accordionValue, value, open, collapsible, setValue])

  return (
    <AccordionItemContext.Provider value={{ value, open, toggle }}>
      <div
        data-slot="accordion-item"
        data-state={open ? "open" : "closed"}
        className={cn("border-b last:border-b-0", className)}
        {...props}
      />
    </AccordionItemContext.Provider>
  )
}

function AccordionTrigger({
  className,
  children,
  onClick,
  ...props
}: React.ComponentProps<"button">) {
  const { value, open, toggle } = useAccordionItemContext()

  return (
    <button
      type="button"
      data-slot="accordion-trigger"
      data-state={open ? "open" : "closed"}
      aria-expanded={open}
      aria-controls={`accordion-content-${value}`}
      onClick={(event) => {
        onClick?.(event)
        if (!event.defaultPrevented) {
          toggle()
        }
      }}
      className={cn(
        "focus-visible:border-ring focus-visible:ring-ring/50 flex w-full items-start justify-between gap-4 rounded-md py-4 text-left text-sm font-medium transition-all outline-none hover:underline focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50",
        className
      )}
      {...props}
    >
      {children}
      <ChevronDownIcon
        className={cn(
          "text-muted-foreground pointer-events-none size-4 shrink-0 translate-y-0.5 transition-transform duration-200",
          open && "rotate-180"
        )}
      />
    </button>
  )
}

function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  const { value, open } = useAccordionItemContext()

  return (
    <div
      id={`accordion-content-${value}`}
      data-slot="accordion-content"
      data-state={open ? "open" : "closed"}
      className="overflow-hidden text-sm"
      hidden={!open}
      {...props}
    >
      <div className={cn("pt-0 pb-4", className)}>{children}</div>
    </div>
  )
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
