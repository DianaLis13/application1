import FormCity from '../components/FormCity';
import Header from '../components/header';
import Sidebar from '../components/sidebar';
import Footer from '../components/footer';

import '../style.css';

function App() {
  return (
    <div className="App">
      <Header/>
      <FormCity />
      <Sidebar/>
      <Footer/>
    </div>
  );
}

export default App;
