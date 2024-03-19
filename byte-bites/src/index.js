// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';

const root = createRoot(document.getElementById('root'));
root.render(
  <Router>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Router>
);
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
const { createHash } = require('crypto');

function hash(string) {
  return createHash('sha256').update(string).digest('hex');
}

const express = require("express")
const app = express()
const path = require("path")
const hbs = require("hbs")
const templatePath = path.join(__dirname, '../templates')
const collection = require("./mongodb")
// const root = ReactDOM.createRoot(document.getElementById('root'));

// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

app.use(express.json())
app.set("view engine", "hbs")
app.set("views", templatePath)
app.use(express.urlencoded({extended: false}))

app.get("/", (req, res)=>{
  res.render("login")
})

app.get("/signup", (req, res)=>{
  res.render("signup")
})

app.post("/signup", async (req, res)=>{
  const data = {
    name:req.body.name,
    password:hash(req.body.password)
  }

  await collection.insertMany([data])
  res.render("home")
})

app.post("/login", async (req, res)=>{
  try {
    const check = await collection.findOne({name:req.body.name})

    if (check.password===hash(req.body.password)){
      res.render("home")
    } else {
      res.send("wrong password")
    } 
  } catch {
    res.send("wrong username or password")
  }
})

app.listen(3000, ()=>{
  console.log("port conncted");
})

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
