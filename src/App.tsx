import { BrowserRouter, Route, Switch } from 'react-router-dom'

import { Home } from './frontend/pages/Home'
import { Login } from './frontend/pages/Login'

import { Admin } from './frontend/pages/Admin'
import { ModuleContextProvider } from './frontend/contexts/ModuleContextProvider'
import { AuthContextProvider } from './frontend/contexts/AuthContextProvider'

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <AuthContextProvider>

          <Route path="/login" exact component={Login} />

          <ModuleContextProvider>
            <Route path="/" exact component={Home} />
            <Route path="/admin" exact component={Admin} />
          </ModuleContextProvider>
        </AuthContextProvider>
      </Switch>
    </BrowserRouter>

  );
}

export default App;
