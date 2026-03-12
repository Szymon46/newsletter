// Returns a date object as a string with a format of: hours:minutes day-month-year
export default function formatDate(date) {
  const hours = date.getHours() > 9 ? date.getHours() : `0${date.getHours()}`
  const minutes =
    date.getMinutes() > 9 ? date.getMinutes() : `0${date.getMinutes()}`
  const day = date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`
  const month =
    date.getMonth() + 1 > 9 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`
  const year = date.getFullYear()

  return `${hours}:${minutes} ${day}-${month}-${year}`
}
