import { Suspense } from 'react';
import Loading from './loading';
import Converter from './converter/converter';
import Overview from './overview/overview';
import Header from './ui/header';
import Footer from './ui/footer';

export default function Home() {
	return (
		<div>
			<header>
				<Header />
			</header>
			<main>
				<Suspense fallback={<Loading />}>
					<Overview />
				</Suspense>
				<Suspense fallback={<Loading />}>
					<Converter />
				</Suspense>
			</main>
			<footer>
				<Footer />
			</footer>
		</div>
	);
}
