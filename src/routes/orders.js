const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

const { isAuthenticated } = require('../helpers/auth');

// Ruta de orders
router.get('/orders/add', isAuthenticated, (req, res) => {
    res.render('orders/add-orders');
});

// Post para agregar ordenes
router.post('/orders/add-orders', isAuthenticated, async (req, res) => {
    try {
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
    } catch (e) {
        return res.status(500).json({
            error: e.message
        });
    }
});

// Traer todas las ordenes
router.get('/orders', isAuthenticated, async (req, res) => {
    try {
        const orders = await Order.find({}).lean().sort({date: "desc"});
        res.render('orders/all-orders', { orders }); 
    } catch (e) {
        return res.status(500).json({
            error: e.message
        });
    }
});

//editar ordenes
router.get("/orders/edit/:id", isAuthenticated, async(req, res) =>{
    try {
        const order = await Order.findById(req.params.id).lean();
        res.render("orders/edit-orders", { order });   
    } catch (e) {
        return res.status(500).json({
            error: e.message
        });
    }
});

// Edicion de las ordenes
router.put('/orders/edit-orders/:id', isAuthenticated, async (req, res) => {
    try {
        const { title, description} = req.body;
        await Order.findByIdAndUpdate(req.params.id, { title, description});
        res.redirect('/orders');   
    } catch (e) {
        return res.status(500).json({
            error: e.message
        });
    }
    
});

// Ruta de edicion del estado
router.get("/orders/change-status/:id", isAuthenticated, async(req, res) =>{
    try {
        const order = await Order.findById(req.params.id).lean();
        res.render("orders/change-status", { order });   
    } catch (e) {
        return res.status(500).json({
            error: e.message
        });
    }
});

// Cambiar el estatus de las ordenes
router.put('/orders/change-status/:id', isAuthenticated, async (req, res) => {
    const { status} = req.body;
    const tracking = {
        trackingUrls: '',
        trackingCodes: ''
    };
    if( status == 'SHIPPING'){
        tracking['trackingUrls'] = '/orders/view-order/'+ req.params.id;
        tracking['trackingCodes'] = '1,2';
    }
    const trackingUrls = tracking.trackingUrls;
    const trackingCodes = tracking.trackingCodes;
    try {
        await Order.findByIdAndUpdate(req.params.id, { status, trackingUrls, trackingCodes});
        res.redirect('/orders');
    }
    catch(e) {
        return res.status(500).json({
            error: e.message
        });
    }
});

// Ruta de detalle de las ordenes
router.get("/orders/view-order/:id", isAuthenticated, async(req, res) =>{
    try {
        const order = await Order.findById(req.params.id).lean();
        res.render("orders/view-order", { order });
    }
    catch(e) {
        return res.status(500).json({
            error: e.message
        });
    }
});


module.exports = router;