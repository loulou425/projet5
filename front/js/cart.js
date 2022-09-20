let cartitem = document.querySelector('#cart__items')


//let localprod = localStorage.getItem('product')
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
    <p>${data.price}</p>
  </div>
  <div class="cart__item__content__settings">
    <div class="cart__item__content__settings__quantity">
      <p>Qté :${quantity} </p>
      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${quantity}">
    </div>
    <div class="cart__item__content__settings__delete">
      <p class="deleteItem">Supprimer</p>
    </div>
  </div>
</div>
</article> `})
}
