import './App.css';
import Header from './components/Header';
import Cards from './components/Cards';
import { Center } from '@chakra-ui/react';

function App() {
  return (
    <div  className='container'>
    <div className="App">
      <Center >
      <div className='section'>
      <Header/>
      <Cards/>
      </div>
      </Center>
    </div>
    </div>
  );
}

export default App;
