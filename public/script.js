const tableBody =
    document.getElementById("productTable");

const loadMoreBtn =
    document.getElementById("loadMoreBtn");

let nextCursor = null;

function buildUrl() {

    const category =
        document.getElementById("category").value;

    const minPrice =
        document.getElementById("minPrice").value;

    const maxPrice =
        document.getElementById("maxPrice").value;

    const sort =
        document.getElementById("sort").value;

    let url = "/api/products?";

    if(category){
        url += `category=${category}&`;
    }

    if(minPrice){
        url += `minPrice=${minPrice}&`;
    }

    if(maxPrice){
        url += `maxPrice=${maxPrice}&`;
    }

    if(sort){
        url += `sort=${sort}&`;
    }

    if(nextCursor){
        url += `cursor=${nextCursor}&`;
    }

    return url;
}

async function fetchProducts(reset = false){

    const response =
        await fetch(buildUrl());

    const result =
        await response.json();

    if(reset){
        tableBody.innerHTML = "";
    }

    result.data.forEach(product => {

        const row =
        `
        <tr>
            <td>${product.id}</td>
            <td>${product.name}</td>
            <td>${product.category}</td>
            <td>₹${product.price}</td>
        </tr>
        `;

        tableBody.innerHTML += row;

    });

    nextCursor = result.nextCursor;
}

function applyFilters(){

    nextCursor = null;

    fetchProducts(true);
}

loadMoreBtn.addEventListener(
    "click",
    () => fetchProducts()
);

fetchProducts(true);