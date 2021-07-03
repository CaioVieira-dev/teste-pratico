import { BrowserRouter, Route, Switch } from 'react-router-dom'

import { Home } from './pages/Home'
import { Login } from './pages/Login'
import { Private } from './pages/private'
import { Admin } from './pages/Admin'

function App() {
  return (
    <BrowserRouter>
      <Switch>

        <Route path="/" exact component={Home} />
        <Route path="/login" exact component={Login} />
        <Route path="/private" exact component={Private} />
        <Route path="/admin" exact component={Admin} />
      </Switch>
    </BrowserRouter>

  );
}

export default App;
