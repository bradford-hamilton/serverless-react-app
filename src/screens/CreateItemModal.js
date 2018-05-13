import React, { Component } from 'react';
import Amplify, { API } from 'aws-amplify';
import { Form, Modal, Button, Container } from 'semantic-ui-react';

const uuidv1 = require('uuid/v1');

class CreateItemModal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event, { name, value }) {
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();

    let apiName = 'ServerlessWebAppCRUD';
    let path = '/ServerlessWebApp';
    let newItem = {
      body: {
        ID: uuidv1(),
        name: this.state.itemName,
        price: this.state.itemPrice,
        description: this.state.itemDescription,
      }
    }

    console.log(newItem);

    API.post(apiName, path, newItem)
      .then(response => {
        console.log(response);
      })
      .catch(err => {
        console.log(err);
      });

    this.handleClose();
  }

  handleOpen = () => this.setState({ modalOpen: true });

  handleClose = () => this.setState({ modalOpen: false });

  render () {
    return (
      <Modal
        trigger={<Button onClick={this.handleOpen}>+ Add Item</Button>}
        closeIcon={true}
        open={this.state.modalOpen}
        onClose={this.handleClose}
      >
        <Modal.Header>Add an Item</Modal.Header>
        <Modal.Content>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group unstackable widths={2}>
              <Form.Input
                name="itemName"
                label="Item Name"
                placeholder="Enter Item Name..."
                onChange={this.handleChange}
                value={this.state.itemName}
              />
              <Form.Input
                name="itemPrice"
                label="Item Price"
                placeholder="Enter Item Price..."
                onChange={this.handleChange}
                type="number"
                value={this.state.itemPrice}
              />
            </Form.Group>
            <Form.TextArea
              name="itemDescription"
              label="Item Description"
              placeholder="Add a Description of the Item..."
              onChange={this.handleChange}
              value={this.state.itemDescription}
            />
            <Form.Button type="submit">Submit</Form.Button>
          </Form>
        </Modal.Content>
      </Modal>
    );
  }
}

export default CreateItemModal;
