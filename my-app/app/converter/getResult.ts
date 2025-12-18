"use server"

// Fetches the latest exchange rate for the currencies and calculates the
// 	equivalent amount
export default async function getResult(from: string, to: string, amount: number) {
	if (from == to){
		return amount
	}

	const res = await fetch(`https://api.frankfurter.dev/v1/latest?base=${from}&symbols=${to}`, {
		cache: 'force-cache',
	next: { revalidate: false }
	})

	if (!res.ok) {
		throw Error("Fetch failed")
	}

	const data = await res.json()
	const conversion = await data.rates[to] * amount

	return conversion.toFixed(3)
}
