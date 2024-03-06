import { Outlet, NavLink } from "react-router-dom";
import styles from "./navbar.module.css";
import { getAuth, signOut } from "firebase/auth";
import { useValue } from "../../EcomContext";
function Navbar() {

  const {usersd,setUsersd} = useValue();


  const auth = getAuth();
  const signsOut =() =>{
    signOut(auth).then(() =>{
      console.log("you are signout")
      setUsersd(null);
      localStorage.setItem("usersd", null);
      window.location.reload();
    }
    ).catch((error) =>{
      console.log(error);
    })
  }
    return(
        <>
          <div className={styles.outNav}>
            <NavLink activeClassName={styles.activeLink} to="/">
              <h1 className={styles.heading}>Busy Buy</h1>
            </NavLink>
             
           
              {usersd !== "null"?
              <>
               <NavLink activeClassName={styles.activeLink} to="/cart">
               <div className={styles.cart}>
                   <img src="https://cdn-icons-png.flaticon.com/128/4290/4290854.png"/>
                   <h2>Cart</h2>
               </div>
               </NavLink>

              <NavLink activeClassName={styles.activeLink} to="/orders">
              <div className={styles.order}>
                  <img src="https://cdn-icons-png.flaticon.com/128/6769/6769651.png"/>
                  <h2>My Orders</h2>
              </div>
              </NavLink>
              </>
          
              :null}
              
              <NavLink style={({isActive}) => (isActive ? {color: "red"} : undefined)} to="/">
              <div className={styles.home}>
                  <img src="https://cdn-icons-png.flaticon.com/128/10473/10473299.png"/>
                  <h2>Home</h2>
              </div>
              </NavLink>

              {(usersd)!== "null" ? 
            <NavLink style={({isActive}) => (isActive ? {color: "red"} : undefined)} to="/">
              <div className={styles.signIn} onClick={signsOut}>
                  <img src="https://cdn-icons-png.flaticon.com/128/1828/1828490.png"/>
                  <h2>signOut</h2>
              </div>
              </NavLink>
               :  <NavLink style={({isActive}) => (isActive ? {color: "red"} : undefined)} to="/signIn">
               <div className={styles.signIn}>
                   <img src="https://cdn-icons-png.flaticon.com/128/1176/1176390.png"/>
                   <h2>SignIn</h2>
               </div>
               </NavLink>} 
              
             
           
          </div>
          <Outlet />
        </>
    )
}

export default Navbar;