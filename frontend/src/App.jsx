import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import  Candidate  from './pages/candidate'
import Home from './pages/home'
import NavBar from './components/navbar'
import Candidate_form from './pages/candidate_manual'
import Offlline_mode_candi from './pages/offlline_mode_candi'


function App() {

  return (
    <>
     <BrowserRouter>
    <div className="relative"><NavBar /></div>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/candidate' element={<Candidate />} />
          <Route path='/candidate_form' element={<Candidate_form />} />
          <Route path= '/offline_mode_candi' element = {<Offlline_mode_candi/>}/>
        </Routes>
     </BrowserRouter>

    </>
  )
}

export default App

