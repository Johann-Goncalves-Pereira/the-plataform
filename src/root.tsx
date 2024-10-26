import { component$, useSignal } from '@builder.io/qwik';
import {
	QwikCityProvider,
	RouterOutlet,
	ServiceWorkerRegister,
} from '@builder.io/qwik-city'
import { RouterHead } from './components/router-head/router-head'
import { isDev } from '@builder.io/qwik/build'

import './root.scss'

export default component$(() => {
	const time = useSignal<Date>(new Date())
	const hour = time.value.getHours()

	/**
	 * The root of a QwikCity site always start with the <QwikCityProvider> component,
	 * immediately followed by the document's <head> and <body>.
	 *
	 * Don't remove the `<head>` and `<body>` elements.
	 */

	return (
		<QwikCityProvider>
			<head>
				<meta charset='utf-8' />
				{!isDev && (
					<link
						rel='manifest'
						href={`${import.meta.env.BASE_URL}manifest.json`}
					/>
				)}
				<meta
					name='color-scheme'
					content={hour > 9 && hour < 17 ? 'light' : 'dark'}
				/>
				<RouterHead />
			</head>
			<body lang='en'>
				<RouterOutlet />
				{!isDev && <ServiceWorkerRegister />}
			</body>
		</QwikCityProvider>
	)
})
