import {
	ButtonHTMLAttributes,
	component$,
	CSSProperties,
	DialogHTMLAttributes,
	QRL,
	QRLEventHandlerMulti,
	Slot,
} from '@builder.io/qwik'

import sectionStyles from '../template/section/section.module.scss'

interface Signal {
	open: boolean
	id: {
		dialog: string
		button: string
	}
}

interface DialogProps extends Signal {
	type?: 'dialog' | 'modal'
	class?: string
	style?: CSSProperties
	fnQRL$?: QRL<(ev: MouseEvent, el: HTMLDialogElement) => Promise<void>>
	rest?:
		| DialogHTMLAttributes<HTMLDialogElement>
		| QRLEventHandlerMulti<PointerEvent, HTMLElement>
}

interface DialogButtonProps extends Signal {
	class?: string
	aria: {
		label: string
		expanded: boolean
	}
	fnQRL$?: QRL<() => unknown>
	rest?:
		| ButtonHTMLAttributes<HTMLButtonElement>
		| QRLEventHandlerMulti<PointerEvent, HTMLElement>
}

export const handleCloseDialog = (
	ev: MouseEvent,
	el: HTMLDialogElement,
	open: boolean,
) => {
	const dimensions = el.getBoundingClientRect()

	if (
		ev.clientX < dimensions.left ||
		ev.clientX > dimensions.right ||
		ev.clientY < dimensions.top ||
		ev.clientY > dimensions.bottom
	) {
		open = el.open
		el.close()
	}
}

export const Dialog = component$(
	({
		type = 'modal',
		id,
		class: className,
		style,
		fnQRL$,
		rest,
	}: DialogProps) => {
		{
			if (type === 'modal')
				return (
					<dialog
						class={`${className} ${sectionStyles.section}`}
						id={id.dialog}
						aria-labelledby={id.button}
						style={style}
						{...rest}
						onClick$={fnQRL$}
					>
						<Slot />
					</dialog>
				)

			if (type === 'dialog')
				return (
					<dialog class={className} id={id.dialog} style={style} {...rest}>
						<aside onClick$={fnQRL$} class={sectionStyles.section}>
							<Slot />
						</aside>
					</dialog>
				)
		}
	},
)

export const handleOpenDialog = (
	type: 'dialog' | 'modal',
	dialogID: string,
	open: boolean,
) => {
	const dialog = document.getElementById(dialogID) as HTMLDialogElement | null

	if (dialog) {
		open = dialog.open
		if (type === 'modal') dialog.open ? dialog.close() : dialog.showModal()
		if (type === 'dialog') dialog.open ? dialog.close() : dialog.show()
	}
}

export const DialogButton = component$(
	({
		id,
		class: className,
		aria,
		fnQRL$: qrlFunction$,
		rest,
	}: DialogButtonProps) => (
		<button
			class={className}
			id={id.button}
			aria-label={aria.label}
			aria-controls={id.dialog}
			aria-expanded={aria.expanded}
			aria-haspopup='true'
			onClick$={qrlFunction$}
			{...rest}
		>
			<Slot />
		</button>
	),
)
