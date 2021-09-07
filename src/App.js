import { useEffect, useState, createContext } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import 'antd/dist/antd.css';
import './App.css';
import Playbar from './component/Playbar';
import Sidebar from './component/Sidebar';
import Header from './component/header';
import Home from './component/Home';

export const ActiveContext = createContext();

function App() {
  const [theme, setTheme] = useState('dark-theme');

  const [activeComponent, setActiveComponent] = useState('home');

  useEffect(() => {
    document.querySelector('body').className = theme;
  }, [theme]);

  return (
    <div className="App">
      <Router>
        <ActiveContext.Provider value={{ activeComponent, setActiveComponent }}>
          <Sidebar />
          <Header />
          <Playbar />
          <div className="main">
            <Switch>
              <Route component={Home} path="/" exact />
            </Switch>
          </div>
        </ActiveContext.Provider>
      </Router>
    </div>
  );
}

export default App;
