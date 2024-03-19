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
    console.log(check.password)
    console.log(req.body.password)
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