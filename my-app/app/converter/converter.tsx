'use client'
import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import CurrenciesSelect from '../currencies/currenciesSelect';
import getResult from './getResult';
import Loading from '../loading';
import { DEFAULT_CURR_FROM, DEFAULT_CURR_TO } from '../defaults/defaults'

function Selector({
	onSelectFrom, onSelectTo, onSelectAmount
}: {
	onSelectFrom: Dispatch<SetStateAction<string>>,
	onSelectTo: Dispatch<SetStateAction<string>>
	onSelectAmount: Dispatch<SetStateAction<number>>
}) {
	return (
		<div id="selector">
			<input
				id="amount"
				type="number"
				defaultValue={100}
				onChange={(e) => onSelectAmount(Number(e.target.value))}
			/>
			<div>
				<CurrenciesSelect
					def={DEFAULT_CURR_FROM}
					id="from"
					onSelect={onSelectFrom}
				/>
			</div>
			<div>
				<CurrenciesSelect
					def={DEFAULT_CURR_TO}
					id="to"
					onSelect={onSelectTo}
				/>
			</div>
		</div>
	)
}

function Result({
	from, to, amount
}: {
	from: string,
	to: string,
	amount: number
}) {
	const [result, setResult] = useState<number>(100);

	useEffect(() => {
		const data = async () => {
			setResult(Number(await getResult(from, to, amount)))
		}
		data()
	}, [from, to, amount])

	if (!result){
		return <Loading />
	}

	return <p>Resultado: {result}</p>;
}


// Asegurarse que se desbuguee con los valores por defecto
export default function Converter() {
	const [from, setFrom] = useState(DEFAULT_CURR_FROM);
	const [to, setTo] = useState(DEFAULT_CURR_TO);
	const [amount, setAmount] = useState(100);
	return (
		<div>
			<Selector
				onSelectFrom={setFrom}
				onSelectTo={setTo}
				onSelectAmount={setAmount}
			/>
			<Result
				from={from}
				to={to}
				amount={amount}
			/>
		</div>
	)
}
