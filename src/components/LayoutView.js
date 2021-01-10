import React, { Component } from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import UploadComponent from './UploadComponent'
import 'antd/dist/antd.css';
import ProjectHeader from './ProjectHeader';

const { Header, Content, Footer } = Layout;

class LayoutView extends Component {
  render() {
    return (
      <Layout>
    <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
      <ProjectHeader />
    </Header>
    <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64 }}>
      <div className="site-layout-background" style={{ padding: 24, minHeight: 380 }}>
        <UploadComponent />
      </div>
    </Content>
    <Footer style={{ textAlign: 'center' }}>Nathan and Kevin 2021</Footer>
  </Layout>
    );
  }
}

export default LayoutView;