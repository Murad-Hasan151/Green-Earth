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
            console.log(data)
        })
        .catch(err => {
            console.log(err)
        })
}


loadCategory()
loadAllCard()