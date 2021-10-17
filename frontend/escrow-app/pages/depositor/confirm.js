import React from 'react'
import Web3Container from '../../lib/artifacts/web3container'
import styles from '../../styles/Home.module.css';
import Layout from '../../components/Layout';
import { Form, Button, Input, Message } from 'semantic-ui-react';
import { ethers } from 'ethers'
import { Router } from '../../routes';

import Web3Container2 from '../../lib/artifacts/web3container2';

class Confirm extends React.Component {
    
    state = {
      errorMessage: '',
      loading: false
    };    
  
    onSubmit = async () => {
  
      this.setState({ loading: true, errorMessage: '' });
  
      try {
       
        const { contract, web3, accounts } = this.props

        await contract.methods
        .serviceComplete()
        .send({
          from: accounts[0]
        });
  
        Router.pushRoute('/depositor');
      } catch (err) {
        this.setState({ errorMessage: err.message}); 
      }
  
      this.setState({ loading: false });
    };
  
    render() {
      return (
        <Layout>
          <div style={{textAlign: 'center', padding: '15% 0 0 0'}}>
           <h1 style={{textAlign:'center'}}>If you get your service from recipient</h1> 
           <p style={{textAlign:'center', fontSize: '20px'}}>Please confim it by clicking the button</p>
           <Message error hidden={!this.state.errorMessage} content={this.state.errorMessage} />
           <Button loading={this.state.loading} size='large' style={{width: '40%'}} primary onClick={this.onSubmit}>
              Confirm!
            </Button>
          </div>
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
        <Confirm contract={contract} web3={web3} accounts={accounts} />
      )}
    />
  )