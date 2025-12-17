import { ChangeEventHandler } from 'react'

export default function DateSelector({
	id, label, value, max, min, action
}: {
	id: string
	label: string
	value: string
	max: string
	min:string
	action: ChangeEventHandler<HTMLInputElement>
}) {
	return (
		<div className="flex gap-5 items-center">
			<label>{label}</label>
			<input
				className="w-min border rounded-sm border-stone-300 p-2"
				id={id}
				value={value}
				type="date"
				max={max}
				min={min}
				onChange={action}/>
		</div>
	)
}
