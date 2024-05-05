const useDateFormat = () => {
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

    const stringToDate = (dateString: string) =>{
        const date = new Date(dateString);
        return date
    }

    return { formatDate,stringToDate };
};

export default useDateFormat;
