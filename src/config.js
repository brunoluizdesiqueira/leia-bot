import React from "react";
import { createChatBotMessage } from 'react-chatbot-kit';

import LearningOptions from "./components/LearningOptions/LearningOptions";
import LinkList from "./components/LinkList/LinkList";
import ResponseCard from "./components/ResponseCard/ResponseCard";
import * as configLeia from "./constants/constants";

const config = { 
  botName: "Leia Bot",
  initialMessages: [
    createChatBotMessage(configLeia.INITIAL_MESSAGE, {
      widget: "learningOptions",
    }), 
  ],
  customStyles: {
    botMessageBox: {
      backgroundColor: "#376B7E",
    },
    chatButton: {
      backgroundColor: "#376B7E",
    },
  },
  widgets: [
    {
      widgetName: "learningOptions",
      widgetFunc: (props) => <LearningOptions {...props} />,
    },
    {
      widgetName: "javascriptLinks",
      widgetFunc: (props) => <LinkList {...props} />,
      props: {
        options: [
          {
            text: "Introduction to JS",
            url: "https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/basic-javascript/",
            id: 1,
          },
          {
            text: "Mozilla JS Guide",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide",
            id: 2,
          },
          {
            text: "Frontend Masters",
            url: "https://frontendmasters.com",
            id: 3,
          },
        ],
      },
    },
    {
      widgetName: "responseCard",
      widgetFunc: (props) => <ResponseCard {...props} />,
    },
  ],
};

export default config

