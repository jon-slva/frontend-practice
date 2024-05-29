import Ide from '../../components/Ide/Ide';
import { useState } from 'react';
import './LinkedLists.scss'
import linkedListPic from '../../assets/images/linked_lists.png'
import linkedListTypes from '../../assets/images/linked_list_types.png'

export default function LinkedLists() {
	const [consoleOutput, setConsoleOutput] = useState([]);

	const codeSnippet = `// Node structure
class Node {
	constructor(data, next = null) {
		this.data = data;
		this.next = next;
		}
	}
	
// Creating a linked list
let thirdNode = new Node(3);
let secondNode = new Node(2, thirdNode);
let firstNode = new Node(1, secondNode);`;

	// 	const codeSnippet2 = `class Car {
	// 	constructor(brand) {
	// 		this.carName = brand;
	// 	}

	// 	present() {
	// 		return 'I have a ' + this.carName;
	// 	}
	// }

	// let myCar = new Car("Toyota");

	// console.log(myCar.present());
	// `;

	// 	const codeSnippet3 = `class Book {
	//     constructor(title, author, pages) {
	//         // your code here
	//     }

	//     info() {
	//         // your code here
	//     }
	// }

	// class Library {
	//     constructor() {
	//         this.books = [];
	//     }

	//     addBook(book) {
	//         // your code here
	//     }

	//     removeBook(title) {
	//         // your code here
	//     }

	//     findBook(title) {
	//         // your code here
	//     }
	// }

	// // Test your classes with this code
	// let myLibrary = new Library();
	// let book1 = new Book("To Kill a Mockingbird", "Harper Lee", 281);
	// let book2 = new Book("1984", "George Orwell", 328);

	// myLibrary.addBook(book1);
	// myLibrary.addBook(book2);

	// console.log(myLibrary.findBook("1984")); // Should log the book object
	// console.log(myLibrary.findBook("To Kill a Mockingbird").info()); // Should log "To Kill a Mockingbird by Harper Lee, 281 pages"

	// myLibrary.removeBook("1984");
	// console.log(myLibrary.findBook("1984")); // Should log undefined or null
	// `;

	return (
		<main className='main'>
			<h1>Linked Lists</h1>

			<section className='section'>
				<p className='section__text'>
					A Linked List is very similar to an Array, but what makes it different is how it is stored in memory.
					One of the limitations of arrays, is that they must be stored in consecutive memory slots. Linked Lists store their data anywhere in the memory canvas.
				</p>

				<p className='section__text'>
					The way they are able to do this, is because each node in a linked list is comprised of 2 memory slots -
					<ol>
						<li>One that holds the data</li>
						<li>One that holds the memory address of the next value</li>
					</ol>
				</p>

				<p className='section__text'>
					Linked Lists also connect their memory values using pointers (usually shown with arrows instead of commas =&gt; or -&gt;).
					It does this by storing the memory address of the next slot.
				</p>

				<img src={linkedListPic} alt="" />

				<p className='section__text'>
					There are also 2 different kinds of linked lists - <strong>Singly Linked Lists</strong> and <strong>Doubly Linked Lists</strong>.
				</p>

				<img src={linkedListTypes} alt="" />
			</section>


			<section className='section'>
				<h2>Linked Lists in JavaScript</h2>

				<p className='section__text'>
					Linked Lists do not actually exist in JavaScript, but they can be implemented using classes, objects, and pointers.
				</p>

				<pre className='section__codeblock'>
					<code>{codeSnippet}</code>
				</pre>

				<p className='section__text'>
					Something is missing from the above class structure. Can you figure out what else it could be missing to make it a complete linked list?
				</p>
				<Ide startingContent={codeSnippet} consoleOutput={consoleOutput} setConsoleOutput={setConsoleOutput} />

				<p className='section__text'>
					In a <strong>Double Linked List</strong>, each node also has a reference to the previous node.
					this allows two-way navigation, but requires more memory for the extra pointer. Here's how it would look:
				</p>

				<Ide startingContent={codeSnippet} consoleOutput={consoleOutput} setConsoleOutput={setConsoleOutput} />
			</section>

			<p className='section__text'>
			</p>

			<section className='section'>
				<h2>Exercise</h2>

				<p className='section__text'>
				</p>
				<p className='section__text'>

				</p>

				{/* <Ide startingContent={codeSnippet} consoleOutput={consoleOutput} setConsoleOutput={setConsoleOutput} /> */}

				<p className='section__text'>
				</p>
			</section>


		</main>
	);
};


