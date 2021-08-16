const Order = require("../models/order.models");
const Cart = require("../models/cart.models");
const { validationResult } = require("express-validator");
const nodemon = require("nodemon");

//For making order
module.exports.order = async (req, res) => {
  try {
    console.log("Ordering the cart items");
    const { firstName, lastName, email, address, phone,additionalInfo } = req.body;
    const userID = req.user._id;

    const cartItems = await Cart.find({ userID }).populate("productID");

    // reformatting the cart items
    let orderTotalPrice = 0;
    const formattedCart = cartItems.map((item) => {
   
      const product = item.productID;
      const obj = {
        productName: product.productName,
        productImage: product.productImage,
        price: product.productPrice,
        quantity: item.quantity,
        totalPrice: item.quantity * product.productPrice,
      };
      orderTotalPrice += obj.totalPrice;
      return obj;
    });
    console.log(formattedCart);

    const orderData = new Order({
      firstName,
      lastName,
      email,
      address,
      phone,
      cartItems: formattedCart,
      orderTotalPrice,
      additionalInfo
    });
    console.log(orderData);

    const order = await orderData.save()
    
    const tst = await Cart.deleteMany({ userID });
    return res.status(200).json({
      success: true,

      message: "Order placed successfully.",
      order,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error.message });
  }
};


module.exports.bill =async (req,res)=>{
try{
  let myCart = await Cart.find({"userID":req.user._id})
  .populate({
    "path":"productID"
  })
  if(myCart.length > 0)
  {
    let billBox = {};
    let itemAndQty = {};
    myCart.map((val)=>{return itemAndQty[val.productID.productName] = [val.quantity,val.totalPrice]});
    let desc = "";
    for(var i in itemAndQty)
    {
      desc+=`${i}*${itemAndQty[i][0]},`
    }

    billBox['totalQuantity'] = Object.values(itemAndQty).map((val)=>{return val[0]}).reduce((acc,i)=>{return acc+i})
    billBox['products'] = desc.slice(0,desc.length-1);
    billBox['price'] = Object.values(itemAndQty).map((val)=>{return val[1]}).reduce((acc,i)=>{return acc+i})
    billBox['delivery'] = 50;

    let overall = Math.ceil((13/100)*billBox['price'])+billBox['price']+billBox['delivery'] 
    billBox['overall'] = overall;


    return res.status(200).json({"success":true,"message":"Bill Generated","data":billBox})
  }
}
catch(err)
{
  return res.status(404).json({"success":false,"message":err})
}
}