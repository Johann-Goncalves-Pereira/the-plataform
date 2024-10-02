import { component$, useStylesScoped$ } from '@builder.io/qwik'

import styles from './Header.scss?inline'

export default component$(() => {
	useStylesScoped$(styles)
	return (
		<header>
			<h1>Header</h1>
		</header>
	)
})
