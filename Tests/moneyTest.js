import { formatCurrency } from "../scripts/utils/money.js";

/*
TESTING 

Easiest way to test:Open the website and try out the code.

note:
"Manual testing"-> looking the website, that the code is working properly this is called manual testing.


Disadvantages of Manual testing:
1->hard to test every situation.
2->hard to re-test.


NOTE: To this manual testing problem by using "Automated testing".

"AUTOMATED TESTING"-> using code to test the code.

*/

/*
NOTE: WE CANNOT RUN JAVASCRIPT FILE DIRECTLY, SO WE HAVE TO LOAD THE JAVASCRIPT FILE INTO THE HTML FILE. 
*/


/*

How many test case should we have?
 2 TYPES OF TEST CASE:
    1-> Basic test case = test if the code is working.
    2-> Edge test case = test with values that are tricky.

*/

/*
TESTTING FRAMEWORK: Externel library that helps us write tests easier.

note: testing framework helps us do below code automatically and gives us many other features.

POPULAR TESTING FRAMEWORK CALLED "Jasmine".

note:" jasmine code is easy to read like a english language"

*/


// group of related tests = "test suite".
console.log("test suite: formatcurrency");

console.log("converts cents into dollars");// naming the test case for understanding what the code will do?
if(formatCurrency(2095) === '20.95'){
  console.log("Test passed");
} else {
  console.log("Test failed");
}

console.log("works with 0");
if(formatCurrency(0)==='0.00'){// situation is called a test case.
  console.log('test passed');
} else{
  console.log('test failed');
}


console.log("rounds up to the nearest cent");
if(formatCurrency(2000.5)==='20.01'){
  console.log('test passed');
}else{
  console.log('test failed');
}