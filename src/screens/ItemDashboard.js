import React, { Component } from 'react';
import CreateItemModal from './CreateItemModal';
import Amplify, { API } from 'aws-amplify';
import _ from 'lodash';
import { Container, Card } from 'semantic-ui-react';

class ItemDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = { itemData: {} };
    this.getItems = this.getItems.bind(this);
  }

  componentDidMount() {
    this.getItems();
  }

  getItems() {
    let apiName = 'ServerlessWebAppCRUD';
    let path = '/ServerlessWebApp';

    API.get(apiName, path)
      .then(response => {
        this.setState({ itemData: response.data });
      })
  }

  render() {
    const itemData = this.state.itemData;
    return (
      <div>
        <CreateItemModal getItems={this.getItems} />
        <Container style={{ padding: 10 }}>
          <Card.Group>
            {_.map(itemData, ({ ID, description, name, price }) => (
              <Card key={ID}>
                <Card.Content>
                  <Card.Header>
                    {name}
                  </Card.Header>
                  <Card.Meta>
                    £ {price}
                  </Card.Meta>
                  <Card.Description>
                    {description}
                  </Card.Description>
                </Card.Content>
              </Card>
            ))}
          </Card.Group>
        </Container>
      </div>
    );
  }
}

export default ItemDashboard;
