import { component$, useStylesScoped$ } from '@builder.io/qwik'

import styles from './RightSideBar.scss?inline'

export default component$(() => {
	useStylesScoped$(styles)

	return (
		<aside class='sidebar' aria-labelledby='sidebar--right'>
			<h1>RightSideBar</h1>
		</aside>
	)
})
