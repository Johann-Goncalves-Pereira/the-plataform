import {
	$,
	ButtonHTMLAttributes,
	component$,
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
	class?: string
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
	({ id, class: className, fnQRL$, rest }: DialogProps) => (
		<dialog
			class={`${className} ${sectionStyles.section}`}
			id={id.dialog}
			aria-labelledby={id.button}
			{...rest}
			onClick$={fnQRL$}
		>
			<Slot />
		</dialog>
	),
)

export const handleOpenDialog = (dialogID: string, open: boolean) => {
	const dialog = document.getElementById(dialogID) as HTMLDialogElement | null

	if (dialog) {
		open = dialog.open
		dialog.open ? dialog.close() : dialog.showModal()
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
			// onClick$={async () => await qrlFunction$()}
			{...rest}
		>
			<Slot />
		</button>
	),
)
