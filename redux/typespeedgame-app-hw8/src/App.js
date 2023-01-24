import './App.css';
import Header from './components/Header';
import TextInput from './components/TextInput';
import { Box, Center } from '@chakra-ui/react';

function App() {
  return (
    <Box height="100vh" bg="#EEEEEE">
    <div className="App">
      <Center >
      <Box marginTop="100px" className="box">
      <Header/>
      <TextInput/>
      </Box>
      </Center>
    </div>
    </Box>
  );
}

export default App;
