import React, { useContext } from "react";
import { Link } from "react-router-dom";

//Components
import Cart from "./shared/Cart";

//Context
import { CartContext } from "../context/CartContextProvider";

//Style
import styles from "./ShopCart.module.css";

const ShopCart = () => {
  const { state, dispatch } = useContext(CartContext);

  return (
    <div className={styles.container}>
      <div className={styles.cartContainer}>
        {state.selectedItems.map((item) => (
          <Cart key={item.id} data={item} />
        ))}
      </div>
      {state.itemCounter > 0 && (
        <div className={styles.payments}>
          <p>
            <span>Total Items:</span> {state.itemCounter}
          </p>
          <p>
            <span>Total Payments:</span> {state.total}
          </p>
          <div className={styles.buttonContainer}>
            <button
              className={styles.clear}
              onClick={() => dispatch({ type: "CLEAR" })}
            >
              Clear
            </button>
            <button
              className={styles.checkout}
              onClick={() => dispatch({ type: "CHECKOUT" })}
            >
              Check Out
            </button>
          </div>
        </div>
      )}

      {state.checkout && (
        <div className={styles.complete}>
          <h3>Checked Out Successfully</h3>
          <Link to="/products">Buy More</Link>
        </div>
      )}

      {!state.checkout && state.itemCounter === 0 && (
        <div className={styles.complete}>
          <h3>Want to Buy?</h3>
          <Link to="/products">Go Back To Shop</Link>
        </div>
      )}
    </div>
  );
};

export default ShopCart;
