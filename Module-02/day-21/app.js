const formhandler = (event) => { 
    event.preventDefault() 
    let phone = document.getElementById('phone').value 
    let name = document.getElementById('name').value 
    let phone_validate = /^(?:\+251|0)(?:9|7)\d{8}$/ 
    let name_validator = /^[a-zA-Z\s -]+$/; 

    if (!phone_validate.test(phone)){ 
        alert('phone number is not correct') 
    } else if (!name_validator.test(name)){ 
        alert('name format is not correct') 
    } else { 
        let signups = JSON.parse(localStorage.getItem('signups')) || [] 
        signups.push({ phone, name }) 
        localStorage.setItem('signups', JSON.stringify(signups)) 
        alert('name and phone number have been stored in local storage') 
        form.reset() 
    } 
} 

let form = document.getElementById('form') 
form.addEventListener('submit', formhandler) 

window.addEventListener('load', () => { 
    let signups = JSON.parse(localStorage.getItem('signups')) || [] 
    alert(`${signups.length} people have signed up.`) 
})
