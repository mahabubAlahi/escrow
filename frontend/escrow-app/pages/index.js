//import Head from 'next/head'
//import Image from 'next/image'
import React from 'react'
import dynamic from 'next/dynamic';
import styles from '../styles/Home.module.css'
import { ethers } from 'ethers'
import Web3Container from '../lib/artifacts/web3container'
import 'semantic-ui-css/semantic.min.css';
import { Card, Dimmer, Loader, Image, Segment, Button, Grid } from 'semantic-ui-react'
import Layout from '../components/Layout';
import { Link } from '../routes';

import Web3Container2 from '../lib/artifacts/web3container2';


class Dapp extends React.Component {

  constructor(props) {
    super(props);
    this.state = { arbitorAddress: '' }
  }

  async componentDidMount() {
    const { contract } = this.props
    //const arbitorAddress = await contract.getArbitorAddress();
    const arbitorAddress = await contract.methods.getArbitorAddress().call()
    this.setState({ arbitorAddress: arbitorAddress })
  }

  renderAddress() {
    const items = [
      {
        header: this.state.arbitorAddress,
        description:
          'Arbitor\'s Address',
        fluid: true
      }
    ]

    return <Card.Group items={items} />;
  }


  render() {
    return (
      <div >
        <Layout>
          <Grid>
            <Grid.Row style={{ marginLeft: '70px'}}>
              <Grid.Column style={{ marginTop: '8%'}} width={11}>
                <h1 style={{ fontSize: '40px', marginBottom: '25px' }}>Easy Buy or Sell Services <br />using Escrow Wallet</h1>
                <p style={{ fontSize: '20px', }}>With Escrow Wallet you can buy and sell services safely<br /> without the risk of chargebacks. Truly secure buy or sell service.</p>
              </Grid.Column>
              <Grid.Column width={5} style={{ marginTop: '6%' }}>
                <Image src='/pay.png'  height={200} width={200} verticalAlign='middle'/>
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <div style={{ margin: '10% 0 0 18%' }}>
            <Link route="/arbitor">
              <a>
                <Button
                  labelPosition='left'
                  content="Go To Arbitor Portal"
                  icon="arrow left"
                  size='massive'
                  primary
                />
              </a>
            </Link>
            <Link route="/depositor">
              <a>
                <Button
                  labelPosition='right'
                  content="Go To Depositor Portal"
                  icon="arrow right"
                  size='massive'
                  primary
                />
              </a>
            </Link>
          </div>
        </Layout>
      </div>
    )
  }
}

export default () => (
  <Web3Container2
    renderLoading={() => <div className={styles.container}>
      Loading DApp page ...
    </div>}
    render={({ web3, accounts, contract }) => (
      <Dapp contract={contract} web3={web3} accounts={accounts} />
    )}
  />
)
