'use client'
import { useState, useEffect, Dispatch, SetStateAction } from 'react'
import "chart.js/auto"
import { Line } from 'react-chartjs-2'
import CurrenciesSelect from '../currencies/currenciesSelect'
import { Data, getTimeline } from './getTimeline'
import Loading from '../loading'
import { DEFAULT_CURR_BASE, DEFAULT_DATE_FROM, DEFAULT_DATE_TO } from '../defaults/defaults'

function Selector({
	onSelectBase, onSelectFrom, onSelectTo
}: {
	onSelectBase: Dispatch<SetStateAction<string>>,
	onSelectFrom: Dispatch<SetStateAction<string>>,
	onSelectTo: Dispatch<SetStateAction<string>>
}) {
	const [from, setFrom] = useState(DEFAULT_DATE_FROM);
	const [to, setTo] = useState(DEFAULT_DATE_TO);
	
	return (
		<div id="selector">
			<input
				id="from"
				defaultValue={DEFAULT_DATE_FROM}
				type="date"
				max={to}
				onChange={(e) => {
					onSelectFrom(e.target.value)
					setFrom(e.target.value)
				}}
			/>
			<input
				id="to"
				defaultValue={DEFAULT_DATE_TO}
				min={from}
				type="date"
				onChange={(e) => {
					onSelectTo(e.target.value)
					setTo(e.target.value)
				}}
			/>
			<div>
				<CurrenciesSelect
					def={DEFAULT_CURR_BASE}
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
	const [base, setBase] = useState(DEFAULT_CURR_BASE);
	const [from, setFrom] = useState(DEFAULT_DATE_FROM);
	const [to, setTo] = useState(DEFAULT_DATE_TO);
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
