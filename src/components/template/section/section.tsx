import { component$, Slot, useStyles$ } from '@builder.io/qwik'

import styles from './section.module.scss'

interface Props {
	tag: 'section' | 'div' | 'article'
	classScoped?: { scope: string; class: string }
}

export default component$(({ tag, classScoped }: Props) => {

	return (
		<>
			{tag === 'section' && (
				<section
					class={`${styles.section} ${classScoped?.scope} ${classScoped?.class}`}
				>
					<Slot />
				</section>
			)}
			{tag === 'div' && (
				<div
					class={`${styles.section} ${classScoped?.scope} ${classScoped?.class}`}
				>
					<Slot />
				</div>
			)}
			{tag === 'article' && (
				<article
					class={`${styles.section} ${classScoped?.scope} ${classScoped?.class}`}
				>
					<Slot />
				</article>
			)}
		</>
	)
})
