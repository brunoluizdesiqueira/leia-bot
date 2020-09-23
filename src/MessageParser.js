import { Interactions } from 'aws-amplify';
import * as configLeia from './constants/constants';

class MessageParser {
  constructor(actionProvider, state) {
    this.actionProvider = actionProvider;
    this.state = state;
  }

  async parse(message) {
    const response = await Interactions.send(configLeia.BOT_NAME, message);
    
    if (response.responseCard) {
      this.actionProvider.handleResponseCard(response);
    } else {
      this.actionProvider.respostaLeia(response);
    }
      

    const lowerCaseMessage = message.toLowerCase();

    if (lowerCaseMessage.includes("hello")) {
      this.actionProvider.greet();
    }

    if (lowerCaseMessage.includes("javascript")) {
      this.actionProvider.handleJavascriptList();
    }
  }
}

export default MessageParser;