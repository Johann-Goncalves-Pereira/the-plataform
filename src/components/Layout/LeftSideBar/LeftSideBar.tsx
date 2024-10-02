import { component$, useStylesScoped$ } from '@builder.io/qwik'

import styles from './LeftSideBar.scss?inline'

export default component$(() => {
	useStylesScoped$(styles)

	return (
		<aside class='sidebar' aria-labelledby='sidebar--left'>
			<h1>LeftSideBar</h1>
		</aside>
	)
})
