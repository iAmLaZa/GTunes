import React from "react";
import "./Success.css";

function Success({ name, total, onGoToHome }) {
  return (
    <div className="success">
      <div className="success-message">
        <p>Merci {name} pour avoir acheté les chansons chez Apple!</p>
        <p>Total: {total} DZD</p>
        <button onClitick={onGoToHome()}>Retourner à la page d'Accueil</button>
      </div>
    </div>
  );
}

export default Success;