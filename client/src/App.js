import './App.css';
import {BrowserRouter, Route} from 'react-router-dom' 

import LandingPage from './components/LandingPage'
import Home from './components/Home'
import CreateActivity from './components/CreateActivity';
import CountryDetail from './components/CountryDetail';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      {/* <Switch> */}
      {/* <h1>Henry Countries</h1> */}
      <Route exact path='/' component={LandingPage}/>
      <Route exact path='/home' component={Home}/>
      <Route path='/activity' component={CreateActivity}/>
      <Route path='/home/:countryId' component={CountryDetail}/>
      {/* </Switch> */}
    </div>
    </BrowserRouter>
  );
}

export default App;
