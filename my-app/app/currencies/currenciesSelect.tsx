import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { Currencies, getCurrencies } from '../currencies/currencies';
import Loading from '../loading';

export default function CurrenciesSelect({
		id, onSelect
	}: {
		id: string,
		onSelect: Dispatch<SetStateAction<string>>
	}) {
	const [currencies, setCurrencies] = useState<Currencies | null>(null);

	useEffect(() => {
		const data = async () => {
			setCurrencies(await getCurrencies())
		}
		data()
	}, [])

	if (!currencies){
		return <Loading />
	}

	const options = Object.entries(currencies).map(([code, name]) => (
		<option value={code} key={code}>{name}</option>
	))

	return (
		<select
			id={id}
			onChange={(e) => onSelect(e.target.value)}
		>
			{options}
		</select>
	)

}

