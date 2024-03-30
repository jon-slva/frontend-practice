import React from 'react'
import './Nav.scss'

const Nav = () => {
	return (
		<nav className='nav-container'>
			<ul className='nav'>
				<li className='nav__items'>APIs</li>
				<li className='nav__items'>React Forms</li>
				<li className='nav__items'>Animations</li>
				<li className='nav__items'>UseRefs</li>
				<li className='nav__items'>Material UI</li>
				<li className='nav__items'>Accessibility</li>
				<li className='nav__items'>UseParams</li>
				<li className='nav__items'>UseLocation</li>
				<li className='nav__items'>Lazy Loading</li>
				<li className='nav__items'>Suspense</li>
			</ul>
		</nav>
	)
}

export default Nav
