const express = require('express');
const router = express.Router();

const products = [{
    id: '1',
    name: 'Laptop',
    price: '1000€'
},
{
    id: '2',
    name : 'Vacuum Cleaner',
    price: '200€'
},
{
    id: '3',
    name: 'Laptop',
    price: '1200€'
},
{
    id: '4',
    name : 'Vacuum Cleaner',
    price: '300€'
},
{
    id: '5',
    name: 'Laptop',
    price: '1500€'
},
{
    id: '6',
    name : 'Vacuum Cleaner',
    price: '400€'
},
{
    id: '7',
    name: 'Laptop',
    price: '2000€'
},
{
    id: '8',
    name : 'Vacuum Cleaner',
    price: '60€'
}]

router.get('/products', (req, res)=>{
    res.send(products);
});

module.exports = router;