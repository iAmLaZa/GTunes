import React from "react";
import Success from "../success/Success";
import './panier.css';
import { useState } from "react";


function Panier({ cartItems, onCloseCartModal, onRemoveFromCart, showPanier ,clearCart}) {
  const totalAmount = cartItems.reduce(
    (accumulator, item) => accumulator + item.trackPrice,
    0
  );

  const [showSuccess, setShowSuccess] = useState(false);
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [adresse, setAdresse] = useState("");

  const AcheterClick = () => {
    setShowSuccess(true);
  
  };
  const GoToHome = () => {
    setShowSuccess(false);
    onCloseCartModal();
    clearCart();
  };

  return (
    <div>
        {showSuccess ? (
         <Success 
         name={nom+" "+prenom}
         total={totalAmount}
         onGoToHome ={GoToHome}
         />
    ): (
       <div className={`panier ${showPanier ? "show" : ""}`}>
      <div className="panier-content">
        <div className="panier-header">
          <h2>Mon Panier</h2>
          <button onClick={onCloseCartModal}>X</button>
        </div>
        <div className="panier-items">
          {cartItems.map((item) => (
            <div key={item.trackId} className="panier-item">
              <div className="panier-item-left">
                <img src={item.artworkUrl100} alt="Album Artwork" />
                <div>{item.trackName}</div>
              </div>
              <div className="panier-item-right">
                <div>{`${item.trackPrice} DZD`}</div>
                <button onClick={() => onRemoveFromCart(item)}>X</button>
              </div>
            </div>
          ))}
        </div>
        <div className="panier-form">
          <div className="panier-form-item">
            <label>Nom:</label>
            <input type="text" value={nom} onChange={(e) => setNom(e.target.value)} />
          </div>
          <div className="panier-form-item">
            <label>Prénom:</label>
            <input type="text" value={prenom} onChange={(e) => setPrenom(e.target.value)} />
          </div>
          <div className="panier-form-item">
            <label>Adresse:</label>
            <input type="text" value={adresse} onChange={(e) => setAdresse(e.target.value)} />
          </div>
        </div>
        <div className="panier-footer">
          <div>{`Total: ${totalAmount} DZD`}</div>
          <button onClick={AcheterClick}>Acheter</button>
        </div>
      </div>
    </div> 
    ) }
    </div>
  );
}

export default Panier;