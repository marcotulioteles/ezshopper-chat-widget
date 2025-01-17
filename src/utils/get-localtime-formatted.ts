export const getFormattedLocalTime = () => {
    const [localTime, amPmAbbr] = new Date().toLocaleTimeString().split(' ')
    return `${localTime.slice(0, 5)} ${amPmAbbr}`
}