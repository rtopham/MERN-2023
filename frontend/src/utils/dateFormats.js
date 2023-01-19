export const weekday = (date) => {
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }
  return new Intl.DateTimeFormat('en-US', options).format(date)
}

export const utcToutc = (date) => {
  const newDate = new Date(date)
  const day = newDate.getUTCDate()
  const month = newDate.getUTCMonth() + 1
  const year = newDate.getUTCFullYear()

  const monthString = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ]

  return monthString[month - 1] + ' ' + day + ', ' + year
}

export const usNormal = (date) => {
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }
  return new Intl.DateTimeFormat('en-US', options).format(new Date(date))
}

export const usShort = (date) => {
  const options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }
  return new Intl.DateTimeFormat('en-US', options).format(new Date(date))
}

export const calculateAge = (birthDate) => {
  const ageDifMs = Date.now() - new Date(birthDate).getTime()
  const ageDate = new Date(ageDifMs)
  const age = Math.abs(ageDate.getUTCFullYear() - 1970)
  return age
}

export const yearMonthDay = (date) => {
  const newDate = new Date(date)

  return (
    newDate.getFullYear() +
    '-' +
    String(newDate.getMonth() + 1).padStart(2, '0') +
    '-' +
    String(newDate.getDate()).padStart(2, '0')
  )
}
export const yearMonthDayUTC = (date) => {
  const newDate = new Date(date)
  return (
    newDate.getUTCFullYear() +
    '-' +
    String(newDate.getUTCMonth() + 1).padStart(2, '0') +
    '-' +
    String(newDate.getUTCDate()).padStart(2, '0')
  )
}

export const yearMonthDayEval = (date) => {
  if (date.substring(10) !== 'T00:00:00.000Z') return yearMonthDay(date)
  return yearMonthDayUTC(date)
}

export const todayStamp = () => {
  const stamp = Math.floor(new Date())
  //  console.log(stamp)
  return stamp
}

export const daysAgoStamp = (days) => {
  const today = new Date()
  const priorDate = new Date().setDate(today.getDate() - days)

  return priorDate
}

export const beginYearStamp = () => {
  const today = new Date()
  const stamp = Math.floor(new Date(today.getFullYear(), 0, 1))

  return stamp
}
export const beginLastYearStamp = () => {
  const today = new Date()
  return Math.floor(new Date(today.getFullYear() - 1, 0, 1))
}

export const fksInceptionStamp = () => {
  return 1420070400000
}

export const dateToStamp = (date) => {
  const stamp = Math.floor(new Date(date))

  return stamp
}
