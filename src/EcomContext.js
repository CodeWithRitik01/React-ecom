import { createContext, useState, useContext, useReducer, useEffect } from "react";
import { db } from "./firebaseInit";
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"

const reducer = (state, action) => {
    const { payload } = action;
    switch (action.type) {
      case "GET_PRODUCT":
        return {
          cart: payload.child,
          orders: state.orders, // Ensure you retain the orders array
        };
      case "ADD_PRODUCT":
        return {
          cart: [payload.product, ...state.cart],
          orders: state.orders, // Ensure you retain the orders array
        };
      case "REMOVE_PRODUCT":
        return {
          cart: state.cart.filter((product) => product.id !== payload.id),
          orders: state.orders, // Ensure you retain the orders array
        };
      case "UPDATE_PRODUCT":
        const productDuplicate = state.cart;
        productDuplicate[payload.productPos] = payload.product;
        return {
          cart: productDuplicate,
          orders: state.orders, // Ensure you retain the orders array
        };
      case "ADD_ORDER":
        return {
          cart: state.cart, // Ensure you retain the cart array
          orders: [payload.order, ...state.orders],
        };
       case "GET_ORDERS":
        return {
           cart: state.cart,
           orders: payload.child
        }
      default:
        return state;
    }
  };
  



const EcomContext = createContext();

function useValue(){
    const value = useContext(EcomContext);
    return value;
}



function CustomEcomContext({children}){
    const [state, dispatch] = useReducer(reducer, {cart:[], orders:[]});

    const [loggedIn, setLoggedIn] = useState(() => {
        // Retrieve authentication status from localStorage on component mount
        return localStorage.getItem('loggedIn') === 'true';
      });
    const [usersd, setUsersd] = useState(() =>{
        return localStorage.getItem('usersd');
    })

    const [total, setTotal] = useState('');
    const [] = useState('');

    // cart database

    const getData = async () =>{
        const auth = getAuth();
        const user = auth.currentUser;
        if(user){
            localStorage.setItem("usersd",user.uid);

        }

        
        
            console.log(usersd);
          
        const snapshot = await getDocs(collection(db, "ManCart"));
        const child = snapshot.docs.map((doc) => ({
            id:doc.id,
            ...doc.data()
        }));

        console.log(child, "child");
        dispatch({type: "GET_PRODUCT", payload: {child}});

    }

    useEffect(() => {
        console.log(loggedIn);
      
        getData();
    }, []);

    useEffect(() => {
        const totalPrice = state.cart.reduce((acc, item) => {
            // Add a condition based on your criteria
            if (item.userid === usersd) {
              // Add the price multiplied by quantity to the accumulator
              return acc + item.price * item.qty;
            } else {
              // If the quantity is 0 or less, don't include it in the total
              return acc;
            }
          }, 0);        setTotal(totalPrice);
        console.log(total, "ssss");
    })

  

    const addData = async (product) => {
        console.log(product);
        product.userid = usersd;
        product.qty = 1;
        product.timestamp = serverTimestamp();
        const cartRef = collection(db, "ManCart");
        const docRef = await addDoc(cartRef, product);
    
        dispatch({
            type: "ADD_PRODUCT",
            payload: {product: {id: docRef, ...product}}
        })
        toast.success("Product added to cart successfully");
        window.location.reload();

    }

    const removeProduct = async (id) => {
        try{
            const docRef = doc(db, "ManCart", id);
            await deleteDoc(docRef);

            dispatch({type:"REMOVE_PRODUCT", payload:{id}});
            toast.success("Product removed from cart successfully");

        }catch(err){
            console.log(err);
        }
    }

    const updatePos = async (product) =>{
        const productPos = state.cart
        .map(function(prod){
            return prod.id;
        })
        .indexOf(product.id);
        
        const prodRef = doc(db, "ManCart", product.id);
        await updateDoc(prodRef, {
            qty: product.qty+1
        })

        dispatch({type: "UPDATE_PRODUCT", payload:{productPos, product}})
        window.location.reload();
    }

    const updateNeg = async (product) =>{
        if(product.qty === 1){
            removeProduct(product.id);
            return;
        }
        const productPos = state.cart
        .map(function(prod){
            return prod.id;
        })
        .indexOf(product.id);
        
        const prodRef = doc(db, "ManCart", product.id);
        await updateDoc(prodRef, {
            qty: product.qty-1
        })

        dispatch({type: "UPDATE_PRODUCT", payload:{productPos, product}})
        window.location.reload();
    }

    // order database

    const addOrder = async () =>{
        const orderRef = collection(db, "orders");

        // Iterate through state.cart array
        for (const item of state.cart) {
          // Create a new order with the current item
          if(usersd !== item.userid){
            continue;
          }
          const order = item;
          order.timestamp = serverTimestamp();

          try {
            // Add the order to the "orders" collection
            const docRef = await addDoc(orderRef,  order );
      
            // Dispatch the action to update the state if needed
            dispatch({
              type: "ADD_ORDER",
              payload: { order: { id: docRef.id, ...item } },
            });
            toast.success("Ordered successfully");

          } catch (error) {
            console.error("Error adding order:", error);
          }
        }
        
    }

    const getOrders = async () =>{
        const snapshot = await getDocs(collection(db, "orders"));
        const child = snapshot.docs.map((doc) => ({
            id:doc.id,
            ...doc.data()
        }));
        
        dispatch({type: "GET_ORDERS", payload: {child}})
    }

    useEffect(() => {
        getOrders();
    },[]);

    return(
        <EcomContext.Provider value={{addData :addData,
                                    cart: state.cart ,
                                    orders: state.orders,
                                    loggedIn: loggedIn,
                                    setLoggedIn: setLoggedIn,
                                    usersd:usersd,
                                    setUsersd:setUsersd,
                                    total:total,
                                    removeProduct:removeProduct,
                                    updatePos:updatePos,
                                    updateNeg:updateNeg,
                                    addOrder:addOrder}
                                    }>
                                      <ToastContainer />
            {children }
        </EcomContext.Provider>
    )
}

export {EcomContext, useValue};
export default CustomEcomContext;