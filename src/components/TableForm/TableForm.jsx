import './TableForm.scss'

const TableForm = ({
	onSubmit,
	newUser,
	onChange,
	addButtonDisabled,
	errors
}) => {


	return (
		<tfoot>
			<tr>
				<td>
					<div className='form-field'>
						<input
							type="text"
							name="name"
							value={newUser?.name}
							onChange={onChange}
							placeholder="Name"
						/>
						<span className="error">{errors.name}</span>
					</div>
				</td>
				<td>
					<div className='form-field'>
						<input
							type="email"
							name="email"
							value={newUser?.email}
							onChange={onChange}
							placeholder="Email"
						/>
						<span className="error">{errors.email}</span>
					</div>
				</td>
				<td>
					<div className='form-field'>
						<input
							type="phone"
							name="phone"
							value={newUser?.phone}
							onChange={onChange}
							placeholder="Phone"
						/>
						<span className="error">{errors.phone}</span>
					</div>
				</td>
				<td>
					<div className='form-field'>
						<input
							type="date"
							name="dob"
							value={newUser?.dob}
							onChange={onChange}
							placeholder=""
						/>
						<span className="error">{errors.dob}</span>
					</div>
				</td>
				<td>
					<button onClick={onSubmit} disabled={addButtonDisabled}>
						Add
					</button>
				</td>
			</tr>


		</tfoot>

	)
}

export default TableForm
