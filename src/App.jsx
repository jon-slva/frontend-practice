import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.scss'
import Home from './pages/Home/Home'
import Nav from './components/Nav/Nav'
import ErrorPage from './pages/ErrorPage/ErrorPage'
import ApisAndPromises from './pages/ApisAndPromises/ApisAndPromises'
import Tables from './pages/Tables/Tables'
import CodePractice from './pages/CodePractice/CodePractice'
function App() {

	return (
		<>
			<BrowserRouter>
				<Nav />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/apis-and-promises" element={<ApisAndPromises />} />
					<Route path="/react" element={<ApisAndPromises />} />
					<Route path="/tables" element={<Tables />} />
					<Route path="/code-practice" element={<CodePractice />} />
					<Route path="*" element={<ErrorPage />} />
				</Routes>
			</BrowserRouter>
		</>
	)
}

export default App
