import React, { useState, useEffect } from "react";

interface TaskStatusProps {
  statusName: string;
}

export default function TaskStatus(props: TaskStatusProps) {
  const { statusName } = props;
  const [statusColor, setStatusColor] = useState<string>("");

  useEffect(() => {
    switch (statusName) {
      case "IN_PROGRESS":
        setStatusColor("bg-cyan-500");
        break;
      case "COMPLETED":
        setStatusColor("bg-emerald-500");
        break;
      case "CANCELED":
        setStatusColor("bg-red-500");
        break;
      case "COMPLETED_WHIT_DELAY":
        setStatusColor("bg-yellow-500");
        break;

      default:
        setStatusColor("");
    }
  }, [statusName]);

  // Función para convertir mayúsculas y guiones bajos en espacios
  const formatStatusName = (name: string) => {
    return name.replace(/_/g, " ").toUpperCase();
  };

  return (
    <div className={` animate-fade-left animate-once rounded-full transition text-xs text-white p-2 ${statusColor}`} style={{ display: "inline-block" }}>
      {formatStatusName(statusName)}
    </div>
  );
}
