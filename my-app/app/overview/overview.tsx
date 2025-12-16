'use client'
import { useState, useEffect, Dispatch, SetStateAction } from 'react'
import "chart.js/auto"
import { Line } from 'react-chartjs-2'
import CurrenciesSelect from '../currencies/currenciesSelect'
import { Data, getTimeline } from './getTimeline'
import Loading from '../loading'
import { DEFAULT_CURR_BASE, DEFAULT_DATE_FROM, DEFAULT_DATE_TO } from '../defaults/defaults'

function Selector({
	from, to, base, onSelectBase, onSelectFrom, onSelectTo
}: {
	from: string,
	to: string,
	base: string,
	onSelectBase: Dispatch<SetStateAction<string>>,
	onSelectFrom: Dispatch<SetStateAction<string>>,
	onSelectTo: Dispatch<SetStateAction<string>>
}) {
	return (
		<div id="selector">
		<button onClick={() => {
			onSelectFrom(DEFAULT_DATE_FROM)
			onSelectTo(DEFAULT_DATE_TO)
			onSelectBase(DEFAULT_CURR_BASE)
		}}>Clear</button>
			<input
				id="from"
				value={from}
				type="date"
				max={to}
				onChange={(e) => onSelectFrom(e.target.value)}/>
			<input
				id="to"
				value={to}
				min={from}
				type="date"
				onChange={(e) => onSelectTo(e.target.value)}/>
			<div>
				<CurrenciesSelect
					value={base}
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
				from={from}
				to={to}
				base={base}
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
