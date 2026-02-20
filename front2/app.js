const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let products = [
    { id: 1, name: 'Беспроводные наушники', price: 12990 },
    { id: 2, name: 'Смартфон Pro', price: 79990 },
    { id: 3, name: 'Умные часы', price: 24990 },
];

app.get('/products', (req, res) => {
    res.status(200).json({ success: true, count: products.length, data: products });
});

app.get('/products/:id', (req, res) => {
    const product = products.find(p => p.id == req.params.id);
    if (!product) {
        return res.status(404).json({ success: false, message: 'Товар не найден' });
    }
    res.status(200).json({ success: true, data: product });
});

app.post('/products', (req, res) => {
    const { name, price } = req.body;
    if (!name || !price) {
        return res.status(400).json({ success: false, message: 'Укажите название и стоимость' });
    }
    const newProduct = { id: Date.now(), name, price: Number(price) };
    products.push(newProduct);
    res.status(201).json({ success: true, data: newProduct });
});

app.patch('/products/:id', (req, res) => {
    const product = products.find(p => p.id == req.params.id);
    if (!product) {
        return res.status(404).json({ success: false, message: 'Товар не найден' });
    }
    const { name, price } = req.body;
    if (name !== undefined) product.name = name;
    if (price !== undefined) product.price = Number(price);
    res.status(200).json({ success: true, data: product });
});

app.delete('/products/:id', (req, res) => {
    const index = products.findIndex(p => p.id == req.params.id);
    if (index === -1) {
        return res.status(404).json({ success: false, message: 'Товар не найден' });
    }
    const deleted = products[index];
    products = products.filter(p => p.id != req.params.id);
    res.status(200).json({ success: true, data: deleted });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});