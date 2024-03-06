import { useValue } from "../../EcomContext";
import styles from "./cart.module.css"
const Cart = () =>{
    const {cart,usersd, total, removeProduct,updatePos, updateNeg, addOrder} = useValue();
    return(
        <>
        {cart && cart.length === 0 ?  <h1>Cart is Empty</h1> :
        <div className={styles.outCart}>
          <aside className={styles.cartAside}>
            <p>
              TotalPrize: {total}
            </p>
            <button onClick={addOrder} className={styles.purchaseButton}>Purchase</button>
          </aside>

          <div className={styles.allCartCard}>
            {cart.map((item) => (
              <>
              {item.userid === usersd?
              <div className={styles.cartCard}>
                <div className={styles.cardImg}>
                  <img alt="Product" src={item.img}></img>
                </div>
                <div className={styles.cartDesc}>
                    <div className={styles.prodName}>
                          <p>{item.name} </p>
                    </div>
                    <div className={styles.prodPrice}>
                          <p>₹{item.price}</p>
                          <div className={styles.prodQty}>
                            <img onClick={() => updateNeg(item)} src="https://cdn-icons-png.flaticon.com/128/1828/1828564.png"></img>
                            {item.qty}
                            <img onClick={() => updatePos(item)}  src="https://cdn-icons-png.flaticon.com/128/14064/14064493.png"></img>
                          </div>
                    </div>
                    <button onClick={() => removeProduct(item.id)} className={styles.removeFromCartButton}>Remove From Cart</button>
                </div>
                
            </div>
          : null}
          </>
            ))}
          </div> 
        </div>
        }
        </>
    )
}

export default Cart;