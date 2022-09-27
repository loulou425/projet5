let cartitem = document.querySelector('#cart__items')

let localprod = JSON.parse(localStorage.getItem('product'))
console.log(localprod)

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
console.log(btnSupprimer)

for( let i = 0; i < btnSupprimer.length; i++){
  btnSupprimer[i].addEventListener("click",()=>{

    //selection de l'id du produit qui va être supprimer en cliquant sur le bouton
    let idSupprimer = localprod[i].idProduct
    let colorsupprimer = localprod[i].colorProduct
    console.log(colorsupprimer)
    
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


               //---totalquantité--

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

                //--total prix--

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








