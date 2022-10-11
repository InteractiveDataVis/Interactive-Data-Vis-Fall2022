const countDiv = document.getElementById("count")
let count = +countDiv.innerHTML;

const updateCount = () => {
  count = count + 1;
  console.log('count', count)
  countDiv.innerHTML = count;
};