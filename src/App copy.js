import React, { Component } from 'react';
import Amplify, { Interactions } from 'aws-amplify';
import { ChatFeed, Message } from 'react-chat-ui';
import Chatbot from 'react-chatbot-kit';
import './App.css';
import * as Constants from './constants/constants';

import ActionProvider from './ActionProvider';
import MessageParser from './MessageParser';
import config from './config';

Amplify.configure({
  Auth: {
    identityPoolId: Constants.API_KEY,
    region: Constants.REGION
  },
  Interactions: {
    bots: {
      "leiabot_dev": {
        "name": Constants.BOT_NAME,
        "alias": Constants.ALIAS,
        "region": Constants.REGION,
      },
    }
  }
});

class App extends Component {
  state = {
    input: '',
    finalMessage: '',
    messages: [
      new Message({
        id: 1,
        message: Constants.INITIAL_MESSAGE,
      })
    ]
  };

  _handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.submitMessage()
    }
  }

  onChange(e) {
    const input = e.target.value
    this.setState({
      input
    })
  }

  handleComplete = (err, confirmation) => {
    if (err) {
        alert('Algo deu errado com o bot! :(');
        return;
    }
    alert('feito: ' + JSON.stringify(confirmation, null, 2));
    return 'Viagem reservada. Obrigado! O que você gostaria de fazer depois?';
  }

  async submitMessage() {
    const { input } = this.state
    if (input === '') return
    const message = new Message({
      id: 0,
      message: input,
    });
    let messages = [...this.state.messages, message]

    this.setState({
      messages,
      input: ''
    });
    const response = await Interactions.send(Constants.BOT_NAME, input);
    var msg = response.message;
    console.log(msg);
    
    if (response.responseCard) {
      if (response.responseCard.genericAttachments) {
        const { title, subtitle, imageUrl, attachmentLinkUrl } = response.responseCard.genericAttachments[0];
        console.log(imageUrl);
        msg = imageUrl;
      }    
    }
    
    const responseMessage = new Message({
      id: 1,
      message: msg,
    });
    messages  = [...this.state.messages, responseMessage];
    this.setState({ messages });
  
    if (response.dialogState === 'Fulfilled') {
      if (response.intentName === 'BookHotel') {
        const { slots: { CheckInDate, Location, Nights, RoomType } } = response;
        const finalMessage = `Parabéns! Sua viagem para ${Location}  com um quarto ${RoomType} em ${CheckInDate} por ${Nights} dias foi reservada!!`;
        this.setState({ finalMessage });
      }
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Chatbot config={config} actionProvider={ActionProvider} messageParser={MessageParser} />
        </header>
      </div>
      );
  }
/*
  render() {
    return (
      <div className="App">
        <header style={styles.header}>
          <p style={styles.headerTitle}>Bem-vindo ao seu bot Leia Wars!</p>
        </header>

        <div style={styles.messagesContainer}>
        <h2>{this.state.finalMessage}</h2>
        <ChatFeed
          messages={this.state.messages}
          hasInputField={false}
          bubbleStyles={styles.bubbleStyles}
        />

        <input
          onKeyPress={this._handleKeyPress}
          onChange={this.onChange.bind(this)}
          style={styles.input}
          value={this.state.input}
        />
        </div>
      </div>
    );
  }
  */
}

const styles = {
  bubbleStyles: {
    text: {
      fontSize: 16,
    },
    chatbubble: {
      borderRadius: 30,
      padding: 10
    }
  },
  headerTitle: {
    color: 'white',
    fontSize: 22
  },
  header: {
    backgroundColor: 'rgb(0, 132, 255)',
    padding: 20,
    borderTop: '12px solid rgb(204, 204, 204)'
  },
  messagesContainer: {
    display: 'flex',
    flexDirection: 'column',
    padding: 10,
    alignItems: 'center'
  },
  input: {
    fontSize: 16,
    padding: 10,
    outline: 'none',
    width: 350,
    border: 'none',
    borderBottom: '2px solid rgb(0, 132, 255)'
  }
}

export default App;
