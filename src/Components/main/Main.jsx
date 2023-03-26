import React, { useState, useEffect } from "react";
import axios from "axios";
import './Main.css';
import panier_logo from '../../img/panier.png';
import Panier from "../panier/panier";


function Main() {
    
    const [results, setResults] = useState([]);
    const [searchInput, setSearchText] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [cartItems, setCartItems] = useState([]);
    const [showPanier, setShowPanier] = useState(false);
  
    useEffect(() => {
      fetchResults();
    }, [currentPage]);
  
    const fetchResults = async () => {
      const response = await axios.get(
        `https://itunes.apple.com/search?term=${searchInput}&entity=song&limit=1000&offset=${(currentPage - 1)*20}`
      );
      setResults(response.data.results);
      setTotalPages(Math.ceil(response.data.resultCount / 20));
    };
  
    const Search = () => {
        setSearchText(searchInput);
        fetchResults();
      };
    
      const Clear = () => {
        setSearchText("");
      };
    
      const Change = (e) => {
        setSearchText(e.target.value);
      };
    const AddTopanier = (item) => {
      const newCartItems = [...cartItems, item];
      setCartItems(newCartItems);
      setResults(
        results.map((result) => {
          if (result.trackId === item.trackId) {
            return { ...result, addedToCart: true };
          } else {
            return result;
          }
        })
      );
    };
    function clearCart() {
      setCartItems([]);
      sessionStorage.clear();
    }
  
    const RemoveFrompanier = (item) => {
      const newCartItems = cartItems.filter(
        (cartItem) => cartItem.trackId !== item.trackId
      );
      setCartItems(newCartItems);
      setResults(
        results.map((result) => {
          if (result.trackId === item.trackId) {
            return { ...result, addedToCart: false };
          } else {
            return result;
          }
        })
      );
    }; 
      const ClosePanier = () => {
        setShowPanier(false);
      };
  
    const PageChange = (newPage) => {
      setCurrentPage(newPage);
    };
  return (
    <div>
        <div className="search-bar">
            <div className="logo">GTunes</div>
            <div className="search-box">
                <input
                type="text"
                placeholder="Rechercher"
                value={searchInput}
                onChange={Change}
                />
                {searchInput && (
                <button className="clear-btn" onClick={Clear}>
                    X
                </button>
                )}
                <button className="search-btn" onClick={Search}>
                Recherche
                </button>
            </div>
            <div className="panier_l" onClick={() => setShowPanier(!showPanier)}>
                <img src={panier_logo} alt="Panier" />
            </div>
    </div>
    {showPanier && 
    <Panier
         cartItems={cartItems}
         onCloseCartModal={ClosePanier}
         onRemoveFromCart={RemoveFrompanier}
         showPanier={showPanier}
         clearCart={clearCart}
        />}
    
    <div className="results_comp">
        <div className="results">
        {results.slice((currentPage - 1) * 20, currentPage * 20).map((result) => (
            <div key={result.trackId} className="container">
                <div class="avatar">
                    <img src={result.artworkUrl100} alt={result.trackName} height="100" width="100"/>
                </div>
                <div className="content">
                    <div className="title">{result.trackName}</div>
                    <div className="album">{result.collectionName}</div>
                    <div className="artist">{result.artistName}</div>
                    {!result.addedToCart ? (
                    <button className="add" onClick={() => AddTopanier(result)}>
                        Ajouter au panier
                    </button>
                    ) : (
                    <button
                        className="remove"
                        onClick={() => RemoveFrompanier(result)}
                    >
                        Supprimer du panier
                    </button>
                    )}
                </div>
            </div>
        ))}
       
        </div>
        <div className="page-count">
            <div className="page-info">
                <span>Page {currentPage} sur {totalPages}</span>
            </div>
            <div className="page-navigation">
                <button
                className="page-nav-btn"
                disabled={currentPage === 1}
                onClick={() => PageChange(currentPage - 1)}
                >
                &lt;
                </button>
                <button
                className="page-nav-btn"
                disabled={currentPage === totalPages}
                onClick={() => PageChange(currentPage + 1)}
                >
                &gt;
                </button>
            </div>
        </div>


        </div>
    </div>
  )
}

export default Main