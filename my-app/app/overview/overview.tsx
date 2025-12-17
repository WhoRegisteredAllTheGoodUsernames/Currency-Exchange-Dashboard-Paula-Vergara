'use client'
import { useState, useEffect, Dispatch, SetStateAction } from 'react'
import "chart.js/auto"
import { Line } from 'react-chartjs-2'
import CurrenciesSelect from '../currencies/currenciesSelect'
import { Data, getTimeline } from './getTimeline'
import Loading from '../loading'
import { DEFAULT_CURR_BASE, DEFAULT_DATE_FROM, DEFAULT_DATE_TO } from '../defaults/defaults'
import Button from '../ui/button'
import DateSelector from '../ui/dateSelector'

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
				<DateSelector
					id="from"
					label="From"
					value={from}
					max={to}
					min=""
					action={(e) => onSelectFrom(e.target.value)}
				/>
				<DateSelector
					id="to"
					label="To"
					value={to}
					max=""
					min={from}
					action={(e) => onSelectTo(e.target.value)}
				/>
			</div>
			<Button
				text="Clear"
				baseColor="stone"
				action={() => {
					onSelectFrom(DEFAULT_DATE_FROM)
					onSelectTo(DEFAULT_DATE_TO)
					onSelectBase(DEFAULT_CURR_BASE)
				}}/>
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
