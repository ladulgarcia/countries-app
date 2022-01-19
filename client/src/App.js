import './App.css';
import {Route, Routes} from 'react-router-dom'
//import { Link } from 'react-router-dom'; 
import Home from './components/Home'
import LandingPage from './components/LandingPage'
import CountryDetail from './components/CountryDetail';
import CreateActivity from './components/CreateActivity';

// element + Routes en lugar de component versión react-router 6
function App() {
// const App = () => {
  return (
    // <BrowserRouter>
     <div className="App">
    <Routes>
      {/* <h1>Henry Countries</h1> */}
      <Route path = '/' element={<LandingPage/>}/>
      <Route path = '/home' element={<Home/>}/>
      <Route path = '/activity' element={<CreateActivity/>}/>
      <Route path = '/home/:countryId' element={<CountryDetail/>}/>
    </Routes> 
    </div>
    // </BrowserRouter>
  );
}

export default App;


// function App() {
//   return (
//     <BrowserRouter>
//     <div className="App">
//       {/* <Switch> */}
//       {/* <h1>Henry Countries</h1> */}
//       <Route exact path='/' component={LandingPage}/>
//       <Route exact path='/home' component={Home}/>
//       <Route path='/activity' component={CreateActivity}/>
//       <Route path='/home/:countryId' component={CountryDetail}/>
//       {/* </Switch> */}
//     </div>
//     </BrowserRouter>
//   );
// }