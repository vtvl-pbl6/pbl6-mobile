import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(customParseFormat)
dayjs.extend(relativeTime)

export const daysUntilToday = (dateString, lang = 'en') => {
    const startDate = dayjs(dateString, 'DD-MM-YYYY HH:mm:ss.SSS')

    const currentDate = dayjs()

    const diffInMinutes = currentDate.diff(startDate, 'minute')
    const diffInHours = currentDate.diff(startDate, 'hour')
    const diffInDays = currentDate.diff(startDate, 'day')
    const diffInMonths = currentDate.diff(startDate, 'month')

    const format = {
        minutes: `${diffInMinutes}m`,
        hours: `${diffInHours}h`,
        days: `${diffInDays}d`,
        months: startDate.format('DD/MM/YYYY')
    }

    if (diffInMinutes < 60) {
        return format.minutes
    } else if (diffInHours < 24) {
        return format.hours
    } else if (diffInDays < 30) {
        return format.days
    } else {
        return format.months
    }
}
