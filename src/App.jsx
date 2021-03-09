import React from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Navbar from './components/Navbar';
import Login from './components/Login';
import Admin from './components/Admin';
import {auth} from './firebase'
import Reset from './components/Reset';
import Inicio from './components/Inicio';

function App() {

  const [firebaseuser,setFirebaseuser]=React.useState(false)

  React.useEffect(()=>{
    auth.onAuthStateChanged(user=>{
      if(user){
        setFirebaseuser(user)
      }else{
        setFirebaseuser(null)
      }
    })

  },[])
  return (firebaseuser !==false &&(
    <Router>
    <div className="container">
      <Navbar firebaseuser={firebaseuser}/>
      <Switch>
        <Route path="/login">
         <Login/>
        </Route>
        <Route path="/reset">
         <Reset/>
        </Route>

        <Route path="/admin">
         <Admin/>
        </Route>

        <Route path="/" exact>
          <Inicio/>
        </Route>
      </Switch>  
    </div>
    </Router>
  )
  );
}

export default App;
