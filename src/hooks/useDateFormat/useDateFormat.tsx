import { getDate, getHours } from "date-fns";

const useDateFormat = () => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return "Fecha inválida";
    }

    const options: Intl.DateTimeFormatOptions = {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false, // Para usar el formato de 24 horas
    };
    return date.toLocaleDateString("es-ES", options);
  };

  const stringToDate = (dateString: string) => {
    const date = new Date(dateString);
    return date;
  };

  const dateToString = (date: Date) => {
    const dateString = date.toISOString(); // Convierte la fecha a una cadena ISO (YYYY-MM-DDTHH:MM:SS.fffZ)
    return dateString;
  };

  const getTomorrowFormatedDeadline = () => {
    const today = new Date().getTime();
    const tomorrow = new Date(today+86400000)
    const tomorrowFormatedDeadline = `${
        tomorrow.getFullYear() +
        "-" +
        (tomorrow.getMonth() < 9 ? "0" + (tomorrow.getMonth() + 1) : tomorrow.getMonth() + 1) +
        "-" +
        (tomorrow.getDate() < 10 ? "0" + tomorrow.getDate() : tomorrow.getDate()) +
        "T" +
        (tomorrow.getHours() < 10 ? "0" + tomorrow.getHours() : tomorrow.getHours()) +
        ":" +
        (tomorrow.getMinutes() < 10 ? "0" + tomorrow.getMinutes() : tomorrow.getMinutes())
    }`;
    console.log(tomorrowFormatedDeadline);

    return tomorrowFormatedDeadline;
  };

  return { formatDate, stringToDate, dateToString, getTomorrowFormatedDeadline };
};

export default useDateFormat;
