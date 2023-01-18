import './App.css';
import Header from './components/Header';
import Notes from './components/Notes';
import SectionText from "./components/Sectiontext"
function App() {
  return (
    <div className="App">
      <Header/>
      <SectionText/>
      <Notes/>
    </div>
  );
}

export default App;
