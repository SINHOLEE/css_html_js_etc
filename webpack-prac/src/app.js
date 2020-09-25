import { math } from "./utils.js"
import { dynamic } from "./dynamic.js"
import "./../static/css/style.css"
// 클로저 연습
const {sum, sub} = math()

console.log(sum(1, 2, 33, 5))
console.log(sub(5, 1, 2, 5,10)) 

dynamic()