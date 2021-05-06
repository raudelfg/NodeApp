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
    constructor(t) {
        this.title = t;
    }

    save() {
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
};