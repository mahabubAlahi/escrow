import React from 'react'
import Web3Container from '../../lib/artifacts/web3container'
import styles from '../../styles/Home.module.css';
import Layout from '../../components/Layout';
import { Form, Button, Input, Message } from 'semantic-ui-react';
import { ethers } from 'ethers'
import { Router } from '../../routes';

import Web3Container2 from '../../lib/artifacts/web3container2';

class Create extends React.Component {
    
    state = {
      depositValue: '',
      recipientAddress: '',
      errorMessage: '',
      loading: false
    };    
  
    onSubmit = async event => {
      event.preventDefault();
  
      this.setState({ loading: true, errorMessage: '' });
  
      try {
        /*const { contract } = this.props
        let overrides = {
            // To convert Ether to Wei:
            value: ethers.utils.parseEther(this.state.depositValue)     // ether in this case MUST be a string
        };

        const transaction = await contract.deposit(this.state.recipientAddress, overrides)
        await transaction.wait()*/

        const { contract, web3, accounts } = this.props

        //web3.eth.handleRevert = true;  

        await contract.methods
        .deposit(this.state.recipientAddress)
        .send({
          from: accounts[0],
          value: web3.utils.toWei(this.state.depositValue, 'ether') 
        });
  
        Router.pushRoute('/depositor');
      } catch (err) {
        //const code = err.data.replace('Oops!', '');
        //const data = JSON.parse(err.message).value.data.data;
        //const txHash = Object.keys(data)[0];
        //const value = JSON.parse(data)
        //const reason = value[txHash].reason;
        //let reason = ethers.utils.toUtf8String('0x' + code.substr(138));
        //let reason = this.reason()
        //const data = err.message.replace("[ethjs-query] while formatting outputs from RPC ", '');
        //const value = JSON.stringify(data)
        //console.log(JSON.parse(data))
        this.setState({ errorMessage: err.message}); 
      }
  
      this.setState({ loading: false });
    };
  
    render() {
      return (
        <Layout>
          <h1>Create a Deposit</h1>
  
          <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
            <Form.Field >
              <label>Deposit Value</label>
              <Input
                label="ether"
                labelPosition="right"
                value={this.state.depositValue}
                onChange={event =>
                  this.setState({ depositValue: event.target.value })}
              />
            </Form.Field>
            <Form.Field>
              <label>Recipient Address</label>
              <Input
                value={this.state.recipientAddress}
                onChange={event =>
                  this.setState({ recipientAddress: event.target.value })}
              />
            </Form.Field>
  
            <Message error content={this.state.errorMessage} />
            <Button loading={this.state.loading} primary>
              Create!
            </Button>
          </Form>
        </Layout>
      );
    }
  }


  export default () => (
    <Web3Container2
      renderLoading={() => <div className={styles.container}>
        Loading DApp page ...
      </div>}
      render={({ web3, accounts, contract }) => (
        <Create contract={contract} web3={web3} accounts={accounts} />
      )}
    />
  )