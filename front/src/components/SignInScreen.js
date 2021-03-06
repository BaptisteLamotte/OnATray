import React, {useState} from 'react'
import {connect} from 'react-redux'
import {Link, Redirect} from 'react-router-dom'

import Header from './Header'

import {Row, Col, Form, Checkbox, Input, Button} from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons';




function SignInScrenn(props){

    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    const [isSignIn, setIsSignIn] = useState(false)
    const [isTalent, setIsTalent] = useState(false)
    const [isRestau, setIsRestau] = useState(false)


    var sendFormValues = async () => {

        let rawResponse = await fetch('/sign_in', {
          method: 'POST',
          headers: {'Content-Type':'application/x-www-form-urlencoded'},
          body: `email=${email}&password=${password}`
        
        })

        let response = await rawResponse.json()
        //console.log('reponse',response)
        if ( response.result == 'Error'){
            setErrorMessage(<p style={{color:'red'}}>Email ou mot de passe incorrect</p>)
         }
         else if(response.result === true && response.type==='talent'){
            console.log('response talent',response)
            props.onSubmitAdress(response.adresse);
            props.onSendZone(response.zone);
            props.onLogin(response.profil);
            props.onSendToken(response.token);
            props.onSendSignIn({isSignIn:true, isTalent:true, isRestau:false});
           
           
            setIsTalent(true)
            setIsSignIn(true)
         
         }else if (response.result == true && response.type=='restaurant'){


            console.log(response)
            console.log(response.token)
            console.log(response.result)

            
            props.onSendToken(response.token)
            props.onSendSignIn({isSignIn:true, isTalent:false, isRestau:true})
            props.onSubmitAdress(response.adresse)
            props.onLogin(response.profil)
            setIsRestau(true)
            setIsSignIn(true)
         } }
   
        


if(!isSignIn){


    return(
        <Row>
            <Col span={24}>
            <Header/>
            </Col>
            <Col span={24}>
            <Row style={{display:'flex', justifyContent:'center', paddingTop:'80px'}}>
            <Form
              name="normal_login"
              className="login-form"
              initialValues={{ remember: true }}
            >
                <Form.Item
                name="username"
                rules={[{ required: true, message: 'Veuillez entrer votre nom d\'utilisateur !' }]}
                >
                    <Input 
                    onChange={(e)=>setEmail(e.target.value)}
                    value={email}
                    prefix={<UserOutlined className="site-form-item-icon" />} 
                    placeholder="Email" />
                </Form.Item>
                <Form.Item
                name="password"
                rules={[{ required: true, message: 'Veuillez entrer votre mot de passe !' }]}
                >
                    <Input.Password
                    onChange={(e)=>setPassword(e.target.value)}
                    value={password}
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Mot de passe"
                    />
                </Form.Item>
                {errorMessage}
                <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox>Se souvenir de moi</Checkbox>
                </Form.Item>
                <Form.Item style={{paddingTop:'20px'}}>
                    <Button onClick={()=>sendFormValues()} type="primary" htmlType="submit" className="login-form-button"> 
                    Se connecter
                    </Button>   
                </Form.Item>
            </Form>
            </Row>
            </Col>
        </Row>
    )
}else if(isSignIn && isTalent){
    return <Redirect to='/restaurants'/>
}else if(isSignIn && isRestau){
  return  <Redirect to='/recherchetalent'/>
}

}
function mapDispatchToProps (dispatch) {
    return {
        onSendSignIn: function(isConnect) { 
            dispatch( {type: 'addConnect', isConnect : isConnect} ) 
        },
        onSendToken: function(token) { 
            dispatch( {type: 'addToken', token} ) 
         },
        onSubmitAdress: function(pointAdresse){
            dispatch({type:'AddAdress', adresse:pointAdresse})
        },
        onSendZone: function(zone) { 
            dispatch( {type: 'addZone', zone:zone} ) 
        },
        onLogin: function(profil){
            dispatch({type:'addProfil', profil:profil})
        }
        }
    }

  export default connect(
      null, 
      mapDispatchToProps
  )(SignInScrenn);
