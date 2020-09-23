class ActionProvider {
  constructor(createChatBotMessage, setStateFunc) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
  }

  respostaLeia(response) {
    const resp = this.createChatBotMessage(response.message);
    this.updateChatbotState(resp);
  }

  handleResponseCard = (response) => {
    const message = this.createChatBotMessage(response.message,
      {
        widget: "responseCard",
      }
    );
    this.updateChatbotState(message);
    this.handleLocalStore(response.responseCard);
  }

  handleLocalStore(responseCard) {
    const jsonResponseCard = JSON.stringify(responseCard);
    localStorage.setItem('@leiabot/responsecard', jsonResponseCard);
    console.log(localStorage.getItem('@leiabot/responsecard'));
  }
  
  greet() {
    const greetingMessage = this.createChatBotMessage("Hi, friend.")
    this.updateChatbotState(greetingMessage)
  }

  handleJavascriptList = () => {
    const message = this.createChatBotMessage(
      "Fantastic, I've got the following resources for you on Javascript:",
      {
        widget: "javascriptLinks",
      }
    );
    this.updateChatbotState(message);
  };
  
  updateChatbotState(message) {
 
// NOTE: This function is set in the constructor, and is passed in      
// from the top level Chatbot component. The setState function here     
// actually manipulates the top level state of the Chatbot, so it's     
// important that we make sure that we preserve the previous state.  

   this.setState(prevState => ({
    	...prevState, messages: [...prevState.messages, message]
    }))
  }
}

export default ActionProvider