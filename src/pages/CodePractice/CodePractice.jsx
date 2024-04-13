import { useRef, useState } from 'react';
import questionCards from '../../data/question_cards.json';
import Ide from '../../components/Ide/Ide';
import Whiteboard from '../../components/Whiteboard/Whiteboard';

const CodePractice = () => {
	const [consoleOutput, setConsoleOutput] = useState([]); // State variable for console output
	const [whiteboard, setWhiteboard] = useState(''); // State variable for whiteboard
	const [showWhiteboard, setShowWhiteboard] = useState(true); // State variable to toggle between Whiteboard and TextField
	const [textFieldValue, setTextFieldValue] = useState(''); // State variable for the text field value
	const [questionIndex, setQuestionIndex] = useState(questionCards[0]); // State variable for the question index
	const [currentQuestion, setCurrentQuestion] = useState(questionCards[0]); // State variable for the current question

	console.log(questionCards[0]);

	const toggleView = () => {
		setShowWhiteboard(!showWhiteboard);
	};

	const updateQuestionIndex = (direction) => {
		let currentIndex = questionCards.indexOf(questionIndex);
		let nextIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;
		if (nextIndex >= questionCards.length) {
			nextIndex = 0;
		} else if (nextIndex < 0) {
			nextIndex = questionCards.length - 1;
		}
		setQuestionIndex(questionCards[nextIndex]);
	};

	return (
		<main>
			<h1>Code Practice</h1>

			<section style={{
				display: 'flex',
				gap: '8px',
				height: '60vh'
			}}>

				<aside style={{
					flex: 1,
					display: 'flex',
					flexDirection: 'column',
					gap: '8px',
				}}>
					<div style={{
						display: 'flex',
						flexDirection: 'column',
						fontSize: '12px',
						backgroundColor: '#282c34',
						borderRadius: '8px',
						padding: '16px',
						textAlign: 'left',
						flex: 1
					}}>


						<div style={{
							display: 'flex',
							justifyContent: 'space-between',
							gap: '8px',
						}}>
							<button style={{ flex: '1' }} onClick={() => updateQuestionIndex('prev')}>
								Previous
							</button>
							<button style={{ flex: '1' }} onClick={() => updateQuestionIndex('next')}>
								Next
							</button>
						</div>

						<h2>Question</h2>
						<p>{questionIndex.instructions}</p>
						<p>{questionIndex.input}</p>
						<p>{questionIndex.example}</p>
						<p>{questionIndex.description}</p>
					</div>

					<button onClick={toggleView}>
						{showWhiteboard ? 'Switch to Textfield' : 'Switch to Whiteboard'}
					</button>
				</aside>
				<Ide consoleOutput={consoleOutput} setConsoleOutput={setConsoleOutput} />

			</section>

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