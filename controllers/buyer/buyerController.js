const buyerDao = require('../../models/Buyer');

const userController = {

    getBuyer: async(req,res)=>{
      
    },

    updateBuyer: async(req,res)=>{
    
    },

    createReview: async(req,res)=>{
    
    },

    getMyOrder: async(req,res)=>{
        if(req.session){
        const id = req.session.user.id;

        const orders = await buyerDao.getMyOrder(id);
        console.log(orders);
        res.render('myorder', { orders: orders });
        }
    },

    getMyOrderDetail: async(req,res)=>{
        res.render('myorderDetail');
    }
}

module.exports = userController;