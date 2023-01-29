import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Container from './components/layout/Container';

//paginas
import Colaboradores from './pages/Colaboradores/Colaboradores';
import ControleTickets from './pages/ControleTickets/Ticket';
import CadastroColaborador from './pages/Colaboradores/CadastroColaborador';
import EditarColaborador from './pages/Colaboradores/EditarColaborador';
import LancarTicket from './pages/ControleTickets/LancarTicket';

// componentes reutilizaveis
import Navbar from "./components/navbar/Navbar";

// importanto css
import './styles.css';

const App = () =>{
  return ( 
    <Container>  
      <Router>         
        <Navbar/>   
        <Routes>
          <Route path="/" element={<Colaboradores/>}/>
          <Route path="/controle-ticket" element={<ControleTickets/>}/>
          <Route path="/cadastro-colaborador" element={<CadastroColaborador/>}/>
          <Route path="/editar-colaborador/:_id" element={<EditarColaborador/>}/>
          <Route path="/lancar-ticket/:_id" element={<LancarTicket/>}/>
        </Routes>        
      </Router>  
    </Container> 
  )  
};

export default App;