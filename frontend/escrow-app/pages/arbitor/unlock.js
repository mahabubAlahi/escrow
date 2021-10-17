import React from 'react'
import Web3Container from '../../lib/artifacts/web3container'
import styles from '../../styles/Home.module.css';
import Layout from '../../components/Layout';
import { Form, Button, Input, Message } from 'semantic-ui-react';
import { ethers } from 'ethers'
import { Router } from '../../routes';

import Web3Container2 from '../../lib/artifacts/web3container2';

class Unlock extends React.Component {
    
    state = {
      depositValue: '',
      depositorAddress: '',
      errorMessage: '',
      loading: false
    };    
  
    onSubmit = async event => {
      event.preventDefault();
  
      this.setState({ loading: true, errorMessage: '' });
  
      try {

        const { contract, web3, accounts } = this.props

        await contract.methods
        .unlockDeposit(this.state.depositorAddress)
        .send({
          from: accounts[0] 
        });
  
        Router.pushRoute('/arbitor');
      } catch (err) {
       
        this.setState({ errorMessage: err.message}); 
      }
  
      this.setState({ loading: false });
    };
  
    render() {
      return (
        <Layout>
          <h1>Unlock a Deposit</h1>
  
          <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
            <Form.Field>
              <label>Depositor Address</label>
              <Input
                value={this.state.depositorAddress}
                onChange={event =>
                  this.setState({ depositorAddress: event.target.value })}
              />
            </Form.Field>
  
            <Message error content={this.state.errorMessage} />
            <Button loading={this.state.loading} primary>
              Unlock Deposit!
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
        <Unlock contract={contract} web3={web3} accounts={accounts} />
      )}
    />
  )