//1. variables
const cartBtn = document.querySelector(".cartBtn");
const closeCartBtn = document.querySelector(".close-cart");
const clearCartBtn = document.querySelector(".clear-cart");
const cartDOM = document.querySelector(".cart");
const cartOverlay = document.querySelector(".cart-overlay");
const cartItem = document.querySelector(".close-item");
const cartTotal = document.querySelector(".close-total");
const cartContent = document.querySelector(".cart-content");
const productsDOM = document.querySelector(".products-center");

// 2. create cart item
let cart = [];
//buttons
let buttonsDOM = [];

//3. responsible for getting the products first locally and then from json //setup method
class Products{
    async getProducts(){
        try {
            let result = await fetch("product.json");
            let data = await result.json();
            let products = data.items;
            products = products.map(item => {
                const {title,price} = item.fields;
                const {id} = item.sys //Question: why no semi-colon?
                const image = item.fields.image.fields.file.url;
                return {title,price,id,image} //Question: why no semi-colon?
            })
            return products;
        } catch (error) {
            console.log(error);
        }
    }
}

//4. display products - responsible for getting items returned from product and displaying them, maniulating them, or retrieving them //ads data dynamically (comment out single item in html)
class UI {
 displayProducts(products){
    let result = '';
    products.forEach(product => {
      result += `
        <!-- single product  -->
            <article class="product">
                <div class="img-container">
                    <img 
                    src=${product.image} 
                    alt="product" 
                    class="product-img">
                    <button class="bag-btn" data-id=${product.id}>
                        <i class="fas fa-shopping-cart"></i>
                        add to bag
                    </button>
                </div>
                <h3>${product.title}</h3>
                <h4>$${product.price}</h4>
            </article>
        <!-- end of single product  -->
      `;
    });
    productsDOM.innerHTML = result;
 }
 getBagButtons(){
  const buttons = [...document.querySelectorAll(".bag-btn")]; //used spread operator (...) not node list
  buttonsDOM = buttons;
  buttons.forEach(button => {
   let id = button.dataset.id;
   let inCart = cart.find(item => item.id === id);
   if(inCart){
    button.innerText = "In Cart";
    button.disabled = true;
   }
    button.addEventListener("click", event =>{
        event.target.innerText = "In Cart";
        event.target.disabled = true;
        // get product from products
        let cartItem = {...Storage.getProduct(id), amount:1};
        console.log(cartItem);
        // add product to the cart
        // save cart in local storage
        // set cart values
        // display cart item
        // show the cart 

    });

  });

 }
}

//5. local storage class that deals with local storage
class Storage {
 static saveProducts(products){
     localStorage.setItem("products",JSON.stringify(products));
 }
 static getProduct(id){
     let products = JSON.parse(localStorage.getItem('products'));
     return products.find(product => product.id === id);
 }
}

//6. call functions in 3 and 4 here
document.addEventListener("DOMContentLoaded",()=>{
 const ui = new UI();
 const products = new Products();

// 7. get all products go back to 3 and grab data from json
products.getProducts().then(products => 
{
 ui.displayProducts(products) //method to display products
 Storage.saveProducts(products); //method to save products
}).then(() => {
 ui.getBagButtons();

});

});