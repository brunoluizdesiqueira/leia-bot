export const API_KEY = 'us-west-2:7e9e1657-489b-4317-87f9-18bd5d52c888';
export const BOT_NAME = 'leiabot_dev';
export const REGION = 'us-west-2';
export const ALIAS = '$LATEST';
export const INITIAL_MESSAGE = "Olá, como posso ajudar hoje?";

export const CONFIG_AMPLIFY = { Auth: {
                                  identityPoolId: API_KEY,
                                  region: REGION
                                },
                                Interactions: {
                                  bots: {
                                    "leiabot_dev": {
                                      "name": BOT_NAME,
                                      "alias": ALIAS,
                                      "region": REGION,
                                    },
                                  }
                                }
                              };

export var propsResponseCard = {};