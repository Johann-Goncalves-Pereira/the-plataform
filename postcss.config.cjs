module.exports = {
	plugins: {
		'postcss-preset-env': {
			precalculate: false,
			preserve: true,
			features: {
				'logical-properties-and-values': false,
				'custom-properties': false,
				'color-function': false,
			},
		},
	},
}
