import { Route, Routes } from 'react-router-dom';
import Container from './components/layout/Container';
import Footer from './components/layout/Footer';
import NavBar from './components/layout/NavBar';
import Company from './components/pages/Company';
import Contact from './components/pages/Contact';
import Home from './components/pages/Home';
import NewProject from './components/pages/NewProject';
import Projects from './components/pages/Projects';
import styles from './styles/App.module.css';


function App() {
  return (
    <div className={styles.app}>

      <NavBar/>
      <Container customClass='min_height'>
        
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/company' element={<Company />} />
          <Route path='/projects' element={<Projects />} />
        </Routes>
       

        
      </Container>
      <Footer />

    </div>
  );
}

export default App;
