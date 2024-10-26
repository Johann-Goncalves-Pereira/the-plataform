import { component$, Slot } from '@builder.io/qwik'
import type { RequestHandler } from '@builder.io/qwik-city'

import styles from './layout.module.scss'

import Header from '~/components/layout/header/header'
import Footer from '~/components/layout/footer/footer'
import Section from '~/components/template/section/section'

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
	return (
		<>
			<Header />
			<Section tag='main'>
				<Slot />
			</Section>
			<Section
				class={styles.sidebar}
				tag='aside'
				aria-labelledby='sidebar--right'
			></Section>
			<Footer />
		</>
	)
})
