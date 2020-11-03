import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'

import 'antd/dist/antd.less';
import '../App.less'

import Header from './Header'
import HeaderRestaurant from './HeaderRestaurant'
import HeaderTalent from './HeaderTalent'

import { Button, Select, Form, Col, Row,Card } from 'antd';
import Cardtalent from './Cardtalent'

const { Option } = Select
const { Meta } = Card


function RecherchetalentA(props) {

    const zoneFrance= [
        [ -5.3173828125, 48.458124202908934 ],
        [ 2.1313476562500004, 51.26170001449684 ],
        [ 8.811035156250002, 48.90783374365477 ],
        [ 7.998046875000001, 43.70709714273101 ],
        [ 3.2080078125000004, 42.228008913641865 ],
        [ 1.4941406250000002, 42.293056273848215 ],
        [ -2.0214843750000004, 43.06838615478111 ],
        [ -5.3173828125, 48.458124202908934 ]
      ]
    
    const listeposterecherché=["Serveur","Cuisiner","Comis","Runner"]
    const listetypedecontrat=["CDI","CDD","Extra","Mi Temps","Interim"]

    const [isSignIn, setIsSignIn] = useState(props.connectToDisplay.isSignIn)
    const [isTalent, setIsTalent] = useState(props.connectToDisplay.isTalent)
    const [isRestau, setIsRestau] = useState(props.connectToDisplay.isRestau)

    if(!isSignIn){
        var header = <Header/>
      } else if (isSignIn && isRestau){
        var header = <HeaderRestaurant/>
      } else if (isSignIn && isTalent){
        var header = <HeaderTalent/>
      }


    const Submitform = values => {
        // console.log('Received values of form:', values);
        // console.log("posterecherché",posterecherché)
        // console.log("typedecontrat",typedecontrat)
    };


const token = props.tokenToDisplay
const [talents,settalents]=useState([])
const [wishlistRestaurantID,setwishlistRestaurantID]=useState([])
const [talentaafficher,settalentaafficher]=useState([])
const [zone, setZone] = useState(zoneFrance)
const [posterecherché,setposterecherché]=useState('tous les postes')
const [typedecontrat,settypedecontrat]=useState(listetypedecontrat)
const [rechercheeffectuée,setrechercheeffectuée]=useState(false)


useEffect(() => {
var getTalentdata = async ()=> {
    const dataTalent = await fetch(`/restaurants/getinformation`)
      const JSdataTalent = await dataTalent.json()
      settalents(JSdataTalent.talentlist)
    }
    getTalentdata()
    
    
var getwishlist = async ()=>{
        const datawishlistRestaurant = await fetch(`/restaurants/getwishlist`, {
            method:'POST',
            headers: {'Content-Type':'application/x-www-form-urlencoded'},
            body: `token=${token}`})
        const JSdatawishlistRestaurant = await datawishlistRestaurant.json()
        setwishlistRestaurantID(JSdatawishlistRestaurant.restaurantwishlistid)
        console.log('Jsdata',JSdatawishlistRestaurant.restaurantwishlistid)
    }
    getwishlist()

},[])


useEffect(()=>{
async function cherche(){
        if (posterecherché==[]){
            setposterecherché(listeposterecherché)
        }
        if(typedecontrat==[]){
            settypedecontrat(listetypedecontrat)
        }
var criteres = JSON.stringify({posterecherché: posterecherché, zone:zone})
var rechercheListe = await fetch(`/restaurants/recherche-liste-talents`, {
    method:'POST',
    headers: {'Content-Type':'application/x-www-form-urlencoded'},
    body: `token=${token}&criteres=${criteres}`
})
    var response = await rechercheListe.json()
    settalentaafficher(response.liste)
 }
cherche()
    },[posterecherché,typedecontrat,rechercheeffectuée])


var talentslist = talentaafficher.map((e,i) => {
    console.log('wishlistrestoID',wishlistRestaurantID)
        return (
           <Cardtalent key={i} src={e.src} talent={e} wishlistRestaurantID={wishlistRestaurantID} token={token}/>
        )})

return(
                     
<div>
{header}

<Row style={{backgroundColor:"#4B6584", height:"150px", display:"flex", justifyContent:"center", alignItems:'center', marginBottom:"15px"}}>
    
 <Col span={18} >
    <Form name="complex-form"  autoComplete="off" layout='inline'>
        <Col flex={2}>
                <Form.Item label="Poste recherché" style={{color: '#ffffff'}}>
                    <Select 
                    showSearch
                    onChange={(e)=>setposterecherché(e)}
                   
                    name={'Poste recherché'}
                    className="basic-multi-select"
                    classNamePrefix="select">
                        <Option value='Tous les postes'>Tous les postes</Option>
                        <Option value='Serveur'>Serveur</Option>
                        <Option value='Cuisiner'>Cuisinier</Option>
                        <Option value='Manager'>Manager</Option>
                        <Option value='Comis'>Comis</Option>
                        <Option value='Chef de rang'>Chef de rang</Option>
                        <Option value='Runner'>Runner</Option>
                        <Option value='Sommelier'>Sommelier</Option>
                        <Option value='chef'>Chef </Option>
                        <Option value='chefDePartie'>Chef de partie</Option>
                        <Option value='Second'>Second</Option>
                        <Option value='plongeur'>Plongeur</Option>
                    </Select>
                </Form.Item>
            </Col>

            <Col flex={3}>
                <Form.Item label="Type de contrat">
                    <Select 
                    showSearch
        
                    onChange={(e)=>settypedecontrat(e)}
                    name={'language'}
                    className="basic-multi-select"
                    classNamePrefix="select">
                        <Option value='CDI'>CDI</Option>
                        <Option value='CDD'>CDD</Option>
                        <Option value='Mi Temps'>Mi Temps</Option>
                        <Option value='Interim<'>Interim</Option>
                
                    </Select>
                </Form.Item>
            </Col>
            <Form.Item>
            <Button onClick={Submitform()} type="primary" > Rechercher</Button>
            </Form.Item>
    </Form>
 </Col>
</Row>
<Row type='flex' style={{display:"flex", justifyContent:"center", alignItems:'center'}}>

    {talentslist}
    
</Row>

</div>

    )
}

function mapStateToProps(state) {
    return { connectToDisplay : state.isConnect, tokenToDisplay: state.token}
  }
    
  export default connect(
    mapStateToProps, 
    null
  )(RecherchetalentA);
