const formatter = Intl.DateTimeFormat("sv-SE", {year: "numeric", month: "2-digit", day: "2-digit"})

// Returns the string representation of the date, using the format "YYYY-MM-DD".
export default function formatDate(date: Date) {
	return formatter.format(date)
}

