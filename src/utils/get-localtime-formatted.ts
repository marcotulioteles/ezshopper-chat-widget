export const getFormattedLocalTime = () => {
    const [localTime, amPmAbbr] = new Date().toLocaleTimeString().split(' ')
    const localTimeListElem = localTime.split(':');
    localTimeListElem.pop()
    const finalLocalTime = localTimeListElem.join(':')
    return `${finalLocalTime} ${amPmAbbr}`
}