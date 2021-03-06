import React, {useState} from 'react'

import {connect} from 'react-redux'

import {Link, Redirect} from 'react-router-dom'

import Header from '../Header'

import { Row, Col, Steps, Form, Input, Button, Space, Checkbox, Select, Upload, DatePicker, message} from 'antd';
import { MinusCircleOutlined, PlusOutlined, QuestionCircleOutlined, UploadOutlined} from '@ant-design/icons';


const { Step } = Steps;
const { Option, OptGroup } = Select;



function SignUpTalentB(props){
    
    const [isHotellerie, setIsHotellerie] = useState([])

    const [jobChoosen, setJobChoosen] = useState([])
    const [enPoste, setEnPoste] = useState(false)
    const [enRecherche, setEnrecherche]= useState(false)

    const [languageChoosen, setLanguageChoosen] = useState([])
    const [languageToAdd, setLanguageToAdd] = useState('')
    const [language, setLanguage] = useState([])
    const [contrat, setContrat] = useState([])
    const [displayJobAndContrat, setDisplayJobAndContrat] = useState(false)

    
    const [redirect, setRedirect] = useState(false)

    var addLanguageItem = (optionToAdd) => {
        let newOption = {value:optionToAdd, label:optionToAdd}
        setLanguage([...language, newOption])
        setLanguageToAdd('')
    }
    var dataLanguageToAdd = language.map(function(option,i){
        return <Option value = {option.value}>{option.label}</Option>
    })

    const onFinish =  values => {
        console.log(' its values',values)
      

        var langageToSend =  JSON.stringify(languageChoosen)
        var jobToSend =  JSON.stringify(jobChoosen)
        var formationToSend =  JSON.stringify(values.formation)
        var experienceToSend =  JSON.stringify(values.experience)
        var contratToSend = JSON.stringify(contrat)

         fetch('/talents/informations',{
            method:'POST',
            headers: {'Content-Type':'application/x-www-form-urlencoded'},
            body : `token=${props.tokenToDisplay}&recherche=${enRecherche}&poste=${enPoste}&langage=${langageToSend}&job=${jobToSend}&experience=${experienceToSend}&formation=${formationToSend}&contrat=${contratToSend}`
        })
        
        setRedirect(true)
    }

    const photo = {
        name: 'photo',
        action: `/upload/${props.tokenToDisplay}`,
        headers: {
          authorization: 'authorization-text',
        },
        async onChange(info) {
            
          if (info.file.status !== 'uploading') {
            console.log('INFO UPLOADING',info);
          }
          if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
            
          } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
          }
        },
      };

    if(enRecherche == true ){
        var inputToDisplay = 
            <Col span={11} style={{display:'flex', alignItems:'flex-start', justifyContent:'flex-start'}}>
            <span style={{paddingRight:10}}>Postes ?</span>
            <Select 
            onChange={(e)=>setJobChoosen(e)}
            style={{width:'150px'}}
            mode='multiple'>
            <OptGroup label="En salle">
            <Option value='Voiturier'>Voiturier</Option>
            <Option value='Serveur'>Serveur</Option>
            <Option value='Garçon de café'>Garçon de café</Option>
            <Option value='Plongeur'>Plongeur</Option>
            <Option value='Runner'>Runner</Option>
            <Option value='Sommelier'>Sommelier</Option>
            <Option value='Chef de rang'>Chef de rang</Option>
            <Option value="Maître d'hôtel">Maître d'hôtel</Option>
            <Option value='Manager'>Manager</Option>
            </OptGroup>
            <OptGroup label="En cuisine">
            <Option value='Chef de cuisine'>Chef de cuisine</Option>
            <Option value='chefDePartie'>Chef de partie</Option>
            <Option value='Commis de cuisine'>Commis de cuisine</Option>
            <Option value="Pizzaiolo">Pizzaiolo</Option>
            <Option value="Pâtissier">Pâtissier</Option>
            </OptGroup>
            </Select>
        </Col>
      
        }
        if(enRecherche == true ){
            var inputContractToDisplay = 
            <Col offset={11} span={8}>
            <span>Contrat ?  </span>
            <Select
            onChange={(e)=>setContrat(e)}
            style={{width:'150px'}}
            mode='multiple'
            >
              <Option value="CDD">CDD</Option>
              <Option value="CDI">CDI</Option>
              <Option value="Extra">Extra</Option>      
            </Select>
        </Col>
        }
      
       
            const [fileList, setFileList] = useState([]);
          
            const onChange = ({ fileList: newFileList }) => {
                console.log('newfilelist', newFileList)
              setFileList(newFileList);
            };
          
            const onPreview = async file => {
              let src = file.url;
              if (!src) {
                src = await new Promise(resolve => {
                  const reader = new FileReader();
                  reader.readAsDataURL(file.originFileObj);
                  reader.onload = () => resolve(reader.result);
                });
              }
              const image = new Image();
              image.src = src;
              const imgWindow = window.open(src);
              imgWindow.document.write(image.outerHTML);
            }
        
        
    
    

    if(redirect){
        return ( 
            <Redirect to='/signUpTalentC'></Redirect>
        )
    }else {

    
        
    return(
        <div>
            <Header/>
            <Row style={{paddingLeft:20, paddingTop:10, display:'flex', flexDirection:'column', }}>
                <Col span={12} style={{color:'#4B6584', fontSize:24}}>Créer un compte gratuitement dès maintenant
                </Col>
                <Link to='/signIn'> <Col span={12}> Déjà un compte ? Connectez vous</Col></Link> 
            </Row>
            <Row>
                <Col span={3}></Col>
                <Col span={18}>
                    <Steps current={1} style={{paddingTop:40}}>
                        <Step title="Créer un compte" />
                        <Step title="Renseigner vos informations" />
                        <Step title="Où voulez vous travailler ?" />
                    </Steps>
                </Col>
                <Col span={4}></Col>
            </Row> 
             <Row style={{paddingTop:60}}> 
                
                <Col offset={4} span={14}>
                    <Form name="dynamic_form_nest_item" onFinish={onFinish} autoComplete="off">
                        <span>Formation  <QuestionCircleOutlined/></span> 
                         <Form.List name="formation">
                            {(fields, { add, remove }) => (
                            <>
                                {fields.map(field => (
                                    <Space key={field.key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                                        <Row>
                                            <Col span={6}>  
                                               
                                                <Form.Item

                                                    {...field}
                                                    name={[field.name, 'school']}
                                                    fieldKey={[field.fieldKey, 'school']}
                                                    rules={[{ required: true, message: 'Missing first name' }]}
                                                    >
                                                    <Input 
                                                    //onChange={(e)=>{setSchoolFormationToSend(e.target.value)}}
                                                     placeholder="École" />
                                                </Form.Item>
                                            </Col> 
                                            <Col span={6}>
                                                <Form.Item
                                                    style={{paddingLeft:15}}
                                                    {...field}
                                                    name={[field.name, 'citys']}
                                                    fieldKey={[field.fieldKey, 'citys']}
                                                    rules={[{ required: true, message: 'Missing last name' }]}
                                                >
                                                <Input placeholder="Ville" />
                                                </Form.Item>
                                            </Col> 
                                            <Col span={6}>
                                                <Form.Item
                                                    style={{paddingLeft:15}}
                                                    {...field}
                                                    name={[field.name, 'diploma']}
                                                    fieldKey={[field.fieldKey, 'diploma']}
                                                    rules={[{ required: true, message: 'Missing last name' }]}
                                                >
                                                <Input placeholder="Intitulé du diplôme"/>
                                                </Form.Item>
                                            </Col>
                                            <Col span={6}>
                                                <Form.Item
                                                    style={{paddingLeft:15}}
                                                    {...field}
                                                    name={[field.name, 'year']}
                                                    fieldKey={[field.fieldKey, 'year']}
                                                    rules={[{ required: true, message: 'Missing last name' }]}
                                                >
                                                {/* <Input style={{ width: '50%' }} defaultValue="input content" /> */}
                                                <DatePicker placeholder="Date d'obtention" style={{ width: '100%' }} />
                                                {/* <Input placeholder="Année d'obtention" /> */}
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                        <MinusCircleOutlined style={{paddingLeft:100}} onClick={() => remove(field.name)} />
                                    </Space>
                                ))}
                                    <Form.Item>
                                        <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                            Ajoutez une formation
                                        </Button>
                                    </Form.Item>
                        </>
                        )}
                        </Form.List> 
                         <Row> 
                            <Col span={24}>
                                <span>Experience  <QuestionCircleOutlined/></span> 
                                 <Form.List name="experience">
                                    {(fields, { add, remove }) => (
                                    <>
                                    {fields.map(field => (
                                        <Space key={field.key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                                            <Row >
                                                <Col span={4}>  
                                                    <Form.Item
                                                            {...field}
                                                            name={[field.name, 'firm']}
                                                            fieldKey={[field.fieldKey, 'firm']}
                                                            rules={[{ required: true, message: 'champ vide' }]}
                                                            >
                                                            <Input placeholder="Entreprise" />
                                                        </Form.Item>
                                                    </Col> 
                                                    <Col span={5}>
                                                        <Form.Item
                                                            style={{paddingLeft:30}}
                                                            {...field}
                                                            name={[field.name, 'city']}
                                                            fieldKey={[field.fieldKey, 'city']}
                                                            rules={[{ required: true, message: 'champ vide' }]}
                                                        >
                                                        <Input placeholder="Ville" />
                                                        </Form.Item>
                                                    </Col> 
                                                    <Col span={5}>
                                                        <Form.Item
                                                            style={{paddingLeft:30}}
                                                            {...field}
                                                            name={[field.name, 'job']}
                                                            fieldKey={[field.fieldKey, 'job']}
                                                            rules={[{ required: true, message: 'champ vide' }]}
                                                        >
                                                        <Input placeholder="Poste" />
                                                        </Form.Item>
                                                    </Col> 
                                                    <Col span={10}>
                                                        <Form.Item
                                                            style={{paddingLeft:30}}
                                                            {...field}
                                                            name={[field.name, 'rangeDate']}
                                                            fieldKey={[field.fieldKey, 'rangeDate']}
                                                            rules={[{ required: true, message: 'champ vide'}]}
                                                        >
                                                        {/* <Input placeholder="Date de début"/> */}
                                                        <DatePicker.RangePicker style={{ width: '100%' }} />
                                                        </Form.Item>
                                                    </Col>
                                            </Row>
                                            <MinusCircleOutlined onClick={() => remove(field.name)} />
                                        </Space>
                                    ))}
                                <Form.Item>
                                    <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                        Ajoutez une experience
                                    </Button>
                                </Form.Item>
                                </>
                                )}
                                </Form.List> 
                             </Col>
                        </Row>
                        <Row style={{paddingTop:30}}>
                            <Col span={12}>
                            <Form.Item label="Langues parlées">
                                <Select 
                                onChange={(e)=>setLanguageChoosen(e)}
                                style={{width:'80%'}}
                                mode='multiple'
                                name={'language'}
                                className="basic-multi-select"
                                >
                                    <Option value='Francais'>Français</Option>
                                    <Option value='Anglais'>Anglais</Option>
                                    <Option value='Espagnol'>Espagnol</Option>
                                    <Option value='Italien'>Italien</Option>
                                    <Option value='Allemand'>Allemand</Option>
                                    <Option value='Chinois'>Chinois</Option>
                                    {dataLanguageToAdd}
                                </Select>
                            </Form.Item>
                            </Col>
                            <Col span={12}>
                                <span style={{paddingRight:10}}>Ajoutez vos langues : </span>
                            <Input 
                            style={{ width: 100 }}
                                onChange={(e) => setLanguageToAdd(e.target.value)} 
                                value={languageToAdd}
                            />
                            <Button style={{ height: 30 }} type="primary" onClick={()=>addLanguageItem(languageToAdd)}>Add</Button>
                            </Col>
                        </Row> 
                        <Row style={{paddingTop:45}}>
                            <Col span={4}>
                                <span>Actuellement <QuestionCircleOutlined/></span>
                            </Col>
                            <Col span={7}>
                                <Checkbox onChange={(e) => setEnPoste(!enPoste)}>En poste</Checkbox>
                                <Checkbox onChange={(e) => setEnrecherche(!enRecherche)}>En recherche</Checkbox>
                            </Col>
                            {inputToDisplay}
                            {inputContractToDisplay}
                        </Row>
                       
                        <Row style={{justifyContent:'center', paddingTop:40}}>
                            <Upload {...photo}>
                                <Button icon={<UploadOutlined />}>Télécharger une photo de profil</Button>
                            </Upload>
            
                        </Row>
                        
                        <Row style={{paddingTop:50}}>
                            <Col offset={22}>
                                <Form.Item>
                                     
                                        <Button 
                                        //onClick={()=> sendFormValues()}
                                         htmlType='submit' type="primary">
                                             Enregister ses infos
                                        </Button>
                                      
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </Col>    
            </Row> 
            
                
        </div>
    )}
}

function mapStateToProps(state) {
    return {tokenToDisplay: state.token}
}


    
export default connect(
mapStateToProps, 
null
)(SignUpTalentB);
