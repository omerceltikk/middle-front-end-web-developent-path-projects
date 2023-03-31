import './App.css';
import Home from './pages/Home';
import Detail from './pages/Detail';
import Quotes from './pages/Quotes';

import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
function App() {
  return (
    <BrowserRouter>
      <nav>
        <ul>
          <li>
            <Link to="/">Characters</Link>
          </li>
          <li>
            
            <Link to="/quotes">Quotes</Link>
          </li>
        </ul>
      </nav>
      <div className="App">
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route path='/char/:char_id' element={Detail} />
          <Route path='/quotes' element={<Quotes/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
