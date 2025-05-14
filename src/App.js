import './App.css';
import './pages/myStyles.css'

import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import TwistHome from './pages/twistHome';
import { AuthPage } from './pages/authPage';
import { SignUp } from './Signup';
import { Login } from './loginPage';
import { ConnectSuccess } from './pages/connect';
import Protected_route from './pages/protected-route';
import { Logger } from './pages/logger';
import { Provider } from 'react-redux';
import store from './redux/store';

function App() {
  return (
    <Router>
      <Provider store={store}>
      <Routes>
          <Route path='/' element={<AuthPage />}></Route>
          <Route path='/connect-success' element={<ConnectSuccess/>}></Route>
          <Route path='/login2' element={<Login />}></Route>
          <Route path='/signup2' element={<SignUp />}></Route>
           <Route path='/auth-page2' element={<AuthPage />}></Route>
           <Route path='/twist-homepage2' element={<Protected_route><TwistHome /></Protected_route>}></Route>
        </Routes>
      </Provider>
  </Router>
  );
}

export default App;
