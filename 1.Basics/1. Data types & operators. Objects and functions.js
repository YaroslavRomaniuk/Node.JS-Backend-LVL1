
/**
 * Implements constructor of Product object with given parameters
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
 */
function Product(ID = "00000", name = "noName", description = "noDescription",
    price = "noPrice", brand = "noBrand", sizes = "noSizes", activeSize = "noActiveSize",
    quantity = "noQuantity", date = "noDate", reviews = "noReviews", images = "noImages") {

    this.ID = ID;
    this.name = name;
    this.description = description;
    this.price = price;
    this.brand = brand;
    this.sizes = sizes;
    this.activeSize = activeSize;
    this.quantity = quantity;
    this.date = date;
    this.reviews = reviews;
    this.images = images;

    // getter and setter for ID parameter
    this.getID = function () {
        return ID;
    }
    this.setID = function (newID) {
        ID = newID;
    }

    // getter and setter for name parameter
    this.getName = function () {
        return name;
    }
    this.setName = function (newName) {
        name = newName;
    }

    // getter and setter for description parameter
    this.getDescription = function () {
        return description;
    }
    this.setDescription = function (newDescription) {
        description = newDescription;
    }

    // getter and setter for price parameter
    this.getPrice = function () {
        return price;
    }
    this.setPrice = function (newPrice) {
        price = newPrice;
    }

    // getter and setter for brand parameter
    this.getBrand = function () {
        return brand;
    }
    this.setBrand = function (newBrand) {
        brand = newBrand;
    }

    // getter and setter for sizes parameter
    this.getSizes = function () {
        return sizes;
    }
    this.setSizes = function (newSizes) {
        sizes = newSizes;
    }

    // getter and setter for activeSize parameter
    this.getActiveSize = function () {
        return activeSize;
    }
    this.setActiveSize = function (newActiveSize) {
        activeSize = newActiveSize;
    }


    // getter and setter for quantity parameter
    this.getQuantity = function () {
        return quantity;
    }
    this.setQuantity = function (newQuantity) {
        quantity = newQuantity;
    }

    // getter and setter for date parameter
    this.getDate = function () {
        return date;
    }
    this.setDate = function (newDate) {
        date = newDate;
    }

    // getter and setter for reviews parameter
    this.getReviews = function () {
        return reviews;
    }
    this.setReviews = function (newReviews) {
        reviews = newReviews;
    }

    // getter and setter for images parameter
    this.getImages = function () {
        return images;
    }
    this.setImages = function (newImages) {
        images = newImages;
    }

    /**
     * returns review by given ID
     * 
     * @param {*} dataID - ID of review
     * @returns review with given ID
     */
    this.getReviewByID = function (dataID) {
        let currentReview;
        for (let i = 0; i < reviews.length; i++) {
            if (reviews[i].ID === dataID) {
                currentReview = reviews[i]
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
    this.getImage = function (dataImage) {
        let currentImage;
        if (dataImage != undefined) {
            for (let i = 0; i < images.length; i++) {
                if (images[i] === dataImage) {
                    currentImage = images[i]
                }
            }
            return currentImage;
        } else {
            return images[0];
        }
    }

    /**
     * adds or deletes size to array with sizes
     * 
     * @param {*} sizeToAdd - size which need to be added
     * @param {*} sizeToDelete - size which need to be deleted
     */
    this.addSize = function (sizeToAdd) {
        if (!sizes.includes(sizeToAdd)) {
            sizes.push(sizeToAdd);
        }
    }
    this.deleteSize = function (sizeToDelete) {
        let index = sizes.indexOf(sizeToDelete);
        if (index != -1) {
            sizes.splice(index, 1)
        }
    }

    /**
     * adds or deletes review to array with reviews
     * 
     * @param {*} reviewToAdd - review which need to be added
     * @param {*} reviewIDToDelete - review ID which need to be deleted
     */
    this.addReview = function (reviewToAdd) {
        reviews.push(reviewToAdd);
    }
    this.deleteReview = function (reviewIDToDelete) {
        for (let i = 0; i < reviews.length; i++) {
            if (reviews[i].ID === reviewIDToDelete) {
                reviews.splice(i, 1);
            }
        }
    }

    /**
     * returns average rating from all reviews for exact product
     * 
     * @returns average rating
     */
    this.getAverageRating = function () {

        let ratingSum = 0;
        let ratingsQuantity = 0;

        for (let i = 0; i < reviews.length; i++) {
            for (key in reviews[i].rating) {
                ratingSum += reviews[i].rating[key];
                ratingsQuantity++;
            }
        }

        return ratingSum / ratingsQuantity;
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

    searchResult = [];
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
    } else if (sortRule.toLowerCase() === "id"){
        return products.sort(compareID);
    }
}




//+++++++++++++++++++++++TEST FUNCTIONALITY+++++++++++++++++++++++


//test getter and setter

function testPassedOrNot (dataCheck, getData,testName){
    if(getData === dataCheck){
        console.log("TEST " + testName + " PASSED");
    } else {
        console.log("TEST " + testName + " NOT PASSED!!!");
    }
}

let testGetterAndSetter = new Product();

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

// tests of Search and Sort
let testProduct1 = new Product("0001", "pen cool", undefined, 3.2);
let testProduct2 = new Product("0023", "pencil", undefined, 4.1);
let testProduct3 = new Product("0004", "ball", undefined, 7);
let testProduct4 = new Product("0005", "penBen", undefined, 1);
let testProduct5 = new Product("0100", "ABigBob", undefined, 0.9);

let testSearchAndSort = [testProduct1, testProduct2,testProduct3,testProduct4,testProduct5]

function arrayCompare(dataCheck,arrayResult,testName){
    let equal = true;
    for (let i = 0; i < dataCheck.length; i++){
        if (dataCheck[i] !== arrayResult[i]){
            console.log(equal);
            equal = false
        }
    }
    if(equal){
        console.log("TEST " + testName + " PASSED");
    } else {
        console.log("TEST " + testName + " NOT PASSED!!!");
    }
}

// test of Search
dataCheck = [testProduct1,testProduct2,testProduct4];
searchResult = new Search(testSearchAndSort,"pen");
arrayCompare(dataCheck,searchResult,"*SEARCH*");

// test of Sort
let testSortExpected = [testProduct1,testProduct3, testProduct4, testProduct2,testProduct5];
let sortResult = new Sort(testSearchAndSort,"id");
arrayCompare(testSortExpected,sortResult, "*SORT ID*");

testSortExpected = [testProduct5,testProduct3, testProduct1, testProduct4,testProduct2];
sortResult = new Sort(testSearchAndSort,"name");
arrayCompare(testSortExpected,sortResult, "*SORT NAME*");

testSortExpected = [testProduct5,testProduct4, testProduct1, testProduct2,testProduct3];
sortResult = new Sort(testSearchAndSort,"price");
arrayCompare(testSortExpected,sortResult, "*SORT NAME*");
