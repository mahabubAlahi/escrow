import React from 'react';
import { Menu, Image, Header, NavLink, route } from 'semantic-ui-react';
import { Link } from '../routes'


export default () => {
    return (
        <Menu style={{ marginTop: '10px' }}>
            <Menu.Item position='left'>
                <Header as='h2'>
                    <Header.Content style={{ fontSize: '25px', letterSpacing: '2px' }}>
                        Escrow Wallet
                        <Header.Subheader style={{ fontSize: '12px', textAlign: 'left', marginTop: '10px', letterSpacing: '1px' }}>Deposit & Withdrawl </Header.Subheader>
                    </Header.Content>
                </Header>
            </Menu.Item>
            <Menu.Menu position='right'>
                <Link route="/">
                    <a className="item">Home</a>
                </Link>
                <Link route="/depositor">
                    <a className="item">Depositor</a>
                </Link>
                <Link route="/arbitor">
                    <a className="item">Arbitor</a>
                </Link>
            </Menu.Menu>
        </Menu>
    )
}
