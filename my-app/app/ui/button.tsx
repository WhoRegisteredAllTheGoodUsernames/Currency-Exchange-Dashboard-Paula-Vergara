import { MouseEventHandler } from 'react'

export default function Button({
	text, baseColor, action
}: {
	text:string,
	baseColor: string,
	action: MouseEventHandler<HTMLButtonElement>
}) {
	return (
		<button
			className={`rounded-sm active:bg-${baseColor}-200 bg-${baseColor}-300 p-2`}
			onClick={action}>{text}</button>
	)
}
