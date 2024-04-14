import { useState } from 'react';
import { flushSync } from 'react-dom';

const Flushsync = () => {
	const [count, setCount] = useState(0)
	const [flushCount, setFlushCount] = useState(0)

	const clickHandle = () => {
		setCount(count + 1)
		console.log(count)
	}

	const clickFlushHandle = () => {
		flushSync(() => {
			setFlushCount(count + 1)
		})
		console.log(count)
	}

	return (
		<div>
			<h1>FlushSync</h1>

			<h2>This is a counter</h2>
			<button onClick={clickHandle}>
				Increment count ({count})
			</button>

			<p>you'll notice, the console log is 1 value behind what is shown on the front end.</p>
			<p>this is because the state updates in react are asynchronous.</p>

			<h2>FlushSync Count</h2>
			<button onClick={clickFlushHandle}>
				Increment count ({flushCount})
			</button>
		</div>
	)
}

export default Flushsync
