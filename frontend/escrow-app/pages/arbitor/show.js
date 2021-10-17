import React from 'react';
import Layout from '../../components/Layout';
import styles from '../../styles/Home.module.css';
import Web3Container2 from '../../lib/artifacts/web3container2';
import { Card, Grid, Button, Table } from 'semantic-ui-react'
import { Link } from '../../routes';
import RequestRow from '../../components/RequestRow';

import finalweb3 from '../../lib/artifacts/ethereum3';
import Address from '../../lib/artifacts/Address.json'
import EscrowFinal from '../../lib/artifacts/contracts/EscrowFinal.sol/EscrowFinal.json'

class Show extends React.Component {

    static async getInitialProps(props) {
        //console.log(props.query.address)
        return {
            address: props.query.address
        }
    }
    async componentDidMount() {
        await this.renderDeposits();
    }

    state = {
        getAllDeposits: []
    }


    async renderDeposits() {
        const web3 = await finalweb3()
        const accounts = await web3.eth.getAccounts()
        const contract = new web3.eth.Contract(
            EscrowFinal.abi,
            Address.address
        )
        const getAllDeposits = await contract.methods.getallDeposits(this.props.address).call({
            from: accounts[0]
        })

        this.setState({ getAllDeposits: getAllDeposits });
        /*return getAllDeposits.map((deposit, index) => {
            console.log(deposit.depositor)
            return (
                <RequestRow
                    key={index}
                    id={index}
                    deposit={deposit}
                />
            );
        });*/
    }
    render() {
        const { Header, Row, HeaderCell, Body } = Table;

        const value = this.state.getAllDeposits.map((deposit, index) => {
            console.log(deposit.depositor)
            return (
                <RequestRow
                    key={index}
                    id={index}
                    deposit={deposit}
                />
            );
        });
        return (

            <Layout>
                <h1 style={{ textAlign: 'center' }}>Show Deposits</h1>

                <Table>
                    <Header>
                        <Row>
                            <HeaderCell>ID</HeaderCell>
                            <HeaderCell>Depositor Address</HeaderCell>
                            <HeaderCell>Recipient Address</HeaderCell>
                            <HeaderCell>Deposit Amount (ether)</HeaderCell>
                            <HeaderCell>Service Delivery Status</HeaderCell>
                            <HeaderCell>Deposite Status</HeaderCell>
                        </Row>
                    </Header>
                    <Body>{value}</Body>
                </Table>
            </Layout>
        )
    }
}


export default Show;