import React, { useState, useReducer } from "react";
import "./Login.css";

const Login = () => {
  const validateEmail = (email) => {
    if (
      String(email)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
    ) {
      return true;
    } else {
      return false;
    }
  };
  const validateName = (name) => {
    if (
      String(name)
        .toLowerCase()
        .trim()
        .match(/^[a-zA-z]*$/)
    ) {
      return true;
    } else {
      return false;
    }
  };

  const [option, setOption] = useState("LOGIN");

  const [form, dispatchForm] = useReducer(
    (prev, action) => {
      if (action.type === "NAME") {
        return {
          ...prev,
          name: {
            value: action.name,
            valid: validateName(action.name),
          },
          isvalidSignUpForm:
            prev.email.valid &&
            prev.confirmPassword.valid &&
            validateName(action.name),
        };
      }
      if (action.type === "EMAIL") {
        return {
          ...prev,
          email: {
            value: action.email,
            valid: validateEmail(action.email),
          },
          isvaildLoginForm: validateEmail(action.email) && prev.password.valid,
          isvalidSignUpForm:
            prev.confirmPassword.valid &&
            prev.name.valid &&
            validateEmail(action.email),
        };
      }
      if (action.type === "PASSWORD") {
        return {
          ...prev,
          password: {
            value: action.password,
            valid: action.password.length > 6,
          },
          isvaildLoginForm: prev.email.valid && action.password.length > 6,
          isvalidSignUpForm:
            prev.email.valid &&
            action.password.length > 6 &&
            prev.confirmPassword.value === action.password &&
            prev.name.valid,
        };
      }
      if (action.type === "CONFIRMPASSWORD") {
        return {
          ...prev,
          confirmPassword: {
            value: action.confirmPassword,
            valid:
              action.confirmPassword === prev.password.value &&
              prev.password.valid,
          },
          isvalidSignUpForm:
            prev.email.valid &&
            prev.name.valid &&
            action.confirmPassword === prev.password.value &&
            prev.password.valid,
        };
      }
    },
    {
      name: {
        value: "",
        valid: false,
      },
      email: {
        value: "",
        valid: false,
      },
      password: {
        value: "",
        valid: false,
      },
      confirmPassword: {
        value: "",
        valid: false,
      },
      isvaildLoginForm: false,
      isvalidSignUpForm: false,
    }
  );

  const optionHandler = () => {
    setOption((option) => {
      if (option === "SIGNUP") return "LOGIN";
      if (option === "LOGIN") return "SIGNUP";
    });
  };

  const nameHandler = (e) => {
    dispatchForm({
      type: "NAME",
      name: e.target.value,
    });
  };
  const emailHandler = (e) => {
    dispatchForm({
      type: "EMAIL",
      email: e.target.value,
    });
  };
  const passwordHandler = (e) => {
    dispatchForm({
      type: "PASSWORD",
      password: e.target.value,
    });
  };
  const confirmPasswordHandler = (e) => {
    dispatchForm({
      type: "CONFIRMPASSWORD",
      confirmPassword: e.target.value,
    });
  };

  const signUpHandler = (e) => {
    e.preventDefault();
    console.log(form);
  };

  const loginHandler = (e) => {
    e.preventDefault();
    console.log(form);
  };

  return (
    <>
      <div className="container">
        <div className="heading">FriendsBook</div>

        <form>
          {option === "SIGNUP" && (
            <input
              type="text"
              placeholder="Name"
              required
              onChange={nameHandler}
            />
          )}
          <input
            type="email"
            placeholder="email"
            required
            onChange={emailHandler}
          />
          <input
            type="password"
            name="password"
            required
            onChange={passwordHandler}
          />

          {option === "SIGNUP" && (
            <input
              type="password"
              placeholder="Confirm Password"
              required
              onChange={confirmPasswordHandler}
            />
          )}

          {option === "SIGNUP" && (
            <button
              style={
                form.isvalidSignUpForm
                  ? { backgroundColor: "black" }
                  : { backgroundColor: "#ccc" }
              }
              onClick={signUpHandler}
            >
              Sign Up
            </button>
          )}

          {option === "LOGIN" && (
            <button
              style={
                form.isvaildLoginForm
                  ? { backgroundColor: "black" }
                  : { backgroundColor: "#ccc" }
              }
              onClick={loginHandler}
            >
              Login
            </button>
          )}
        </form>

        {option === "LOGIN" && (
          <div>
            <p style={{ textAlign: "center" }}>
              <a href="#">Forgot Password</a>
            </p>
            Don't have an account{" "}
            <a href="#" onClick={optionHandler}>
              Sing Up
            </a>
          </div>
        )}

        {option === "SIGNUP" && (
          <div>
            Already have an account{" "}
            <a href="#" onClick={optionHandler}>
              Login
            </a>
          </div>
        )}
      </div>
    </>
  );
};

export default Login;
