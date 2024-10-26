import { $, component$, useSignal, useStore } from '@builder.io/qwik'

// import ProfilePicture from '/public/profile-pictures/001.jpg?jsx'
import {
	LuSearch,
	LuBell,
	LuWallet,
	LuLink,
	LuHash,
	LuBellDot,
} from '@qwikest/icons/lucide'

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
	const generatedWords = () =>
		(generate(Math.random() * 12) as string[]).join(' ')

	/* States */
	const showMore = useSignal(false)
	const search = useStore({
		id: {
			dialog: `search__dialog_${uniqueId}`,
			button: `search__button_${uniqueId}`,
		},
		open: false,
	})
	const notification = useStore({
		id: {
			dialog: `notification__dialog_${uniqueId}`,
			button: `notification__button_${uniqueId}`,
		},
		open: false,
	})

	// /* Widget */
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
		handleOpenDialog('modal', search.id.dialog, search.open)
		search.open = true
	})

	const handleSearchClose$ = $((ev: MouseEvent, el: HTMLDialogElement) => {
		const dimensions = el.getBoundingClientRect()

		setTimeout(() => {
			handleCloseDialog(ev, el, search.open)
		}, 200)
		if (handleCloseDialog(ev, el, search.open)) search.open = false
	})

	/* Notification */
	const handleNotificationOpen$ = $(() => {
		handleOpenDialog('modal', notification.id.dialog, notification.open)
		notification.open = true
	})

	const handleNotificationClose$ = $(
		(ev: MouseEvent, el: HTMLDialogElement) => {
			setTimeout(() => {
				handleCloseDialog(ev, el, notification.open)
			}, 200)
			if (handleCloseDialog(ev, el, notification.open))
				notification.open = false
		},
	)

	return (
		<>
			<Section
				class={`${styles.header} ${styles[showMore.value ? 'show' : 'hide']}`}
				tag='header'
				rest={{ id: `header_${uniqueId}` }}
			>
				<article class={styles.profile}>
					<header class={styles.profile__header}>
						<Link
							class={styles.profileLink}
							href='/profile'
							title='Link to profile page'
						>
							{/* <ProfilePicture
							class={styles.profilePicture}
							alt='Profile picture'
						/> */}
							<div class={styles.profilePicture}>
								<RandomImage
									alt='Profile picture'
									aria-label='Profile picture'
								/>
								<em>
									{
										['Dev', 'CS', 'Designer'][
											Math.floor(Math.random() * (3 - 1) + 1)
										]
									}
								</em>
							</div>
							{!showMore.value && (
								<h3 class={styles.profileName}>{generatedWords()}</h3>
							)}
						</Link>
					</header>

					<div class={styles.profile__body}>
						{/* <button class={styles.profileButton}>
							<LuBell />
						</button> */}
						<DialogButton
							class={styles.profileButton}
							id={{
								dialog: notification.id.dialog,
								button: notification.id.button,
							}}
							aria={{
								label: 'Open dialog for Notification',
								expanded: notification.open,
							}}
							open={notification.open}
							fnQRL$={handleNotificationOpen$}
							rest={{
								onFocus$: getHeaderBoundary$,
								title: 'Open dialog for Notification',
							}}
						>
							<LuBell />
						</DialogButton>

						<DialogButton
							class={styles.profileButton}
							id={{
								dialog: search.id.dialog,
								button: search.id.button,
							}}
							aria={{
								label: 'Open dialog (Spotlight) for Search',
								expanded: search.open,
							}}
							open={search.open}
							fnQRL$={handleSearchOpen$}
							rest={{
								title: 'Open dialog (Spotlight) for Search',
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
							title='Link to wallet page'
						>
							<LuWallet />
							<small>Wallet:</small>
							<p>R$ 10,000</p>
						</Link>
					</footer>
				</article>

				<nav class={styles.navigation}>
					<Link
						class={styles['navigation--active']}
						href='/opportunities'
						tabIndex={1}
						aria-hidden
					>
						Opportunities
						<div />
					</Link>
					<Link href='/rooms'>
						Rooms
						<div />
					</Link>
					<Link href='/activities'>
						Activities
						<div />
					</Link>
				</nav>
			</Section>
			<Dialog
				class={styles.notification__dialog}
				id={{
					dialog: notification.id.dialog,
					button: notification.id.button,
				}}
				open={notification.open}
				fnQRL$={$(
					async (ev: MouseEvent, el: HTMLDialogElement) =>
						await handleNotificationClose$(ev, el),
				)}
				style={{
					transform: `translateX(${notification.open ? widgetPosition.left : 0}px)`,
					top: `${widgetPosition.top}px`,
					opacity: `${notification.open ? 1 : 0}`,
				}}
			>
				<div class={styles.notificationTitle}>
					<LuBellDot />
					<h3>Unread messages</h3>
				</div>

				<hr class={styles.hr} />

				<ul class={styles.notificationList}>
					<NotificationListItem
						name={generatedWords()}
						message={generatedWords()}
					/>
					<NotificationListItem
						name={generatedWords()}
						message={generatedWords()}
					/>
					<NotificationListItem
						name={generatedWords()}
						message={generatedWords()}
					/>
					<NotificationListItem
						name={generatedWords()}
						message={generatedWords()}
					/>
					<NotificationListItem
						name={generatedWords()}
						message={generatedWords()}
					/>
				</ul>

				<div class={styles.notificationTitle}>
					<LuBell />
					<h3>Previous messages</h3>
				</div>

				<hr class={styles.hr} />

				<ul class={styles.notificationList}>
					<NotificationListItem
						name={generatedWords()}
						message={generatedWords()}
					/>
					<NotificationListItem
						name={generatedWords()}
						message={generatedWords()}
					/>
					<NotificationListItem
						name={generatedWords()}
						message={generatedWords()}
					/>
					<NotificationListItem
						name={generatedWords()}
						message={generatedWords()}
					/>
					<NotificationListItem
						name={generatedWords()}
						message={generatedWords()}
					/>
				</ul>
			</Dialog>
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
				style={{
					transform: `translateY(${search.open ? 0 : '2rem'})`,
					opacity: search.open ? 1 : 0,
				}}
			>
				<div class={styles.searchWrapper}>
					<input type='search' />
					<LuSearch />
				</div>
				<hr class={styles.hr} />

				<ul class={styles.searchList}>
					<SearchResultsLink words={generatedWords()} />
					<SearchResultsLink words={generatedWords()} />
					<SearchResultsLink words={generatedWords()} />
					<SearchResultsLink words={generatedWords()} />
					<SearchResultsHash words={generatedWords()} />
					<SearchResultsHash words={generatedWords()} />
					<SearchResultsHash words={generatedWords()} />
					<SearchResultsHash words={generatedWords()} />
					<SearchResultsHash words={generatedWords()} />
				</ul>
			</Dialog>
		</>
	)
})

// Placeholders

// Notifications
const NotificationListItem = component$(
	(props: { name: string; message: string }) => {
		return (
			<li>
				<Link class={styles.notificationLink} href='#'>
					{/* DOTO: Add profile picture */}
					<RandomImage alt={`Profile from ${props.name}`} />
					<small>{props.name}</small>
					<p>{props.message}</p>
				</Link>
			</li>
		)
	},
)

// Search
const SearchResultsLink = component$((props: { words: string }) => (
	<li>
		<a href='#'>
			<LuLink />
			{props.words}
		</a>
	</li>
))
const SearchResultsHash = component$((props: { words: string }) => (
	<li>
		<a href='#'>
			<LuHash />
			{props.words}
		</a>
	</li>
))

// Images
export const RandomImage = component$(
	({ class: className, alt, ...props }: { class?: string; alt: string }) => {
		const generateNumber = () => Math.random() * (16 - 0) + 0
		const addZero = (n: number) => String(Math.floor(n)).padStart(2, '0')

		return (
			<img
				class={className}
				src={`/profile-pictures/${addZero(generateNumber())}.avif`}
				alt={alt}
				width={16 * 6}
				height={16 * 6}
				{...props}
			/>
		)
	},
)
