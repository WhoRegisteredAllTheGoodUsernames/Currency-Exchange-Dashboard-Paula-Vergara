import { Suspense } from 'react';
import Loading from './loading';
import Converter from './converter/converter';
import Overview from './overview/overview';
import Header from './ui/header';
import Footer from './ui/footer';

export default function Home() {
	return (
		<div className="flex flex-col min-h-screen">
			<Header />
			<main className="grow flex flex-col">
				<Suspense fallback={<Loading />}>
					<Overview />
				</Suspense>
				<div className="grow flex flex-row justify-center items-center">
					<Suspense fallback={<Loading />}>
						<Converter />
					</Suspense>
				</div>
			</main>
			<Footer />
		</div>
	);
}
