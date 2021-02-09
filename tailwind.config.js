const colors = require("tailwindcss/colors");
const plugin = require("tailwindcss/plugin");

module.exports = {
	purge: ["./src/**/*.{js,jsx,ts,tsx}"],
	darkMode: "class",
	theme: {
		container: {
			center: true,
			padding: "1.5rem"
		},
		extend: {
			colors: {
				amber: colors.amber,
				cyan: colors.cyan,
				fuchsia: colors.fuchsia,
				"light-blue": colors.lightBlue,
				orange: colors.orange,
				purple: colors.purple,
				rose: colors.rose,
				violet: colors.violet
			}
		},
		fontFamily: {
			sans: [
				"ui-sans-serif",
				"system-ui",
				"-apple-system",
				"BlinkMacSystemFont",
				"Segoe UI",
				"Roboto",
				"Helvetica Neue",
				"Arial",
				"Noto Sans",
				"sans-serif",
				"Apple Color Emoji",
				"Segoe UI Emoji",
				"Segoe UI Symbol",
				"Noto Color Emoji"
			],
			serif: ["New York", "ui-serif", "Georgia", "Cambria", "Times New Roman", "Times", "serif"],
			mono: [
				"ui-monospace",
				"SFMono-Regular",
				"Menlo",
				"Monaco",
				"Consolas",
				"Liberation Mono",
				"Courier New",
				"monospace"
			]
		}
	},
	variants: {
		extend: {
			backgroundColor: ["selection"],
			backgroundOpacity: ["selection"],
			ringColor: ["focus-visible"],
			ringOffsetColor: ["focus-visible"],
			ringOffsetWidth: ["focus-visible"],
			ringOpacity: ["focus-visible"],
			ringWidth: ["focus-visible"],
			opacity: ["focus-visible"]
		}
	},
	plugins: [
		plugin(function({ addVariant, e }) {
			addVariant("selection", ({ modifySelectors, separator }) => {
				modifySelectors(({ className }) => {
					return `.${e(`selection${separator}${className}`)} ::selection`;
				});
			});
		})
	]
};
