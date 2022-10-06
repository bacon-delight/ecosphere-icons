require("dotenv").config();
const svgo = require("@figma-export/transform-svg-with-svgo");

const fileId = process.env.FILE_ID;
const outputters = [
	require("@figma-export/output-components-as-svg")({ output: "./" }),
];

/** @type {import('svgo').PluginConfig[]} */
// https://github.com/svg/svgo
const solidSVGOConfig = [
	{
		name: "removeDimensions",
		active: true,
	},
	{
		name: "sortAttrs",
		active: true,
	},
	{
		name: "removeAttrs",
		params: {
			attrs: "(fill)",
		},
	},
	{
		name: "addAttributesToSVGElement",
		params: {
			attributes: [
				{
					fill: "currentColor",
				},
			],
		},
	},
];

/** @type {import('svgo').PluginConfig[]} */
const outlineSVGOConfig = [
	{
		name: "removeDimensions",
		active: true,
	},
	{
		name: "sortAttrs",
		active: true,
	},
	{
		name: "removeAttrs",
		params: {
			attrs: "(stroke)",
		},
	},
	{
		name: "addAttributesToSVGElement",
		params: {
			attributes: [
				{
					stroke: "currentColor",
				},
			],
		},
	},
];

/** @type {import('@figma-export/types').FigmaExportRC} */
module.exports = {
	commands: [
		[
			"components",
			{
				fileId,
				onlyFromPages: ["solid"],
				transformers: [
					svgo({ multipass: true, plugins: solidSVGOConfig }),
				],
				outputters,
			},
		],
		[
			"components",
			{
				fileId,
				onlyFromPages: ["outline"],
				transformers: [
					svgo({ multipass: true, plugins: outlineSVGOConfig }),
				],
				outputters,
			},
		],
	],
};
