import Nav from './Components/Nav'
import StrikeTable from './Components/StrikeTable';

const App = () => {
  return (
    <>
        <Nav />
        <StrikeTable />
        <footer className='text-white text-center'>&copy;2022 Nick Forneris | <a href="https://github.com/NickForneris/option-analyzer" className="link-light">Source Code</a></footer>
    </>
  );
}

export default App
