import formatDate from '../utils/formatDate'

const date = new Date()

export const DEFAULT_CURR_FROM = "USD"
export const DEFAULT_CURR_TO = "EUR"
export const DEFAULT_CURR_BASE = DEFAULT_CURR_FROM
export const DEFAULT_DATE_TO = formatDate(date)
export const DEFAULT_DATE_FROM = formatDate(new Date(date.getTime() - 5*24*60*60*1000))
