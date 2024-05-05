import React, { useState, useEffect, useCallback } from "react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Button } from "@/components/ui/button";
import useDateFormat from "@/app/hooks/useDateFormat/useDateFormat";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { log } from "console";

type Status = {
  value: string;
  label: string;
};

interface ComboBoxStatusProps {
  currentStatus: Status | null;
  currentDeadline: string;
}

export function Combobox(props: ComboBoxStatusProps) {
  const { currentStatus, currentDeadline } = props;
  const [open, setOpen] = useState(false);
  const { stringToDate } = useDateFormat();
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [selectedStatus, setSelectedStatus] = useState<Status | null>(currentStatus);

  // Define la lista de estados inicial
  const initialStatuses: Status[] = [
    {
      value: "IN_PROGRESS",
      label: "IN_PROGRESS",
    },
    {
      value: "CANCELED",
      label: "CANCELLED",
    },
  ];

  const calculateStatuses = (deadline: Date): Status[] => {
    return new Date() > deadline
      ? [...initialStatuses, { value: "COMPLETED_WHIT_DELAY", label: "COMPLETED_WHIT_DELAY" }]
      : [...initialStatuses, { value: "COMPLETED", label: "COMPLETED" }];
  };

  const deadlineDate = stringToDate(currentDeadline);
  const [statuses, setStatuses] = useState<Status[]>(() => calculateStatuses(deadlineDate));

    useEffect(() => {
      const deadline = stringToDate(currentDeadline);
      setStatuses(calculateStatuses(deadline));
    }, [currentDeadline]);

  const handleStatusClick = useCallback((status: Status) => {
    setSelectedStatus(status);
    setOpen(false);
    console.log("Status clicked:", status);
  }, []);

  const StatusListComponent = (
    <StatusList
      setOpen={setOpen}
      setSelectedStatus={setSelectedStatus}
      statuses={statuses}
      handleStatusClick={handleStatusClick}
    />
  );

  if (isDesktop) {
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-1/2 justify-start">
            {selectedStatus ? <>{selectedStatus.label}</> : <>+ Set status</>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0" align="start">
          {StatusListComponent}
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline" className="justify-start hover:text-red-800">
          {selectedStatus ? <>{selectedStatus.label}</> : <>+ Set status</>}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mt-4 border-t">
          {StatusListComponent}
        </div>
      </DrawerContent>
    </Drawer>
  );
}

function StatusList({
  setOpen,
  setSelectedStatus,
  statuses,
  handleStatusClick,
}: {
  setOpen: (open: boolean) => void;
  setSelectedStatus: (status: Status | null) => void;
  statuses: Status[];
  handleStatusClick: (status: Status) => void;
}) {
  return (
    <Command>
      <CommandInput placeholder="Filter status..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup>
          {statuses.map((status) => (
            <CommandItem
              key={status.value}
              value={status.value}
              onSelect={() => handleStatusClick(status)}
            >
              <p>{status.label}</p>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
