import { useState, useRef, useEffect } from 'react';
import { Stage, Layer, Line, Text } from 'react-konva';
import './Whiteboard.scss';
import Cursor from '../Cursor/Cursor';

const Whiteboard = ({ whiteboard, setWhiteboard }) => {
	const [tool, setTool] = useState('pen');
	const [lines, setLines] = useState([]);
	const [color, setColor] = useState('#222');
	const [stageSize, setStageSize] = useState({ width: 500, height: 500 });
	const [darkMode, setDarkMode] = useState(false);
	const [hasStartedDrawing, setHasStartedDrawing] = useState(false);
	const [penSize, setPenSize] = useState(5);
	const [eraserSize, setEraserSize] = useState(30);
	const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
	const containerRef = useRef();
	const isDrawing = useRef(false);

	// Inside toggleDarkMode function
	const toggleDarkMode = () => {
		setDarkMode(!darkMode);
	};

	const colors = darkMode ? ['#fff', '#f00', '#0f0', '#00f', '#ff0', '#0ff', '#f0f'] : ['#000', '#f00', '#0f0', '#00f', '#ff0', '#0ff', '#f0f'];

	const handleMouseDown = (e) => {
		setHasStartedDrawing(true);
		isDrawing.current = true;
		const pos = e.target.getStage().getPointerPosition();
		setLines([...lines, { tool, color, originalColor: color, points: [pos.x, pos.y], size: tool === 'eraser' ? eraserSize : penSize }]);
	};

	const handleMouseMove = (e) => {
		// Get the stage and the pointer position
		const stage = e.target.getStage();
		const point = stage.getPointerPosition();

		// Update the mouse position
		setMousePos(point);

		// If we're not drawing, stop here
		if (!isDrawing.current) {
			return;
		}

		// Get the last line and add the new point to it
		let lastLine = lines[lines.length - 1];
		lastLine.points = lastLine.points.concat([point.x, point.y]);

		// Replace the last line in the lines array
		lines.splice(lines.length - 1, 1, lastLine);
		setLines(lines.concat());
	};

	const handleMouseUp = () => {
		isDrawing.current = false;
	};

	const handleClear = () => {
		setLines([]);
	};

	const handleUndo = () => {
		setLines(lines.slice(0, -1));
	};


	useEffect(() => {
		function handleResize() {
			if (containerRef.current) {
				const { width, height } = containerRef.current.getBoundingClientRect();
				setStageSize({ width, height });
			}
		}
		handleResize();
		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	useEffect(() => {
		setWhiteboard({ lines: lines, darkMode: darkMode });
	}, [lines, darkMode]);

	useEffect(() => {
		if (whiteboard) {
			setLines(whiteboard.lines);
			setDarkMode(whiteboard.darkMode);
		}
	}, []);


	return (
		<div ref={containerRef} className='Whiteboard'>
			<aside className="toolbox">
				<h3 className='toolbox__title' style={{ color: darkMode ? 'black' : 'white' }}>
					{darkMode ? 'Blackboard' : 'Whiteboard'}
				</h3>
				<button onClick={toggleDarkMode}>
					Dark Mode
				</button>
				<button onClick={handleUndo}>Undo</button>

				<div className='toolbox__pen-eraser'>
					<button
						className='toolbox__pen-eraser__pen'
						style={{
							color: tool === 'pen' ? '' : '#646464',
							backgroundColor: tool === 'pen' ? '' : '#050505'
						}}
						onClick={() => setTool('pen')}
					>
						Pen
					</button>
					<button
						className='toolbox__pen-eraser__eraser'
						style={{
							color: tool === 'eraser' ? '' : '#646464',
							backgroundColor: tool === 'eraser' ? '' : '#050505'
						}}
						onClick={() => setTool('eraser')}
					>
						Eraser
					</button>
				</div>

				<button onClick={handleClear}>Clear</button>

				<div className="toolbox__color-picker">
					{colors.map((swatch, index) => (
						<button
							key={index}
							className={`toolbox__color - picker--swatch ${color === swatch ? ' active' : ''}`}
							style={{
								backgroundColor: swatch,
								width: '40px',
								height: '40px',
								borderRadius: '50%',
								padding: 0,
							}}
							onClick={() => setColor(swatch)}
						/>
					))}
				</div>

				<div className="toolbox__brush-size">
					<label htmlFor="pen-size">Pen Size: {penSize}</label>
					<input
						id="pen-size"
						type="range"
						min="1"
						max="50"
						value={penSize}
						onChange={(e) => setPenSize(Number(e.target.value))}
						disabled={tool === 'eraser'} // Disable when eraser is selected
					/>

					<label htmlFor="eraser-size">Eraser Size: {eraserSize}</label>
					<input
						id="eraser-size"
						type="range"
						min="1"
						max="50"
						value={eraserSize}
						onChange={(e) => setEraserSize(Number(e.target.value))}
						disabled={tool === 'pen'} // Disable when pen is selected
					/>
				</div>

			</aside>
			<Stage
				width={stageSize.width}
				height={800}
				onMouseDown={handleMouseDown}
				onMousemove={handleMouseMove}
				onMouseup={handleMouseUp}
				style={{
					backgroundColor: darkMode ? '#313131' : '#eee', // Dark Slate Grey when dark mode is on
					borderRadius: '8px',
				}}
			>
				<Layer>
					{!hasStartedDrawing && <Text text="Just start drawing" x={5} y={30} />}
					{lines.map((line, i) => (
						<Line
							key={i}
							points={line.points}
							stroke={line.tool === 'eraser' ? (darkMode ? '#313131' : '#fff') : (darkMode && line.color === '#000' ? '#fff' : line.color)}
							strokeWidth={line.size} // Use the stored size here
							tension={0.5}
							lineCap="round"
							lineJoin="round"
							globalCompositeOperation={
								line.tool === 'eraser' ? 'destination-out' : 'source-over'
							}
						/>
					))}
					<Cursor
						mousePos={mousePos}
						penSize={penSize}
						eraserSize={eraserSize}
						tool={tool}
					/>
				</Layer>
			</Stage>
		</div>
	);
};

export default Whiteboard
