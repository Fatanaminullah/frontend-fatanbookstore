import axios from "../config/axios";
import cookies from "universal-cookie";

const cookie = new cookies();

export const onLoginClick = (username, password) => {
  return async dispatch  => {
    await axios.post("/users/login", { 
      username, password 
    })
    .then(res => {
      cookie.set("idLogin", res.data.id, { path: "/" });
      cookie.set("stillLogin", res.data.username, { path: "/" });
      cookie.set("role", res.data.role, { path: "/" });
      
      console.log(res);
      
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: {
          id: res.data.id,
          username: res.data.username,
          role: res.data.role
        }
      })
    },err => {
        console.log(err);
        dispatch({
          type: "AUTH_ERROR",
          payload: "Username or Password incorrect"
        });
      })
    }
  }
  export const onLoginAdmin = (username, password) => {
    return async dispatch  => {
      await axios.post("/admin/login", { 
        username, password 
      })
      .then(res => {
        cookie.set("idLogin", res.data.id, { path: "/admin/dashboard" });
        cookie.set("stillLogin", res.data.username, { path: "/admin/dashboard" });
        cookie.set("role", res.data.role, { path: "/admin/dashboard" });
        
        
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: {
            id: res.data.id,
            username: res.data.username,
            role: res.data.role
          }
        })
      },err => {
          console.log(err);
          dispatch({
            type: "AUTH_ERROR",
            payload: "Username or Password incorrect"
          });
        })
      }
    }
  
export const onSignupClick = (username, email, password) => {
  return dispatch => {
    axios.get("/users", {
        params: {
            username
        }
    }).then(res => {
        if (username === '' || email === '' || password === '') {
            dispatch({
                type: "AUTH_EMPTY",
                payload: 'please fill the form'
            })
        } else if (res.data.length === 0) {
            axios.post("/users", {
                username,
                email,
                password
            }).then(res => {
                console.log("Registrasi Berhasil");
                dispatch({
                    type: "REGISTER_SUCCESS",
                    payload: `Register Success, please login to continue!`
                })
            })
        } else {
            console.log(res.data);
            
            dispatch({
                type: "AUTH_ERROR",
                payload: 'username has been taken'
            })
        }
    }).catch(e => {
        console.log(e.response.data.replace('User validation failed: ', ''));
    })
  };
};
export const afterError = () => {
  return {
    type: "AFTER_ERROR"
  };
};
export const afterTwoSeconds = () => {
  return dispatch => {
    setTimeout(() => {
      dispatch(afterError());
    }, 3000);
  };
};
export const Logout = () => {
  cookie.remove("idLogin");
  cookie.remove("stillLogin");
  cookie.remove("role");
  console.log("logout");
  
  return {
    type: "LOGOUT_USER"
  };
};
export const keepLogin = (username, id,role) => {
  if (username === undefined || id === undefined) {
    return {
      type: "KEEP_LOGIN",
      payload: {
        id: "",
        username: "",
        role:""
      }
    };
  }
  return {
    type: "KEEP_LOGIN",
    payload: {
      id,
      username,
      role
    }
  };
};
export const addProduct = (name, desc, price, pict) => {
  return dispatch => {
    axios
      .post("/product", {
        name: name,
        desc: desc,
        price: price,
        pict: pict
      })
      .then(res => {
        console.log("berhasil menambahkan");
        const { name, desc, price, pict } = res.data[0];
        dispatch({
          type: "ADD_SUCCESS",
          payload: { name, desc, price, pict }
        });
      });
  };
};
