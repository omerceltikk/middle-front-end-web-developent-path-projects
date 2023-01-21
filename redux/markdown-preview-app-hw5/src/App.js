import { Container, Box, Heading, Grid, GridItem } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import './App.css';
import PreviewPage from './components/PreviewPage';
import Written from './components/Written';
import { useEffect, useState } from 'react';
import { setHelpInfo } from './redux/textSlice';

function App() {
  const [help, setHelp] = useState(false)
  const dispatch = useDispatch()
  useEffect(() => {
    console.log(help);
    dispatch(setHelpInfo(help))
  },[help])
  return (
    <>
    <div className='header'>
    <h1>Markdown Preview</h1>
    <button onClick={() => setHelp(help == true ? false : true)} className='button'>?</button>
    </div>
    <div className="App">
            <Written/>
            <PreviewPage/>
    </div>
    </>
  );
}

export default App;
