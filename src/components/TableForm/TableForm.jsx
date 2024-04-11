import './TableForm.scss'

const TableForm = ({
	onSubmit,
	newUser,
	onChange,
	addButtonDisabled
}) => {


	return (
		<tfoot>
			<tr>
				<td>
					<input
						type="text"
						name="name"
						value={newUser?.name}
						onChange={onChange}
						placeholder="Name"
					/>
				</td>
				<td>
					<input
						type="email"
						name="email"
						value={newUser?.email}
						onChange={onChange}
						placeholder="Email"
					/>
				</td>
				<td>
					<input
						type="phone"
						name="phone"
						value={newUser?.phone}
						onChange={onChange}
						placeholder="Phone"
					/>
				</td>
				<td>
					<input
						type="date"
						name="dob"
						value={newUser?.dob}
						onChange={onChange}
						placeholder=""
					/>
				</td>
				<td>
					<button
						onClick={onSubmit}
						disabled={addButtonDisabled}
					>
						Add
					</button>
				</td>
			</tr>


		</tfoot>

	)
}

export default TableForm
