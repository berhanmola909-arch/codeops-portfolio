let bill = Number(prompt ("Enter the bill please:") )
let partySize = Number(prompt ("Enter the party size please:")) 



let PerPerson = 0

let total = 0 

if (bill > 300 ){
  total = bill +(bill*0.1) 
}
else {
  total = bill + (bill*0.05)
}
PerPerson = total/partySize

console.log (`bill:${bill} \n the party size is:${partySize} \n the total price is :${total} \n the per person share: ${PerPerson}`)

payment_method = "telebirr"
switch(payment_method){

  case "telebirr":
    console.log("you used telebirr for payment")
    break; 

  case "cbe":
    console.log("you used CBE for payment")
    break;

  default:
    console.log("you used unknown method payment")
    break;
}