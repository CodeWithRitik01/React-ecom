import './App.css';
import Home from './components.js/home/Home';
import Navbar from './components.js/navbar/Navbar'
import Auth from './components.js/Auth';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import CustomEcomContext, { EcomContext } from './EcomContext';
import Cart from './components.js/cart/Cart';
import Orders from './components.js/order/Order';
import SignUp from './components.js/signUp/SignUp';

function App() {
  const router = createBrowserRouter([
    {path:"/",
     element:<Navbar />,
    children:[
      {index:true, element:<Home />},
      {path: "signIn", element:<Auth />},
      {path: "signUp", element:<SignUp />},
      {path: "cart", element:<Cart/>},
      {path:"orders", element:<Orders />}
    ]}
  ])
  return (
     <>
      <CustomEcomContext>
      <RouterProvider router={router}/>
      </CustomEcomContext>
      
     </>
  );
}

export default App;
