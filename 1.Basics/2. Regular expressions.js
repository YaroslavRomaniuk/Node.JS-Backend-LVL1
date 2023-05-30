/**
 * Object of validator for different types of input (email, phone, password)
 */
let Validator = {

    /**
     * validates given email and return true if it fulfills regex requirments
     * 
     * @param {*} email - given email
     * @returns true if email is fulfill regex requirments
     */
    validateEmail:function(email){
        let emailRegex = /^[a-z0-9][a-z0-9\+\-.]{1,20}@[a-z0-9\.\!\$\%\&\’\*\+\/\=\?\^\_\-]{1,15}\.\w{1,5}$/;
    
        return emailRegex.test(email);
    },

    /**
     * validates given phone and return true if it fulfills regex requirments
     * 
     * @param {*} phone - given phone
     * @returns true if phone is fulfill regex requirments
     */
    validatePhone:function(phone){
        let phoneRegex = /^(\+38)?[\s\-]* ?(\(?([\s\-]*\d){3}\)?)? ?([\s\-]*\d){7}?$/;
    
        return phoneRegex.test(phone);
    },

    /**
     * validates given password and return true if it fulfills regex requirments
     * 
     * @param {*} password - given password
     * @returns true if password is fulfill regex requirments
     */
    validatePassword:function(password){
        let passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9\_]{8,}$/;
    
        return passwordRegex.test(password);
    }

};

/**
 * output in console result of test
 * 
 * @param {*} result - boolean of result of test
 * @param {*} testName - name of test
 */
function testPassed (result,testName){
    if(result){
        console.log("TEST " + testName + " PASSED")
    } else {
        console.log("!!!TEST " + testName + " NOT PASSED!!!")
    }
}

// test functionality

let emailTestTrue1 = "fi@secondpart.end";
let emailTestTrue2 = "first-part@.se=cond%p.art.end";
let emailTestTrue3 = "first.part@se=cond%part.r";

let emailTestFail1 = "f@secondart.end,";
let emailTestFail2 = "first-part@.se=cond@part.end";
let emailTestFail3 = "-firstpart@.se=cond%.enddeded";
let emailTestFail4 = "firs_tpart@.se.en";
let emailTestFail5 = "firstpart@.se.enddeded";

console.log("***TEST EMAIL***");
testPassed(Validator.validateEmail(emailTestTrue1),"EMAIL TRUE 1");
testPassed(Validator.validateEmail(emailTestTrue2),"EMAIL TRUE 2");
testPassed(Validator.validateEmail(emailTestTrue3),"EMAIL TRUE 3");
console.log();
testPassed(!Validator.validateEmail(emailTestFail1),"EMAIL FAIL 1");
testPassed(!Validator.validateEmail(emailTestFail2),"EMAIL FAIL 2");
testPassed(!Validator.validateEmail(emailTestFail3),"EMAIL FAIL 3");
testPassed(!Validator.validateEmail(emailTestFail4),"EMAIL FAIL 4");
testPassed(!Validator.validateEmail(emailTestFail5),"EMAIL FAIL 5");

let phoneTestTrue1 = "+38 (099) 567 8901";
let phoneTestTrue2 = "+38 099 5 6 7 8 9  01";
let phoneTestTrue3 = "(09-9) 567-890-1";
let phoneTestTrue4 = "--  (099) 567 890-1";

let phoneTestFail1 = "+38 (099) 567 8901 0";
let phoneTestFail2 = "+38 099 a0000000";
let phoneTestFail3 = "+38 (0989) 567 8901";
let phoneTestFail4 = "+48 (0989) 567 8901";

console.log("***TEST PHONE***");
testPassed(Validator.validatePhone(phoneTestTrue1),"PHONE TRUE 1");
testPassed(Validator.validatePhone(phoneTestTrue2),"PHONE TRUE 2");
testPassed(Validator.validatePhone(phoneTestTrue3),"PHONE TRUE 3");
testPassed(Validator.validatePhone(phoneTestTrue4),"PHONE TRUE 4");
console.log();
testPassed(!Validator.validatePhone(phoneTestFail1),"PHONE FAIL 1");
testPassed(!Validator.validatePhone(phoneTestFail2),"PHONE FAIL 2");
testPassed(!Validator.validatePhone(phoneTestFail3),"PHONE FAIL 3");
testPassed(!Validator.validatePhone(phoneTestFail4),"PHONE FAIL 4");

let passwordTestTrue1 = "C00l_Pass";
let passwordTestTrue2 = "SupperPas1";

let passwordTestFail1 = "Cool_pass";
let passwordTestFail2 = "C00l";

console.log("***TEST PASSWORD***");
testPassed(Validator.validatePassword(passwordTestTrue1),"PASSWORD TRUE 1");
testPassed(Validator.validatePassword(passwordTestTrue2),"PASSWORD TRUE 2");
console.log();
testPassed(!Validator.validatePassword(passwordTestFail1),"PASSWORD FAIL 1");
testPassed(!Validator.validatePassword(passwordTestFail2),"PASSWORD FAIL 2");



