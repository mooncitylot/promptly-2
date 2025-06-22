// @ts-nocheck

/**
 * @description format needed for date input value attribute
 * @param {string|Date} date
 * @returns {string}
 * */
export function getDateInputValue(date) {
  const d = new Date(date)
  const month = d.getMonth() + 1
  const day = d.getDate()
  const year = d.getFullYear()

  return `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`
}

export function getDisplayDate(date) {
  const d = new Date(date)
  return `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`
}

export function getMonthStringDisplayDate(date) {
  // returns something like Sep 1, 2021
  const d = new Date(date)
  const month = d.toLocaleString('default', { month: 'short' })
  return `${month} ${d.getDate()}, ${d.getFullYear()}`
}

/**
 * @param {string} date
 */
export function getDisplayTime(date) {
  const d = new Date(date)
  let hours = d.getHours()
  const minutes = d.getMinutes()
  const amPm = hours >= 12 ? 'PM' : 'AM'
  hours = hours % 12
  hours = hours ? hours : 12
  const minutesStr = minutes < 10 ? '0' + minutes : minutes

  return `${hours}:${minutesStr} ${amPm}`
}

/**
 * @param {string} date1
 * @param {string} date2
 * @returns
 */
export function isDayAfter(date1, date2) {
  const d1 = new Date(date1)
  const d2 = new Date(date2)

  const timeDifference = d2.getTime() - d1.getTime()
  const dayDifference = timeDifference / (1000 * 3600 * 24)

  return dayDifference === 1
}

export function isSameDay(date1, date2) {
  const d1 = new Date(date1)
  const d2 = new Date(date2)

  return d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth() && d1.getDate() === d2.getDate()
}

/** @param {GoogleCalendarEventData} event */
export function googleCalDisplayTime(event) {
  if (event.start.date) {
    const sDate = event.start.date + 'T00:00:00'
    const eDate = event.end.date + 'T00:00:00'

    return isDayAfter(sDate, eDate) ? getDisplayDate(sDate) : `${getDisplayDate(sDate)} - ${getDisplayDate(eDate)}`
  }

  const start = `${getDisplayDate(event.start.dateTime)} ${getDisplayTime(event.start.dateTime)}`
  const end = `${getDisplayDate(event.end.dateTime)} ${getDisplayTime(event.end.dateTime)}`

  return `${start} - ${end}`
}

/** @param {GoogleCalendarEventData} event */
export function googleCalNiceDisplayTime(event) {
  // return Sep 1, 2021 9:00 AM - 5:00 PM
  if (event.start.date) {
    const sDate = event.start.date + 'T00:00:00'
    const eDate = event.end.date + 'T00:00:00'

    return isDayAfter(sDate, eDate) ? getDisplayDate(sDate) : `${getDisplayDate(sDate)} - ${getDisplayDate(eDate)}`
  }

  // check if date is same day
  if (isSameDay(event.start.dateTime, event.end.dateTime)) {
    return `${getMonthStringDisplayDate(event.start.dateTime)} ${getDisplayTime(
      event.start.dateTime
    )} - ${getDisplayTime(event.end.dateTime)}`
  }

  const start = `${getMonthStringDisplayDate(event.start.dateTime)} ${getDisplayTime(event.start.dateTime)}`
  const end = `${getMonthStringDisplayDate(event.end.dateTime)} ${getDisplayTime(event.end.dateTime)}`

  return `${start} - ${end}`
}

/**
 * @param {string} date
 * @returns {string}
 */
// takes in number and returns string with th or st or nd or rd
export function getDayWithSuffix(day) {
  let suffix = 'th'

  if (day === 1 || day === 21 || day === 31) {
    suffix = 'st'
  } else if (day === 2 || day === 22) {
    suffix = 'nd'
  } else if (day === 3 || day === 23) {
    suffix = 'rd'
  }

  return `${day}${suffix}`
}

/**
 * @param {Date} today - provides override for testing
 * @returns
 */
export function getFinalBusinessDayOfMonth(today = new Date()) {
  var lastDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 0)
  var lastDayOfMonthDay = lastDayOfMonth.getDay()

  // Set as last business day of month
  if (lastDayOfMonthDay == 6) lastDayOfMonth.setDate(lastDayOfMonth.getDate() - 1) // if last day of month is Saturday, set it to Friday
  if (lastDayOfMonthDay == 0) lastDayOfMonth.setDate(lastDayOfMonth.getDate() - 2) // if last day of month is Sunday, set it to Friday

  return lastDayOfMonth.getDate()
}

export function getDaysTillFinalBusinessDayOfMonth() {
  return getFinalBusinessDayOfMonth() - new Date().getDate()
}
