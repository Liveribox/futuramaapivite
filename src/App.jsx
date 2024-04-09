import './App.css'
import { FuturamaGrid } from './components/FuturamaGrid';
import { LoginForm } from './components/LoginForm';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import ReactAudioPlayer from 'react-audio-player';

export const App = () => {

  return (
    <>

      <ReactAudioPlayer
          src="futurama.mp3"
          autoPlay
          loop
        />

      <Router>
        <Routes>
          <Route path='/' Component={LoginForm}></Route>
          <Route path='/futugrid' Component={FuturamaGrid}></Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
