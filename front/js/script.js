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













//     <!--           <a href="./product.html?id=42">
//     <article>
//       <img src=".../product01.jpg" alt="Lorem ipsum dolor sit amet, Kanap name1">
//       <h3 class="productName">Kanap name1</h3>
//       <p class="productDescription">Dis enim malesuada risus sapien gravida nulla nisl arcu. Dis enim malesuada risus sapien gravida nulla nisl arcu.</p>
//     </article>
//   </a> -->    