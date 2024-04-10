import './Tables.scss'
import React from 'react'
import tableData from '../../data/tables_data.json'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dark, coy, funky } from 'react-syntax-highlighter/dist/esm/styles/prism';
import TableList from '../../components/TableList/TableList';

const Tables = () => {
	const [users, setUsers] = React.useState(tableData);



	const addUser = (user) => {
		// something that adds it to state
	}

	const deleteEntry = (index) => {
		// something that removes it from state
	}

	return (
		<main>
			<h1>Tables</h1>
			<h2>Create a table of contact information</h2>
			<ol className='instructions'>
				<li>Import the JSON data ✔️</li>
				<li>Create the table ✔️</li>
				<li>Style the table a bit ✔️</li>
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
				import tableData from '../../data/tables_data.json'
        `.trim()}
			</SyntaxHighlighter>


			<table>
				<thead>
					<tr>
						<th>Name</th>
						<th>Email</th>
						<th>Phone</th>
						<th>Birthdate</th>
						<th>Delete</th>
					</tr>
				</thead>
				<TableList users={users} onDelete={deleteEntry} />

			</table>

			{/* HTML Table Tags
Tag	Description
<table>	Defines a table
<th>	Defines a header cell in a table
<tr>	Defines a row in a table
<td>	Defines a cell in a table
<caption>	Defines a table caption
<colgroup>	Specifies a group of one or more columns in a table for formatting
<col>	Specifies column properties for each column within a <colgroup> element
<thead>	Groups the header content in a table
<tbody>	Groups the body content in a table
<tfoot>	Groups the footer content in a table */}


		</main>
	)
}

export default Tables;