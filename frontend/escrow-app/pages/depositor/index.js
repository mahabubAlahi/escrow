import React from 'react';
import Layout from '../../components/Layout';
import styles from '../../styles/Home.module.css';
import Web3Container from '../../lib/artifacts/web3container';
import { Card, Dimmer, Loader, Image, Segment, Button } from 'semantic-ui-react'
import { Link } from '../../routes';

class Depositor extends React.Component {
    render() {
        return (
            <Layout>
                <h1 style={{textAlign: 'center'}}>Welcome!</h1>
                <h1 style={{textAlign: 'center'}}>Depositor's Portal</h1>
              <div style={{margin: '8% 0 0 23%'}}>
                <Link route="/depositor/withdraw">
                  <a>
                    <Button
                    labelPosition='left'
                      content="WithDraw Deposit"
                      icon="arrow left"
                      size='large'
                      primary
                    />
                  </a>
                </Link>
                <Link route="/depositor/create">
                  <a>
                    <Button
                    labelPosition='left'
                      content="Create Deposit"
                      icon="add circle"
                      size='large'
                      primary
                    />
                  </a>
                </Link>
                <Link route="/depositor/confirm">
                  <a>
                    <Button
                      labelPosition='right'
                      content="Confirm Deposit"
                      icon="arrow right"
                      size='large'
                      primary
                    />
                  </a>
                </Link>
              </div>
            </Layout>
        )
      }
}

export default () => (
    <Web3Container
      renderLoading={() => <div className={styles.container}>
        Loading DApp page ...
      </div>}
      render={({ provider, contract }) => (
        <Depositor contract={contract} provider={provider} />
      )}
    />
  )