"use server"

export type Currencies = Record<string, string>;

// Fetches the currencies avaliable from the api. Returns a dict with pairs
// 	<currency code>: <currency name>
export async function getCurrencies() {
	const res = await fetch('https://api.frankfurter.dev/v1/currencies', {
		cache: 'force-cache',
		next: { revalidate: false }
	});

	if (!res.ok) {
		throw Error("Fetch failed")
	}

	const currencies: Currencies = await res.json()

	return currencies
}
