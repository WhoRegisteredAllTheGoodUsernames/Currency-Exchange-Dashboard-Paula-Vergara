'use client'
import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import CurrenciesSelect from '../currencies/currenciesSelect';
import getResult from './getResult';
import Loading from '../loading';
import { DEFAULT_CURR_FROM, DEFAULT_CURR_TO } from '../defaults/defaults'
import Button from '../ui/button'

function Selector({
	from, to, amount, onSelectFrom, onSelectTo, onSelectAmount
}: {
	from: string,
	to: string,
	amount: number,
	onSelectFrom: Dispatch<SetStateAction<string>>,
	onSelectTo: Dispatch<SetStateAction<string>>
	onSelectAmount: Dispatch<SetStateAction<number>>
}) {
	return (
		<div className="flex flex-col md:flex-row gap-5 items-center"
			id="selector"
		>
			<input className="border rounded-sm border-stone-300 p-2"
				id="amount"
				type="number"
				value={amount}
				onChange={(e) => onSelectAmount(Number(e.target.value))}
			/>
			<div className="flex gap-2 items-center flex-col sm:flex-row">
				<div className="flex gap-5 items-center">
					<label>From</label>
					<CurrenciesSelect
						value={from}
						id="from"
						onSelect={onSelectFrom}
					/>
				</div>
				<Button
					text="&#8644;"
					baseColor="sky"
					action={() => {
						onSelectFrom(to)
						onSelectTo(from)
					}} />
				<div className="flex gap-5 items-center">
					<label>To</label>
					<CurrenciesSelect
						value={to}
						id="to"
						onSelect={onSelectTo}
					/>
				</div>
				<Button
					text="Clear"
					baseColor="stone"
					action={() => {
						onSelectFrom(DEFAULT_CURR_FROM)
						onSelectTo(DEFAULT_CURR_TO)
						onSelectAmount(100)
					}}/>
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

	return (
		<div>
			<p className="text-[2rem]">
				Result: <span className="font-bold">{result}</span>
			</p>
		</div>
	);
}


// Asegurarse que se desbuguee con los valores por defecto
export default function Converter() {
	const [from, setFrom] = useState(DEFAULT_CURR_FROM);
	const [to, setTo] = useState(DEFAULT_CURR_TO);
	const [amount, setAmount] = useState(100);
	return (
		<div className="px-5 py-10 flex flex-col gap-5 items-center max-w-full">
			<Selector
				from={from}
				to={to}
				amount={amount}
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
