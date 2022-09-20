item__img = document.querySelector(".item__img")
title = document.querySelector("#title")
price = document.querySelector("#price")
description = document.querySelector("#description")
color = document.querySelector("#colors")


let params = new URL(document.location).searchParams;
let id = params.get("id");

console.log(params)

 fetch("http://localhost:3000/api/products/" + id)
 .then(reponse => reponse.json())
   .then(data =>{
    console.log(data) 


        item__img.innerHTML =`<img src="${data.imageUrl}" alt="Photographie d'un canapé"></img>`
        title.innerHTML = data.altTxt
        price.innerHTML = data.price
        description.innerHTML = data.description
       
        for (let i = 0; i < data.colors.length; i++) {
          let option = document.createElement("option");
          option.innerText = data.colors[i];
          color.appendChild(option);
        }
    })
   
 
//action du button
let button = document.querySelector('#addToCart')
button.addEventListener("click", () =>{

  let product = {
    idProduct : id,
    colorProduct : document.querySelector("#colors").value,
    quantityProduct: document.querySelector("#quantity").value,
  }

  let productInLocalStorage = JSON.parse(localStorage.getItem("product"))
  console.log(color.value)
  //console.log(productInLocalStorage[0].colorProduct)

  let flag = false
             
// Si le storage contient déjà une liste de produits 
if (productInLocalStorage != null){
  // Je parcous tous les produits de ma liste
  for ( i=0; i < productInLocalStorage.length; i++){
    // Je vérifie si l'id+color du produit du local storage sont égaux à ceux du panier
    if ( id == productInLocalStorage[i].idProduct && color.value == productInLocalStorage[i].colorProduct ){
      console.log("les Produits Sont Egaux")
      console.log(productInLocalStorage[i].quantityProduct)
      console.log(quantity.value)

      // Si ils sont égaux, je récupère l'ancienne valeur quantité du produit de localstorage, et je lui ajoute la quantité du panier.
      productInLocalStorage[i].quantityProduct = Number(productInLocalStorage[i].quantityProduct) + Number(quantity.value)
      // Je réécris le nouveau tableau dans le localstorage
      localStorage.setItem("product", JSON.stringify(productInLocalStorage))
      flag = true
    }
  }
  if (flag == false){
    productInLocalStorage.push(product)
    localStorage.setItem("product", JSON.stringify(productInLocalStorage))
  }
}
else{
  console.log('local storage est null')
  productInLocalStorage = []
  productInLocalStorage.push(product)
  localStorage.setItem("product", JSON.stringify(productInLocalStorage))
}
})

  