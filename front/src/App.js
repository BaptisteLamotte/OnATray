import React from 'react'
import './App.less';
import {Button} from 'antd'
import 'antd/dist/antd.less';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';

import ScreenHome from './components/Home/ScreenHome'

import SignUpRestauA from './components/Sign-Up/SignUpRestauA';
import SignUpRestauB from './components/Sign-Up/SignUpRestauB';
import SignUpRestauC from './components/Sign-Up/SignUpRestauC';

import SignUpTalentA from './components/Sign-Up/SignUpTalentA';
import SignUpTalentB from './components/Sign-Up/SignUpTalentB';
import SignUpTalentC from './components/Sign-Up/SignUpTalentC';

<<<<<<< HEAD
import MessageRoom from './components/Messaging/MessageRoom'
=======
import MessagerieListe from './components/MessagerieListe';
>>>>>>> listemessages

import Test from './components/Test';


function App() {
  return (
    <Router>
        <Switch>
          <Route path="/" exact component={ScreenHome}/>
          <Route path="/signUpRestauA" component={SignUpRestauA}/>
          <Route path="/signUpRestauB" component={SignUpRestauB}/>
          <Route path="/signUpRestauC" component={SignUpRestauC}/>
          <Route path="/signUpTalentA" component={SignUpTalentA}/>
          <Route path="/signUpTalentB" component={SignUpTalentB}/>
          <Route path="/signUpTalentC" component={SignUpTalentC}/>


          <Route path="/messagerie" component={MessagerieListe}/>
          <Route path='/test' component={Test}/>
          <Route path='/messageRoom' component={MessageRoom}/>
        </Switch>
      </Router>
  );
}

export default App;
