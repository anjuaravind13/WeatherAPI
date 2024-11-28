import React, { useEffect } from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'

import Home from './Home/Home'
import Location from './Location/Location'

function App() {

	
  return (
	<div>
		<BrowserRouter>
		<Routes>
			<Route path='/' element={<Home/>}/>
			<Route path='/location' element={<Location/>}/>
		</Routes>
		</BrowserRouter>
	</div>
  )
}

export default App