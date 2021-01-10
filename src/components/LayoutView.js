import React, { Component } from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import UploadComponent from './UploadComponent'
import 'antd/dist/antd.css';
import ProjectHeader from './ProjectHeader';

import '../index.css'
import '../App.css'

const { Header, Content, Footer } = Layout;

class LayoutView extends Component {
  render() {
    return (
    <Layout>
    <Header style={{ position: 'scroll', zIndex: 1, width: '100%'}}>
      <ProjectHeader/>
    </Header>
    <Content className="site-layout" style={{ padding: '0 50px', marginTop: 0}}>
      <div className="site-layout-background" style={{ padding: 24, minHeight: 380 }}>
        <UploadComponent/>
      </div>
      <div className="site-player"><iframe src="https://open.spotify.com/embed/track/1IX47gefluXmKX4PrTBCRM" width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe></div>
    </Content>
    <Footer style={{ textAlign: 'center'}}>Designed by: Nathan and Kevin @ nwHacks 2021</Footer>
  </Layout>
    );
  }
}

export default LayoutView;