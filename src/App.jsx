import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.scss'
import Home from './pages/Home/Home'
import Nav from './components/Nav/Nav'

function App() {

	return (
		<>
			<BrowserRouter>
				<Nav />
				<Routes>
					<Route path="/" element={<Home />} />
				</Routes>
			</BrowserRouter>
		</>
	)
}

export default App
