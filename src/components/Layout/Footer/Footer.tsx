import { component$, useStylesScoped$ } from '@builder.io/qwik'

import styles from './Footer.scss?inline'

export default component$(() => {
	useStylesScoped$(styles)

	return (
		<footer>
			<h1>Footer</h1>
		</footer>
	)
})
