import {
	ClassList,
	component$,
	HTMLAttributes,
	QRLEventHandlerMulti,
	Slot,
} from '@builder.io/qwik'

import styles from './section.module.scss'

interface Props {
	tag?: 'section' | 'div' | 'article' | 'main' | 'aside' | 'footer' | 'header'
	scope?: string
	class?: ClassList
	rest?:
		| HTMLAttributes<HTMLElement>
		| QRLEventHandlerMulti<PointerEvent, HTMLElement>
}

export default component$(
	({
		tag = 'section',
		scope: scopeId = '',
		class: className = '',
		rest,
	}: Props) => (
		<>
			{tag === 'section' && (
				<section class={`${styles.section} ${scopeId} ${className}`} {...rest}>
					<Slot />
				</section>
			)}
			{tag === 'div' && (
				<div class={`${styles.section} ${scopeId} ${className}`} {...rest}>
					<Slot />
				</div>
			)}
			{tag === 'article' && (
				<article class={`${styles.section} ${scopeId} ${className}`} {...rest}>
					<Slot />
				</article>
			)}
			{tag === 'main' && (
				<main class={`${styles.section} ${scopeId} ${className}`} {...rest}>
					<Slot />
				</main>
			)}
			{tag === 'aside' && (
				<aside class={`${styles.section} ${scopeId} ${className}`} {...rest}>
					<Slot />
				</aside>
			)}
			{tag === 'footer' && (
				<footer class={`${styles.section} ${scopeId} ${className}`} {...rest}>
					<Slot />
				</footer>
			)}
			{tag === 'header' && (
				<header class={`${styles.section} ${scopeId} ${className}`} {...rest}>
					<Slot />
				</header>
			)}
		</>
	),
)
