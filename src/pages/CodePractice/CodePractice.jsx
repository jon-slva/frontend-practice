import { useRef, useState } from 'react';
import Ide from '../../components/Ide/Ide';
import Whiteboard from '../../components/Whiteboard/Whiteboard';

const CodePractice = () => {
	const [consoleOutput, setConsoleOutput] = useState(''); // State variable for console output
	const [whiteboard, setWhiteboard] = useState(''); // State variable for whiteboard
	const [showWhiteboard, setShowWhiteboard] = useState(true); // State variable to toggle between Whiteboard and TextField
	const [textFieldValue, setTextFieldValue] = useState(''); // State variable for the text field value



	const toggleView = () => {
		setShowWhiteboard(!showWhiteboard);
	};

	return (
		<main>
			<h1>Questions</h1>
			<h2>Practice whatever you want</h2>

			<button onClick={toggleView}>
				{showWhiteboard ? 'Switch to Textfield' : 'Switch to Whiteboard'}
			</button>

			<Ide consoleOutput={consoleOutput} setConsoleOutput={setConsoleOutput} />

			{showWhiteboard ? (
				<Whiteboard whiteboard={whiteboard} setWhiteboard={setWhiteboard} />
			) : (
				<textarea
					value={textFieldValue}
					onChange={(e) => setTextFieldValue(e.target.value)}
					style={{
						width: '100%',
						height: '100px',
						padding: '8px',
						margin: '24px',
						fontSize: '16px',
						backgroundColor: '#313131',
						borderRadius: '8px',
						border: 'none',
						height: '400px',
					}}
				/>
			)}
		</main>
	);
};

export default CodePractice;