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
			<main className="grow">
				<Suspense fallback={<Loading />}>
					<Overview />
				</Suspense>
				<Suspense fallback={<Loading />}>
					<Converter />
				</Suspense>
			</main>
			<Footer />
		</div>
	);
}
