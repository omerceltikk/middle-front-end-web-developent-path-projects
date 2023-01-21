import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import ProductCard from './components/Card';
import Receipt from './components/Footer';
import { Container } from '@chakra-ui/react';

function App() {
  return (
    <div className="App">
      <Header/>
      <ProductCard/>
      <Receipt/>
    </div>
  );
}

export default App;
