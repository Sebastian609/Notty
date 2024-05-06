import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface CalendarComponentProps {
  dateString: string;
  onChange: (newDate: Date|undefined) => void;
}

export function CalendarComponent(props: CalendarComponentProps) {
  const { dateString, onChange } = props;
  const [date, setDate] = React.useState<Date>()
useEffect(() => {
  console.log(date)
  onChange(date)
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [date])

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "Pp") : format(new Date(dateString), "Pp")}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
      </PopoverContent>
    </Popover>
  );
}
