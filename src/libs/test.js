let str = 'DATE="2019-01-09 13:34:36"'
let reg = /(DATE="(.+)")?\s*(CLIENT_DEV_ID="(.+)")?\s*(CLIENT_OS="(.+)")?\s*/gim
console.log(reg.exec(str))
console.log(reg.test(str))

let r2 = /^a/gim
let s2 = "aaad\nabc\na44"
console.log(s2.match(r2))