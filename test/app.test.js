const mongoose = require('mongoose')
const registerProfile = require('../models/userProfile.models')
const loginProfile = require('../models/userProfile.models')
const checkProfile = require('../models/userProfile.models');
const insertProduct = require('../models/product.models');
const displayProducts = require('../models/product.models');
const displaySelectedProduct = require('../models/product.models');
const updateProduct = require('../models/product.models');
const deleteProduct = require('../models/product.models');
const addToCart = require('../models/cart.models');
const order = require('../models/order.models')
const updateCart = require('../models/cart.models');
const  deleteCart = require('../models/cart.models');
const retrieveCart = require('../models/cart.models');
const addToWishlist = require('../models/wishlist.models')
const retrieveWishlist = require('../models/wishlist.models');
const deleteWishlist = require('../models/wishlist.models');
const resetPassword = require('../models/userProfile.models')

 
const url = "mongodb://127.0.0.1:27017/swifted_database";
 
beforeAll(async()=>{
    await mongoose.connect(url,
        {
            useNewUrlParser:true,
            useCreateIndex:true
        }
    )
})
 
afterAll(async()=>{
    await mongoose.connection.close();
})
 
describe("User Testing", ()=>{
 
    //Registration Testing
    it("User Registration Testing",()=>{
        const user = {
            firstname: "test01",
            lastname: "test01",
            username: "test01",
            email: "test01@gmail.com",
            phone: "9887654321",
            address: "test01",
            password: "1234567",
            userType: "Admin"
        }
        return registerProfile.create(user)
        .then((register_ret) =>{
            expect(register_ret.username).toEqual("test01")
        })
    })
 
    // Login Testing
    it("User Login Testing", async() => {
       const data = {
           "username": "test9",
           "password": "123456"
       }
       return loginProfile.findOne({data});
       
    })
 
    // Check Profile Testing
    it ("Check User Profile Test", async() => {
        const status = await checkProfile.findById({"_id":Object("60e831fb8f3c4f1d482bc2c1")
    })
    return checkProfile.findOne({"_id":Object("60e831fb8f3c4f1d482bc2c1")})
    } )
 
    //Update Profile Testing
    it ("Update Profile Test", async() => {
        const status = await checkProfile.updateOne({"_id":Object("60e831fb8f3c4f1d482bc2c1")
    },
    {
        $set: {
            "phone": "98123456789",
            "address": "donetest"
        }
    
    })
    
        expect(status.ok).toBe(1)
    })

    // Insert Product Testing 
    it("should insert a product", async () => {
        const product = {
            productName : "Latido Jacket",
            productDescription : "Good for Winter",
            productVendor : "Hello Hey",
            productCategory : "Fashion",
            productPrice : "10000",
            productStocks : "30",
            productImage : "15",
            userId : Object("60ed4a004df0a01bf8f2096d")
        }
        return insertProduct.create(product)
        .then((insert_product) => {
            expect(insert_product.productName).toEqual("Latido Jacket")
        })
    })

        // Display product Testing
    it ("should display a product", async () =>{
        const status = await displayProducts.findById({
            "_id":Object("60e831fb8f3c4f1d482bc2c1")
        })
        return displayProducts.findOne(status)
        .then ((display_products) => {
            expect(display_products.productName).toEqual("Latido Jacket")
        })
    })

    // Display selected Product
    it ("should display selected product", async () => {
        const status = await displaySelectedProduct.findById({
            "_id":Object("60e831fb8f3c4f1d482bc2c1")
        })
        return displayProducts.findOne({
            "_id":Object("60e831fb8f3c4f1d482bc2c1")
        })
    })

    // Update Selected Product Testing
    it ("should update selected product", async () => {
        const status = await updateProduct.updateOne({_id:Object("60eddb7b63e2ad0fe876179d")}, {
                $set : {
                    productName: "Latido Jacket 1",
                    productPrice: "15000"
                }
            })
        expect(status.ok).toBe(1)
    })

    // Delete Product Testing
    it ("should delete product", async () => {
        const status = await deleteProduct.deleteOne({
            "_id":Object("60e831fb8f3c4f1d482bc2c1")
        })
        expect(status.ok).toBe(1)
    })

    // Add to Cart Testing
    it ("should add the product to the cart", async () => {
        const cart = {
            "userID" : "60ec7b10410d0517ccd312bb",
            "productID" : "60eda643ebfa5025b04c28ab",
            "quantity" : "3",
            "addAt": "2021-05-07"
        }
        return addToCart.create(cart)
        .then((cart_ret)=> {
            expect(cart_ret.quantity).toEqual(3)
        })
    })
    
    // Order of Product Testing
    it (" should order the product", async () => {
        const orders = {
            "firstName": "Khadga",
            "lastName": "Chy",
            "email": "khadgachy@gmail.com",
            "phone": "9812346754",
            "address": "Budhabare",
            "paymentMethod" : "COD",
            "cartItems": Object("6100dd4bcad9fc2db4afe110")
        }
        return order.create(orders)
        .then((order_ret) => {
            expect(order_ret.address).toEqual('Budhabare')
        })
    })

    // Testing of Update Cart
    it (" should update the cart", async () => {
        const status = await updateCart.updateOne({_id:Object("6100dd4bcad9fc2db4afe110")},{
            $set : {
                quantity : "6"
            }
        })
        expect(status.ok).toBe(1)
    })
    
    // Delete Cart Testing
    it (" should delete the product from the cart", async () => {
        const status = await deleteCart.deleteOne({
            "_id":Object("6100dd4bcad9fc2db4afe110")
        })
        expect(status.ok).toBe(1)
    })
    
    // Retrieve Cart Testing
    it (" should display the product in the cart", async () => {
        const status = await retrieveCart.findById({
            "_id":Object("610996665683a61540395702")
        })
        return retrieveCart.findOne(status)
        .then ((retrieve_cart) => {
            expect(retrieve_cart.quantity).toEqual(3)
        })
    })

    // Add to Wishlist Testing
    it (" should add products to wishlist", async () => {
        const wishlist = {
            "userID" : "60ec7b10410d0517ccd312bb",
            "productID" : "60eda643ebfa5025b04c28ab",
            "price" : "10000",
            "addAt": "2021-05-07"
        }
        return addToWishlist.create(wishlist)
        .then ((wishlist_ret) => {
            expect(wishlist_ret.price).toEqual(10000)
        })
    })    

    // retrieve Wishlist Testing 
    it ("should retrieve a product in the wishlist", async () => {
        const status = await retrieveWishlist.findById({
            "_id":Object("61099731b707c02acc84fb00")
        })
        return retrieveWishlist.findOne(status)
        .then ((retrieve_wishlist) => {
            expect(retrieve_wishlist.price).toEqual(10000)
        })
    })

    // Delete Wishlist Testing
    it ("should delete a wishlist", async () => {
        const status = await deleteWishlist.deleteOne({
            "_id":Object("61099731b707c02acc84fb00")
        })
        expect(status.ok).toBe(1)
    })
    // Rest Password Testing
    it ("should reset password", async () => {
        const status = await resetPassword.updateOne({_id:Object("611a7c394c2f570c70c70375")},{
            $set : {
                password : "chyshy12"
            }
        })
        expect(status.ok).toBe(1)

    })
})