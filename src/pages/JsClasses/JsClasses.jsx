import Ide from '../../components/Ide/Ide';
import { useState } from 'react';
import './JsClasses.scss'


export default function JsClasses() {
	const [consoleOutput, setConsoleOutput] = useState([]);

	const codeSnippet = `class Car {
	constructor(brand) {
		this.carName = brand;
	}
}
let myCar = new Car("Toyota");
console.log(myCar);
`;

	const codeSnippet2 = `class Car {
	constructor(brand) {
		this.carName = brand;
	}

	present() {
		return 'I have a ' + this.carName;
	}
}

let myCar = new Car("Toyota");
console.log(myCar.present());
`;

	return (
		<main className='main'>
			<h1>Classes in JavaScript</h1>
			<p>
				Classes in JavaScript are a type of function. But instead of using the keyword <code>function</code>, to initiate it, we use the keyword <code>class</code>, and the properties are assigned inside a <code>constructor()</code> method.
			</p>

			<pre style={{ textAlign: 'left' }}>
				<code>{codeSnippet}</code>
			</pre>
			<p>
				In the example above, <code>Car</code> is a class. <code>carName</code> is a property with a value of <code>brand</code>.
				The <code>constructor()</code> method is a special method for creating and initializing an object created with a class.
				<code>myCar</code> is an object of the class <code>Car</code>.
			</p>
			<Ide startingContent={codeSnippet} consoleOutput={consoleOutput} setConsoleOutput={setConsoleOutput} />
			<p>
				A class can also have methods. Methods are functions which belong to the class. They are defined inside the class body using the same syntax as functions.
				However, these methods are often used to manipulate the properties of the class.
			</p>

			<pre style={{ textAlign: 'left' }}>
				<code>{codeSnippet2}</code>
			</pre>


			<Ide startingContent={codeSnippet2} consoleOutput={consoleOutput} setConsoleOutput={setConsoleOutput} />
			<p>
				In the example above, <code>present</code> is a method that returns a string that includes the <code>carName</code>.
				You can call this method on any instance of the <code>Car</code> class.
			</p>

			<p>
				It's also important to note that the JavaScript classes, introduced in ECMAScript 2015, are primarily syntactical sugar over JavaScript's existing prototype-based inheritance.
				The class syntax does not introduce a new object-oriented inheritance model to JavaScript.
			</p>


			<p>
				To practice, make up your own. Give it several properties.
			</p>
			<Ide consoleOutput={consoleOutput} setConsoleOutput={setConsoleOutput} />


		</main>
	);
};