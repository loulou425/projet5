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
             
if(productInLocalStorage == null){  
  console.log('localstorageestnull')
  productInLocalStorage = []
  productInLocalStorage.push(product)
  localStorage.setItem("product", JSON.stringify(productInLocalStorage))
}
else if ( id == productInLocalStorage[0].idProduct && color.value == productInLocalStorage[0].colorProduct ){
  console.log("lesProduitsSontEgaux")
  productInLocalStorage[0].quantityProduct += quantityProduct
  
  localStorage.setItem("product", JSON.stringify(productInLocalStorage))        
}

else{
  console.log('default')
  productInLocalStorage.push(product)
   localStorage.setItem("product", JSON.stringify(productInLocalStorage))
   
}

 })




/* else if (productInLocalStorage != null){
  for (i= 0; 1< productInLocalStorage.length; i++){
    if(productInLocalStorage[i].id == id &&  
      productInLocalStorage[i].color == select.value
      ) {
       return(
        productInLocalStorage[i].quantity++,
        localStorage.setItem("product",JSON.stringify(productInLocalStorage)),
        (productInLocalStorage = JSON.parse(localStorage.getItem("produit")))
       );
    }
  }*/

 



































    
   /* let button = document.getElementById("addToCart")
    // on click, save, add, product selected by ID in local Storage //
   button.addEventListener("click", () => {
    // display in local storage all the data we need to make an order //
    let optionsProduct =  { 
        id : id,
        quantity : document.getElementById('quantity').value,
        color : document.getElementById('colors').value,
    }
    let productInLocalStorage = JSON.parse(localStorage.getItem("product"))
    // s'il y a un produit dans le local storage  //
    if(productInLocalStorage){
        productInLocalStorage.push(optionsProduct)
        localStorage.setItem("product", JSON.stringify(productInLocalStorage))
    }
    else if (productInLocalStorage != null){
      for (i= 0; 1< productInLocalStorage.length; i++){
        if(productInLocalStorage[i].id == id &&  
          productInLocalStorage[i].color == select.value
          ) {
           return(
            productInLocalStorage[i].quantity++,
            localStorage.setItem("product",JSON.stringify(productInLocalStorage)),
            (productInLocalStorage = JSON.parse(localStorage.getItem("produit")))
           );
        }
      }
    }
    // s'il n'y a pas un produit dans le local storage  //
    else{
        productInLocalStorage = []
        productInLocalStorage.push(optionsProduct)
        console.log(productInLocalStorage)
        localStorage.setItem("product", JSON.stringify(productInLocalStorage))
    }
})*/
   



   //let btn = document.querySelector('#addToCart');
   // btn.addEventListener("click", () => {}
      

    // -----local storage-----
    //------stocker la récupération des valeurs du formulaire dans le local storage-----

    /*let product = JSON.parse(localStorage.getItem("produit"));
   console.log(product);
    //si il y a deja des produits enregistré dans le local storage
    if(product){
      product.push ()
     
    }
    // si il n'y a pas de produit enregistré dans le local storage
    else{
      product=[];
      product.push (objectProduct)
      console.log(product)

    } */ 
    