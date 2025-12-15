export type Currencies = Record<string, string>;

export async function getCurrencies() {
  const res = await fetch('https://api.frankfurter.dev/v1/currencies', {
	  cache: 'force-cache',
	  next: { revalidate: false }
  });
  const currencies: Currencies = await res.json()
 
  return currencies
}
