document.addEventListener('DOMContentLoaded', () => {
    fetch('https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json')
        .then(response => response.json())
        .then(data => {
            const categories = data.categories;
            categories.forEach(category => {
                const products = category.category_products;
                const categoryName = category.category_name.toLowerCase();
                displayProducts(categoryName, products);
            });
            showTab('men'); // Show the men tab by default
        });
});

function displayProducts(category, products) {
    const container = document.getElementById(category);
    container.style.display = 'grid';
    products.forEach(product => {
        const discount = ((product.compare_at_price - product.price) / product.compare_at_price * 100).toFixed(0);
        const productCard = `
            <div class="product-card">
                <img src="${product.image}" alt="${product.title}" />
                ${product.badge ? `<div class="badge">${product.badge}</div>` : ''}
                <div class="details">
                    <h3>${product.title}</h3>
                    <p>${product.vendor}</p>
                    <p class="price">Rs ${product.price}</p>
                    <p class="compare-at-price">Rs ${product.compare_at_price}</p>
                    <p>${discount}% Off</p>
                    <button>Add to Cart</button>
                </div>
            </div>
        `;
        container.innerHTML += productCard;
    });
}

function showTab(category) {
    document.querySelectorAll('.products').forEach(tab => {
        tab.style.display = 'none';
    });
    document.getElementById(category).style.display = 'grid';
    document.querySelectorAll('.tab').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelector(`.tab[onclick="showTab('${category}')"]`).classList.add('active');
}