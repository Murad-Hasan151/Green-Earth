const allCategories = document.getElementById("allCategories");
const allCard = document.getElementById("allCard");


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
    categories.forEach(cat => {
        allCategories.innerHTML += `
            <li class="text-lg hover:bg-[#03cd4d] hover:text-white px-3 py-1 rounded-md cursor-pointer">${cat.category_name}</li>
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
    cards.forEach(card => {
        allCard.innerHTML += `
                    <div class="p-3 bg-white rounded-lg"> 
                        <img class="h-60 w-full rounded-lg" src="${card.image}" alt="">
                        <h4 class="font-semibold text-lg mt-2">${card.name}</h4>
                        <p class=" my-1">${card.description}</p>
                        <div class="flex justify-between items-center mt-2">
                            <button class="bg-[#DCFCE7] text-[#15803D] font-semibold px-3 py-1 rounded-3xl">${card.category}</button>
                            <p class"font-bold"><span>${card.price}</span> TK</p>
                        </div>
                        <button class=" text-lg font-semibold mt-5 bg-[#15803D] text-white px-5 py-2 rounded-3xl w-full">Add to Cart</button>
                    </div>
        `;
    })
}


loadCategory()
loadAllCard()