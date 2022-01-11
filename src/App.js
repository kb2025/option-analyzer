import Nav from './Components/Nav'
import StrikeTable from './Components/StrikeTable';
import ResultsCard from './Components/ResultsCard';
import { Container, Row, Col } from 'react-bootstrap';

const App = () => {
  return (
    <>
      <Container fluid>
        <Nav />
        <StrikeTable />
      </Container>
    </>
  );
}

export default App
