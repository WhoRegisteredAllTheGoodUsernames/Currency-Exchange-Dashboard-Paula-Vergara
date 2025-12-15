'use client'
import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import CurrenciesSelect from '../currencies/currenciesSelect';
import getResult from './getResult';
import Loading from '../loading';

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
				onChange={(e) => onSelectAmount(Number(e.target.value))}
			/>
			<div>
				<CurrenciesSelect
					id="from"
					onSelect={onSelectFrom}
				/>
			</div>
			<div>
				<CurrenciesSelect
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
	const [result, setResult] = useState<number | null>(null);

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
	const [from, setFrom] = useState("EUR");
	const [to, setTo] = useState("USD");
	const [amount, setAmount] = useState(0);
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
