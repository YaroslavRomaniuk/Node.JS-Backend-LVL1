/**
 * Implements constructor of Product object with given parameters
 * 
 * @param {*} ID - id of product
 * @param {*} name - name of product
 * @param {*} description - description of product
 * @param {*} price - price of product
 * @param {*} brand - brand of product
 * @param {*} quantity - quantity of product
 * @param {*} date - date of product
 * @param {*} reviews - array with reviews of product
 * @param {*} images - array with images of product
 */
function AbstractProduct(ID = "00000", name = "noName", description = "noDescription",
    price = "noPrice", brand = "noBrand",
    quantity = "noQuantity", date = "noDate", reviews = "noReviews", images = "noImages") {

    this.ID = ID;
    this.name = name;
    this.description = description;
    this.price = price;
    this.brand = brand;
    this.quantity = quantity;
    this.date = date;
    this.reviews = reviews;
    this.images = images;

    // getter and setter for ID parameter
    AbstractProduct.prototype.getID = function () {
        return this.ID;
    }
    AbstractProduct.prototype.setID = function (newID) {
        this.ID = newID;
    }

    // getter and setter for name parameter
    AbstractProduct.prototype.getName = function () {
        return this.name;
    }
    AbstractProduct.prototype.setName = function (newName) {
        this.name = newName;
    }

    // getter and setter for description parameter
    AbstractProduct.prototype.getDescription = function () {
        return this.description;
    }
    AbstractProduct.prototype.setDescription = function (newDescription) {
        this.description = newDescription;
    }

    // getter and setter for price parameter
    AbstractProduct.prototype.getPrice = function () {
        return this.price;
    }
    AbstractProduct.prototype.setPrice = function (newPrice) {
        this.price = newPrice;
    }

    // getter and setter for brand parameter
    AbstractProduct.prototype.getBrand = function () {
        return this.brand;
    }
    AbstractProduct.prototype.setBrand = function (newBrand) {
        this.brand = newBrand;
    }

    // getter and setter for quantity parameter
    AbstractProduct.prototype.getQuantity = function () {
        return this.quantity;
    }
    AbstractProduct.prototype.setQuantity = function (newQuantity) {
        this.quantity = newQuantity;
    }

    // getter and setter for date parameter
    AbstractProduct.prototype.getDate = function () {
        return this.date;
    }
    AbstractProduct.prototype.setDate = function (newDate) {
        this.date = newDate;
    }

    // getter and setter for reviews parameter
    AbstractProduct.prototype.getReviews = function () {
        return this.reviews;
    }
    AbstractProduct.prototype.setReviews = function (newReviews) {
        this.reviews = newReviews;
    }

    // getter and setter for images parameter
    AbstractProduct.prototype.getImages = function () {
        return this.images;
    }
    AbstractProduct.prototype.setImages = function (newImages) {
        this.images = newImages;
    }

    /**
     * returns review by given ID
     * 
     * @param {*} dataID - ID of review
     * @returns review with given ID
     */
    AbstractProduct.prototype.getReviewByID = function (dataID) {
        let currentReview;
        for (let i = 0; i < this.reviews.length; i++) {
            if (this.reviews[i].ID === dataID) {
                currentReview = this.reviews[i]
            }
        }
        return currentReview;
    }

    /**
     * returns image by given parameter
     * 
     * @param {*} dataImage - parameter of image
     * @returns image by given parameter
     */
    AbstractProduct.prototype.getImage = function (dataImage) {
        let currentImage;
        if (dataImage != undefined) {
            for (let i = 0; i < this.images.length; i++) {
                if (this.images[i] === dataImage) {
                    currentImage = this.images[i]
                }
            }
            return currentImage;
        } else {
            return this.images[0];
        }
    }


    /**
     * adds or deletes review to array with reviews
     * 
     * @param {*} reviewToAdd - review which need to be added
     * @param {*} reviewIDToDelete - review ID which need to be deleted
     */
    AbstractProduct.prototype.addReview = function (reviewToAdd) {
        this.reviews.push(reviewToAdd);
    }
    AbstractProduct.prototype.deleteReview = function (reviewIDToDelete) {
        for (let i = 0; i < this.reviews.length; i++) {
            if (this.reviews[i].ID === reviewIDToDelete) {
                this.reviews.splice(i, 1);
            }
        }
    }

    /**
     * returns average rating from all reviews for exact product
     * 
     * @returns average rating
     */
    AbstractProduct.prototype.getAverageRating = function () {

        let ratingSum = 0;
        let ratingsQuantity = 0;

        for (let i = 0; i < this.reviews.length; i++) {
            for (key in this.reviews[i].rating) {
                ratingSum += this.reviews[i].rating[key];
                ratingsQuantity++;
            }
        }

        return ratingSum / ratingsQuantity;
    }

    /**
     * returns String with full information of product in phormat
     * * first parameter: value
     * * second parameter: value
     * ...
     * * last parameter: value
     * 
     * @returns String with full information of product
     */
    AbstractProduct.prototype.getFullInformation = function () {
        let fullInfo = "";

        for (const prop in this) {
            if (Object.hasOwn(this, prop)) {
                fullInfo += `* ${prop} = ${this[prop]}\n`;
            }
        }
        return fullInfo;
    }

    /**
     * return total price for given quantity of product
     * 
     * @param {*} quantityToPrice - quantity of product to calculate total price
     * @returns total price
     */
    AbstractProduct.prototype.getPriceForQuantity = function (quantityToPrice) {
        let USDollar = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        });

        let totalPrice = price * quantityToPrice;
        return USDollar.format(totalPrice);
    }

    /**
     * universal getter-setter method which can works with every given parameter
     * 
     * @param {*} param - given parameter to get or set
     * @param {*} data - new data to set for given parameter
     * @returns given parameter
     */
    AbstractProduct.prototype.universalGetSet = function (param, data) {
        if (data === undefined) {
            return this[param];
        } else {
            this[param] = data;
        }
    }
}

/**
 * Implements constructor of Reviews object with given parameters
 * 
 * @param {*} ID - id of review
 * @param {*} author - author of review
 * @param {*} date  - date of review
 * @param {*} comment - comment of review
 * @param {*} rating - array with raiting for different parameters
 */
function Reviews(ID = "noID", author = "noAuthor", date = "noDate", comment = "noComment",
    rating = { service: "noInfo", price: "noInfo", value: "noInfo", quality: "noInfo" }) {
    this.ID = ID;
    this.author = author;
    this.date = date;
    this.comment = comment;
    this.rating = rating;
}

/**
 * Implements constructor of Search object with functionality of searching product in array by given parameters
 * 
 * @param {*} products - array with products
 * @param {*} search - parameter of searching process
 * @returns array with products which have given parameter
 */
function Search(products, search) {

    let searchResult = [];

    for (let i = 0; i < products.length; i++) {
        if (products[i].getName().toLowerCase().includes(search) || products[i].getDescription().toLowerCase().includes(search)) {
            searchResult.push(products[i])
        }
    }

    return searchResult;
}

/**
 * Implements constructor of Search object with functionality of sorting array with products by given parameter
 * 
 * @param {*} products - array with products
 * @param {*} sortRule - parameter of sorting process
 * @returns array with products sorted by given parameter
 */
function Sort(products, sortRule) {


    function comparePrice(a, b) {
        if (a.getPrice() > b.getPrice()) {
            return 1;
        } else if (a.getPrice() < b.getPrice()) {
            return -1;
        } else {
            return 0;
        }
    }

    function compareName(a, b) {
        if (a.getName().toLowerCase() > b.getName().toLowerCase()) {
            return 1;
        } else if (a.getName().toLowerCase() < b.getName().toLowerCase()) {
            return -1;
        } else {
            return 0;
        }
    }

    function compareID(a, b) {
        if (a.getID() > b.getID()) {
            return 1;
        } else if (a.getID() < b.getID()) {
            return -1;
        } else {
            return 0;
        }
    }

    if (sortRule === "price") {
        return products.sort(comparePrice);
    } else if (sortRule === "name") {
        return products.sort(compareName);
    } else if (sortRule.toLowerCase() === "id") {
        return products.sort(compareID);
    }
}


/**
 * Implements constructor of Clothes object with given parameters, which extends AbstractProduct
 * 
 * @param {*} ID - id of product
 * @param {*} name - name of product
 * @param {*} description - description of product
 * @param {*} price - price of product
 * @param {*} brand - brand of product
 * @param {*} sizes - array with sizes of product
 * @param {*} activeSize - active size of product
 * @param {*} quantity - quantity of product
 * @param {*} date - date of product
 * @param {*} reviews - array with reviews of product
 * @param {*} images - array with images of product
 * @param {*} material - material of product
 * @param {*} color - color of product
 */
function Clothes(ID, name, description,
    price, brand, quantity, date, reviews, images, 
    sizes, activeSize, material = "noMaterial", color = "noColor") {
    AbstractProduct.call(this, ID, name, description,
        price, brand,
        quantity, date, reviews, images);
    this.sizes = sizes;
    this.activeSize = activeSize;    
    this.material = material;
    this.color = color;
}

Clothes.prototype = Object.create(AbstractProduct.prototype);
Object.assign(Clothes.prototype, {

    // getter and setter for sizes parameter
    getSizes() {
        return this.sizes;
    },

    setSizes(newSizes) {
        this.sizes = newSizes;
    },

    // getter and setter for activeSize parameter
    getActiveSize() {
        return this.activeSize;
    },
    setActiveSize(newActiveSize) {
        this.activeSize = newActiveSize;
    },

    // getter and setter for material parameter
    getMaterial() {
        return this.material;
    },

    setMaterial(newMaterial) {
        this.material = newMaterial;
    },

    // getter and setter for color parameter
    getColor() {
        return this.color;
    },

    setColor(newColor) {
        this.color = newColor;
    },

    /**
     * adds or deletes size to array with sizes
     * 
     * @param {*} sizeToAdd - size which need to be added
     * @param {*} sizeToDelete - size which need to be deleted
     */
    addSize (sizeToAdd) {
        if (!this.sizes.includes(sizeToAdd)) {
            this.sizes.push(sizeToAdd);
        }
    },

    deleteSize (sizeToDelete) {
        let index = this.sizes.indexOf(sizeToDelete);
        if (index != -1) {
            this.sizes.splice(index, 1)
        }
    }

});

/**
 * Implements constructor of Electronics object with given parameters, which extends AbstractProduct
 * 
 * @param {*} ID - id of product
 * @param {*} name - name of product
 * @param {*} description - description of product
 * @param {*} price - price of product
 * @param {*} brand - brand of product
 * @param {*} quantity - quantity of product
 * @param {*} date - date of product
 * @param {*} reviews - array with reviews of product
 * @param {*} images - array with images of product
 * @param {*} warranty - warranty of product
 * @param {*} power - power of product
 */
function Electronics(ID, name, description,
    price, brand,
    quantity, date, reviews, images,
    warranty = "noMaterial", power = "noColor") {
    AbstractProduct.call(this, ID, name, description,
        price, brand,
        quantity, date, reviews, images);
    this.warranty = warranty;
    this.power = power;
}

Electronics.prototype = Object.create(AbstractProduct.prototype);
Object.assign(Electronics.prototype, {

    // getter and setter for waranty parameter
    getWarranty() {
        return this.warranty;
    },

    setWarranty(newWarranty) {
        this.warranty = newWarranty;
    },

    // getter and setter for power parameter
    getPower() {
        return this.power;
    },
    setPower(newPower) {
        this.power = newPower;
    }

});

//+++++++++++++++++++++++TEST FUNCTIONALITY+++++++++++++++++++++++

/**
 * output in console result of test
 * 
 * @param {*} dataCheck - data with correct result
 * @param {*} getData - data after manipulation which should be compare with expected result
 * @param {*} testName - name of test
 */
function testPassedOrNot (dataCheck, getData,testName){
    if(getData === dataCheck){
        console.log("TEST " + testName + " PASSED");
    } else {
        console.log("TEST " + testName + " NOT PASSED!!!");
    }
}

//*************************CLOTHES TESTS**************************

console.log("!!!CLOTHES TESTS!!!\n");

//test getter and setter
let testGetterAndSetter = new Clothes();

let dataCheck = "1234";
testGetterAndSetter.setID(dataCheck); 
let getData = testGetterAndSetter.getID();
testPassedOrNot(dataCheck,getData,"*GET-SET ID*");

dataCheck = "Big Pen";
testGetterAndSetter.setName(dataCheck); 
getData = testGetterAndSetter.getName();
testPassedOrNot(dataCheck,getData,"*GET-SET NAME*");

dataCheck = "Super-duper pen";
testGetterAndSetter.setDescription(dataCheck); 
getData = testGetterAndSetter.getDescription();
testPassedOrNot(dataCheck,getData,"*GET-SET DESCRIPTION*");

dataCheck = 2.35;
testGetterAndSetter.setPrice(dataCheck); 
getData = testGetterAndSetter.getPrice();
testPassedOrNot(dataCheck,getData,"*GET-SET PRICE*");

dataCheck = "PiterPen";
testGetterAndSetter.setBrand(dataCheck); 
getData = testGetterAndSetter.getBrand();
testPassedOrNot(dataCheck,getData,"*GET-SET BRAND*");

dataCheck = ["M","S","XL"];
testGetterAndSetter.setSizes(dataCheck); 
getData = testGetterAndSetter.getSizes();
testPassedOrNot(dataCheck,getData,"*GET-SET SIZES*");

dataCheck = "XL";
testGetterAndSetter.setActiveSize(dataCheck); 
getData = testGetterAndSetter.getActiveSize();
testPassedOrNot(dataCheck,getData,"*GET-SET ACTIVE SIZE*");

dataCheck = 25;
testGetterAndSetter.setQuantity(dataCheck); 
getData = testGetterAndSetter.getQuantity();
testPassedOrNot(dataCheck,getData,"*GET-SET QUANTITY*");

dataCheck = new Date(2023, 04, 13, 4, 0, 0);
testGetterAndSetter.setDate(dataCheck); 
getData = testGetterAndSetter.getDate();
testPassedOrNot(dataCheck,getData,"*GET-SET DATE*");

dataCheck = [new Reviews ("111",undefined,undefined,undefined,{ service: 5, price: 4, value: 3, quality: 2 }),
new Reviews ("222",undefined,undefined,undefined,{ service: 5, price: 4, value: 3, quality: 2 }),
new Reviews ("333",undefined,undefined,undefined,{ service: 5, price: 4, value: 3, quality: 2 })];
testGetterAndSetter.setReviews(dataCheck); 
getData = testGetterAndSetter.getReviews();
testPassedOrNot(dataCheck,getData,"*GET-SET REVIEWS*");

dataCheck = ["image1","image2","image3"];
testGetterAndSetter.setImages(dataCheck); 
getData = testGetterAndSetter.getImages();
testPassedOrNot(dataCheck,getData,"*GET-SET IMAGES*");

dataCheck = "cotton";
testGetterAndSetter.setMaterial(dataCheck); 
getData = testGetterAndSetter.getMaterial();
testPassedOrNot(dataCheck,getData,"*GET-SET MATERIAL*");

dataCheck = "red";
testGetterAndSetter.setColor(dataCheck); 
getData = testGetterAndSetter.getColor();
testPassedOrNot(dataCheck,getData,"*GET-SET COLOR*");


// test of getReviewByID
dataCheck = testGetterAndSetter.getReviews()[1];
getData = testGetterAndSetter.getReviewByID("222");
testPassedOrNot(dataCheck,getData,"*GET REVIEW BY ID*");

// test of getImage
dataCheck = testGetterAndSetter.getImages()[1];
getData = testGetterAndSetter.getImage("image2");
testPassedOrNot(dataCheck,getData,"*GET IMAGE*");

// test of addSize and deleteSize
dataCheck = ["M","S","XL","L"].toString();
testGetterAndSetter.addSize("L");
getData = testGetterAndSetter.getSizes().toString();
testPassedOrNot(dataCheck,getData,"*ADD SIZE*");

dataCheck = ["M","S","XL"].toString();
testGetterAndSetter.deleteSize("L");
getData = testGetterAndSetter.getSizes().toString();
testPassedOrNot(dataCheck,getData,"*DELETE SIZE*");

// test of addReview and deleteReview
dataCheck = new Reviews("444");
testGetterAndSetter.addReview(dataCheck);
getData = testGetterAndSetter.getReviews()[3];
testPassedOrNot(dataCheck,getData,"*ADD AND DELETE REVIEW*");

dataCheck = undefined;
testGetterAndSetter.deleteReview("444");
getData = testGetterAndSetter.getReviews()[3];
testPassedOrNot(dataCheck,getData,"*DELETE REVIEW*");

// test of getAverageRating
dataCheck = 3.5;
getData = testGetterAndSetter.getAverageRating();
testPassedOrNot(dataCheck,getData,"*GET AVERAGE RATING*");

//*************************ELECTRONICS TESTS**************************

console.log("\n!!!ELECTRONICS TESTS!!!\n")

//test getter and setter
testGetterAndSetter = new Electronics();

dataCheck = "1234";
testGetterAndSetter.setID(dataCheck); 
getData = testGetterAndSetter.getID();
testPassedOrNot(dataCheck,getData,"*GET-SET ID*");

dataCheck = "Big Pen";
testGetterAndSetter.setName(dataCheck); 
getData = testGetterAndSetter.getName();
testPassedOrNot(dataCheck,getData,"*GET-SET NAME*");

dataCheck = "Super-duper pen";
testGetterAndSetter.setDescription(dataCheck); 
getData = testGetterAndSetter.getDescription();
testPassedOrNot(dataCheck,getData,"*GET-SET DESCRIPTION*");

dataCheck = 2.35;
testGetterAndSetter.setPrice(dataCheck); 
getData = testGetterAndSetter.getPrice();
testPassedOrNot(dataCheck,getData,"*GET-SET PRICE*");

dataCheck = "PiterPen";
testGetterAndSetter.setBrand(dataCheck); 
getData = testGetterAndSetter.getBrand();
testPassedOrNot(dataCheck,getData,"*GET-SET BRAND*");

dataCheck = 25;
testGetterAndSetter.setQuantity(dataCheck); 
getData = testGetterAndSetter.getQuantity();
testPassedOrNot(dataCheck,getData,"*GET-SET QUANTITY*");

dataCheck = new Date(2023, 04, 13, 4, 0, 0);
testGetterAndSetter.setDate(dataCheck); 
getData = testGetterAndSetter.getDate();
testPassedOrNot(dataCheck,getData,"*GET-SET DATE*");

dataCheck = [new Reviews ("111",undefined,undefined,undefined,{ service: 5, price: 4, value: 3, quality: 2 }),
new Reviews ("222",undefined,undefined,undefined,{ service: 5, price: 4, value: 3, quality: 2 }),
new Reviews ("333",undefined,undefined,undefined,{ service: 5, price: 4, value: 3, quality: 2 })];
testGetterAndSetter.setReviews(dataCheck); 
getData = testGetterAndSetter.getReviews();
testPassedOrNot(dataCheck,getData,"*GET-SET REVIEWS*");

dataCheck = ["image1","image2","image3"];
testGetterAndSetter.setImages(dataCheck); 
getData = testGetterAndSetter.getImages();
testPassedOrNot(dataCheck,getData,"*GET-SET IMAGES*");

dataCheck = "1 year";
testGetterAndSetter.setWarranty(dataCheck); 
getData = testGetterAndSetter.getWarranty();
testPassedOrNot(dataCheck,getData,"*GET-SET WARRANTY*");

dataCheck = "220V";
testGetterAndSetter.setPower(dataCheck); 
getData = testGetterAndSetter.getPower();
testPassedOrNot(dataCheck,getData,"*GET-SET POWER*");


// test of getReviewByID
dataCheck = testGetterAndSetter.getReviews()[1];
getData = testGetterAndSetter.getReviewByID("222");
testPassedOrNot(dataCheck,getData,"*GET REVIEW BY ID*");

// test of getImage
dataCheck = testGetterAndSetter.getImages()[1];
getData = testGetterAndSetter.getImage("image2");
testPassedOrNot(dataCheck,getData,"*GET IMAGE*");

// test of addReview and deleteReview
dataCheck = new Reviews("444");
testGetterAndSetter.addReview(dataCheck);
getData = testGetterAndSetter.getReviews()[3];
testPassedOrNot(dataCheck,getData,"*ADD AND DELETE REVIEW*");

dataCheck = undefined;
testGetterAndSetter.deleteReview("444");
getData = testGetterAndSetter.getReviews()[3];
testPassedOrNot(dataCheck,getData,"*DELETE REVIEW*");

// test of getAverageRating
dataCheck = 3.5;
getData = testGetterAndSetter.getAverageRating();
testPassedOrNot(dataCheck,getData,"*GET AVERAGE RATING*");

console.log("\n!!!SORT AND SEARCH TESTS!!!\n")
// tests of Search and Sort
let testProduct1 = new Clothes("0001", "pen cool", undefined, 3.2);
let testProduct2 = new Clothes("0023", "pencil", undefined, 4.1);
let testProduct3 = new Electronics("0004", "ball", undefined, 7);
let testProduct4 = new Clothes("0005", "penBen", undefined, 1);
let testProduct5 = new Electronics("0100", "ABigBob", undefined, 0.9);

let testSearchAndSort = [testProduct1, testProduct2, testProduct3, testProduct4, testProduct5]


function arrayCompare(dataCheck, arrayResult, testName) {
    let equal = true;
    for (let i = 0; i < dataCheck.length; i++) {
        if (dataCheck[i] !== arrayResult[i]) {

            equal = false
        }
    }
    if (equal) {
        console.log("TEST " + testName + " PASSED");
    } else {
        console.log("TEST " + testName + " NOT PASSED!!!");
    }
}


// test of Search
dataCheck = [testProduct1, testProduct2, testProduct4];
searchResult = new Search(testSearchAndSort, "pen");
arrayCompare(dataCheck, searchResult, "*SEARCH*");

// test of Sort
let testSortExpected = [testProduct1, testProduct3, testProduct4, testProduct2, testProduct5];
let sortResult = new Sort(testSearchAndSort, "id");
arrayCompare(testSortExpected, sortResult, "*SORT ID*");

testSortExpected = [testProduct5, testProduct3, testProduct1, testProduct4, testProduct2];
sortResult = new Sort(testSearchAndSort, "name");
arrayCompare(testSortExpected, sortResult, "*SORT NAME*");

testSortExpected = [testProduct5, testProduct4, testProduct1, testProduct2, testProduct3];
sortResult = new Sort(testSearchAndSort, "price");
arrayCompare(testSortExpected, sortResult, "*SORT NAME*");

//*************************ADDITIONAL METHODS**************************

console.log("\n!!!ADDITIONAL METHODS TESTS!!!\n")

testProduct1 = new Clothes("0001", "supet t-short", "best quality t-short", 3.2,"zara",3,new Date(2023, 04, 13, 4, 0, 0),[new Reviews(), new Reviews()],["image1","image2"],["M","S","L"],"L","cotton","red");
//"0001", "supet t-short", "best quality t-short", 3.2,"zara",["M","S","L"],"L",3,new Date(2023, 04, 13, 4, 0, 0),[new Reviews("0000"), new Reviews("1111")],["image1","image2"],"cotton","red"

dataCheck = 
`* ID = 0001
* name = supet t-short
* description = best quality t-short
* price = 3.2
* brand = zara
* quantity = 3
* date = Sat May 13 2023 04:00:00 GMT+0400 (Georgia Standard Time)
* reviews = [object Object],[object Object]
* images = image1,image2
* sizes = M,S,L
* activeSize = L
* material = cotton
* color = red\n`;
getData = testProduct1.getFullInformation();
testPassedOrNot(dataCheck,getData,"*GET FULL INFORMATION*");

dataCheck = "$9.60";
getData = testProduct1.getPriceForQuantity(3);
testPassedOrNot(dataCheck,getData,"*GET PRICE FOR QUANTITY*");

dataCheck = "1234";
testProduct1.universalGetSet("ID","1234");
getData = testProduct1.universalGetSet("ID");
testPassedOrNot(dataCheck,getData,"*UNIVERSAL GET-SET*");