const useDateFormat = () => {
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) {
            return "Fecha inválida";
        }

        const options: Intl.DateTimeFormatOptions = {
            month: '2-digit',
            day: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false // Para usar el formato de 24 horas
        };
        return date.toLocaleDateString('es-ES', options);
    };

    const stringToDate = (dateString: string) => {
        const date = new Date(dateString);
        return date;
    };

    const dateToString = (date: Date) => {
        const dateString = date.toISOString(); // Convierte la fecha a una cadena ISO (YYYY-MM-DDTHH:MM:SS.fffZ)
        return dateString;
    };

    return { formatDate, stringToDate, dateToString };
};

export default useDateFormat;
