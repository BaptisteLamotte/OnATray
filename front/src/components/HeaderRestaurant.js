import React, {useState} from 'react';
import { Layout, Menu, Image, Button} from 'antd';
import { UserOutlined } from '@ant-design/icons';
import 'antd/dist/antd.less';
import '../App.less'

import 'antd/dist/antd.less';

import {Link} from 'react-router-dom';
const { SubMenu } = Menu;

const { Header } = Layout;

function HeaderScreen() {
  const [visible, setVisible] = useState(false);
  
  return (
   
      <div style={{justifyContent:'center'}}>
         
          <Menu style={{padding:'20px'}} mode="horizontal" defaultSelectedKeys={['1']}>
            
              <Image
                        width={'50px'}
                        src="./images/logo-onatray.png"
                      /> 

              <Menu.Item  key="1"><Link to={'/'}>Accueil</Link></Menu.Item>
              <Menu.Item  key="1"><Link to={'/'}>Rechercher des talents</Link></Menu.Item>
              <Menu.Item  key="1"><Link to={'/'}>Mes favoris</Link></Menu.Item>
              <Menu.Item  key="1"><Link to={'/'}>Mes messages</Link></Menu.Item>
          
              <div style={{float:'right'}}>
                <Button type="primary" onClick={() => setVisible(true)} ><UserOutlined style={{color:'#4b6584'}}/>Mon profil</Button>
              </div>
          
          </Menu>

          <div style={{ textAlign:'center'}}>
          
          </div>

      </div>
        
  );
}

export default HeaderScreen;