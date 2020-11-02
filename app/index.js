import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from './contexts/theme';
import Nav from './components/Nav';
import Loading from './components/Loading';
import Pickem from './components/Pickem';
import Account from './components/Account';
import Standings from './components/Standings';
import Login from './components/Login';

const Posts = React.lazy(() => import('./components/Posts'));
const Post = React.lazy(() => import('./components/Post'));
const User = React.lazy(() => import('./components/User'));

function App() {
  const [theme, setTheme] = React.useState('light');
  const toggleTheme = () => {
    setTheme(theme => (theme === 'light' ? 'dark' : 'light'));
  };

  return (
    <Router>
      <ThemeProvider value={theme}>
        <div className={theme}>
          <div className="container">
            <Nav toggleTheme={toggleTheme} />

            <React.Suspense fallback={<Loading />}>
              <Switch>
                <Route exact path="/" render={() => <Pickem />} />
                <Route exact path="/Login" render={() => <Login />} />
                <Route path="/account" render={() => <Account />} />
                <Route path="/standings" render={() => <Standings />} />
                <Route path="/new" render={() => <Posts type="new" />} />
                <Route path="/post" component={Post} />
                <Route path="/user" component={User} />
                <Route render={() => <h1>404?!</h1>} />
              </Switch>
            </React.Suspense>
          </div>
        </div>
      </ThemeProvider>
    </Router>
  );
}

ReactDOM.render(<App />, document.getElementById('app'));
