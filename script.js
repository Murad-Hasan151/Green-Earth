const allCategories = document.getElementById("allCategories");
const allCard = document.getElementById("allCard");
const addToCart = document.getElementById("addToCart");
const detailsModal = document.getElementById("detailsModal");


let carts = [];


const loadCategory = () => {
    const url = "https://openapi.programming-hero.com/api/categories";
    fetch(url)
        .then(res => res.json())
        .then(data => {
            showCategory(data.categories);
        })
        .catch(err => {
            console.log(err);
        })
};
const showCategory = (categories) => {
    allCategories.innerHTML = "";
    categories.forEach(cat => {
        allCategories.innerHTML += `
            <li class="text-sm md:text-lg hover:bg-[#03cd4d] hover:text-white px-3 py-1 rounded-md cursor-pointer">${cat.category_name}</li>
        `;
    })
}


const loadAllCard = () => {
    const url = "https://openapi.programming-hero.com/api/plants";
    fetch(url)
        .then(res => res.json())
        .then(data => {
            showAllCard(data.plants);    
        })
        .catch(err => {
            console.log(err)
        })
}
const showAllCard = (cards) => {
    allCard.innerHTML = "";
    cards.forEach(card => {
        allCard.innerHTML += `
                    <div id="${card.id}" class="p-3 bg-white rounded-lg"> 
                        <img class="h-80 w-full rounded-lg" src="${card.image}" alt="">
                        <h4 onclick="detail_modal.showModal()" class="font-semibold text-lg mt-3 hover:cursor-pointer">${card.name}</h4>
                        <p class=" my-1">${card.description}</p>
                        <div class="flex justify-between items-center mt-2">
                            <button class="bg-[#DCFCE7] text-[#15803D] font-semibold px-3 py-1 rounded-3xl">${card.category}</button>
                            <p class"font-bold"><span>${card.price}</span> TK</p>
                        </div>
                        <button class="cartBtn text-lg font-semibold mt-5 bg-[#15803D] text-white px-5 py-2 rounded-3xl w-full hover:bg-[#06c74d]">Add to Cart</button>
                    </div>
        `;
    })
}


document.getElementById("allCategories").addEventListener("click", (e) => {
  if (e.target.localName === "li") {
    const categoryName = e.target.innerText; 

    document.querySelectorAll("#allCategories li").forEach(li => {
        li.classList.remove("active", "bg-[#15803D]", "text-white");
    });
    e.target.classList.add("active", "bg-[#15803D]", "text-white");
    showLoading();
    loadCategoryById(categoryName);
  }
});

const loadCategoryById = (categoryName) => {
  fetch("https://openapi.programming-hero.com/api/plants")
    .then((res) => res.json())
    .then((data) => {
      const filtered = data.plants.filter(
        (plant) => plant.category.toLowerCase() === categoryName.toLowerCase()
      );
      showCategoryById(filtered);
    })
    .catch((err) => console.log(err));
};

const showCategoryById = (trees) => {
  allCard.innerHTML = "";
  trees.forEach((tree) => {
        allCard.innerHTML += `
                    <div id="${tree.id}" class="p-3 bg-white rounded-lg"> 
                        <img class="h-80 w-full rounded-lg" src="${tree.image}" alt="">
                        <h4 onclick="detail_modal.showModal()" class="font-semibold text-lg mt-3 hover:cursor-pointer">${tree.name}</h4>
                        <p class=" my-1">${tree.description}</p>
                        <div class="flex justify-between items-center mt-2">
                            <button class="bg-[#DCFCE7] text-[#15803D] font-semibold px-3 py-1 rounded-3xl">${tree.category}</button>
                            <p class"font-bold"><span>${tree.price}</span> TK</p>
                        </div>
                        <button class="cartBtn text-lg font-semibold mt-5 bg-[#15803D] text-white px-5 py-2 rounded-3xl w-full hover:bg-[#06c74d]">Add to Cart</button>
                    </div>
        `;
        
  });
};


document.getElementById("allCard").addEventListener("click", (e) => {
    if(e.target.localName === "h4"){
        detailsModal.innerHTML = "";
        handleDetails(e)
    }
    if(e.target.innerText === "Add to Cart"){
        handleAddToCart(e)
    }
})

const handleDetails = (e) => {
    const id = e.target.parentNode.id;
    fetch(`https://openapi.programming-hero.com/api/plant/${id}`)
        .then(res => res.json())
        .then(data => showDetails(data.plants))
        .catch(err => console.log(err))
}
const showDetails = (detail) => {
    detailsModal.innerHTML = `
        <h2 class="font-bold text-3xl">${detail.name}</h2>
        <img class="h-80 md:h-120 rounded-lg w-full my-3" src="${detail.image}" alt="">
        <h2 class="text-xl my-3"><span class="font-semibold text-xl">Category :</span> ${detail.category}</h2>                         
        <p class="text-xl"><span class="font-semibold text-xl">Price :</span> ${detail.price} TK</p>
        <p class="text-md mt-3"><span class="font-semibold text-xl">Description :</span> ${detail.description}</p>
    `;
}


const handleAddToCart = (e) => {
    const name = e.target.parentNode.children[1].innerText;
    const price = parseInt(e.target.parentNode.children[3].children[1].children[0].innerText);
    const alreadyExist = carts.some((cart) => cart.name === name);
    if(!alreadyExist){
      carts.push({
        name: name,
        price: price,
      });
      showCarts(carts);
      alert(`Tree has been added to the cart`);
    }
}
const showCarts = (carts) => {
    addToCart.innerHTML = "";
    carts.forEach(cart => {
        addToCart.innerHTML += `
            <div class="flex justify-between items-center p-2 rounded-lg mb-3 bg-[#F0FDF4]">
                                <div>
                                    <h2 class="font-semibold text-lg">${cart.name}</h2>
                                    <p class="font-semibold text-lg">${cart.price} TK</p>
                                </div>
                                <div>
                                    <i class="fa-solid fa-xmark text-red-600 cross"></i>
                                </div>
                            </div>
        `;
    })
    const total = carts.reduce((sum, item) => sum + item.price, 0);
    document.getElementById("totalPrice").innerText = total;
}
addToCart.addEventListener("click", (e) => {
  if (e.target.classList.contains("cross")) {
    const name = e.target.parentNode.parentNode.children[0].children[0].innerText;
    carts = carts.filter((cart) => cart.name !== name);
    showCarts(carts);
  }
});

const showLoading = () => {
    allCard.innerHTML = `
      <p class="text-center font-bold col-span-3 "><span class="loading loading-spinner loading-xl"></span></p>
  `;
};


loadCategory()
loadAllCard()