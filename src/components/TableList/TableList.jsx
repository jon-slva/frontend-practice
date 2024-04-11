import './TableList.scss'

import React from 'react'

const TableList = ({ users, onDelete }) => {
	return (
		<tbody>

			{users.map((user, index) => {
				return (
					<tr key={index}>
						<td>{user.name}</td>
						<td>{user.email}</td>
						<td>{user.phone}</td>
						<td>{user.dob}</td>
						<td>
							<button onClick={() => onDelete(index)}>Delete</button>
						</td>
					</tr>
				)
			})}

		</tbody>
	)
}

export default TableList
