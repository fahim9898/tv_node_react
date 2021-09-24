import logo from './logo.svg';
import './App.css';

import React, {useState} from 'react';

import Login from './components/login';



function App() {
  let [adminUser, setAdminUser] = useState({name: '', email: '', password: '', loading: false})
  
  function onChange (new_val) {
    setAdminUser(new_val)  
  }
  return (
    <div className="App" >
      <Login adminUser={adminUser} onChange={onChange} />
    </div>
  );
}

export default App;
