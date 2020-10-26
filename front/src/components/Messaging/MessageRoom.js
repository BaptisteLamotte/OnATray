import React, {useState} from 'react'

import {Row, Col, Button, Input, Card, message } from 'antd'
import { HeartOutlined, SendOutlined,ExpandAltOutlined} from "@ant-design/icons";

import {Link} from 'react-router-dom'

const {TextArea} = Input;
const { Meta } = Card;


function MessageRoom(){
    
    const [messageList, setMessageList] = useState([])
    const [newMessage, setNewMessage] = useState('')

    var sendMessage = (newMessage) => {
        console.log(newMessage)
        setMessageList([...messageList, newMessage])
        setNewMessage('')
    }

    var dataRecentMessage = messageList.map(function(message, i){
       return (
        <Row style={{paddingBottom:5}}>
            <span style={{paddingLeft:5, fontSize:10}}>12h12 le 12/12/12</span>
            <Col span={24} style={{ backgroundColor:'#FED330', borderRadius:10, display:'flex', justifyContent:'flex-end', alignItems:'center', paddingRight:10, paddingLeft:10}} >  
                <span >{message}</span>
            </Col>
       </Row>
       )
    })
    return(

        <Row>
            <Col span={24}>
                <Row style={{height:'80px'}}>
                    <Col style={{
                        backgroundColor: '#FED330',
                        }} span={24}>navbar
                    </Col>
                </Row>
                <Row style={{paddingTop:20, paddingBottom:20}}>
                    <Col offset={2} span={2}>
                    <Link>
                        <Button type='primary'>
                            Retour
                        </Button>
                    </Link>
                    </Col>
                </Row>
                <Row >
                    <Col style={{border:'1px solid black', display:'flex', flexDirection:'column-reverse'}} offset={2} span={13}>
                        <Row>
                            <Col offset={4} span={12}>
                            <TextArea onChange={(e)=>setNewMessage(e.target.value)} value={newMessage} placeholder="Votre message" autoSize />
                            <div style={{ margin: '24px 0' }} />
                            </Col>
                            <Col offset={1} span={4}>
                                <Button onClick={()=>sendMessage(newMessage)} type="primary">Envoyer</Button>
                            </Col>
                        </Row>
                            
                        <Row style={{display:'flex', justifyContent:'flex-end', paddingBottom:50}}>
                            <Col span={8} style={{paddingRight:5, display:'flex' ,flexDirection:'column'}} >
                            {dataRecentMessage}
                            </Col>
                       
                        </Row>
                            
                            
                    </Col>
                    <Col style={{border:'1px solid black'}} offset={2} span={6}>
                        <Card  
                            cover={
                            <img
                                //style={{height:'200px', width:'150px'}}
                                alt="example"
                                src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                            />
                            }
                            actions={[
                            <HeartOutlined key="setting" />,
                            <ExpandAltOutlined key="ellipsis" />
                            ]}
                            >   
                            <Meta
                            //style={{height:'200px'}}
                            title="Card title"
                            />
                            <p>Card content Card content Card content Card content Card content Card content Card content Card content v</p>
                            <p>Card content</p>
                            <p>Card content</p>
                        </Card>
                    </Col>
                </Row>
            </Col>
        </Row>
        
    )
}

export default MessageRoom;