const fs = require('fs');
const path = require('path');

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
    constructor(title, imageUrl, description, price) {
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }

    save() {
        this.id = Math.random().toString();
        getProducts(products => {
            products.push(this);
            fs.writeFile(p, JSON.stringify(products), err => {
                console.log(err);
            });
        });
        // getProducts(writeBookInFile(this));
    }

    static fetchAll(cb) {
        getProducts(cb);
    }

    static findById(id, cb) {
        getProducts(products => {
            const product = products.find(i => i.id === id);
            cb(product);
        });
    }
};