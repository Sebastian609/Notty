import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface CalendarComponentProps {
  dateString: string;
}

export function CalendarComponent(props: CalendarComponentProps) {
  const { dateString } = props;

  const [date, setDate] = useState<Date | undefined>(new Date()); // Establecer la fecha inicial aquí

  useEffect(() => {
    // Convertir la cadena de fecha en un objeto Date y establecerlo como fecha inicial
    if (dateString) {
      setDate(new Date(dateString));
      
    }
  }, [dateString]); // Ejecutar este efecto cuando dateString cambie

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
          {date ? format(date, "P") : <span>Pick a new deadline</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
      </PopoverContent>
    </Popover>
  );
}
