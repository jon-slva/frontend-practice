import Ide from '../../components/Ide/Ide';
import { useState } from 'react';
import './Forms.scss'


const Forms = () => {
	const [consoleOutput, setConsoleOutput] = useState([]);

	const codeSnippet = `
<form>
	<label for="username">Username</label>
	<input
		id="username"
		type="text"
		placeholder="user123"
		name="username"
		required />

	<label for="password">Password</label>
	<input
		id="password"
		type="password"
		name="password"
		minlength="6"
		required />

	<fieldset>
		<legend>Choose your animal</legend>

		<label for="dog">Dog</label>
		<input id="dog" type="radio" name="animal" value="dog" />

		<label for="cat">Cat</label>
		<input id="cat" type="radio" name="animal" value="cat" />

		<label for="horse">Horse</label>
		<input id="horse" type="radio" name="animal" value="horse" />
	</fieldset>

	<button>Submit</button>
</form>
	`;

	return (
		<div>
			<form>
				{/* Your form inputs */}
			</form>

			<pre style={{ textAlign: 'left' }}>
				<code>{codeSnippet}</code>
			</pre>

			<Ide startingContent={codeSnippet} consoleOutput={consoleOutput} />
		</div>
	);
};

export default Forms
