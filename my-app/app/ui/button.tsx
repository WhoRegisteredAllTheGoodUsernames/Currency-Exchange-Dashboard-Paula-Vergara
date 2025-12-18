import { MouseEventHandler } from 'react'

export default function Button({
	text, baseColor, action
}: {
	text:string,
	baseColor: string,
	action: MouseEventHandler<HTMLButtonElement>
}) {
	// Not very neat, but could be expanded for more colors
	let classes = "rounded-sm p-2 "
	if (baseColor == "stone") {
		classes += "active:bg-stone-200 bg-stone-300"
	} else {
		classes += "active:bg-sky-200 bg-sky-300"
	}

	return (
		<button
			className={classes}
			onClick={action}>{text}</button>
	)
}
