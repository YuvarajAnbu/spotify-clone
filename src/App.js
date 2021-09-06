import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import 'antd/dist/antd.css';
import './App.css';
import Playbar from './component/Playbar';
import Sidebar from './component/Sidebar';
import Header from './component/header';

function App() {
  return (
    <div className="App">
      <Router>
        <Sidebar />
        <Header />
        <Playbar />
      </Router>
    </div>
  );
}

export default App;
