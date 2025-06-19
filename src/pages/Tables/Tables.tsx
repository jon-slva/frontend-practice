import './Tables.scss'
import { useState } from 'react'

import tableData from '../../data/tables_data.json'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dark, coy, funky } from 'react-syntax-highlighter/dist/esm/styles/prism';
import TableList from '../../components/TableList/TableList';
import TableForm from '../../components/TableForm/TableForm';

const Tables = () => {
	const [users, setUsers] = useState(tableData);
	const [newUser, setNewUser] = useState({ // creates a new user template to start with. This will be updated as the user types in the form. 
		name: '', // these will also serve as the default starting data (value)
		email: '',
		phone: '',
		dob: '',
	});
	const [errors, setErrors] = useState({ name: '', email: '', phone: '', dob: '' }); // will hold the errors for each field


	const validateForm = (value, type) => {
		//something about name, email, phone, dob
		if (type === 'name') {
			return value.trim() === "" ? "Name is required" : ""; // LIVE trim removes whitespace and if empty, renders the error with this text below the input
		} else if (type === 'email') {
			const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
			return emailRegex.test(value) ? "" : "Invalid email address"; // LIVE basic regex validation of email.
		} else if (type === 'phone') {
			const phoneRegex = /^[\s()+-]*([0-9][\s()+-]*){6,20}$/;
			return phoneRegex.test(value) || value === "" ? "" : "Invalid phone number"; // LIVE basic regex phone number
		} else {
			return value === "" ? "Date of Birth is required" : ""; // LIVE if the date is empty, render this error
		}
	}


	const handleInputChange = (e) => {
		const { name, value } = e.target;
		let validationError = '';

		switch (
		name
		) {
			case "name":
				validationError = validateForm(value, 'name');
				break;
			case "email":
				validationError = validateForm(value, 'email');
				break;
			case "phone":
				validationError = validateForm(value, 'phone');
				break;
			case "dob":
				validationError = validateForm(value, 'dob');
				break;
			default:
				break;
		}

		setErrors({ ...errors, [name]: validationError })
		setNewUser({ ...newUser, [name]: value });
		console.log(errors);
	}


	const addUser = () => {
		if (newUser.dob === '') {
			console.log("dob is empty");
			let validationError = validateForm(newUser.dob, 'dob');

			setErrors({ ...errors, dob: validationError });
		} else {
			setUsers((previous) => [...previous, newUser]); // don't forget when updating state, you can include the previous values with this use of the spread operator
			setNewUser({ name: "", email: "", phone: "", dob: "" });
		}
	}


	const deleteEntry = (index) => {
		setUsers(users.filter((user, i) => i !== index));
	}


	const addButtonDisabled =
		newUser.name === '' ||
		newUser.email === '' ||
		newUser.phone === '' ||
		errors.name !== '' ||
		errors.email !== '' ||
		errors.phone !== '' ||
		errors.dob !== '';



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
					<li>Form must include a calendar✔️</li>

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

				<TableForm
					onSubmit={addUser}
					onChange={handleInputChange}
					newUser={newUser}
					addButtonDisabled={addButtonDisabled}
					errors={errors}
				/>


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
<tfoot>	Groups the footer content in a table 

type: Specifies the type of input element to display. The default type is "text". Other possible types include "password", "checkbox", "radio", "submit", etc.
name: Used to reference the form data after a form is submitted.
value: Defines the initial (default) value of the input field.
placeholder: Specifies a short hint that describes the expected value of an input field.
required: Specifies that an input field must be filled out before submitting the form.
disabled: Specifies that an input field should be disabled.
readonly: Specifies that an input field is read-only (cannot be changed).
id: Specifies a unique id for the input field. It's often used in conjunction with the <label>'s for attribute to associate the label with the input field.


*/}



		</main>
	)
}

export default Tables;