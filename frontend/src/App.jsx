import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import  Candidate  from './pages/candidate'
import Home from './pages/home'
import NavBar from './components/navbar'


function App() {

  return (
    <>
     <BrowserRouter>
    <div className="relative"><NavBar /></div>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/candidate' element={<Candidate />} />
        </Routes>
     </BrowserRouter>

    </>
  )
}

export default App

