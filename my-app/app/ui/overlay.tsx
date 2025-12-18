export default function Overlay() {
	return (
		<div className="bg-white/50 backdrop-blur-[2px] fixed inset-0 z-[9999] flex items-center justify-center">
			<p>This application requires network connection. Waiting until resumed.</p>
		</div>
	)
}
