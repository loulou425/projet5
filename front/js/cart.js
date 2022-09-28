let cartitem = document.querySelector('#cart__items')

let localprod = JSON.parse(localStorage.getItem('product'))

for(product of localprod){
let productId = product.idProduct
let productcolor = product.colorProduct
let quantity = product.quantityProduct

fetch("http://localhost:3000/api/products/" + productId)
.then(reponse => reponse.json())
  .then(data =>{
cartitem.innerHTML += 
`<article class="cart__item" data-id="${productId}" data-color="${productcolor}">
<div class="cart__item__img">
  <img src="${data.imageUrl}" alt="Photographie d'un canapé">
</div>
<div class="cart__item__content">
  <div class="cart__item__content__description">
    <h2>${data.altTxt}</h2>
    <p>${productcolor}</p>
    <p>${data.price}€</p>
  </div>
  <div class="cart__item__content__settings">
    <div class="cart__item__content__settings__quantity">
      <p>Qté : </p>
      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${quantity}">
    </div>
    <div class="cart__item__content__settings__delete">
      <p class="deleteItem">Supprimer</p>
    </div>
  </div>
</div>
</article> `})


                       //---gestion du boutton supprimer l'article---  
.then( () => {
  //Sélection des références de tous les boutons btnSupprimer
  let btnSupprimer = document.querySelectorAll(".deleteItem")
  let ajoutquantity = document.querySelectorAll(".itemQuantity")

for( let i = 0; i < btnSupprimer.length; i++){
  btnSupprimer[i].addEventListener("click",()=>{

    //selection de l'id du produit qui va être supprimer en cliquant sur le bouton
    let idSupprimer = localprod[i].idProduct
    let colorsupprimer = localprod[i].colorProduct
    
    //avec la méthode filter je sélectionne les élements à garder et je supprime l'élément ou le btn suppr a été cliqué
    localprod = localprod.filter(elem => elem.idProduct !== idSupprimer || elem.colorProduct !== colorsupprimer)
  
    //on envoie la variable dans le local storage
    //la transformation en forma json et l'envoyer dans la key product du localstorage
    localStorage.setItem("product", JSON.stringify(localprod))

   alert("ce produit a été supprimer du panier")
   window.location.href = "cart.html"
  })

  // ajout de produit en plus
  ajoutquantity[i].addEventListener("click",()=>{
  
  localprod[i].quantityProduct = ajoutquantity[i].value
  localStorage.setItem("product", JSON.stringify(localprod))

  // ajout du changemente automatique du prix et de la quantité total
 let totalprice = document.querySelector("#totalPrice")
totalprice.innerText = calculprix()
let documenttotal = document.querySelector("#totalQuantity")
documenttotal.innerText = calculquantity()
})
}
})
}
               // --- totalquantité ---

let quantitytotal = calculquantity()
function calculquantity() {
  let quantitytotal= 0
  for(let i=0; i < localprod.length; i++){
  quantitytotal += Number(localprod[i].quantityProduct)
} return quantitytotal
}
let documenttotal = document.querySelector("#totalQuantity")
documenttotal.innerHTML =
` <span id="totalQuantity">${quantitytotal}</span> `

                // --- total prix ---

let prixtotal = calculprix()
function calculprix (){
  let prixtotal = 0
  for(let i=0; i < localprod.length; i++){
  prixtotal += localprod[i].price * localprod[i].quantityProduct
}  return prixtotal
}
let totals = document.querySelector("#totalPrice")
totals.innerHTML =
` <span id="totalPrice"><!-- 84,00 -->${prixtotal}</span> `


            // --- formulaire regex ---
let form = document.querySelector(".cart__order__form")
let prenom = document.querySelector("firstName")
let nom = document.querySelector("lastName")
let adresse = document.querySelector("address")
let ville = document.querySelector("city")
let email = document.querySelector("email")

//regex pour (prenom,nom,adresse, ville)
let regexName = /^[a-z][a-z '-.,]{1,31}$|^$/i

//ecouter la modification de firstname
form.firstName.addEventListener("change",function(){
  validprenom(this)
  })
  // valide firstname
  let validprenom = function(inputfirstName) {
    //creation de la regex pour validation
    let firstNameregexp = new RegExp(regexName)

    let testfirstName = firstNameregexp.test(inputfirstName.value)
    let firstNameErrorMsg = document.querySelector("#firstNameErrorMsg")
    
    if(testfirstName){
      firstNameErrorMsg.innerHTML="Prénom valide"
      return true
    }
    else{
      firstNameErrorMsg.innerHTML="Prénom non valide"
      return false
    }
  }
  
  //ecouter la modification de lastname
form.lastName.addEventListener("change",function(){
  validnom(this)
  })
  // valide lastname
  let validnom = function(inputlastName) {
    //creation de la regex pour validation
    let lastNameregexp = new RegExp(regexName)

    let lastNameName = lastNameregexp.test(inputlastName.value)
    let lastNameErrorMsg = document.querySelector("#lastNameErrorMsg")
    
    if(lastNameName){
      lastNameErrorMsg.innerHTML="Nom valide"
      return true
    }
    else{
      lastNameErrorMsg.innerHTML="Nom non valide"
      return false
    }
  }
  
  //ecouter la modification de adresse
form.address.addEventListener("change",function(){
  validaddress(this)
  })
  // valide adresse
  let validaddress = function(inputaddress) {
    //creation de la regex pour validation
    let addressregexp = new RegExp(regexName)

    let addressName = addressregexp.test(inputaddress.value)
    let addressErrorMsg = document.querySelector("#addressErrorMsg")
    
    if(addressName){
      addressErrorMsg.innerHTML="Adresse valide"
      return true
    }
    else{
      addressErrorMsg.innerHTML="Adresse non valide"
      return false
    }
  }

  //ecouter la modification de city
form.city.addEventListener("change",function(){
  validville(this)
  })
  // valide prenom
  let validville = function(inputfirstName) {
    //creation de la regex pour validation
    let cityregexp = new RegExp(regexName)

    let cityName = cityregexp.test(inputfirstName.value)
    let cityErrorMsg = document.querySelector("#cityErrorMsg")
    
    if(cityName){
      cityErrorMsg.innerHTML="Ville valide"
      return true
    }
    else{
      cityErrorMsg.innerHTML="Ville non valide"
      return false
    }
  }
  
//regex pour Email
let regexmail =/^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gim;

 //ecouter la modification de email
form.email.addEventListener("change",function(){
  validemail(this)
  })
  // valide prenom
  let validemail = function(inputemail) {
    //creation de la regex pour validation
    let emailregexp = new RegExp(regexmail)

    let emailName = emailregexp.test(inputemail.value)
    let emailErrorMsg = document.querySelector("#emailErrorMsg")
    
    if(emailName){
      emailErrorMsg.innerHTML="Ville valide"
      return true
    }
    else{
      emailErrorMsg.innerHTML="Ville non valide"
      return false
    }
  }

//Ecouter la soumisson du formulaire
  form.addEventListener("submit",function(e){
    e.preventDefault();
    if(validprenom(form.firstName) && validnom(form.lastName) &&  validaddress(form.address) && validville(form.city) && validemail(form.email)){
    
       form.submit
    }
  })