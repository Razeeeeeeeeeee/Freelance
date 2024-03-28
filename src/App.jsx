import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import  Candidate  from './pages/candidate'
import Home from './pages/home'


function App() {

  return (
    <>
     <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/candidate' element={<Candidate />} />
        </Routes>
     </BrowserRouter>
    </>
  )
}

export default App

