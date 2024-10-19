import {
	$,
	component$,
	useSignal,
	useStyles$,
	useStylesScoped$,
} from '@builder.io/qwik'

import styles from './template.scss?inline'
import Section from '~/components/template/section/section'

export default component$(() => {
	useStylesScoped$(styles)

	const scope = useSignal(useStylesScoped$(styles).scopeId)

	return (
		<>
			<div class='color'>
				<button>Open colors</button>
				<Section
					tag='section'
					classScoped={{ scope: scope.value, class: 'color__section' }}
				>
					<ol class='light'>
						<li></li>
						<li></li>
						<li></li>
					</ol>
					<ol class='primary'>
						<li></li>
						<li></li>
						<li></li>
						<li></li>
						<li></li>
						<li></li>
						<li></li>
						<li></li>
						<li></li>
						<li></li>
					</ol>
					<ol class='dark'>
						<li></li>
						<li></li>
						<li></li>
					</ol>
				</Section>
			</div>
		</>
	)
})

const DDD = component$(() => {
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
