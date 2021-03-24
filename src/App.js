import React, {useState} from 'react'
import './App.css';
import LoginForm from './components/LoginForm'
import CarMap from './components/CarMap';

function App() {
  //  States
const [user, setUser] = useState({name: '', email: ''})
const [error, setError] = useState('')

// Only Valid User
const adminUSer= {
  email: "admin@admin.com",
  password: "admin123"
}

// Creating Logout State
const Login = details =>{
  console.log(details)

  if(details.email === adminUSer.email && details.password === adminUSer.password){
    console.log("logged in")
    setUser({
      name: details.name,
      email: details.email
    })
  }else{
    console.log('Wrong email or password. Please try the correct one')
    setError('Wrong email or password. Please try the correct one')
  }
}

// Creating Logout Button
const Logout = () => {
  console.log("Logout")
  setUser({name: '', email: ''})
}


  return (
    <div className="App" >
      {(user.email !== '' ) ? (
        <div className="admin-dashboard">
          <h2>Welcome, {user.name}!</h2>
          <div className="logoutButton">
            <button onClick={Logout}>LOGOUT</button>
          </div>
          <CarMap></CarMap>

        </div>
     ) : (
       <LoginForm Login={Login} error={error} />
     )
    }
    </div>
  );
}

export default App;
