import {
	$,
	component$,
	useSignal,
	useTask$,
	useVisibleTask$,
} from '@builder.io/qwik'

interface OKLCH {
	l: number
	c: number
	h: number
}

interface ColorPalette {
	surface: OKLCH[]
	primary: OKLCH[]
	secondary: OKLCH[]
	accent: OKLCH[]
}

export default component$(() => {
	const imageURL = useSignal('')
	const palette = useSignal<ColorPalette | null>(null)

	const generatePalette = $(async () => {
		imageURL.value = `https://picsum.photos/200?${Date.now()}`

		const response = await fetch(imageURL.value)
		const blob = await response.blob()
		const img = await createImageBitmap(blob)

		const canvas = document.createElement('canvas')
		canvas.width = img.width
		canvas.height = img.height
		const ctx = canvas.getContext('2d')
		if (!ctx) throw new Error('Could not get canvas context')
		ctx.drawImage(img, 0, 0)

		const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
		const data = imageData.data

		const rgbToOklch = (red: number, green: number, blue: number): OKLCH => {
			// Convert sRGB to linear RGB
			const linearR =
				red / 255 <= 0.04045
					? red / 255 / 12.92
					: Math.pow((red / 255 + 0.055) / 1.055, 2.4)
			const linearG =
				green / 255 <= 0.04045
					? green / 255 / 12.92
					: Math.pow((green / 255 + 0.055) / 1.055, 2.4)
			const linearB =
				blue / 255 <= 0.04045
					? blue / 255 / 12.92
					: Math.pow((blue / 255 + 0.055) / 1.055, 2.4)

			// Convert linear RGB to OKLab
			const l =
				0.4122214708 * linearR + 0.5363325363 * linearG + 0.0514459929 * linearB
			const m =
				0.2119034982 * linearR + 0.6806995451 * linearG + 0.1073969566 * linearB
			const s =
				0.0883024619 * linearR + 0.2817188376 * linearG + 0.6299787005 * linearB

			const l_ = Math.cbrt(l)
			const m_ = Math.cbrt(m)
			const s_ = Math.cbrt(s)

			// Convert OKLab to OKLCH
			const L = (0.2104542553 * l_ + 0.793617785 * m_ - 0.0040720468 * s_) * 100
			const a = 1.9779984951 * l_ - 2.428592205 * m_ + 0.4505937099 * s_
			const b = 0.0259040371 * l_ + 0.7827717662 * m_ - 0.808675766 * s_

			const C = Math.sqrt(a * a + b * b) * 100
			let h = (Math.atan2(b, a) * 180) / Math.PI
			if (h < 0) h += 360

			return { l: L, c: C, h }
		}

		const getAverageColor = (): OKLCH => {
			let l = 0,
				c = 0,
				h = 0
			const count = data.length / 4

			for (let i = 0; i < data.length; i += 4) {
				const oklch = rgbToOklch(data[i], data[i + 1], data[i + 2])
				l += oklch.l
				c += oklch.c
				h += oklch.h
			}

			return {
				l: l / count,
				c: c / count,
				h: (h / count) % 360,
			}
		}

		const getBorderColor = (): OKLCH => {
			const borderPixels: OKLCH[] = []
			const width = canvas.width
			const height = canvas.height

			for (let i = 0; i < width; i++) {
				borderPixels.push(
					rgbToOklch(data[i * 4], data[i * 4 + 1], data[i * 4 + 2]),
					rgbToOklch(
						data[(height - 1) * width * 4 + i * 4],
						data[(height - 1) * width * 4 + i * 4 + 1],
						data[(height - 1) * width * 4 + i * 4 + 2],
					),
				)
			}
			for (let i = 1; i < height - 1; i++) {
				borderPixels.push(
					rgbToOklch(
						data[i * width * 4],
						data[i * width * 4 + 1],
						data[i * width * 4 + 2],
					),
					rgbToOklch(
						data[(i + 1) * width * 4 - 4],
						data[(i + 1) * width * 4 - 3],
						data[(i + 1) * width * 4 - 2],
					),
				)
			}

			return borderPixels.reduce(
				(acc, pixel) => ({
					l: acc.l + pixel.l / borderPixels.length,
					c: acc.c + pixel.c / borderPixels.length,
					h: (acc.h + pixel.h / borderPixels.length) % 360,
				}),
				{ l: 0, c: 0, h: 0 },
			)
		}

		const generateShades = (color: OKLCH): OKLCH[] => {
			const isLight = color.l > 50
			return isLight
				? [
						{ l: Math.min(color.l + 10, 100), c: color.c, h: color.h },
						color,
						{ l: Math.max(color.l - 10, 0), c: color.c, h: color.h },
					]
				: [
						{ l: Math.max(color.l - 10, 0), c: color.c, h: color.h },
						color,
						{ l: Math.min(color.l + 10, 100), c: color.c, h: color.h },
					]
		}

		const averageColor = getAverageColor()
		const borderColor = getBorderColor()
		const surfaceColor: OKLCH = {
			l: (averageColor.l + borderColor.l) / 2,
			c: (averageColor.c + borderColor.c) / 2,
			h: ((averageColor.h + borderColor.h) / 2) % 360,
		}

		const colorCounts: { [key: string]: number } = {}
		for (let i = 0; i < data.length; i += 4) {
			const oklch = rgbToOklch(data[i], data[i + 1], data[i + 2])
			const key = `${Math.round(oklch.l)},${Math.round(oklch.c)},${Math.round(oklch.h)}`
			colorCounts[key] = (colorCounts[key] || 0) + 1
		}

		const sortedColors = Object.entries(colorCounts)
			.sort((a, b) => b[1] - a[1])
			.map(([color]) => color.split(',').map(Number))

		const colorDistance = (c1: OKLCH, c2: OKLCH) => {
			const dL = c1.l - c2.l
			const dC = c1.c - c2.c
			const dH = Math.min(Math.abs(c1.h - c2.h), 360 - Math.abs(c1.h - c2.h))
			return Math.sqrt(dL * dL + dC * dC + dH * dH)
		}

		const findDistinctColor = (
			existingColors: OKLCH[],
			candidates: number[][],
		) => {
			for (const candidate of candidates) {
				const color = { l: candidate[0], c: candidate[1], h: candidate[2] }
				if (existingColors.every(c => colorDistance(c, color) > 30)) {
					return color
				}
			}
			return { l: candidates[0][0], c: candidates[0][1], h: candidates[0][2] }
		}

		const primaryColor = {
			l: sortedColors[1][0],
			c: sortedColors[1][1],
			h: sortedColors[1][2],
		}
		const secondaryColor = findDistinctColor(
			[primaryColor],
			sortedColors.slice(2),
		)
		const accentColor = findDistinctColor(
			[primaryColor, secondaryColor],
			sortedColors.slice(2).reverse(),
		)

		palette.value = {
			surface: generateShades(surfaceColor),
			primary: generateShades(primaryColor),
			secondary: generateShades(secondaryColor),
			accent: generateShades(accentColor),
		}
	})

	// eslint-disable-next-line qwik/no-use-visible-task
	useVisibleTask$(async () => {
		await generatePalette()
	})

	return (
		<div style='display:flex'>
			<img
				src={imageURL.value}
				alt='Background Image'
				aria-hidden
				style={`width: 100%; height: 100%; object-fit: cover;`}
			/>
		</div>
	)
})
