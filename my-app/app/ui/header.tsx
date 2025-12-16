export default function Header() {
	return (
	<header className="max-w-full bg-black text-white px-10 py-2">
		<div className="flex flex-col md:flex-row flex-wrap gap-x-5 items-center">
			<span className="text-[3rem] font-bold">Currencies</span>
			<span className="text-base font-normal">Exchange Rates & Conversion</span>
		</div>
	</header>
	)
}
