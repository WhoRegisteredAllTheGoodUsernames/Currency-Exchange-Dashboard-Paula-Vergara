"use server"

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

// Fetches the exchange data for date range, base currency and the comparison
// 	currencies and generates a data dict for Chart.js to use in a multiline chart.
export async function getTimeline(base: string, from: string, to: string) {
	let range = "latest"
	const fromDate = new Date(Date.parse(from) + 24*60*60*1000), toDate = new Date(Date.parse(to) + 24*60*60*1000)

	// Uses only the latest data if the date is not correct
	if (fromDate.getTime() < toDate.getTime()){
		range = formatDate(fromDate) + '..' + formatDate(toDate)
	}

	const currencies: Currencies = await getCurrencies();
	const selected: string[] = []
	let i = 10

	// Filters the base from comparison
	for (const currency of Object.keys(currencies)){
		if (i <= 0)
			break
		if (currency == base)
			continue

		selected.push(currency)
		i -= 1
	}

	const res = await fetch(`https://api.frankfurter.dev/v1/${range}?base=${base}&symbols=${selected.toString()}`)
	
	if (!res.ok){
		throw Error("Fetch failed")
	}
	
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
