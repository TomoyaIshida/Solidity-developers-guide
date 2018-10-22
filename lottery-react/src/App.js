import React, { Component } from 'react';
import web3 from './web3';
import lottery from './lottery';

import './App.css';

class App extends Component {
  state = {
    manager: '',
    players: [],
    balance: '',
    value: '',
    message: ''
  };

  async componentDidMount() {
    const manager = await lottery.methods.manager().call();
    const players = await lottery.methods.getPlayers().call();
    const balance = await web3.eth.getBalance(lottery.options.address);

    this.setState({ manager, players, balance });
  }

  onSubmit = async event => {
    event.preventDefault();

    const accounts = await web3.eth.getAccounts();

    this.setState({ message: 'Waiting on transaction success...'});

    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei(this.state.value, 'ether')
    });

    this.setState({ message: 'You have been entered!' });
  };

  onClick = async () => {
    const accounts = await web3.eth.getAccounts();

    this.setState({ message: 'Waiting on transaction success...' });

    await lottery.methods.pickWinner().send({
      from: accounts[0]
    })

    this.setState({ message: 'A winner has been picked!'});
  };

  render() {
    return (
      <div className='Content'>
        <h1>宝くじ</h1>
        <p>
          現在{this.state.players.length}人が参加し,
          当選者は{web3.utils.fromWei(this.state.balance, 'ether')}ETHを獲得することができます!
        </p>

        <form onSubmit={this.onSubmit}>
          <h3>運だめしをしてみますか?</h3>
          <div>
            <label>料金を支払いエントリーしてください！</label>
            <button className='Entry'>参加する</button>
            <input
              value={this.state.value}
              onChange={event => this.setState({ value: event.target.value })}
            />
          </div>
        </form>

        <h3>当選者を選ぶ準備はできていますか？</h3>
        <button onClick={this.onClick} className='PickUp'>当選者を選ぶ</button>
        <div className='Owner'>
          <p>オーナーアドレス</p>
          <p>{ this.state.manager }</p>
        </div>
        <p>{this.state.message}</p>
      </div>
    );
  }
}

export default App;
