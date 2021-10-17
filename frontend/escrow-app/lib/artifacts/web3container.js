import { ethers } from 'ethers'
import React from 'react'
import finalweb3 from './ethereum'
import Escrow from './contracts/EscrowFinal.sol/EscrowFinal.json'
import Address from './Address.json'


class Web3Container extends React.Component {
  state = { provider: null, contract: null};

  async componentDidMount () {
    try {
      const provider = await finalweb3()
      const signer = provider.getSigner();
      const contract = new ethers.Contract(Address.address, Escrow.abi, signer)
      this.setState({ provider, contract})
    } catch (error) {
      alert(
        `Failed to load web3 or contract. Check console for details.`
      )
      console.log(error)
    }
  }

  render () {
    const { provider, contract } = this.state
    return provider
      ? this.props.render({ provider, contract })
      : this.props.renderLoading()
  }
}

export default Web3Container;
