import { component$, Slot, useStyles$ } from '@builder.io/qwik'

import styles from './template.scss?inline'

export default component$(() => {
	useStyles$(styles)
	return (
		<>
			<main class='layout-template'>
				<article class='light'>
					<header></header>
					<section></section>
					<footer></footer>
				</article>

				<div class='primary'>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
				</div>

				<article class='dark'>
					<header></header>
					<section></section>
					<footer></footer>
				</article>
			</main>
		</>
	)
})
