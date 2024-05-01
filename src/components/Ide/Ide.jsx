import { useEffect, useRef } from 'react';
import { EditorState } from '@codemirror/state';
import { EditorView, keymap, highlightSpecialChars, drawSelection, highlightActiveLine, lineNumbers } from '@codemirror/view';
import { defaultKeymap, historyKeymap, history } from '@codemirror/commands';
import { javascript } from '@codemirror/lang-javascript';
import { searchKeymap, highlightSelectionMatches } from '@codemirror/search';
import { autocompletion, completionKeymap } from '@codemirror/autocomplete';
import { lintKeymap } from '@codemirror/lint';
import { oneDark } from '@codemirror/theme-one-dark'; // Import the dark theme


const Ide = ({ consoleOutput, setConsoleOutput, startingContent }) => {
	const editorRef = useRef(); // This will hold the EditorView instance
	const parentRef = useRef(); // This will hold the parent DOM element

	const runCode = () => {
		try {
			const code = editorRef.current.state.doc.toString(); // Get the code from the editor

			let consoleLogs = [];
			const originalLog = console.log;
			console.log = (...args) => {
				originalLog.apply(console, args); // Log to the actual console
				consoleLogs.push(args.map(arg =>
					typeof arg === 'object' ? JSON.stringify(arg, null, 2) : arg
				)); // Store in consoleLogs
			};

			const output = eval(code); // Evaluate the code
			console.log = originalLog; // Restore the original console.log function

			setConsoleOutput(consoleLogs); // Update the console output with the captured logs
			console.log(consoleLogs)
		} catch (error) {
			setConsoleOutput([error.toString()]); // If there's an error, show it in the console output
		}
	};


	useEffect(() => {
		if (!parentRef.current) return;
		editorRef.current = new EditorView({
			state: EditorState.create({
				doc: startingContent || '', // Make sure this string does not include a newline character
				extensions: [
					lineNumbers(),
					highlightSpecialChars(),
					history(),
					drawSelection(),
					EditorState.allowMultipleSelections.of(true),
					highlightActiveLine(),
					keymap.of([...defaultKeymap, ...searchKeymap, ...historyKeymap, ...lintKeymap, completionKeymap]),
					javascript({ typescript: false }),
					autocompletion(),
					highlightSelectionMatches(),
					oneDark, // Add the dark theme to your extensions
				],
			}),
			parent: parentRef.current,
		});
	}, []);

	return (
		<section style={{
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
			flex: 3,
			gap: '8px',
		}}>
			<div ref={parentRef} style={{
				height: '400px',
				width: '100%',
				textAlign: 'left',
				backgroundColor: '#282c34',
				borderRadius: "8px",
				overflow: 'auto',
				padding: '8px',
				flexGrow: 1,
			}}>
			</div>
			<div style={{
				minHeight: '150px',
				width: '100%',
				backgroundColor: '#000000',
				textAlign: 'left',
				padding: '12px',
				borderRadius: "8px",
				overflow: 'auto',
				fontSize: '12px',
				position: 'relative',
			}}>
				{consoleOutput.flatMap((output, index) => (
					<div key={index} style={{ whiteSpace: '', margin: '2px 0' }}>
						{output}
					</div>
				))}
				<button onClick={runCode} style={{ margin: '8px', position: 'absolute', right: '0px', top: '0px' }}>Run Code</button>
			</div> {/* Console output */}
		</section>
	)
}

export default Ide
