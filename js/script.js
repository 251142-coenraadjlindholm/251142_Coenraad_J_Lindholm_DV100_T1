console.log("Hello World!");
console.log(5);
console.log("I am older than " + 18);
console.log(4 + 4);

var text = "This is a string";
console.log(text);
text = "I changed this";
console.log(text);

var num = 3;
var num2 = 4;
console.log(num);
console.log(num + num2);

var bool = true;
console.log(bool);

var array = ["a", "list", "of", "things"];
console.log(array);
console.log(array[2]);

var object = {
    name: "object",
    isUseful: true,
    parts: ["name", "curlt brackets", "key-value pairs", "comma splifs"];
    pairs= 4;
    }
    
    console.log(object);
    console.log(object.pairs);
    console.log(object.parts[1]);

    //== is value the same
    //=== is value and type the same
    //!= not same value
    //!== not same value and type

    //> greater than
    //>= greater than or equal to
    //< less than
    //<= less than or equal to

    //|| or
    //&& and
    //! not !bool

    var age = 18;

    if (age >= 18) {
        console.log("You are an adult");
    }else {
        console.log("You are a child");
    }

    var age = 10;
    var notInt = "10";

    if (Int == 10) {
        console.log("the value is the same");
    }else {
        console.log("the value is not the same");
    }
    
    if (notInt == 10) {
        console.log("the value is the same");
    }else {
        console.log("the value is not the same");
    }
    
    
    
    
    if (Int === "10") {
        console.log("the value is the same");
    }else {
        console.log("the value is not the same");
    }

    if (notInt === 10) {
        console.log("the value and the type is the same");
    }else {
        console.log("the value and the type is not the same");
    }

    
    var num3 = 12;
    firstName = "Michelle";

if (num3 == 14 && firstName == "Andrea") {
    console.log("atleast one condition is true");
}else {
    console,log("none of the conditions have been met");
}





var numbers = [1, 2, 3, 4, 5];
let sum = 0;

for (let i = 0; i < numbers.length; i++) {
    sum += numbers[i];
    console.log(sum);
}

var i = 0;

//while (i < 5) {
//  console.log(i);
//  i++;
//}

i = 1;
var sum2 = 0;

while (i <= 5) {
    sum2 += i;
    console.log(sum2);
    i++;
}
