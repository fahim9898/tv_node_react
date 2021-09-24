import React, {useState, useEffect, useRef} from 'react';
import axios from 'axios';
function Login(props) {
  
  let [email, setEmail] = useState('');
  let [password, setPassword] = useState('');
  let [sending, setSending] = useState(false);
  let [err, setErr] = useState(false);
  let [auth, setAuth] = useState(false);

  function submitInput() {
    setSending(true);
    axios.post('http://localhost:3005/api/login', {
      email: email,
      password: password
    }).then(res=>{
      setErr(false);
      setAuth(true);
      setSending(false);
    }).catch(err=>{
      console.log(err)
      setErr(true);
      setTimeout(() => {
        setErr(false);
      }, 5000);
      setSending(false);
    })
  }
  
  return (
    <div className="login__container">
      <div className="login__card">
        <form>
        {err==true  && <p className="fail">Login Fail</p>}
        {auth==true  && <p className="success">Login Success</p>}
        <div className="login__input">
          <input required type="text" onChange={event => setEmail(event.target.value)}/>
            <div className="input__place-holder" >
              Enter Email Address
            </div>
            <div className="border"></div>
        </div>
        <div className="login__input">
            <input required type="password" onChange={event => setPassword(event.target.value)} />
            <div className="input__place-holder">
              Enter Password
            </div>
            <div className="border"></div>
        </div>
        <div className="login__submit">
          <div className="login__btn" onClick = {submitInput}>
            {
              sending == false && 
              'Login'
            }
            {
              sending == true &&
              <div className="loader">Loading...</div>
            }
          </div>
        </div>
          </form>
      </div>
    </div>
  )
}

export default Login