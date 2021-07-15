const mongoose = require('mongoose')
const registerProfile = require('../models/userProfile.models')
const loginProfile = require('../models/userProfile.models')
const checkProfile = require('../models/userProfile.models');
const insertProduct = require('../models/product.models');

 
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
            expect(display_products.productName).toEqual("Nike Shoe")
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

    
 
})