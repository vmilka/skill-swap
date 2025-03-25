import { Link, useNavigate } from 'react-router-dom';
import { Navbar as BSNavbar, Nav, Container } from 'react-bootstrap';
import { useAuthContext } from '../../contexts/auth-context';
import * as skillAppi from "../../services/api-service";


function Navbar() {
  const { user, logout } = useAuthContext();
  const navigate = useNavigate();

  const handleLogout = async () => {

    await skillAppi.logout()
    logout()
    navigate('/login');

  };

  return (
    <BSNavbar expand="lg" className="custom-navbar w-100">
      <Container>
        <BSNavbar.Brand as={Link} to="/home">Skill Swap</BSNavbar.Brand>
        <Nav className="ml-auto">
          <Nav.Link as={Link} to="/home">Home</Nav.Link>
          <Nav.Link as={Link} to="/about">About</Nav.Link>
          <Nav.Link as={Link} to="/account">My Account ({user?.name})</Nav.Link>
          <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
        </Nav>
      </Container>
    </BSNavbar>
  );
}

export default Navbar;
