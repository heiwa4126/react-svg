import type React from "react";
import { type KeyboardEvent, useEffect, useRef, useState } from "react";

interface Transform {
	scale: number;
	translateX: number;
	translateY: number;
}

function App() {
	const zoomSvgRef = useRef<SVGSVGElement | null>(null);
	const [transform, setTransform] = useState<Transform>({
		scale: 1,
		translateX: 0,
		translateY: 0,
	});

	// Initialize the SVG to fit the window
	useEffect(() => {
		const handleResize = () => {
			const svg = zoomSvgRef.current;
			if (svg) {
				const { clientWidth, clientHeight } = svg;
				setTransform((prev) => ({
					...prev,
					scale: Math.min(window.innerWidth / clientWidth, window.innerHeight / clientHeight),
				}));
			}
		};
		handleResize();
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	// Handle zoom with + and - keys
	const handleKeyDown = (e: KeyboardEvent) => {
		if (e.key === "+" || e.key === "=") {
			// Zoom in
			setTransform((prev) => ({
				...prev,
				scale: Math.min(prev.scale + 0.05, 5),
			}));
		} else if (e.key === "-") {
			// Zoom out
			setTransform((prev) => ({
				...prev,
				scale: Math.max(prev.scale - 0.05, 0.5),
			}));
		}
	};

	// Handle drag for panning
	const handleMouseDown = (e: React.MouseEvent<SVGSVGElement>) => {
		const startX = e.clientX;
		const startY = e.clientY;
		const { translateX, translateY } = transform;

		const handleMouseMove = (moveEvent: MouseEvent) => {
			setTransform((prev) => ({
				...prev,
				translateX: translateX + moveEvent.clientX - startX,
				translateY: translateY + moveEvent.clientY - startY,
			}));
		};

		const handleMouseUp = () => {
			window.removeEventListener("mousemove", handleMouseMove);
			window.removeEventListener("mouseup", handleMouseUp);
		};

		window.addEventListener("mousemove", handleMouseMove);
		window.addEventListener("mouseup", handleMouseUp);
	};

	// Reset view on button click
	const handleReset = () => {
		setTransform({
			scale: 1,
			translateX: 0,
			translateY: 0,
		});
	};

	return (
		<>
			<h1>9. SVGをzoom & scroll</h1>
			<div
				style={{ overflow: "hidden", width: "100vw", height: "100vh" }}
				tabIndex={0} // Allows div to capture key events
				onKeyDown={handleKeyDown}
			>
				<div style={{ position: "relative", textAlign: "center" }}>
					<svg
						ref={zoomSvgRef}
						onMouseDown={handleMouseDown}
						style={{
							transform: `translate(${transform.translateX}px, ${transform.translateY}px) scale(${transform.scale})`,
							cursor: "grab",
							width: "100%",
							height: "auto",
						}}
					>
						{/* SVG content here */}
						<svg xmlns="http://www.w3.org/2000/svg" width="320" height="180">
							<path fill="#0f0" d="M0 0h320v180H0z" />
							<circle cx="160" cy="90" r="50" fill="red" />
							<text
								x="160"
								y="105.5"
								fill="#00f"
								data-svgjs="{&quot;leading&quot;:&quot;1.5em&quot;}"
								font-family="Arial"
								font-size="45"
								text-anchor="middle"
							>
								<tspan x="160" dy="0">
									Hello, SVG file!
								</tspan>
							</text>
							<text
								x="160"
								y="136"
								fill="#fff"
								data-svgjs="{&quot;leading&quot;:&quot;1em&quot;}"
								font-family="Consolas, Menlo, monospace"
								font-size="30"
								text-anchor="middle"
							>
								<tspan x="160" dy="0">
									monospace font
								</tspan>
							</text>
						</svg>
					</svg>
				</div>
				<div style={{ position: "absolute", top: "10px", right: "10px" }}>
					<button type="button" onClick={handleReset}>
						Fit to window
					</button>
				</div>
			</div>
		</>
	);
}

export default App;
