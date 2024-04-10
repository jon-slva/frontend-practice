import './Tables.scss'
import React from 'react'
import tableData from '../../data/tables_data.json'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';

const Tables = () => {
	return (
		<main>
			<h1>Tables</h1>
			<h2>Create a table of contact information</h2>
			<ol className='instructions'>
				<li>Import the JSON data</li>
				<li>Create the table</li>
				<li>Create a form to add to the table</li>
				<ul>
					<li>Form must include validation</li>
					<li>Form must include a submit button</li>
					<li>Form must include a calendar</li>
					<li>Form must include delete functionality</li>
				</ul>
			</ol>

			<SyntaxHighlighter language="javascript" style={dark}>
				{`
          function helloWorld() {
            console.log("Hello, world!");
          }
        `.trim()}
			</SyntaxHighlighter>
		</main>
	)
}

export default Tables;