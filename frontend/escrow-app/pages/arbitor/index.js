import React from 'react';
import Layout from '../../components/Layout';
import styles from '../../styles/Home.module.css';
import Web3Container2 from '../../lib/artifacts/web3container2';
import { Card, Grid, Button } from 'semantic-ui-react'
import { Link } from '../../routes';

class Arbitor extends React.Component {
    constructor(props) {
        super(props);
        this.state = { getAllDepositors: [] }
      }
    async componentDidMount() {
        const { contract, accounts } = this.props
        const getAllDepositors = await contract.methods.getAllDepositors().call({
            from: accounts[0]
        })
        this.setState({ getAllDepositors: getAllDepositors })
    }
    renderDepositors() {
        let items;
        if(this.state.getAllDepositors.length == 0){
            items = [{
                header: '',
                description: 'No Depositor Available',
                fluid: true
            }]
        } else{
            items = this.state.getAllDepositors.map(address => {
                return {
                    header: address,
                    description: (
                        <Link route={`/arbitor/${address}`}>
                            <a>View Depositor's all the Deposits</a>
                        </Link>
                    ),
                    fluid: true
                };
            });
        }
        return <Card.Group items={items} />;
    }
    render() {
        return (
            <Layout>
                <h1 style={{ textAlign: 'center' }}>Welcome!</h1>
                <h1 style={{ textAlign: 'center' }}>Arbitor's Portal</h1>
                <Grid style={{marginTop: '50px'}}>
                    <Grid.Row>
                        <Grid.Column width={8}>
                            <h3>Depositor's List</h3>
                            {this.renderDepositors()}
                        </Grid.Column>
                        <Grid.Column width={8} verticalAlign='middle'>
                            <Grid.Row></Grid.Row>
                            <Grid.Row>
                            <div>
                                <Link route="/arbitor/unlock">
                                    <a>
                                        <Button
                                            labelPosition='left'
                                            content="Unlock a Deposit"
                                            icon="add circle"
                                            size='huge'
                                            primary
                                            floated='right'
                                        />
                                    </a>
                                </Link>
                            </div>
                            </Grid.Row>
                            <Grid.Row></Grid.Row>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>

            </Layout>
        )
    }
}

export default () => (
    <Web3Container2
        renderLoading={() => <div className={styles.container}>
            Loading DApp page ...
        </div>}
        render={({ web3, contract, accounts }) => (
            <Arbitor contract={contract} web3={web3} accounts={accounts} />
        )}
    />
)