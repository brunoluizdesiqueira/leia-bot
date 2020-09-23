export const API_KEY = 'XXXXXXX';
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