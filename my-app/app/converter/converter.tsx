'use client'

function Selector() {
	return <p>Selector</p>;
}

function Result() {
	return <p>Result</p>;
}

export default function Converter() {
	return (
		<div>
			<Selector />
			<Result />
		</div>
	)
}
