import { $, component$, useSignal, useStore } from '@builder.io/qwik'

// import ProfilePicture from '/public/profile-pictures/001.jpg?jsx'
import { LuSearch, LuBell, LuWallet } from '@qwikest/icons/lucide'

import { generate } from 'random-words'

import styles from './header.module.scss'
import Section from '~/components/template/section/section'
import {
	Dialog,
	DialogButton,
	handleCloseDialog,
	handleOpenDialog,
} from '~/components/dialog/dialog'
import { Link } from '@builder.io/qwik-city'

export default component$(() => {
	const uniqueId = styles.header

	/* States */
	const showMore = useSignal(false)
	const search = useStore({
		id: {
			dialog: `search__dialog_${uniqueId}`,
			button: `search__button_${uniqueId}`,
		},
		open: false,
	})

	/* Widget */
	const widgetPosition = useStore({
		left: 8,
		top: 8,
	})

	const getHeaderBoundary$ = $(() => {
		if (widgetPosition.left !== 8) return
		const header = document.getElementById(`header_${uniqueId}`)
		if (header) {
			const rect = header.getBoundingClientRect()
			const calculateHowMuchToLeft = rect.right + 8
			widgetPosition.left = calculateHowMuchToLeft
			widgetPosition.top = rect.top
		}
	})

	/* Search */
	const handleSearchOpen$ = $(() => {
		handleOpenDialog(search.id.dialog, search.open)
		search.open = true
	})

	const handleSearchClose$ = $((ev: MouseEvent, el: HTMLDialogElement) => {
		const dimensions = el.getBoundingClientRect()

		if (
			ev.clientX < dimensions.left ||
			ev.clientX > dimensions.right ||
			ev.clientY < dimensions.top ||
			ev.clientY > dimensions.bottom
		) {
			search.open = false
		}

		setTimeout(() => {
			handleCloseDialog(ev, el, search.open)
		}, 200)
	})

	return (
		<>
			<Section
				class={`${styles.header} ${styles[showMore.value ? 'show' : 'hide']}`}
				tag='header'
				rest={{ id: `header_${uniqueId}` }}
			>
				<article class={styles.profile}>
					<header class={styles.profile__header}>
						<Link href='/profile'>
							{/* <ProfilePicture
							class={styles.profilePicture}
							alt='Profile picture'
						/> */}
						<img
							class={styles.profilePicture}
							src={`/profile-pictures/${String(Math.floor(Math.random() * 14)).padStart(2, '0')}.avif`}
							alt='Profile picture'
							width={16 * 6}
							height={16 * 6}
						/>
						{!showMore.value && (
							<h3 class={styles.profileName}>
								{(generate(Math.random() * 6) as string[]).join(' ')}
							</h3>
						)}
						</Link>
					
					</header>

					<div class={styles.profile__body}>
						<button class={styles.profileButton}>
							<LuBell />
						</button>

						<DialogButton
							class={styles.profileButton}
							id={{
								dialog: search.id.dialog,
								button: search.id.button,
							}}
							aria={{
								label: 'Open dialog (Spotlight) for search',
								expanded: search.open,
							}}
							open={search.open}
							fnQRL$={handleSearchOpen$}
							rest={{
								onFocus$: getHeaderBoundary$,
							}}
						>
							<LuSearch />
						</DialogButton>
					</div>

					<footer class={styles.profile__footer}>
						<Link
							class={styles.profileWallet}
							href='/account-wallet'
							aria-label='Link to wallet page'
						>
							<LuWallet />
							<small>Wallet:</small>
							<p>R$ 10,000</p>
						</Link>
					</footer>
				</article>
			</Section>
			<Dialog
				class={styles.search__dialog}
				id={{
					dialog: search.id.dialog,
					button: search.id.button,
				}}
				open={search.open}
				fnQRL$={$(
					async (ev: MouseEvent, el: HTMLDialogElement) =>
						await handleSearchClose$(ev, el),
				)}
				rest={{
					style: `
						transform: translateX(${search.open ? widgetPosition.left : 0}px);
						top: ${widgetPosition.top}px;
						opacity: ${search.open ? 1 : 0}`,
				}}
			>
				<div class={styles.searchWrapper}>
					<input type='search' />
					<LuSearch />
				</div>

				<p>the possibilites are inimaginavel</p>
			</Dialog>
		</>
	)
})
