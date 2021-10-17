import React, { Component } from 'react';
import { Table, Button } from 'semantic-ui-react';
import finalweb3 from '../lib/artifacts/ethereum3';
import Web3Container2 from '../lib/artifacts/web3container2';
import styles from '../styles/Home.module.css'

class RequestRow extends Component {

    state = {
        value: '',
        escrowStateValue: '',
        backColor: '',
        serviceStateValue: ''
    }

    async componentDidMount() {
       await this.getValue()
    }

    async getValue() {
        let web3 = await finalweb3();
        if(this.props.deposit.escrowState == 0) {
            this.setState({escrowStateValue: 'PENDING', backColor: '#f1c40f'})
        } else if(this.props.deposit.escrowState == 1) {
            this.setState({escrowStateValue: 'WITHDRAW', backColor: '#e74c3c'})
        } else{
            this.setState({escrowStateValue: 'COMPLETE', backColor: '#27ae60'})
        }

        if(this.props.deposit.serviceState == false){
            this.setState({serviceStateValue: 'Not Delivered'})
        } else{
            this.setState({serviceStateValue: 'Delivered'})
        }
        this.setState({value:  web3.utils.fromWei(this.props.deposit.serviceValue, 'ether')})
    }

    render() {
      const { Row, Cell } = Table;
      const { id, deposit } = this.props;
  
      return (
        <Row
        >
          <Cell>{id}</Cell>
          <Cell>{deposit.depositor}</Cell>
          <Cell>{deposit.recipient}</Cell>
          <Cell> {this.state.value}</Cell>
          <Cell>{this.state.serviceStateValue}</Cell>
          <Cell style={{color: this.state.backColor}}>
            {
              this.state.escrowStateValue
            }
          </Cell>
        </Row>
      );
    }
  }
  
  export default RequestRow;