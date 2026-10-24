import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { i as SEEDS, r as Input, s as hostOf, t as Button } from "./fcp-C2KJ5DkV.mjs";
import { a as Download, n as Trash2 } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as create, t as persist } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-Cmf-PZSr.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var CHIP = {
	loop: {
		label: "Loop",
		munsell: "5G 5/4",
		stroke: "var(--color-keep)"
	},
	path: {
		label: "Path",
		munsell: "5Y 6/4",
		stroke: "var(--color-warn)"
	},
	gate: {
		label: "Gate",
		munsell: "N 8/0",
		stroke: "var(--color-accent)"
	},
	fft: {
		label: "FFT",
		munsell: "5R 6/4",
		stroke: "var(--color-danger)"
	},
	port: {
		label: "Port",
		munsell: "N 5/0",
		stroke: "var(--color-muted)"
	}
};
var STROKE_CLASS = {
	loop: "stroke-keep",
	path: "stroke-warn",
	gate: "stroke-accent",
	fft: "stroke-danger",
	port: "stroke-muted"
};
function strokeClass(kind) {
	return STROKE_CLASS[kind];
}
function sheetHeight(count) {
	return 40 + Math.max(count, 1) * 62 + 24;
}
function layPoints(points, hingeId) {
	return points.map((point, index) => {
		const hinge = point.id === hingeId;
		const side = hinge ? 0 : index % 2 === 0 ? -1 : 1;
		const x = hinge ? 220 : side < 0 ? 150 : 290;
		return {
			...point,
			index,
			hinge,
			side,
			x,
			y: 40 + index * 62
		};
	});
}
function layPorts(ports, startIndex) {
	return ports.map((port, offset) => {
		const index = startIndex + offset;
		const side = index % 2 === 0 ? -1 : 1;
		return {
			...port,
			index,
			side,
			x: side < 0 ? 150 : 290,
			y: 40 + index * 62
		};
	});
}
function pairNote(twins, id) {
	const row = twins.find((twin) => twin.a === id || twin.b === id);
	if (!row) return null;
	return {
		primes: row.primes,
		other: row.a === id ? row.b : row.a,
		note: row.note
	};
}
function AtlasSvg({ points, ports, hingeId, selectedId, onSelect }) {
	const svgRef = (0, import_react.useRef)(null);
	const uid = (0, import_react.useId)().replace(/:/g, "");
	const laid = layPoints(points, hingeId);
	const laidPorts = layPorts(ports, points.length);
	const height = sheetHeight(points.length + ports.length);
	(0, import_react.useEffect)(() => {
		const svg = svgRef.current;
		if (!svg) return;
		const media = window.matchMedia("(prefers-reduced-motion: reduce)");
		const apply = () => {
			if (media.matches) svg.pauseAnimations();
			else svg.unpauseAnimations();
		};
		apply();
		media.addEventListener("change", apply);
		return () => media.removeEventListener("change", apply);
	}, [points.length, ports.length]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		ref: svgRef,
		viewBox: `0 0 440 ${height}`,
		className: "h-auto w-full",
		"data-atlas-sheet": "",
		role: "img",
		"aria-label": "Living atlas. Twenty-five seats on a spine, ports appended below.",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("defs", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
					id: `${uid}-spine`,
					x1: "0",
					y1: "0",
					x2: "0",
					y2: "1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
							offset: "0",
							stopColor: "var(--color-fg)",
							stopOpacity: "0.05"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
							offset: "0.45",
							stopColor: "var(--color-fg)",
							stopOpacity: "0.4"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
							offset: "1",
							stopColor: "var(--color-fg)",
							stopOpacity: "0.05"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("radialGradient", {
					id: `${uid}-wash`,
					cx: "50%",
					cy: "40%",
					r: "60%",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
						offset: "0",
						stopColor: "var(--color-fg)",
						stopOpacity: "0.05"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
						offset: "1",
						stopColor: "var(--color-fg)",
						stopOpacity: "0"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("filter", {
					id: `${uid}-glow`,
					x: "-50%",
					y: "-50%",
					width: "200%",
					height: "200%",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("feGaussianBlur", {
						stdDeviation: "1.4",
						result: "blur"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("feMerge", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("feMergeNode", { in: "blur" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("feMergeNode", { in: "SourceGraphic" })] })]
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				width: 440,
				height,
				fill: `url(#${uid}-wash)`
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
				x1: 220,
				y1: 16,
				x2: 220,
				y2: height - 12,
				stroke: `url(#${uid}-spine)`,
				strokeWidth: "1"
			}),
			laid.map((point) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Node, {
				x: point.x,
				y: point.y,
				label: point.name,
				side: point.side,
				kind: point.kind,
				selected: point.id === selectedId,
				hinge: point.hinge,
				dur: 9 + point.index % 6,
				onSelect: () => onSelect(point.id),
				filterId: `${uid}-glow`
			}, point.id)),
			laidPorts.map((port) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Node, {
				x: port.x,
				y: port.y,
				label: port.name,
				side: port.side,
				kind: "port",
				selected: port.id === selectedId,
				hinge: false,
				dur: 11 + port.index % 4,
				onSelect: () => onSelect(port.id),
				filterId: `${uid}-glow`
			}, port.id))
		]
	});
}
function Node({ x, y, label, side, kind, selected, hinge, dur, onSelect, filterId }) {
	const anchor = hinge || side < 0 ? "end" : "start";
	const textX = hinge ? -94 : side < 0 ? -24 : 24;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
		transform: `translate(${x} ${y})`,
		className: strokeClass(kind),
		filter: selected ? `url(#${filterId})` : void 0,
		onClick: onSelect,
		style: { cursor: "pointer" },
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("animateTransform", {
				attributeName: "transform",
				type: "rotate",
				from: "0",
				to: "360",
				dur: `${dur}s`,
				repeatCount: "indefinite"
			}), [
				0,
				72,
				144,
				216,
				288
			].map((deg) => {
				const rad = deg * Math.PI / 180;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
					x1: "0",
					y1: "0",
					x2: Math.cos(rad) * 15,
					y2: Math.sin(rad) * 15,
					strokeWidth: "1",
					strokeOpacity: "0.55"
				}, deg);
			})] }),
			hinge ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				r: "13",
				className: "fill-none",
				strokeWidth: "1",
				strokeDasharray: "2 2"
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				r: selected ? 8 : 6.5,
				className: "fill-bg",
				strokeWidth: selected ? 2 : 1.25
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				r: "18",
				className: "fill-transparent stroke-none"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("text", {
				x: textX,
				y: 4,
				textAnchor: anchor,
				className: "fill-fg font-sans",
				fontSize: "11",
				children: [label.length > 18 ? `${label.slice(0, 17)}…` : label, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("animate", {
					attributeName: "opacity",
					values: "0.55;1;0.55",
					dur: `${dur + 2}s`,
					repeatCount: "indefinite"
				})]
			})
		]
	});
}
var ATLAS = {
	name: "Living Atlas",
	volume: {
		"ports": 42,
		"workflows": 21,
		"loops": 7,
		"paths": 7,
		"gates": 7,
		"fft": 4
	},
	hinge: "handoff",
	chain: [
		{
			"step": "1",
			"who": "Engineers",
			"does": "Generate drill requests"
		},
		{
			"step": "2",
			"who": "Business office",
			"does": "Assign lots"
		},
		{
			"step": "3",
			"who": "E&D Logs",
			"does": "Receive the jobs",
			"person": "Allexx Daniel"
		},
		{
			"step": "—",
			"who": "Unassigned",
			"does": "File the GSOC ticket and confirm Positive Response",
			"gap": true
		},
		{
			"step": "4",
			"who": "Drilling Coordinator",
			"does": "Direct the rigs by walkie"
		}
	],
	points: [
		{
			"id": "intake",
			"name": "Intake",
			"kind": "loop",
			"descriptor": "The request, as it arrived, before anyone improves it.",
			"analogies": ["A drill request left on the desk in the words that were sent.", "A sample bag whose label has not been rewritten yet."],
			"evaluation": "Useful only while the arriving words stay the arriving words.",
			"owner": "Whoever sent it.",
			"standing": "named",
			"lane": {
				"r": .15,
				"g": .75,
				"b": .1
			}
		},
		{
			"id": "bind",
			"name": "Bind",
			"kind": "loop",
			"descriptor": "Attach the request to a job, a lot, or a card that already exists. Make a card only if none does.",
			"analogies": ["A lot number written on a request that already had a job.", "A certificate whose name matches the device that is asking."],
			"evaluation": "A certificate trusted on the workstation is not trusted on the phone. 127.0.0.1 is whichever device is asking, not the other one.",
			"owner": "The person holding both records.",
			"standing": "named",
			"lane": {
				"r": .1,
				"g": .7,
				"b": .2
			}
		},
		{
			"id": "route",
			"name": "Route",
			"kind": "loop",
			"descriptor": "Say which reading this is. Dream, Field, and Street do not correct each other.",
			"analogies": ["Choosing a falling-weight test or a core, because the question picked one.", "Filing a note with the desk that can actually use it."],
			"evaluation": "A department name does not decide whether an excavation notice is required. The activity does.",
			"owner": "The person who picks the method.",
			"standing": "named",
			"lane": {
				"r": .25,
				"g": .5,
				"b": .25
			}
		},
		{
			"id": "handoff",
			"name": "Handoff",
			"kind": "loop",
			"descriptor": "The next person is named, or this seat stays empty.",
			"analogies": ["A walkie call to a rig.", "A ticket number written against a lot before that call."],
			"evaluation": "Engineers request the drills, the office assigns the lots, E&D Logs receives the jobs, and the Drilling Coordinator directs the rigs. Nobody in that chain is named as the one who files the GSOC ticket or confirms Positive Response. Proposed, and not installed: E&D Logs records the ticket number and the Positive Response against the lot before release. The first question is whether walkie direction ever happens before a ticket exists.",
			"owner": "Unassigned.",
			"standing": "open",
			"lane": {
				"r": .34,
				"g": .33,
				"b": .33
			}
		},
		{
			"id": "witness",
			"name": "Witness",
			"kind": "loop",
			"descriptor": "Write what was seen. Leave the earlier line where it is.",
			"analogies": ["A field note that does not eat the boring log.", "A second lamp on the same thin section."],
			"evaluation": "Seeing a crack is not the same as naming its cause. Both observations can stay.",
			"owner": "The person who was there.",
			"standing": "named",
			"lane": {
				"r": .2,
				"g": .65,
				"b": .15
			}
		},
		{
			"id": "return",
			"name": "Return",
			"kind": "loop",
			"descriptor": "The result goes back to the person who asked, with the limit still attached.",
			"analogies": ["A report put back on the desk that requested the test.", "A marked line that still has to be checked against the ground."],
			"evaluation": "A workbench status, a hash, or a survey does not authorize excavation. A marked response still has to meet the site.",
			"owner": "The reviewer who sends it back.",
			"standing": "named",
			"lane": {
				"r": .1,
				"g": .45,
				"b": .45
			}
		},
		{
			"id": "keep",
			"name": "Keep",
			"kind": "loop",
			"descriptor": "The dataset remains. New seats are appended. Earlier seats are not rewritten to fit them.",
			"analogies": ["A laboratory record after the report is signed.", "A host entry that still resolves yesterday's name."],
			"evaluation": "Spectra QEST and Construction Hive stay the systems of record. Nothing on this page is a connection to them.",
			"owner": "The record. Not a new department.",
			"standing": "named",
			"lane": {
				"r": .15,
				"g": .7,
				"b": .15
			}
		},
		{
			"id": "construction",
			"name": "Construction",
			"kind": "path",
			"descriptor": "Materials testing, special inspections, QA/QC, field observations. A public family, not an organizational chart.",
			"analogies": ["A special inspection of a bolted connection.", "A floor-flatness number that still needs the spec it was measured against."],
			"evaluation": "The public pages name the work. They do not say which kit is free today.",
			"owner": "The inspector on that visit. Not named here.",
			"standing": "named",
			"lane": {
				"r": .1,
				"g": .35,
				"b": .55
			}
		},
		{
			"id": "geotechnical",
			"name": "Geotechnical",
			"kind": "path",
			"descriptor": "Drilling, CPTu, foundations, geophysics, instrumentation.",
			"analogies": ["A boring that becomes a sample.", "A rig on a truck, a track, or a barge, still one boring program."],
			"evaluation": "The locate assessment is in the proposed chain. The public pages do not name who files it.",
			"owner": "Unassigned for the locate ticket.",
			"standing": "proposed",
			"lane": {
				"r": .15,
				"g": .55,
				"b": .3
			}
		},
		{
			"id": "pavements",
			"name": "Pavements",
			"kind": "path",
			"descriptor": "GPR, FWD, DCP, LWD, laser profiling, mix design.",
			"analogies": ["A deflection bowl.", "A core cut only where the question needs one."],
			"evaluation": "A nonintrusive falling-weight survey is not, by itself, an excavation. A later boring may be.",
			"owner": "The pavement engineer for the question in front of them.",
			"standing": "named",
			"lane": {
				"r": .1,
				"g": .4,
				"b": .5
			}
		},
		{
			"id": "building",
			"name": "Building",
			"kind": "path",
			"descriptor": "Envelope, distress, structural assessment, forensics.",
			"analogies": ["A moisture map of a wall.", "A repair detail that has to be looked at again after the work."],
			"evaluation": "History, test, sample, interpretation, repair, and a second look. A missing one is a missing step.",
			"owner": "The investigating engineer.",
			"standing": "named",
			"lane": {
				"r": .2,
				"g": .3,
				"b": .5
			}
		},
		{
			"id": "ndt",
			"name": "Nondestructive",
			"kind": "path",
			"descriptor": "Ultrasonic, phased array, radiography, magnetic particle, penetrant, visual.",
			"analogies": ["A calibrated screen.", "A disposition written after the indication, not before it."],
			"evaluation": "Coverage and calibration belong in the record. An indication is not yet accept or reject.",
			"owner": "The examiner, then the person who signs the disposition.",
			"standing": "named",
			"lane": {
				"r": .15,
				"g": .45,
				"b": .4
			}
		},
		{
			"id": "environmental",
			"name": "Environmental",
			"kind": "path",
			"descriptor": "Site assessments, sampling, air, compliance.",
			"analogies": ["A Phase I that is documents.", "A Phase II that is samples."],
			"evaluation": "Those are different activities. The second can be intrusive. The first usually is not.",
			"owner": "The person who wrote the sampling plan.",
			"standing": "named",
			"lane": {
				"r": .1,
				"g": .5,
				"b": .4
			}
		},
		{
			"id": "laboratories",
			"name": "Laboratories",
			"kind": "path",
			"descriptor": "Petrography, chemistry, concrete, asphalt, aggregate, and the environmental bench.",
			"analogies": ["Two lamps on one specimen.", "A number that belongs to a named method."],
			"evaluation": "The October 15 note flags a public petrography page pairing AASHTO T 277 with ASTM C856. T 277 is chloride-ion penetration, not a petrographic method. That distinction stays visible.",
			"owner": "The analyst who signs the method.",
			"standing": "named",
			"lane": {
				"r": .2,
				"g": .5,
				"b": .3
			}
		},
		{
			"id": "knowledge",
			"name": "Knowledge",
			"kind": "gate",
			"descriptor": "What is already written down.",
			"analogies": ["A library card for a book that is on the shelf.", "A boring log from an earlier job on the same street."],
			"evaluation": "It tells you what was recorded. It does not tell you the ground has stayed put.",
			"owner": "The archive.",
			"standing": "named",
			"lane": {
				"r": .7,
				"g": .2,
				"b": .1
			}
		},
		{
			"id": "prophecy",
			"name": "Prophecy",
			"kind": "gate",
			"descriptor": "What is expected if the stated conditions hold.",
			"analogies": ["A weather brief before a pour.", "A mix design before the plant runs it."],
			"evaluation": "A forecast is not a measurement. It expires when the conditions change.",
			"owner": "The person who stated the conditions.",
			"standing": "named",
			"lane": {
				"r": .65,
				"g": .2,
				"b": .15
			}
		},
		{
			"id": "service",
			"name": "Service",
			"kind": "gate",
			"descriptor": "Someone shows up with a method.",
			"analogies": ["A tool checked out of the crib.", "A special inspection on the day of the work."],
			"evaluation": "The method travels with the person. A page about the method is not the visit.",
			"owner": "The person on site.",
			"standing": "named",
			"lane": {
				"r": .55,
				"g": .25,
				"b": .2
			}
		},
		{
			"id": "prayer",
			"name": "Prayer",
			"kind": "gate",
			"descriptor": "Attention before the measurement.",
			"analogies": ["A pre-task briefing.", "A calibration check."],
			"evaluation": "Skipping it does not make the later number more true.",
			"owner": "The person about to measure.",
			"standing": "named",
			"lane": {
				"r": .6,
				"g": .25,
				"b": .15
			}
		},
		{
			"id": "traits",
			"name": "Traits",
			"kind": "gate",
			"descriptor": "What something is called.",
			"analogies": ["A nameplate on a rig.", "A material class on a data sheet."],
			"evaluation": "Adjacent to Tests, not the same seat. A class is not a result. A drawing that gives these two one label is the drawing's error.",
			"owner": "The person who wrote the label.",
			"standing": "named",
			"lane": {
				"r": .62,
				"g": .22,
				"b": .16
			}
		},
		{
			"id": "tests",
			"name": "Tests",
			"kind": "gate",
			"descriptor": "A question asked of a specimen or a member, under a named procedure.",
			"analogies": ["A trial batch.", "A proof load."],
			"evaluation": "The procedure has to be the one named. A nearby standard is not a substitute.",
			"owner": "The tester.",
			"standing": "named",
			"lane": {
				"r": .58,
				"g": .27,
				"b": .15
			}
		},
		{
			"id": "repentance",
			"name": "Repentance",
			"kind": "gate",
			"descriptor": "Look again after the change. The first result stays in the file.",
			"analogies": ["A retest after a repair.", "A second survey after the scope moved."],
			"evaluation": "The second look does not replace the first. Both remain.",
			"owner": "The person who asked for the second look.",
			"standing": "named",
			"lane": {
				"r": .66,
				"g": .2,
				"b": .14
			}
		},
		{
			"id": "window",
			"name": "Window",
			"kind": "fft",
			"descriptor": "Decide which slice of the record is in the room.",
			"analogies": ["A Hann window on a trace.", "One job, not the whole archive."],
			"evaluation": "What you leave outside the window is not deleted. It is just not in this reading.",
			"owner": "The person who set the slice.",
			"standing": "named",
			"lane": {
				"r": .45,
				"g": .25,
				"b": .3
			}
		},
		{
			"id": "forward",
			"name": "Forward",
			"kind": "fft",
			"descriptor": "Read the frequencies that are actually present.",
			"analogies": ["A forward transform.", "A department list taken from this job, not from a template."],
			"evaluation": "If a family is quiet on this job, do not invent a reading for it.",
			"owner": "The analyst.",
			"standing": "named",
			"lane": {
				"r": .4,
				"g": .3,
				"b": .3
			}
		},
		{
			"id": "band",
			"name": "Band",
			"kind": "fft",
			"descriptor": "Keep the carriers that answer the question. Leave the others in the file.",
			"analogies": ["A band-pass.", "Petrography, chemistry, and strength kept as separate answers."],
			"evaluation": "No single band is the diagnosis. That is the pavement example: each method answers a different question.",
			"owner": "The reviewing engineer.",
			"standing": "proposed",
			"lane": {
				"r": .42,
				"g": .28,
				"b": .3
			}
		},
		{
			"id": "inverse",
			"name": "Inverse",
			"kind": "fft",
			"descriptor": "Put the kept bands back into a form a person can schedule from.",
			"analogies": ["An inverse transform.", "A narrative the coordinator can put on a board."],
			"evaluation": "The rebuild has to point back at the bands you kept. If it cannot, it is a new story.",
			"owner": "The person who signs the report.",
			"standing": "named",
			"lane": {
				"r": .38,
				"g": .32,
				"b": .3
			}
		}
	],
	twins: [
		{
			"primes": [3, 5],
			"a": "intake",
			"b": "construction",
			"note": "The request meets the public construction family."
		},
		{
			"primes": [5, 7],
			"a": "bind",
			"b": "geotechnical",
			"note": "The lot meets the ground program."
		},
		{
			"primes": [11, 13],
			"a": "route",
			"b": "pavements",
			"note": "The question picks the method."
		},
		{
			"primes": [17, 19],
			"a": "witness",
			"b": "ndt",
			"note": "An indication is not yet a disposition."
		},
		{
			"primes": [29, 31],
			"a": "return",
			"b": "environmental",
			"note": "The report goes back with its limit."
		},
		{
			"primes": [41, 43],
			"a": "keep",
			"b": "laboratories",
			"note": "The sample record is what the next person reads."
		},
		{
			"primes": [59, 61],
			"a": "knowledge",
			"b": "window",
			"note": "Only the slice in the room."
		},
		{
			"primes": [71, 73],
			"a": "prophecy",
			"b": "forward",
			"note": "A forecast reads what is present. It is not a new fact."
		},
		{
			"primes": [101, 103],
			"a": "service",
			"b": "band",
			"note": "Keep the method that serves this question."
		},
		{
			"primes": [107, 109],
			"a": "prayer",
			"b": "inverse",
			"note": "Attention first, then a form someone can use."
		},
		{
			"primes": [137, 139],
			"a": "traits",
			"b": "tests",
			"note": "A name is not a result."
		},
		{
			"primes": [149, 151],
			"a": "building",
			"b": "repentance",
			"note": "Distress, then a second look after the repair."
		}
	]
};
function pointById(id) {
	return ATLAS.points.find((point) => point.id === id);
}
var STANDING_LABEL = {
	named: "On the record",
	proposed: "Proposed, not installed",
	open: "Open"
};
var useAtlas = create()(persist((set) => ({
	ports: [],
	add: (port) => set((state) => ({ ports: [...state.ports.filter((item) => item.id !== port.id), port] })),
	remove: (id) => set((state) => ({ ports: state.ports.filter((item) => item.id !== id) }))
}), { name: "living-atlas" }));
var KIND_ORDER = [
	"loop",
	"path",
	"gate",
	"fft"
];
function AtlasPage() {
	const ports = useAtlas((state) => state.ports);
	const add = useAtlas((state) => state.add);
	const remove = useAtlas((state) => state.remove);
	const [ready, setReady] = (0, import_react.useState)(false);
	const [selectedId, setSelectedId] = (0, import_react.useState)(ATLAS.hinge);
	const [name, setName] = (0, import_react.useState)("");
	const [href, setHref] = (0, import_react.useState)("");
	const [note, setNote] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		const finish = () => setReady(true);
		const unsub = useAtlas.persist.onFinishHydration(finish);
		if (useAtlas.persist.hasHydrated()) finish();
		return unsub;
	}, []);
	const visiblePorts = ready ? ports : [];
	const selected = pointById(selectedId);
	const selectedPort = visiblePorts.find((port) => port.id === selectedId);
	const twin = selected ? pairNote(ATLAS.twins, selected.id) : null;
	const twinOther = twin ? pointById(twin.other) : void 0;
	const known = (0, import_react.useMemo)(() => SEEDS.filter((seed) => seed.href && !ports.some((port) => port.href === seed.href)), [ports]);
	function seat(port) {
		add(port);
		setSelectedId(port.id);
		toast(`Seated ${port.name}`);
	}
	function onSeat(event) {
		event.preventDefault();
		const trimmed = name.trim();
		if (!trimmed) return;
		const address = href.trim();
		seat({
			id: `port-${crypto.randomUUID()}`,
			name: trimmed,
			href: address ? address.startsWith("http") ? address : `https://${address}` : "",
			note: note.trim() || "Seated from this page."
		});
		setName("");
		setHref("");
		setNote("");
	}
	function downloadJson() {
		const payload = {
			...ATLAS,
			ports: visiblePorts,
			note: "Ports are appended. The twenty-five seats are not rewritten."
		};
		saveBlob(JSON.stringify(payload, null, 2), "atlas_points.json", "application/json");
	}
	function downloadSvg() {
		const node = document.querySelector("[data-atlas-sheet]");
		if (!node) return;
		saveBlob(new XMLSerializer().serializeToString(node), "atlas.svg", "image/svg+xml");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-8 sm:px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex flex-col gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono text-xs tracking-wide text-muted uppercase",
							children: "Living atlas"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "/connect",
							className: "font-mono text-xs text-muted underline-offset-4 hover:text-fg hover:underline",
							children: "Connect a profile"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display text-4xl leading-tight text-fg sm:text-5xl",
						children: "Twenty-five seats. The handoff is still open."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "max-w-2xl text-base text-muted",
						children: "Engineers request the drills, the office assigns the lots, E&D Logs receives the jobs, and the Drilling Coordinator directs the rigs. Nobody in that chain is named as the one who files the GSOC ticket or confirms Positive Response before the ground is opened."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
				className: "grid gap-2 sm:grid-cols-5",
				children: ATLAS.chain.map((step) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: step.gap ? "flex flex-col gap-1 rounded-md bg-warn-soft p-3 shadow-[var(--shadow-border)]" : "flex flex-col gap-1 rounded-md bg-elevated p-3 shadow-[var(--shadow-border)]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-mono text-xs text-muted",
							children: step.gap ? "Gap" : `Step ${step.step}`
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm text-fg",
							children: step.who
						}),
						step.person ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs text-muted",
							children: step.person
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm text-muted",
							children: step.does
						})
					]
				}, `${step.step}-${step.who}`))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid items-start gap-6 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "max-h-screen overflow-auto rounded-lg bg-elevated p-3 shadow-[var(--shadow-border)]",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AtlasSvg, {
						points: ATLAS.points,
						ports: visiblePorts,
						twins: ATLAS.twins,
						hingeId: ATLAS.hinge,
						selectedId,
						onSelect: setSelectedId
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-4",
					children: [selected ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "flex flex-col gap-4 rounded-lg bg-subtle p-4 shadow-[var(--shadow-border)]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-center gap-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, { kind: selected.kind }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-mono text-xs text-muted",
										children: CHIP[selected.kind].munsell
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-mono text-xs text-muted",
										children: STANDING_LABEL[selected.standing]
									}),
									selected.id === ATLAS.hinge ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-mono text-xs text-warn",
										children: "Hinge · no twin"
									}) : null
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-3xl text-fg",
								children: selected.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-fg",
								children: selected.descriptor
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid gap-2 sm:grid-cols-2",
								children: selected.analogies.map((line) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "rounded-sm bg-elevated p-3 text-sm text-muted",
									children: line
								}, line))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-fg",
								children: selected.evaluation
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-sm text-muted",
								children: ["Owner ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-fg",
									children: selected.owner
								})]
							}),
							twin && twinOther ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-sm text-muted",
								children: [
									"Twin ",
									twin.primes[0],
									"·",
									twin.primes[1],
									" with",
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										className: "text-fg underline-offset-4 hover:underline",
										onClick: () => setSelectedId(twinOther.id),
										children: twinOther.name
									}),
									". ",
									twin.note
								]
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lanes, {
								r: selected.lane.r,
								g: selected.lane.g,
								b: selected.lane.b
							})
						]
					}) : selectedPort ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "flex flex-col gap-3 rounded-lg bg-subtle p-4 shadow-[var(--shadow-border)]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, { kind: "port" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono text-xs text-muted",
									children: CHIP.port.munsell
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-3xl text-fg",
								children: selectedPort.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted",
								children: selectedPort.note
							}),
							selectedPort.href ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: selectedPort.href,
								target: "_blank",
								rel: "noreferrer",
								className: "text-sm text-fg underline-offset-4 hover:underline",
								children: hostOf(selectedPort.href)
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted",
								children: "No address yet."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								variant: "outline",
								size: "sm",
								onClick: () => {
									remove(selectedPort.id);
									setSelectedId(ATLAS.hinge);
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, {}), "Unseat"]
							})
						]
					}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-col gap-2",
						children: KIND_ORDER.map((kind) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex flex-wrap gap-2",
							children: ATLAS.points.filter((point) => point.kind === kind).map((point) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setSelectedId(point.id),
								className: point.id === selectedId ? "h-11 rounded-sm bg-accent px-3 text-sm text-accent-foreground" : "h-11 rounded-sm bg-elevated px-3 text-sm text-fg shadow-[var(--shadow-border)]",
								children: point.name
							}, point.id))
						}, kind))
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "flex flex-col gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl text-fg",
						children: "Twin-prime table"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "max-w-2xl text-sm text-muted",
						children: "Twelve pairs. Handoff is the unpaired seat: the ticket owner is not in the dataset because nobody has been named."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "overflow-x-auto rounded-lg shadow-[var(--shadow-border)]",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
							className: "w-full min-w-lg border-collapse text-left text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
								className: "bg-elevated font-mono text-xs text-muted",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "px-3 py-3 font-medium",
										children: "Twin"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "px-3 py-3 font-medium",
										children: "Left"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "px-3 py-3 font-medium",
										children: "Right"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "px-3 py-3 font-medium",
										children: "Why they sit together"
									})
								] })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", { children: [ATLAS.twins.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								className: "border-t border-border",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
										className: "px-3 py-3 font-mono text-xs text-muted",
										children: [
											row.primes[0],
											" · ",
											row.primes[1]
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-3 py-3",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											className: "text-fg",
											onClick: () => setSelectedId(row.a),
											children: pointById(row.a)?.name
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-3 py-3",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											className: "text-fg",
											onClick: () => setSelectedId(row.b),
											children: pointById(row.b)?.name
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-3 py-3 text-muted",
										children: row.note
									})
								]
							}, row.primes.join("-"))), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								className: "border-t border-border bg-warn-soft",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-3 py-3 font-mono text-xs text-muted",
										children: "—"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-3 py-3",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											className: "text-fg",
											onClick: () => setSelectedId(ATLAS.hinge),
											children: "Handoff"
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-3 py-3 text-muted",
										children: "No twin"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-3 py-3 text-fg",
										children: "GSOC ticket and Positive Response. Owner unassigned."
									})
								]
							})] })]
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "grid gap-6 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: onSeat,
					className: "flex flex-col gap-3 rounded-lg bg-elevated p-4 shadow-[var(--shadow-border)]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-2xl text-fg",
							children: "Seat a port"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm text-muted",
							children: [
								visiblePorts.length,
								" seated. ",
								ATLAS.volume.ports,
								" is the declared volume, not a lock. The ",
								ATLAS.volume.workflows,
								" workflows are declared and not written here. A proposed chain is not a procedure you can run."
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: name,
							onChange: (event) => setName(event.target.value),
							placeholder: "Name",
							"aria-label": "Port name"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: href,
							onChange: (event) => setHref(event.target.value),
							placeholder: "Address, if you have one",
							"aria-label": "Port address",
							inputMode: "url"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: note,
							onChange: (event) => setNote(event.target.value),
							placeholder: "What it already does",
							"aria-label": "Port note"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "submit",
							disabled: !ready || !name.trim(),
							children: "Seat port"
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-2xl text-fg",
							children: "Already on the board"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted",
							children: "These are profiles the connect page already knows. Seating one does not open it, and it does not replace Spectra QEST or Construction Hive."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex flex-wrap gap-2",
							children: known.map((seed) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "outline",
								size: "sm",
								disabled: !ready,
								onClick: () => seat({
									id: `port-${seed.id}`,
									name: seed.name,
									href: seed.href,
									note: seed.note
								}),
								children: seed.name
							}, seed.id))
						}),
						visiblePorts.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "flex flex-col gap-2",
							children: visiblePorts.map((port) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => setSelectedId(port.id),
								className: "text-sm text-fg underline-offset-4 hover:underline",
								children: [port.name, port.href ? ` · ${hostOf(port.href)}` : ""]
							}) }, port.id))
						}) : null
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "outline",
					onClick: downloadJson,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, {}), "Dataset"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "outline",
					onClick: downloadSvg,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, {}), "Sheet"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "max-w-2xl text-xs text-subtle-fg",
				children: [
					"Chip names (",
					Object.values(CHIP).map((chip) => chip.munsell).join(", "),
					") label these tokens. They are not measured Munsell renotations. R is Dream, G is Field, B is Street. Nothing on this sheet authorizes excavation."
				]
			})
		]
	});
}
function Chip({ kind }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: "inline-flex items-center gap-2 font-mono text-xs text-muted",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `inline-block size-2 rounded-full border ${strokeClassFor(kind)} bg-bg` }), CHIP[kind].label]
	});
}
function strokeClassFor(kind) {
	if (kind === "loop") return "border-keep";
	if (kind === "path") return "border-warn";
	if (kind === "gate") return "border-accent";
	if (kind === "fft") return "border-danger";
	return "border-muted";
}
function Lanes({ r, g, b }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex h-2 overflow-hidden rounded-full bg-bg",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "bg-danger",
					style: { width: `${r * 100}%` }
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "bg-keep",
					style: { width: `${g * 100}%` }
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "bg-street",
					style: { width: `${b * 100}%` }
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "font-mono text-xs text-muted",
			children: [
				"Dream ",
				r.toFixed(2),
				" · Field ",
				g.toFixed(2),
				" · Street ",
				b.toFixed(2)
			]
		})]
	});
}
function saveBlob(text, filename, type) {
	const blob = new Blob([text], { type });
	const url = URL.createObjectURL(blob);
	const link = document.createElement("a");
	link.href = url;
	link.download = filename;
	link.click();
	URL.revokeObjectURL(url);
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AtlasPage, {});
}
//#endregion
export { Home as component };
