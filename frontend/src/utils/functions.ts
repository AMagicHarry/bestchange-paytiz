export function formatDate(dateString: string): string {
    const date = new Date(dateString);

    const month = date.toLocaleString('default', { month: 'short' }).toUpperCase();
    const day = date.getDate();
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'pm' : 'am';
    const formattedHour = hours % 12 || 12; 

    const formattedDate = `${month} ${day}, ${year} at ${formattedHour}:${minutes}${ampm}`;

    return formattedDate;
}