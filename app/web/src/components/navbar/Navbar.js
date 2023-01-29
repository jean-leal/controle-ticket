import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';

const Navbar = () =>{
  return(
    <nav className={styles.navbar}>
      <ul className={styles.list}>
        <li className={styles.item}> <Link to="/">Colaboradores</Link></li> 
        <li className={styles.item}> <Link to="/controle-ticket">Controle de Tickets</Link></li>
      </ul>
    </nav>
  )
}

export default Navbar;