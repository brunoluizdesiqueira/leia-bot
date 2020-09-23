import React from "react";

import "./ResponseCard.css";

const ResponseCard = (props) => {
  const cards = JSON.parse(localStorage.getItem('@leiabot/responsecard'));
  localStorage.removeItem('@leiabot/responsecard');

  const responseCard = cards.genericAttachments.map((card, indice) => (
    <li key={indice} className="link-list-item">
      <a
        href={card.attachmentLinkUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="link-list-item-ursl"
      >
        {card.title}
      </a>
    </li>
  ));

  return <ul className="link-list">{responseCard}</ul>;
};

export default ResponseCard;