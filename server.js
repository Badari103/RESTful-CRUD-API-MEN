import  express from "express";
import mongoose from "mongoose";
import Product from "./models/productModel.js";

const app=express();

// mounting middleware
app.use(express.json());
app.use(express.urlencoded({extended:false}));

// routes 

// route for home page
app.get("/",(req,res)=>{
    res.send("Hello")
})

//route for blog page
app.get("/blog",(req,res)=>{
    res.send("Hello blog , This is Badari")
})

//route for product page which shows all product
app.get("/product", async(req,res)=>{
    try{
        const product = await Product.find({});
        res.status(200).json(product);
    } catch (err) {
        res.status(500).json({message : err.message});
    }
})

//route for product page which shows the content for paticular product
app.get("/product/:id", async(req,res)=>{
    try{
        const {id} = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);
    } catch (err) {
        res.status(500).json({message : err.message});
    }
})

//route for product to update by finding it
app.put("/product/:id", async(req,res)=>{
    try{
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id,req.body);
        if(!product){
            res.status(404).json({message:`cannot find any product with ID : ${{id}}`})
        }
        res.status(200).json(product);
    } catch (err) {
        res.status(500).json({message : err.message});
    }
})

//route for product to delete by finding it
app.delete("/product/:id", async(req,res)=>{
    try{
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id,req.body);
        if(!product){
            res.status(404).json({message:`cannot find any product with ID : ${{id}}`})
        }
        res.status(200).json(product);
    } catch (err) {
        res.status(500).json({message : err.message});
    }
})

//route for product to post any new
app.post("/product",async(req,res)=>{
    try{
        const product = await Product.create( req.body );
        res.status(200).json(product); 
    } catch (err) {
        console.log(err.message);
        res.status(500).json({message : err.message})
    }
})


app.listen(3000,()=>{
    console.log("Hi");
})

mongoose.connect('mongodb+srv://badarinarayan2001:CYBAW2W0Zb5eFg8b@cluster0.qrpvhtw.mongodb.net/Node-Api?retryWrites=true&w=majority').then(()=>{
    console.log("connected to DB");
}).catch((error)=>{
    console.log(error)
})