/*
    I-Task: 

    Shunday function tuzing, u bir array argument qilib qabul qilib, 
    osha arrayning 0 index qiymatni arrayning oxiriga qoyib return qilsin

    masalan: getCompute(['h', 'e', 'l', 'l', 'o']) return qilishi kerak ['e', 'l', 'l', 'o', 'h']
*/

// Define
function getCompute(arr) {
    const firstElement = arr.shift();
    arr.push(firstElement);
    return arr;
}

// Call
const arr = ["h", "e", "l", "l", "o"];
const result = getCompute(arr);
console.log(result);
