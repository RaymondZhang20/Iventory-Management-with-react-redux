import logo from './react_logo.svg';
import './App.css';
import Header from './components/Header.js';
import Navbar from "./components/Navbar.js";
import {HomePage, AboutPage} from "./components/Page";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App">
      <Header />
      <Navbar />
      <HomePage />
      <AboutPage />
      <Footer />
    </div>
  );
}

export default App;
