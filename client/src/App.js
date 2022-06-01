import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ActualizarPirata from './components/ActualizarPirata';
import NuevoPirata from './components/NuevoPirata';
import TodosPiratas from './components/TodosPiratas';
import Login from './components/Login';

const App = () => {
  return (
    <div className="container">
      <BrowserRouter>
        <Switch>
        <Route path={"/login"} render={() => <Login/>} />
          <Route path={"/pirates"} exact render={() => <TodosPiratas/> } />
          <Route path={"/pirate/new"} exact render={ () => <NuevoPirata/>} />
          <Route path={"/pirate/:id"} render={() => <ActualizarPirata />} />
          
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
