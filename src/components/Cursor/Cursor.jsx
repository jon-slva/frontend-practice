import { Circle } from 'react-konva';
import { useEffect, useState } from 'react';

const Cursor = ({ mousePos, penSize, eraserSize, tool }) => {
	const [cursorSize, setCursorSize] = useState(tool === 'eraser' ? eraserSize : penSize);

	useEffect(() => {
		setCursorSize(tool === 'eraser' ? eraserSize : penSize);
	}, [tool, eraserSize, penSize]);

	return (
		<Circle
			x={mousePos.x}
			y={mousePos.y}
			radius={cursorSize / 2}
			stroke="#000"
			strokeWidth={1}
			fill="transparent"
		/>
	);
};

export default Cursor;