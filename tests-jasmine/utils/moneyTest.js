import { formatCurrency } from "../../scripts/utils/money.js";
/*
TESTING FRAMEWORK: Externel library that helps us write tests easier.

note: testing framework helps us do below code automatically and gives us many other features.

POPULAR TESTING FRAMEWORK CALLED "Jasmine".

*/



/* we writing our code in jasmine

describe function is used for, to create a test suite and it is provided by jasmine.

expect is also a function and it used for test case or create test case.

jasmine framework provide one more feature like 

describe('',()=>{
  describe(); 
});-> to organize our test suite better.

note: JASMINE RANDOMIZES THE ORDER OF THE TESTS

note:"the below code has been written in jasmine format".

*/
describe('test suite: formatCurrency',()=>{// if we want add test in the testSuite then we have to give second parameter called function.
  it('converts cents into dollars',()=>{
    expect(formatCurrency(2095)).toEqual('20.95');// expect is a function/ also it gives a object so it provide many comparisons method and it is used for compare one value to another value.

    // one of the method is toEqual() for comparisons.

  });//create test in jasmine called it function.

  it('works with 0',()=>{
    expect(formatCurrency(0)).toEqual('0.00');
  });

  it('rounds up to the nearest cent',()=>{
    expect(formatCurrency(2000.5)).toEqual('20.01');
  });
})