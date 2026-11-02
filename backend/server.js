const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'frontend')));

// Temporary sample menu. Replace with MongoDB/database data when you are ready.
const products = [
  {_id:'p1',name:'Paneer Masala',price:180,category:'Veg',isVeg:true,description:'Paneer cooked in a rich Indian masala gravy.'},
  {_id:'p2',name:'Dal Tadka',price:120,category:'Veg',isVeg:true,description:'Yellow lentils tempered with spices.'},
  {_id:'p3',name:'Veg Thali',price:160,category:'Thali',isVeg:true,description:'A satisfying traditional vegetarian meal.'},
  {_id:'p4',name:'Chicken Curry',price:220,category:'Chicken',isVeg:false,description:'Dhaba-style chicken curry.'},
  {_id:'p5',name:'Chicken Biryani',price:200,category:'Biryani',isVeg:false,description:'Aromatic rice cooked with chicken and spices.'},
  {_id:'p6',name:'Mutton Curry',price:320,category:'Mutton',isVeg:false,description:'Slow-cooked mutton curry.'},
  {_id:'p7',name:'Fish Curry',price:220,category:'Fish',isVeg:false,description:'Traditional fish curry.'},
  {_id:'p8',name:'Egg Curry',price:130,category:'Egg',isVeg:false,description:'Boiled eggs in a spiced gravy.'},
  {_id:'p9',name:'Roti (2 pcs)',price:20,category:'Rice & Breads',isVeg:true,description:'Freshly prepared tandoori-style roti.'},
  {_id:'p10',name:'Jeera Rice',price:100,category:'Rice & Breads',isVeg:true,description:'Fluffy rice tempered with cumin.'},
  {_id:'p11',name:'Aloo Paratha',price:60,category:'Breakfast',isVeg:true,description:'Stuffed paratha served hot.'},
  {_id:'p12',name:'Tea',price:15,category:'Beverages',isVeg:true,description:'Freshly brewed Indian chai.'}
];
const orders = [];
app.get('/api/health', (_req,res) => res.json({status:'ok',message:'CM Sahab demo backend is running'}));
app.get('/api/products', (_req,res) => res.json(products));
app.post('/api/orders', (req,res) => {
  const {customer,items,paymentMethod,notes} = req.body || {};
  if (!customer?.name || !/^\d{10}$/.test(String(customer.phone || '')) || !customer.address || !Array.isArray(items) || !items.length) {
    return res.status(400).json({message:'Please provide valid customer details and at least one item.'});
  }
  let total = 0;
  const orderItems = [];
  for (const item of items) {
    const product = products.find(p => p._id === item.productId);
    const quantity = Number(item.quantity);
    if (!product || !Number.isInteger(quantity) || quantity < 1 || quantity > 50) return res.status(400).json({message:'Invalid item or quantity.'});
    total += product.price * quantity;
    orderItems.push({productId:product._id,name:product.name,price:product.price,quantity});
  }
  const order = {orderNumber:'DEMO-' + String(Date.now()).slice(-8),customer,items:orderItems,paymentMethod:paymentMethod || 'COD',notes:notes || '',total,createdAt:new Date().toISOString()};
  orders.push(order);
  res.status(201).json({message:'Demo order received',order});
});
app.get('*', (_req,res) => res.sendFile(path.join(__dirname,'..','frontend','index.html')));
app.listen(PORT,'0.0.0.0',() => console.log(`CM Sahab website running on http://localhost:${PORT}`));
