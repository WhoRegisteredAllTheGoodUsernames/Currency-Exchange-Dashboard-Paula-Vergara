import { Currencies, getCurrencies } from '../currencies/currencies'
import formatDate from '../utils/formatDate'

interface TimeSeriesData {
	"base": string,
	"start_date"?: string,
	"end_date"?: string,
	"date"?: string,
	"rates": {
		[date: string]: {
			[code: string]: number
		}
	}
}

export interface Data {
	"labels": string[],
	"datasets": {
		"label": string,
		"data": number[]
	}[]
}

export async function getTimeline(base: string, from: string, to: string) {
	let range = "latest"
	const fromDate = new Date(from), toDate = new Date(to)

	if (fromDate.getTime() < toDate.getTime()){
		range = formatDate(fromDate) + '..' + formatDate(toDate)
	}

	const currencies: Currencies = await getCurrencies();
	const selected: string[] = []
	let i = 10
	for (const currency of Object.keys(currencies)){
		if (i <= 0)
			break
		if (currency == base)
			continue

		selected.push(currency)
		i -= 1
	}

	const res = await fetch(`https://api.frankfurter.dev/v1/${range}?base=${base}&symbols=${selected.toString()}`)
	const data: TimeSeriesData = await res.json()
	const dates: string[] = []
	const currencyValues: Record<string, number[]> = {}

	Object.entries(data.rates).map(([date, currs]) => {
		dates.push(date)
		Object.entries(currs).map(([code, value]) => {
			if (currencyValues[code] == undefined){
				currencyValues[code] = []
			}

			currencyValues[code].push(value)
		})
	})

	const datasets = Object.entries(currencyValues).map(([code, values]) => ({
		"label": currencies[code],
		"data": values
	}))

	return {
		"labels": dates,
		"datasets": datasets
	} as Data
}
