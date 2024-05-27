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

	const codeSnippet3 = `class Book {
    constructor(title, author, pages) {
        // your code here
    }

    info() {
        // your code here
    }
}

class Library {
    constructor() {
        this.books = [];
    }

    addBook(book) {
        // your code here
    }

    removeBook(title) {
        // your code here
    }

    findBook(title) {
        // your code here
    }
}

// Test your classes with this code
let myLibrary = new Library();
let book1 = new Book("To Kill a Mockingbird", "Harper Lee", 281);
let book2 = new Book("1984", "George Orwell", 328);

myLibrary.addBook(book1);
myLibrary.addBook(book2);

console.log(myLibrary.findBook("1984")); // Should log the book object
console.log(myLibrary.findBook("To Kill a Mockingbird").info()); // Should log "To Kill a Mockingbird by Harper Lee, 281 pages"

myLibrary.removeBook("1984");
console.log(myLibrary.findBook("1984")); // Should log undefined or null
`;

	return (
		<main className='main'>
			<h1>Classes in JavaScript</h1>

			<section className='section'>

				<p className='section__text'>
					Classes in JavaScript are a type of function. But instead of using the keyword <code>function</code>, to initiate it, we use the keyword <code>class</code>, and the properties are assigned inside a <code>constructor()</code> method.
				</p>

				<pre className='section__codeblock'>
					<code>{codeSnippet}</code>
				</pre>
				<p className='section__text'>
					In the example above, <code>Car</code> is a class. <code>carName</code> is a property with a value of <code>brand</code>.
					The <code>constructor()</code> method is a special method for creating and initializing an object created with a class.
					<code>myCar</code> is an object of the class <code>Car</code>.
				</p>

				<Ide startingContent={codeSnippet} consoleOutput={consoleOutput} setConsoleOutput={setConsoleOutput} />
			</section>

			<section className='section'>
				<h2>Methods</h2>
				<p className='section__text'>
					A class can also have methods. Methods are functions which belong to the class. They are defined inside the class body using the same syntax as functions.
					However, these methods are often used to manipulate the properties of the class.
				</p>

				<pre className='section__codeblock'>
					<code>{codeSnippet2}</code>
				</pre>

				<p className='section__text'>
					In the example above, <code>present</code> is a method that returns a string that includes the <code>carName</code>.
					You can call this method on any instance of the <code>Car</code> class.
				</p>

				<Ide startingContent={codeSnippet2} consoleOutput={consoleOutput} setConsoleOutput={setConsoleOutput} />
			</section>

			<p className='section__text'>
				It's also important to note that the JavaScript classes, introduced in ECMAScript 2015, are primarily syntactical sugar over JavaScript's existing prototype-based inheritance.
				The class syntax does not introduce a new object-oriented inheritance model to JavaScript.
			</p>

			<section className='section'>
				<h2>Exercise</h2>

				<p className='section__text'>
					To practice, make up your own. Give it several properties.
				</p>
				<p className='section__text'>
					Let's create a <code>Library</code> class that holds <code>Book</code> objects.
					The <code>Book</code> class should have properties for <code>title</code>, <code>author</code>, and <code>pages</code>. It should also have a <code>method info()</code> that returns a string in the format <code>"Title by Author, X pages"</code>.
					The <code>Library</code> class should have a property <code>books</code> that starts as an empty array. It should have methods to <code>addBook(book)</code>, <code>removeBook(title)</code>, and <code>findBook(title)</code>.
					Here's the skeleton of the classes:
				</p>

				<Ide startingContent={codeSnippet3} consoleOutput={consoleOutput} setConsoleOutput={setConsoleOutput} />

				<p className='section__text'>
					Try to fill in the methods for the Book and Library classes. This exercise will give you practice with classes, methods, and manipulating arrays of objects.
				</p>
			</section>


		</main>
	);
};


// first practice
// only issue is I did not include the spread operator.
// class Band {
// 	constructor(...members) {
// 		this.bandMembers = members;
// 	}
// }

// let myBand = new Band("drummer", "singer", "guitarist", "bassist")

// console.log(myBand) // { "bandMembers": [ "drummer", "singer", "guitarist", "bassist" ] }

// SECOND PRACTICE
// ADDING A METHOD
// I had no idea how to address the content of the class, or the array, but with some help I did it. 
// if I needed to do something to each element in the array, I assume I would use a loop. and it would look
// something like a this.bandMembers.forEach() or this.bandMembers.map() or this.bandMembers.filter()
class Band {
	constructor(...members) {
		this.bandMembers = members;
	}
	thisIs() {
		let lastMember = this.bandMembers.pop(); // this removes the last element from 
		let memberList = this.bandMembers.join(", ")
		return `My band has a ${memberList}, and a ${lastMember}!`
	}
}

let myBand = new Band("drummer", "singer", "guitarist", "bassist")

console.log(myBand) // { "bandMembers": [ "drummer", "singer", "guitarist", "bassist" ] }
console.log(myBand.thisIs()) // My band has a drummer, singer, guitarist, and a bassist!



// Exercise answer. Pretty good. I had to look up the splice method.

class Book {
	constructor(title, author, pages) {
		this.bookTitle = title;
		this.bookAuthor = author;
		this.bookPages = pages;
	}

	info() {
		return `${this.bookTitle} by ${this.bookAuthor}, ${this.bookPages} pages`
	}
}


class Library {
	constructor(book) {
		this.books = [];
	}

	addBook(book) {
		this.books.push(book)
	}

	removeBook(title) {
		for (let i = 0; i < this.books.length; i++) {
			if (this.books[i].bookTitle === title) { // my only other mistake was minor - I used this.books[i].title instead of this.books[i].bookTitle
				this.books.slice(i, i + 1) // my biggest mistake - using this instead of splice(i,1). slice does not modify the original array - returns a new one. 
			}
		}
	}

	findBook(title) {
		for (let i = 0; i < this.books.length; i++) {
			if (this.books[i].bookTitle === title) {
				return this.books[i]
			}
		}
		return "Book not found";
	}
}

// Test your classes with this code
let myLibrary = new Library();
let book1 = new Book("To Kill a Mockingbird", "Harper Lee", 281);
let book2 = new Book("1984", "George Orwell", 328);
// console.log(book2.info())
myLibrary.addBook(book1);
myLibrary.addBook(book2);
// console.log(myLibrary)
console.log(myLibrary.findBook("1984")); // Should log the book object
console.log(myLibrary.findBook("To Kill a Mockingbird").info()); // Should log "To Kill a Mockingbird by Harper Lee, 281 pages"

myLibrary.removeBook("1984");
console.log(myLibrary.findBook("1984")); // Should log undefined or null
