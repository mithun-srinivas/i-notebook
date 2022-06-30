import logo from './logo.svg';
import './App.css';
import ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Layout from './components/LAyout';
import About from './components/About';
import Home from './components/Home';
import NoteState from './context/notes/NoteState';

function App() {
  return (
    <>
    <NoteState>
      <BrowserRouter>
        
          <Layout />
          <div className='container'>
            <Routes>
              <Route path='/home' element={<Home />} />

              <Route path='/about' element={<About />} />
            </Routes>
          </div>
      </BrowserRouter>
      </NoteState>
    </>
  );
}

export default App;
