import React, {useState} from 'react'
import Header from '../Header'

import { Row, Col, Steps,Form, Input, Button, Checkbox} from 'antd';

import {Link} from 'react-router-dom'

import {connect} from 'react-redux';

const { Step } = Steps;

function SignUpTalentA(props){
    const [talentFirstName, setTalentFirstName] = useState('')
    const [talentLastName, setTalentLastName] = useState('')
    const [talentPhone, setTalentPhone] = useState('')
    
    const [talentEmail, setTalentEmail] = useState('')
    const [verifyTalentEmail, setVerifyTalentEmail] = useState('')
    
    const [talentPassword, setTalentPassword] = useState('')
    const [verifyTalentPassword, setVerifyTalentPassword] = useState('')


    var sendFormValues = async () => {
       var rawResponse = await  fetch('talents/createAccount', {
        method:'POST',
        headers: {'Content-Type':'application/x-www-form-urlencoded'},
        body : `firstName=${talentFirstName}&lastName=${talentLastName}&phone=${talentPhone}&email=${talentEmail}&password=${talentPassword}`
    })
        var response = await rawResponse.json()
        props.onSendToken(response.token)
        props.onSignup(response.profil)
        props.onSendSignIn({isSignIn:true, isTalent:true, isRestau:false});
       
}

    const onFinish = (values) => {
        console.log('Success:', values);
      };

      const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };

      const validateMessages = {
        required: 'Champ vide',
        types: {
          email: 'Email invalide !',
          number: '${label} is not a validate number!',
          
        },
        number: {
          range: '${label} must be between ${min} and ${max}',
        },
      };

    return(
        <div>
             <Header/>  
            <Row style={{paddingLeft:20, paddingTop:10, display:'flex', flexDirection:'column', }}>
                <Col span={12} style={{color:'#4B6584', fontSize:24}}>Créer un compte gratuitement dès maintenant
                </Col>
                <Link to='/signIn'> <Col span={12}> Déjà un compte ? Connectez vous</Col> </Link>
            </Row>
            <Row>
                <Col span={4}></Col>
                <Col span={16}>
                    <Steps current={0} style={{paddingTop:40}}>
                        <Step title="Créer un compte" />
                        <Step title="Renseigner vos informations" />
                        <Step title="Où voulez vous travailler ?" />
                        {/* <Step title="Récapitulatif"/> */}
                    </Steps>
                </Col>
                <Col span={4}></Col>
            </Row>
            <Form
                validateMessages={validateMessages}
                style={{paddingTop:'60px'}}
                name="SignInA"
                initialValues={{
                remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                >
                <Row style={{width:'100%'}}>
                    <Col offset={4} span={6}>
                        <Form.Item
                            key='Prenom'
                            label="Prenom"
                            name="TalentFirstName"
                            rules={[
                            {
                                required: true,
                            },
                            ]}
                        >
                        <Input onChange={(e) => setTalentFirstName(e.target.value)} 
                        value={talentFirstName}
                        />
                        </Form.Item>
                    </Col>
                    <Col offset={2} span={6}>
                        <Form.Item
                            key='Email'
                            colon={false}
                            label="Email"
                            name="talentEmail"
                            rules={[
                            {
                                required: true,
                                type:'email'
                            },
                            ]}
                        >
                        <Input onChange={(e) => setTalentEmail(e.target.value)} 
                        value={talentEmail}
                        />
                        </Form.Item>
                    </Col>
                </Row>  
                <Row style={{width:'100%'}}>
                    <Col offset={4} span={6}>
                        <Form.Item
                            key='lastName'
                            label="Nom de famille"
                            name="talentLastName"
                            rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                            ]}
                        >
                        <Input onChange={(e) => setTalentLastName(e.target.value)} 
                        value={talentLastName}
                        />
                        </Form.Item>
                    </Col>
                    <Col offset={2} span={6}>
                        <Form.Item
                        key='confirmEmail'
                        label="Confirmez votre email"
                        dependencies={['talentEmail']}
                        name="verifyTalentEmail"
                        rules={[
                            {
                              required: true,
                              message: 'Confirmez votre Email !',
                            },
                            ({ getFieldValue }) => ({
                              validator(rule, value) {
                                if (!value || getFieldValue('talentEmail') === value) {
                                  return Promise.resolve();
                                }
                                return Promise.reject('Les emails ne correspondent pas !');
                              },
                            }),
                          ]}
                        >
                        <Input onChange={(e)=> setVerifyTalentEmail(e.target.value)}  
                        value={verifyTalentEmail} 
                        />
                        </Form.Item>
                    </Col>
                </Row>  
                <Row style={{width:'100%'}}>
                    <Col offset={4} span={6}>
                        <Form.Item
                                key='phoneNumber'
                                colon={false}
                                label="N° de telephone"
                                name="talentPhone"
                        >
                        <Input onChange={(e) => setTalentPhone(e.target.value)} 
                        value={talentPhone}
                        />
                        </Form.Item>
                    </Col>
                    <Col offset={2} span={6}>
                        <Form.Item
                            key='password'
                            colon={false}
                            label="Mot de passe"
                            name="talentPassword"
                            rules={[
                            {
                                required: true,
                               
                                
                            },
                            ]}
                        >
                        <Input.Password onChange={(e) => setTalentPassword(e.target.value)} 
                        value={talentPassword}
                        />
                        </Form.Item>
                    </Col>
                </Row>  
                <Row style={{width:'100%'}}>
                    <Col offset={12} span={6}>
                        <Form.Item
                            key='confirmPassword'
                            colon={false}
                            label="Confirmez votre mot de passe"
                            name="verifyTalentPassword"
                            rules={[
                                {
                                  required: true,
                                  message: 'Confirmez votre mot de passe !',
                                },
                                ({ getFieldValue }) => ({
                                  validator(rule, value) {
                                    if (!value || getFieldValue('talentPassword') === value) {
                                      return Promise.resolve();
                                    }
                                    return Promise.reject('Les mots de passe ne correspondent pas !');
                                  },
                                }),
                              ]}
                        >
                        <Input.Password onChange={(e) => setVerifyTalentPassword(e.target.value)} 
                        value={verifyTalentPassword}
                        />
                        </Form.Item>
                    </Col>
                </Row>  
                <Row >
                    <Col offset={14}  style={{display:'flex'}}>
                        <Form.Item name="remember" valuePropName="checked">
                                <Checkbox>Se souvenir de moi</Checkbox>
                        </Form.Item>
                        <Form.Item >
                             <Link to='/getTalentInfo'> 
                            <Button  type="primary"  onClick={()=> sendFormValues()}>
                                Submit
                            </Button>
                             </Link> 
                        </Form.Item>
                    </Col>
                </Row>

            </Form>
        </div>
    )
}
function mapDispatchToProps(dispatch) {
    return {
      onSendToken: function(token) { 
          dispatch( {type: 'addToken', token} ) 
      },
      onSignup: function(profil){
        dispatch({type:'addProfil', profil:profil})
      }, 
      onSendSignIn:function(isConnect){
          dispatch({type:'addConnect', isConnect})
      }
      }
    }
  
  
  export default connect(
      null, 
      mapDispatchToProps
  )(SignUpTalentA);

