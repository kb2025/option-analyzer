import Nav from './Components/Nav'
import StrikeTable from './Components/StrikeTable';
import ResultsCard from './Components/ResultsCard';
import { Container, Row, Col } from 'react-bootstrap';

const App = () => {
  return (
    <>
      <Container fluid>
        <Nav />
        <Row className="justify-content-md-center">
          <Col className='m-2'>
            <StrikeTable />
          </Col>
          <Col className='m-2' xs lg="3">
            <ResultsCard />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App
