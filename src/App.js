import { Route, Routes } from 'react-router-dom';
import Container from './components/layout/Container';
import Footer from './components/layout/Footer';
import NavBar from './components/layout/NavBar';
import Home from './components/pages/Home';
import Projects from './components/pages/Projects';
import Company from './components/pages/Company';
import NewProject from './components/pages/NewProject';
import Contact from './components/pages/Contact';

import styles from './styles/App.module.css';


function App() {
  return (
    <div className={styles.app}>

      <NavBar />


      <Container customClass='min_height'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/projects' element={<Projects />} />
          <Route path='/newproject' element={<NewProject />} />
          <Route path='/company' element={<Company />} />
          <Route path='/contact' element={<Contact />} />
        </Routes>
      </Container>

      <Footer />

    </div>
  );
}

export default App;
