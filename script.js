let products = []

//1.  fecthing the data
const fetchData = async () =>{
    const response  = await fetch('https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json');
    const data = await response.json()
    products = data.categories
    console.log(products)
    if(products.length)displayProductsByCategory('Men');
}
window.onload = function(){fetchData()}


//2.  creating product card
  function createProductCard(product) {
    // Create elements
    const badge = document.createElement('span');
    const card = document.createElement('div');
    const imageDiv = document.createElement('div');
    const image = document.createElement('img');
    const priceWrapper = document.createElement('p');
    const price = document.createElement('span');
    const discount = document.createElement('span');
    const originalPrice = document.createElement('span');
    const addToCartBtn = document.createElement('button');
    const productInfo = document.createElement('p');
    


    // Set attributes and text content
    card.classList.add('card');
    imageDiv.classList.add('img');
    image.src = product.image;
    image.alt = product.title;
    const titleSpan = document.createElement('span');
    const vendorSpan = document.createElement('span');
    titleSpan.textContent = product.title;
    vendorSpan.textContent = product.vendor;
     titleSpan.classList.add('product-title');
    productInfo.classList.add('productInfo');
    vendorSpan.classList.add('product-vendor');
     productInfo.appendChild(titleSpan);
    productInfo.appendChild(document.createTextNode(' • '));
    productInfo.appendChild(vendorSpan);
    price.textContent = `Rs ${product.price}.00`;
    discount.textContent = `${calculateDiscountPercentage(product)}%off`;
    originalPrice.textContent = `${product.compare_at_price}.00`;
    priceWrapper.classList.add('priceWrapper');
    price.classList.add('price');
    originalPrice.classList.add('original-price');
    discount.classList.add('discount');
    addToCartBtn.textContent = 'Add to Cart';
    addToCartBtn.classList.add('add-to-cart-btn');
    badge.classList.add('badge');
    badge.textContent = product.badge_text || '';
    if(badge.textContent==''){
        badge.classList.add('badgeHide');
    }

    // Append elements
    card.appendChild(badge);
    imageDiv.appendChild(image);
    card.appendChild(imageDiv);
    card.appendChild(productInfo);
    priceWrapper.appendChild(price);
    priceWrapper.appendChild(originalPrice);
    priceWrapper.appendChild(discount);
    card.appendChild(priceWrapper);
    card.appendChild(addToCartBtn);
  
    return card;
  }
  

//3. Function to display products by category
  function displayProductsByCategory(categoryName) {
    const category = products.find(cat => cat.category_name.toLowerCase() === categoryName.toLowerCase());
    const container = document.getElementById('products');
  
    if (category) {
      container.innerHTML = ''; // Clear previous content
  
      category.category_products.forEach(product => {
        const card = createProductCard(product);
        container.appendChild(card);
      });
    } else {
      container.innerHTML = `<p>Category "${categoryName}" not found.</p>`;
    }
  }
  

//4. parameter passed from button (Parameter same as category)
  function filterProduct(value) {
    //Button class code
    let buttons = document.querySelectorAll(".button-value");
    buttons.forEach((button) => {
      //check if value equals innerText
      if (value.toUpperCase() == button.innerText.toUpperCase()) {
        button.classList.add("active");
      } else {
        button.classList.remove("active");
      }
    });
     
    displayProductsByCategory(value)
     
  }
  
   
  
 function calculateDiscountPercentage(product) {
    const originalPrice = parseFloat(product.compare_at_price);
    const discountedPrice = parseFloat(product.price);
    const discountPercentage = ((originalPrice - discountedPrice) / originalPrice) * 100;
    return Math.round(discountPercentage);
  }
  

 function toggleTheme() {
    const currentTheme = document.body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.body.setAttribute('data-theme', newTheme);
}

 document.getElementById('theme-toggle-btn').addEventListener('click', toggleTheme);

 