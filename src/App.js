import Header from './Header'
import Main from './Main'
import Footer from './Footer'


const App = () => {
  return (
    <div className='App'>
      <div className='header-container'>
        <Header />
      </div>
      <div className='main-container'>
        <Main />
      </div>
      <div className='footer-container'>
        <Footer />
      </div>
    </div>
  );
}

export default App;
