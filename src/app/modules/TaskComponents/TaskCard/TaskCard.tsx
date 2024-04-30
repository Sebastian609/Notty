import { Task } from '@/app/Dto/Task'
import React from 'react'

interface TaskProps {
    task: Task;
}

export default function TaskCard(props: TaskProps) {
    const { task } = props;

    // Función para formatear la fecha
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) {
            return "Fecha inválida";
        }

        const options: Intl.DateTimeFormatOptions = {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false // Para usar el formato de 24 horas
        };
        return date.toLocaleDateString('es-ES', options);
    };

    return (
        <div className='border-2 rounded-lg w-96 flex-col flex gap-2 p-4'>
            <div className='flex flex-row justify-between'>
                <p className='font-bold text-xl text-left'>{task.name}</p>
                <p>{task.taskStatus}</p>
            </div>
            <p>{task.description}</p>
            <p className='text-slate-500 text-sm'>Deadline: {formatDate(task.timeLimit.toString())}</p>
        </div>
    );
}
