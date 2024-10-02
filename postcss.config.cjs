module.exports = {
	plugins: {
		'postcss-preset-env': {
			precalculate: false,
			features: {
				'logical-properties-and-values': false,
				'custom-properties': false,
				'color-function': false,
			},
		},
	},
}
