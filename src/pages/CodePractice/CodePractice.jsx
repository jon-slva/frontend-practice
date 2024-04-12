import { useRef, useState } from 'react';
import Ide from '../../components/Ide/Ide';
import Whiteboard from '../../components/Whiteboard/Whiteboard';


const CodePractice = () => {
	const [consoleOutput, setConsoleOutput] = useState(''); // State variable for console output
	const [whiteboard, setWhiteboard] = useState(''); // State variable for whiteboard

	const runCode = () => {
		try {
			const code = editorRef.current.state.doc.toString(); // Get the code from the editor

			let consoleLogs = [];
			const originalLog = console.log;
			console.log = (...args) => {
				consoleLogs.push(args.join(' '));
				originalLog.apply(console, args);
			};

			const output = eval(code); // Evaluate the code
			console.log = originalLog; // Restore the original console.log function

			setConsoleOutput(consoleLogs.join('\n')); // Update the console output with the captured logs
		} catch (error) {
			setConsoleOutput(error.toString()); // If there's an error, show it in the console output
		}
	};


	return (
		<main>
			<h1>Questions</h1>
			<h2>Practice whatever you want</h2>


			<Ide runCode={runCode} consoleOutput={consoleOutput} />
			<Whiteboard whiteboard={whiteboard} setWhiteboard={setWhiteboard} />
		</main>
	);
};

export default CodePractice;