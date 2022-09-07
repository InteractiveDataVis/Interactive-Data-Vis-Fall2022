console.log('hello world');

// console.log(document)
// console.log(window)
// const input = document;
// console.log(document.getElementById("name-input"))

const input = document.getElementById("name-input")
// console.log(document.getElementById("name-input"))
// console.log(input)

const updateName = () => {
  const userName = input.value;
  window.alert(`Welcome to class, ${userName}`)
};

let changeable = true;
const constant = true;

let counter = 0;
// console.log(counter)

function change() {
  changeable = false;
  const constant = false;
  // console.log(changeable, constant)
  counter = counter + 1;
}
// change();
// change();change();change();
// console.log(counter)


// console.log(changeable, constant)

const array = ["a", "b", "c", "d"]
const returnedArray = array.map(d => {
  // console.log(`This value is ${d}`)
  return "This value is " + d
})

const filteredArray = array.filter((d, i) => {
  console.log(i)
  // return d === "a" || d === "b";
  return i > 1
})

console.log(filteredArray);

const obj = {
  USA: "value",
  Canada: "value2",
  Mexico: "value3"
}

const keys = Object.entries(obj);
console.log(keys)

const apple = "apple";
// let result;
// if (typeof apple === 'string' && apple === "apple") {
//   // console.log("yes apple!")
//   result = 'yes apple'
// } else {
//   // console.log("no apple")
//   result = 'no apple'
// }


const result = apple === 'apple' ? 'yes apple' : 'no apple';
console.log(result)

console.log(new Date('2022 09 03'))