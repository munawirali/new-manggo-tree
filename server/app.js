const express = require('express');
const firebaseDB = require('firebase');
const cron = require('node-cron');
const cors = require('cors');
const app = express();

app.use(cors());

// Initialize Firebase
var config = {
  apiKey: "AIzaSyBJ_uOv1Q6Wk9LMnMFsh7tgRtTvp7cTa2E",
  authDomain: "new-manggo-tree.firebaseapp.com",
  databaseURL: "https://new-manggo-tree.firebaseio.com",
  projectId: "new-manggo-tree",
  storageBucket: "new-manggo-tree.appspot.com",
  messagingSenderId: "426419023879"
};

const firebaseApp = firebaseDB.initializeApp(config)
const db = firebaseApp.database()

class FruitTree {
  constructor(name,age,height,fruit,healthy) {
    this._name          = name
    this._age           = age
    this._height        = height
    this._fruitsBox     = []
    this._stopHeight    = null
    this._healthyStatus = healthy
    this._maxAge        = null
    this._harvested     = 0
    this._fruitType     = null
    this._qtyBefore     = fruit || 0
  }

  getAge() {
    return this._age
  }
  getHeight() {
    return this._height
  }
  getFruits() {
    return this.Fruits
  }
  getHealtyStatus() {
    return this._healthyStatus
  }

  grow() {
    this._age += 1

    if(this._height <= this._stopHeight) {
      let added_height = Math.random() * (1 - 0)
      this._height += added_height
    }

    if(this._age == this._maxAge) {
      this._healthyStatus = false
    }
  }

  produce() {
    let qty = Math.floor(Math.random() * (10 - 1) + 1)

    for (var i = 0; i < qty; i++) {
      if(this._name === 'MangoTree'){
        this._fruitType = new Mango()
      }
      else if(this._name === 'AppleTree'){
        this._fruitType = new Apple()
      }
      else if(this._name === 'PearTree'){
        this._fruitType = new Pear()
      }
      this._fruitsBox.push(this._fruitType)
    }
  }

  harvest() {
      let sumGood     = 0
      let sumBad      = 0
      let qty         = this._fruitsBox.length
      this._harvested = this._qtyBefore + qty


      for(let i=0; i<qty; i++) {
        if(this._fruitsBox[i]._quality == 'good') {
          sumGood++
        } else {
          sumBad++
        }
      }
      this._harvested += ` (${sumGood} good, ${sumBad} bad)`
    }
}

class Fruit {
  constructor(){
    this._quality = this.fruitQuality();
  }

  fruitQuality(){
    let randomStatus = Math.floor(Math.random()* 2)
    if(randomStatus == 0){
      return 'good'
    }
    else if(randomStatus == 1){
      return 'bad'
    }
  }

  get name(){
    return this._name
  }
}

class MangoTree extends FruitTree {
  constructor(name,age,height,fruit,healthy) {
    super(name,age,height,fruit,healthy)
    this._stopHeight = 15
    this._maxAge = 20
  }
}

class AppleTree extends FruitTree{
  constructor(name,age,height,fruit,healthy){
    super(name,age,height,fruit,healthy)
    this._stopHeight = 8
    this._maxAge = 10
  }
}

class PearTree extends FruitTree{
  constructor(name,age,height,fruit,healthy){
    super(name,age,height,fruit,healthy)
    this._stopHeight = 9
    this._maxAge = 11
  }
}

class Mango extends Fruit{
  constructor(){
    super()
    this._name = `Mango Fruit`
  }
}

class Apple extends Fruit{
  constructor(){
    super()
    this._name = `Apple Fruit`
  }
}

class Pear extends Fruit{
  constructor(){
    super()
    this._name = `Pear Fruit`
  }
}


class TreeGroove{
  constructor(){
    this.arrTree =[]
  }

  inputTree(name,age,height,fruit,healthy){
    if (name === 'MangoTree'){
      let tree = new MangoTree(name, age, height, fruit, healthy)
      this.arrTree.push(tree)
    }
    else if(name === 'AppleTree'){
      let tree = new AppleTree(name, age, height, fruit, healthy)
      this.arrTree.push(tree)
    }
    else if(name === 'PearTree'){
      let tree = new PearTree(name, age, height, fruit, healthy)
      this.arrTree.push(tree)
    }
  }

  show_ages(){
    for (var i = 0; i < this.arrTree.length; i++) {
      console.log(`\nthis ${this.arrTree[i]._name} age = ${this.arrTree[i]._age} year(s)`)
    }
  }
  show_trees(){
    for(var i = 0; i < this.arrTree.length; i++){
      console.log(`\nTree Name : ${this.arrTree[i]._name}`);
    }
  }

  mature_trees(){
    for (var i = 0; i < this.arrTree.length; i++) {
      if((this.arrTree[i]._healthyStatus != false) && (Number(this.arrTree[i]._harvested[0]) > 0)){
        console.log(`${this.arrTree[i]._name} has Fruit(s)`);
      }
      else{
        console.log(`${this.arrTree[i]._name} doesn't has Fruit(s)`)
      }
    }
  }
  dead_trees(){
    for (var i = 0; i < this.arrTree.length; i++) {
      if(this.arrTree[i]._healthyStatus == false){
        console.log(`${this.arrTree[i]._name} dead`);
      }
      else
      console.log(`${this.arrTree[i]._name} still alive`);
    }
  }

  nextYear(){
    for (var i = 0; i < this.arrTree.length; i++) {
      this.arrTree[i].grow()
      this.arrTree[i].produce()
      this.arrTree[i].harvest()
    }
  }
}

let treeMango = new MangoTree('MangoTree', 1, 2, 8, true)
let treeApple = new AppleTree('AppleTree', 5, 1.5, 10, true)
let treePear  = new PearTree('PearTree', 3, 1.5, 10, true)

app.get('/',(req,res) => {
  res.send({name : 'server manggo tree'})
})
app.get('/start',(req,res) => {
  console.log('masuk routing start')
  res.send('masuk routing start')
  treeMango._name = 'MangoTree'
  treeMango._age  = 1
  treeMango._height = 2
  treeMango._qtyBefore = 8
  treeMango._healthyStatus = true
  let counting = cron.schedule('* * * * * *',() => {
    treeMango.grow()
    treeMango.produce()
    treeMango.harvest()
    db.ref('new_manggo_tree').set({
      dead:'',
      status: `[Year ${treeMango._age} Report] Height = ${treeMango._height.toFixed(2)} | Fruits harvested = ${treeMango._harvested}`
    })
    console.log(`\n===================Report of growing ${treeMango._name} ===============================\n`);
    console.log(`[Year ${treeMango._age} Report] Height = ${treeMango._height.toFixed(2)} | Fruits harvested = ${treeMango._harvested}`)
    if (treeMango._healthyStatus == false) {
      console.log('Mango tree was die')
      db.ref('new_manggo_tree').set({
        dead: 'Mango tree was die'
      })
      counting.stop()
    }
  })
})


app.listen(3000 || process.end.PORT,()=>{
  console.log('app running at port 3000');
})

// console.log(treeMango);
module.exports = {
  app,
  treeMango
}
