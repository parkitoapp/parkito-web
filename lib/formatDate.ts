export const formatDate = (date: string): string => {
    const options: Intl.DateTimeFormatOptions = {
        weekday: 'short', // "Mer" for Mercoledì
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    };

    const italianFormatter = new Intl.DateTimeFormat('it-IT', options);
    return italianFormatter.format(new Date(date));
};