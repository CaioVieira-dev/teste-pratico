import { BrowserRouter, Route, Switch } from 'react-router-dom'

import { Home } from './pages/Home'
import { Login } from './pages/Login'
import { Private } from './pages/private'
import { Admin } from './pages/Admin'
import { ModuleContextProvider } from './contexts/ModuleContextProvider'
import { AuthContextProvider } from './contexts/AuthContextProvider'

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <AuthContextProvider>

          <Route path="/login" exact component={Login} />

          <ModuleContextProvider>

            <Route path="/" exact component={Home} />
            <Route path="/private" exact component={Private} />
            <Route path="/admin" exact component={Admin} />
          </ModuleContextProvider>
        </AuthContextProvider>
      </Switch>
    </BrowserRouter>

  );
}

export default App;
