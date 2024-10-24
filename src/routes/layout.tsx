import { component$, Slot, useStyles$ } from '@builder.io/qwik'
import type { RequestHandler } from '@builder.io/qwik-city'

import styles from './layout.scss?inline'

import Header from '~/components/Layout/Header/Header'
import LeftSideBar from '~/components/Layout/LeftSideBar/LeftSideBar'
import RightSideBar from '~/components/Layout/RightSideBar/RightSideBar'
import Footer from '~/components/Layout/Footer/Footer'

export const onGet: RequestHandler = async ({ cacheControl }) => {
	// Control caching for this request for best performance and to reduce hosting costs:
	// https://qwik.dev/docs/caching/
	cacheControl({
		// Always serve a cached response by default, up to a week stale
		staleWhileRevalidate: 60 * 60 * 24 * 7,
		// Max once every 5 seconds, revalidate on the server to get a fresh version of this page
		maxAge: 5,
	})
}

export default component$(() => {
	useStyles$(styles)

	return (
		<>
			<Header />
			<LeftSideBar />
			<main>
				<Slot />
			</main>
			<RightSideBar />
			<Footer />
		</>
	)
})
