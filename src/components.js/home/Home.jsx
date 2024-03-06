import styles from "./home.module.css";
import { Product } from "../../data/productData";
import { useState } from "react";
import { useValue } from "../../EcomContext";
function Home(){

    const [searchTerm, setSearchItem] = useState('');
    const {addData, loggedIn} = useValue();

     const handleInputChange =(event) =>{
        setSearchItem(event.target.value);

     }

     const filteredProducts = Product.filter((item) =>
     item.name.toLowerCase().includes(searchTerm.toLowerCase())
   );


   const handleCartClick = (item)  =>{
     console.log(loggedIn);
     addData(item);
   }
    return(
        <>
        <div className={styles.outHome}>
            <aside className={styles.side}>
                <h2>Filter</h2>
                <form >
                    <label for="price">Price: 75000</label>
                    <input className={styles.asideFormInput} type="range" id="price" name="Price" min="1" max="100000" step="10" value="75000"></input>
                    <h2>Category</h2>
                    <div className={styles.outCheckBox}>
                       <div className={styles.inCheckBox}>
                            <input type="checkbox" id="mensFashion" name="mensFashion"></input>
                            <label for="mensFashion">Men's Clothing</label>
                        </div> 
                        <div className={styles.inCheckBox}>
                            <input type="checkbox" id="womensFashion" name="womensFashion"></input>
                            <label for="womensFashion">Women's Clothing</label>
                        </div>
                        <div className={styles.inCheckBox}>
                            <input type="checkbox" id="jewelery" name="jewelery"></input>
                            <label for="jewelery">Jewelery</label>
                        </div>
                        <div className={styles.inCheckBox}>
                            <input type="checkbox" id="electronics" name="electronics"></input>
                            <label for="electronics">Electronics</label>
                        </div>
                    </div>
                </form>
            </aside>


            <form className={styles.mainForm}>
                <input onChange={handleInputChange} type="search" placeholder="Search By Name" ></input>
            </form>


            <div className={styles.allCard}>
            {filteredProducts.map((item) => (
                <div className={styles.outCard}>
                    <div className={styles.cardImg}>
                        <img src={item.img} alt="product"/>
                    </div>
                    <div className={styles.cardDesc}>
                        <div className={styles.CardName}>
                            <p>{item.name}</p>
                        </div>
                        <div className={styles.cardPrice}>
                            <p>$ {item.price}</p>
                        </div>
                        <button className={styles.AddToCartButton} title="Add to Cart" onClick={() => loggedIn && handleCartClick(item)} >Add To Cart</button>
                    </div>
                </div>
            ))}
           </div>

        
        </div>
        </>
    )
}

export default Home;