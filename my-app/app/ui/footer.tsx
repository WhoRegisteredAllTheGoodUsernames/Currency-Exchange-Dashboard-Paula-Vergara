export default function Footer() {
  return (
	  <footer className="max-w-full bg-stone-100 px-10 py-5">
		<div className="flex flex-col md:flex-row flex-wrap gap-5 justify-start">
			<div className="order-1 md:basis-1/3">
				<h2 className="text-lg font-bold">Currencies: Exchange Rates & Conversion</h2>
				<p>Simulated Rates. Real Conversion Logic. For Testing Purposes Only.</p>
			</div>
			<div className="order-2 md:basis-1/4">
				<h2 className="text-lg">About us</h2>
				<p>We are really cool!</p>
			</div>
			<div className="order-3 md:basis-1/3">
				<h2 className="text-lg">Contact</h2>
				<p>+123456789</p>
				<p>email@host.com</p>
				<p>Somewhere #123, Earth Planet</p>
			</div>
		</div>
	  </footer>
  )
}
