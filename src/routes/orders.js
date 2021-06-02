const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

const { isAuthenticated } = require('../helpers/auth');

router.get('/orders/add', isAuthenticated, (req, res) => {
    res.render('orders/add-orders');
});

router.post('/orders/add-orders', isAuthenticated, async (req, res) => {
    const { title, description} = req.body;
    const errors = [];
    if (!title) {
        errors.push({text:'Title can not blank' });
    }
    if (!description) {
        errors.push({text:'Description can not blank' });
    }
    if (errors.length > 0) {
        res.render('orders/add-orders', {
            errors,
            title,
            description
        });
    }else{
        const newOrder = new Order({title, description});
        await newOrder.save();
        req.flash('success_msg', 'New order was added');
        res.redirect("/orders");
    }
});

//Get all orders
router.get('/orders', isAuthenticated, async (req, res) => {
    const orders = await Order.find({}).lean().sort({date: "desc"});
    res.render('orders/all-orders', { orders });
});

//edit orders

router.get("/orders/edit/:id", isAuthenticated, async(req, res) =>{
    const order = await Order.findById(req.params.id).lean();
    res.render("orders/edit-orders", { order });
});

router.put('/orders/edit-orders/:id', isAuthenticated, async (req, res) => {
    const { title, description} = req.body;
    await Order.findByIdAndUpdate(req.params.id, { title, description});
    res.redirect('/orders');
    console.log(req.params.id);
});

//change status
router.put('/orders/change-status/:id', isAuthenticated, async (req, res) => {
    const { status} = req.body;
    await Order.findByIdAndUpdate(req.params.id, { status});
    res.redirect('/orders');
    console.log(status);
});

// Delete Notes

router.put('/orders/edit-orders/:id', isAuthenticated, async (req, res) => {
    const { status} = req.body;
    await Order.findByIdAndUpdate(req.params.id, { status});
    res.redirect('/orders');
    console.log(req.params.id);
});


module.exports = router;