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
		<div className="flex flex-col items-center gap-5"
			id="selector"
		>
				<CurrenciesSelect
					value={base}
					id="base"
					onSelect={onSelectBase}
				/>
			<div className="flex gap-2 items-center flex-col">
				<div className="flex gap-5 items-center">
					<label>From</label>
					<input
						className="w-min border rounded-sm border-stone-300 p-2"
						id="from"
						value={from}
						type="date"
						max={to}
						onChange={(e) => onSelectFrom(e.target.value)}/>
				</div>
				<div className="flex gap-5 items-center">
					<label>To</label>
					<input
						className="w-min border rounded-sm border-stone-300 p-2"
						id="to"
						value={to}
						min={from}
						type="date"
						onChange={(e) => onSelectTo(e.target.value)}/>
				</div>
			</div>
			<button
				className="rounded-sm active:bg-stone-200 bg-stone-300 p-2"
				onClick={() => {
					onSelectFrom(DEFAULT_DATE_FROM)
					onSelectTo(DEFAULT_DATE_TO)
					onSelectBase(DEFAULT_CURR_BASE)
			}}>Clear</button>
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
	const options = {"responsive": true, "maintainAspectRatio": false}

	useEffect(() => {
		const getData = async () => {
			setData(await getTimeline(base, from, to))
		}
		getData()
	}, [base, from, to])

	if (!data){
		return <Loading />
	}

	return <Line data={data} options={options}/>;
}

export default function Overview() {
	const [base, setBase] = useState(DEFAULT_CURR_BASE);
	const [from, setFrom] = useState(DEFAULT_DATE_FROM);
	const [to, setTo] = useState(DEFAULT_DATE_TO);
	return (
		<div className="max-w-full px-10 py-5 flex flex-col md:flex-row gap-5 items-center h-[40rem] md:h-[20rem] shadow-md">
			<Selector
				from={from}
				to={to}
				base={base}
				onSelectBase={setBase}
				onSelectFrom={setFrom}
				onSelectTo={setTo}
			/>
			<div className="basis-full grow relative min-w-0 w-full h-full">
				<CurrenciesTimeline
					base={base}
					from={from}
					to={to}
				/>
			</div>
		</div>
	)
}
