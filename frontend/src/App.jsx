import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import  Candidate  from './pages/candidate'
import Home from './pages/home'
import NavBar from './components/navbar'
import Candidate_form from './pages/candidate_manual'
import Offlline_mode_candi from './pages/offlline_mode_candi'
import Employer from './pages/employer'
import Employer_manual from './pages/employer_manual'
import Employer_offline from './pages/employer_offline'


function App() {

  return (
    <>
     <BrowserRouter>
    <div className="relative"><NavBar /></div>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/candidate' element={<Candidate />} />
          <Route path='/candidate_form' element={<Candidate_form />} />
          <Route path= '/offlline_mode_candi' element = {<Offlline_mode_candi/>}/>
          <Route path = '/employer' element = {<Employer/>}/>
          <Route path = '/employer_form' element = {<Employer_manual/>}/>
          <Route path = '/employer_offline' element = {<Employer_offline/>}/>
        </Routes>
     </BrowserRouter>

    </>
  )
}

export default App

