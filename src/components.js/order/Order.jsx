import { useEffect, useState } from "react";
import { useValue } from "../../EcomContext";
import styles from "./order.module.css"

const Orders = () =>{
  const {orders, usersd, total} = useValue();
  const [tot, settot] = useState(0);
  useEffect(() => {
    let total = 0;
    orders.forEach((order) => {
      // Assuming each order has a 'price' property
      if (order.userid === usersd) {
        total += order.price*order.qty;
      }
    });
    settot(total);

  console.log(tot);
  })
    return(
        <>
          <div className={styles.outOrder}>
              <h1>Your Orders</h1>
              {orders.map((order) => (
                    order.userid === usersd ?
              <div className={styles.allOrders}>
                <h2>Ordered On {new Date(order.timestamp.seconds * 1000 + order.timestamp.nanoseconds / 1e6).toLocaleDateString()}</h2>
                
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Total Price</th>
                    </tr>
                  </thead>
                  <tbody>
               
                   
                      <tr>
                   <th>{order.name}</th>
                   <th>{order.price}</th>
                   <th>{order.qty}</th>
                   <th>{order.price * order.qty}</th>
                 </tr>
               
                    
                
                     
                  </tbody>
                
                </table>
              </div>
               :null
               ))}
                 
                 <th className={styles.tot}>Total:</th>
                 <th className={styles.tot}>{tot}</th>
               
          </div>
        </>
    )
}

export default Orders;