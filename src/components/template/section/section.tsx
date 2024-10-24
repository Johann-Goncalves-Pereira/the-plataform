import { ClassList, component$, Slot, useStyles$ } from '@builder.io/qwik'

import styles from './section.module.scss'

interface Props {
	tag: 'section' | 'div' | 'article'
	scope?: string
	class?: ClassList
}

export default component$(
	({ tag, scope: scopeId, class: className }: Props) => {
		const scope = scopeId ?? ''
		return (
			<>
				{tag === 'section' && (
					<section class={`${styles.section} ${scope} ${className}`}>
						<Slot />
					</section>
				)}
				{tag === 'div' && (
					<div class={`${styles.section} ${scope} ${className}`}>
						<Slot />
					</div>
				)}
				{tag === 'article' && (
					<article class={`${styles.section} ${scope} ${className}`}>
						<Slot />
					</article>
				)}
			</>
		)
	},
)
