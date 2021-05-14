const fs = require('fs');
const path = require('path');

const Cart = require('./cart');

const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'products.json'
);

const getProducts = (cb) => {
    fs.readFile(p, (err, fileContent) => {
        if (err) {
            cb([]);
        } else {
            cb(JSON.parse(fileContent));
        }
    });
};

// const writeBookInFile = product => products => {
//     products.push(product);
//     fs.writeFile(p, JSON.stringify(products), err => {
//         console.log(err);
//     });
// }

module.exports = class Product {
    constructor(id, title, imageUrl, description, price) {
        this.id = id;
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }

    save() {
        getProducts(products => {
            if (this.id) {
                const existingProductIndex = products.findIndex(product => product.id === this.id);
                const updatedProducts = [...products];
                updatedProducts[existingProductIndex] = this;
                fs.writeFile(p, JSON.stringify(updatedProducts), err => {
                    console.log(err);
                });
            } else {
                this.id = Math.random().toString();
                products.push(this);
                fs.writeFile(p, JSON.stringify(products), err => {
                    console.log(err);
                });
            };
        });
    }

    static deleteById(productId) {
        getProducts(products => {
            const product = products.find(product => product.id === productId);
            const updatedProducts = products.filter(products => product.id !== productId);
            fs.writeFile(p, JSON.stringify(updatedProducts), err => {
                if (!err) {
                    Cart.deleteProduct(productId, product.price);
                }
            });
        });
    }


    static fetchAll(cb) {
        getProducts(cb);
    };

    static findById(id, cb) {
        getProducts(products => {
            const product = products.find(i => i.id === id);
            cb(product);
        });
    }
};