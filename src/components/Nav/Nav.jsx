import React from 'react'
import './Nav.scss'

const Nav = () => {
	return (
		<nav className='nav-container'>
			<ul className='nav'>
				<li className='nav__items'>APIs</li>
				<li className='nav__items'>
					React Forms
					<ul className='nav__sub-items'>
						<li>Forms with State</li>
						<li>Forms with Refs</li>
						<ul className='nav__sub-sub-items'>
							Form Libraries
							<li>React Hook Form</li>
							<li>Formik</li>
							<li>Yup</li>
							<li>React Select</li>
							<li>React Datepicker</li>
							<li>React Timepicker</li>
						</ul>

					</ul>
				</li>
				<li>
					React Hooks
					<ul className='nav__sub-items'>
						<li>useState</li>
						<li>useEffect</li>
						<li>useContext</li>
						<li>useReducer</li>
						<li>useMemo</li>
						<li>useRef</li>
						<li>useCallback</li>
						<li>useLayoutEffect</li>
					</ul>
				</li>
				<li>
					React Router
					<ul className='nav__sub-items'>
						<li>React Router Dom</li>
						<li className='nav__items'>UseParams</li>
						<li className='nav__items'>UseLocation</li>
						<li>React Router Native</li>
					</ul>
				</li>
				<li>
					Other React Features
					<ul className='nav__sub-items'>
					</ul>
				</li>
				<li className='nav__items'>Animations</li>
				<li className='nav__items'>Material UI</li>
				<li className='nav__items'>Accessibility</li>
				<li className='nav__items'>Lazy Loading</li>
				<li className='nav__items'>Suspense</li>
				<li>Tables</li>
			</ul>
		</nav>
	)
}

export default Nav
