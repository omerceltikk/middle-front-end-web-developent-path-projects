import './App.css';
import Contacts from './components/Contacts';
import Edit from './components/Contacts/Edit';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
function App() {
  return (
    <div className="App">
      <h1>Contacts</h1>
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<Contacts />} />
          <Route exact path='/edit:id' element={<Edit />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
