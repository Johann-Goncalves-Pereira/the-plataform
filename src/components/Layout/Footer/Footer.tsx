import { component$, useStylesScoped$ } from '@builder.io/qwik'

import styles from './footer.scss?inline'
import Section from '~/components/template/section/section'

export default component$(() => {
	useStylesScoped$(styles)

	return (
		<Section tag='footer'>
			<h1>Footer</h1>
		</Section>
	)
})
