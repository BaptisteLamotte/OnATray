import React from 'react'
import './App.less';
import {Button} from 'antd'
import 'antd/dist/antd.less';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';

import ScreenHome from './components/Home/ScreenHome'

import SignUpRestauA from './components/Sign-Up/SignUpRestauA';
import SignUpRestauB from './components/Sign-Up/SignUpRestauB';
import SignUpRestauC from './components/Sign-Up/SignUpRestauC';

import SignUpTalentA from './components/Sign-Up/SignUpTalentA'
import SignUpTalentB from './components/Sign-Up/SignUpTalentB'
import SignUpTalentC from './components/Sign-Up/SignUpTalentC'


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
        </Switch>
      </Router>
  );
}

export default App;
