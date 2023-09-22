import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import AppRouter from './routes/Router';
import NavBar from './components/creator/NavBar/NavBar';

const App = () => (
  <div className="app-container">
    <BrowserRouter>
      <section className="main-content">
        <AppRouter />
      </section>
      <NavBar />
    </BrowserRouter>
  </div>
);

// function App() {
//   return (
//     <div className="App">
//       {/* <ClientHomePage /> */}
//       <CreatorHomePage />
//     </div>
//   );
// }

export default App;
library.add(fab, fas, far)
