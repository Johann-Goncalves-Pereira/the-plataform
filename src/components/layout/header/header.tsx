import {
	$,
	component$,
	useOn,
	useOnDocument,
	useSignal,
	useStore,
} from '@builder.io/qwik'

// import ProfilePicture from '/public/profile-pictures/001.jpg?jsx'
import {
	LuSearch,
	LuBell,
	LuWallet,
	LuLink,
	LuHash,
	LuBellDot,
	LuPanelLeftOpen,
	LuPanelLeftClose,
	LuWaypoints,
	LuBarChartHorizontal,
	LuFolderRoot,
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
import { Link, useLocation } from '@builder.io/qwik-city'

export default component$(() => {
	const uniqueId = styles.header
	const loc = useLocation()

	const generatedWords = () =>
		(generate(Math.random() * 12) as string[]).join(' ')

	/* States */
	const showLess = useStore({
		value: true,
		animation: false,
	})
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

	useOnDocument(
		'keydown',
		$(event => {
			if (event.key === 'Escape' || event?.code === 'Escape') {
				search.open = false
				notification.open = false
			}
		}),
	)

	/* showLess */
	const handleShowLess$ = $(() => {
		showLess.animation = true
		showLess.value = !showLess.value

		setTimeout(() => {
			showLess.animation = false
		}, 250)
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
		if (
			(ev.clientX < dimensions.left ||
				ev.clientX > dimensions.right ||
				ev.clientY < dimensions.top ||
				ev.clientY > dimensions.bottom) &&
			(el as HTMLDialogElement).open
		)
			search.open = false
	})

	/* Notification */
	const handleNotificationOpen$ = $(() => {
		getHeaderBoundary$()
		handleOpenDialog('modal', notification.id.dialog, notification.open)
		notification.open = true
	})

	const handleNotificationClose$ = $(
		(ev: MouseEvent, el: HTMLDialogElement) => {
			const dimensions = el.getBoundingClientRect()
			setTimeout(() => {
				handleCloseDialog(ev, el, notification.open)
			}, 200)
			if (
				(ev.clientX < dimensions.left ||
					ev.clientX > dimensions.right ||
					ev.clientY < dimensions.top ||
					ev.clientY > dimensions.bottom) &&
				(el as HTMLDialogElement).open
			)
				notification.open = false
		},
	)

	return (
		<>
			<Section
				class={`
					${styles.header} 
					${styles[showLess.value ? 'hide' : 'show']}
					${showLess.animation ? styles.transitionAll : ''}
					`}
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
								<em aria-hidden>
									{
										['Dev', 'CS', 'Designer'][
											Math.floor(Math.random() * (3 - 1) + 1)
										]
									}
								</em>
							</div>
							{!showLess.value && (
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
						class={
							loc.url.pathname === '/opportunities'
								? styles['navigation--active']
								: ''
						}
						href='/opportunities'
						tabIndex={loc.url.pathname === '/opportunities' ? -1 : 0}
					>
						<LuWaypoints />
						<em>Opportunities</em>
						<div />
					</Link>
					<Link
						class={
							loc.url.pathname === '/rooms' ? styles['navigation--active'] : ''
						}
						href='/rooms'
						tabIndex={loc.url.pathname === '/opportunities' ? -1 : 0}
					>
						<LuBarChartHorizontal />
						<em>Rooms</em>
						<div />
					</Link>
					<Link
						class={
							loc.url.pathname === '/activities'
								? styles['navigation--active']
								: ''
						}
						href='/activities'
						tabIndex={loc.url.pathname === '/opportunities' ? -1 : 0}
					>
						<LuFolderRoot />
						<em>Activities</em>
						<div />
					</Link>
				</nav>

				<button
					class={styles.showLess}
					aria-label='Show less - button'
					title='Show less - button trigger'
					onClick$={handleShowLess$}
				>
					{showLess.value ? <LuPanelLeftOpen /> : <LuPanelLeftClose />}
				</button>
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
					<label class='sr-only' for={`search-id_${uniqueId}`}>
						Search-Bar - Spotlight, find anything you want
					</label>
					<input
						id={`search-id_${uniqueId}`}
						name={`search-id_${uniqueId}`}
						type='search'
					/>

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

// Notifications
const NotificationListItem = component$(
	(props: { name: string; message: string }) => {
		return (
			<li>
				<a class={styles.notificationLink} href={`/some-place`}>
					{/* DOTO: Add profile picture */}
					<RandomImage alt={`Profile from ${props.name}`} />
					<small>{props.name}</small>
					<p>{props.message}</p>
				</a>
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
