import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';
import Navbar from './components/navbar';
import Home from './pages/home/home';
import Login from './pages/login/login';
import Signup from './pages/signup/signup';
import TransactionList from './pages/home/TransactionList'
import TransactionDetail from './pages/home/TransactionDetail';

function App() {
  const { authIsReady, user } = useAuthContext();

  return (
    <div className="App">
      {authIsReady && (
        <BrowserRouter>
          <Navbar />
          <Switch>
            <Route exact path="/">
             {user ? <Home /> : <TransactionList />}
            </Route>
            <Route path="/login">
              {user && <Redirect to="/" />}
              {!user && <Login />}
            </Route>
            <Route path="/signup">
              {user && user.displayName && <Redirect to="/" />}
              {!user && <Signup />}
            </Route>
            {/* Route for displaying the transaction list */}
            <Route path="/transactions">
              {user ? <TransactionList /> : <Redirect to="/login" />}
            </Route>
            {/* Route for displaying transaction details */}
            <Route path="/transaction/:id">
              {user ? <TransactionDetail /> : <TransactionDetail />}
            </Route>
          </Switch>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
