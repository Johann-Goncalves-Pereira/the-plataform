import {
	$,
	component$,
	useSignal,
	useStyles$,
	useStylesScoped$,
} from '@builder.io/qwik'

import styles from './layout-template.module.scss'
import Section from '~/components/template/section/section'

export default component$(() => {
	return (
		<>
			<article class={`${styles.color} ${styles.widget}`}>
				<button class={styles.transparentButton}>Open colors</button>
				<Section class={styles.color__section} tag='section'>
					<ol class={`${styles.scheme} light--scheme`}>
						<li aria-rowcount={1}>Surface light 100</li>
						<li aria-rowcount={2}>Surface light 200</li>
						<li aria-rowcount={3}>Surface light 300</li>
					</ol>
					<ol class={styles.primary}>
						<li aria-rowcount={1}>Primary 100</li>
						<li aria-rowcount={6}>Primary 600</li>
						<li aria-rowcount={2}>Primary 200</li>
						<li aria-rowcount={7}>Primary 700</li>
						<li aria-rowcount={3}>Primary 300</li>
						<li aria-rowcount={8}>Primary 800</li>
						<li aria-rowcount={4}>Primary 400</li>
						<li aria-rowcount={9}>Primary 900</li>
						<li aria-rowcount={5}>Primary 500</li>
						<li aria-rowcount={10}>Primary 999</li>
					</ol>
					<ol class={`${styles.scheme} dark--scheme`}>
						<li aria-rowcount={1}>Surface dark 100</li>
						<li aria-rowcount={2}>Surface dark 200</li>
						<li aria-rowcount={3}>Surface dark 300</li>
					</ol>
				</Section>
			</article>
		</>
	)
})
