import React, { Component } from 'react';
import aws_exports from './aws-exports';
import Amplify, { API } from 'aws-amplify';
import { Segment, Menu, Icon } from 'semantic-ui-react';
import ItemDashboard from './screens/ItemDashboard';
import './App.css';

Amplify.configure(aws_exports);

let apiName = 'ServerlessWebAppCRUD';
let path = '/ServerlessWebApp';

class App extends Component {
  componentDidMount() {
    API.get(apiName, path).then(res => console.log(res));
  }

  render() {
    return (
      <Segment>
        <Menu>
          <Menu.Item name='home'><Icon name="shop"/></Menu.Item>
          <Menu.Item name='Items'/>
          <Menu.Item name='aboutUs' />
        </Menu>
        <ItemDashboard />
      </Segment>
    );
  }
}

export default App;
