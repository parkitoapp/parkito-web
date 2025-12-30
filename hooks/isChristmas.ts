export default function isChristmas(): boolean {
    const today = new Date();
    const isChristmas = today.getMonth() === 11 && today.getDate() >= 21 && today.getDate() <= 31;
    return isChristmas;
}