const formatter = Intl.DateTimeFormat("sv-SE", {year: "numeric", month: "2-digit", day: "2-digit"})

export default function formatDate(date: Date) {
	return formatter.format(date)
}

