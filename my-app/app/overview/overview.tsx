'use client'

function Selector() {
	return <p>Selector</p>;
}

function Currencies() {
	return <p>Currencies</p>;
}

export default function Overview() {
	return (
		<div>
			<Selector />
			<Currencies />
		</div>
	)
}
