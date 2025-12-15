'use client'
import { useState, useEffect, Dispatch, SetStateAction } from 'react'
import "chart.js/auto"
import { Line } from 'react-chartjs-2'
import CurrenciesSelect from '../currencies/currenciesSelect'
import { Data, getTimeline } from './getTimeline'
import Loading from '../loading'

function Selector({
	onSelectBase, onSelectFrom, onSelectTo
}: {
	onSelectBase: Dispatch<SetStateAction<string>>,
	onSelectFrom: Dispatch<SetStateAction<string>>,
	onSelectTo: Dispatch<SetStateAction<string>>
}) {
	const [from, setFrom] = useState(Date());
	const [to, setTo] = useState(Date());
	
	return (
		<div id="selector">
			<input
				id="from"
				type="date"
				max={to}
				onChange={(e) => {
					onSelectFrom(e.target.value)
					setFrom(e.target.value)
				}}
			/>
			<input
				id="to"
				min={from}
				type="date"
				onChange={(e) => {
					onSelectTo(e.target.value)
					setTo(e.target.value)
				}}
			/>
			<div>
				<CurrenciesSelect
					id="base"
					onSelect={onSelectBase}
				/>
			</div>
		</div>
	)
}

function CurrenciesTimeline({
	base, from, to
}: {
	base: string,
	from: string,
	to: string
}) {
	
	const [data, setData] = useState<Data | null>(null);

	useEffect(() => {
		const getData = async () => {
			setData(await getTimeline(base, from, to))
		}
		getData()
	}, [base, from, to])

	if (!data){
		return <Loading />
	}

	return <Line data={data}/>;
}

export default function Overview() {
	const [base, setBase] = useState("EUR");
	const [from, setFrom] = useState(Date());
	const [to, setTo] = useState(Date());
	return (
		<div>
			<Selector
				onSelectBase={setBase}
				onSelectFrom={setFrom}
				onSelectTo={setTo}
			/>
			<CurrenciesTimeline
				base={base}
				from={from}
				to={to}
			/>
		</div>
	)
}
