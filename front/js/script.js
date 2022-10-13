items = document.querySelector(".items")

fetch("http://localhost:3000/api/products")
  .then(reponse => reponse.json())
  .then(data =>{
    console.log(data) 

      for (let canape of data){
      items.innerHTML += `<a href="./product.html?id=${canape._id}">
      <article>
        <img src="${canape.imageUrl}">
        <h3 class="productName">${canape.name}</h3>
        <p class="productDescription">${canape.description}</p>
      </article>
    </a>`
      }
      
  })
  .catch((error) => {
      alert("Impossible de récupérer les informations du produit", error);
  })