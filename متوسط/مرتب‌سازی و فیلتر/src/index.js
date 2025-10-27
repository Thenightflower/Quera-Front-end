function filterAndSortProducts(products, criteria) {
    let filtered = [...products];

    if (criteria.categories && criteria.categories.length > 0) {
        filtered = filtered.filter(product =>
            criteria.categories.includes(product.category)
        );
    }

    if (criteria.priceRange) {
        const { min, max } = criteria.priceRange;
        filtered = filtered.filter(product =>
            (min === undefined || product.price >= min) &&
            (max === undefined || product.price <= max)
        );
    }

    if (criteria.nameLength) {
        const { min, max } = criteria.nameLength;
        filtered = filtered.filter(product =>
            (min === undefined || product.name.length >= min) &&
            (max === undefined || product.name.length <= max)
        );
    }

    if (criteria.keywords && criteria.keywords.length > 0) {
        filtered = filtered.filter(product =>
            criteria.keywords.some(keyword =>
                product.name.toLowerCase().includes(keyword.toLowerCase())
            )
        );
    }

    if (criteria.sortBy && criteria.sortBy.length > 0) {
        filtered.sort((a, b) => {
            for (let sortRule of criteria.sortBy) {
                const { field, order } = sortRule;
                let dir = order === "descending" ? -1 : 1;

                if (a[field] < b[field]) return -1 * dir;
                if (a[field] > b[field]) return 1 * dir;
            }
            return 0;
        });
    }

    return filtered;
}

const products = [
    { id: 1, name: "Apple iPhone 12", category: "Electronics", price: 999 },
    { id: 2, name: "Adidas running shoes", category: "Sportswear", price: 280 },
    { id: 3, name: "Samsung Galaxy S21", category: "Electronics", price: 850 },
    { id: 4, name: "Nike Air Max", category: "Sportswear", price: 300 }
];

const criteria = {
    categories: ["Electronics", "Sportswear"],
    priceRange: { min: 200, max: 1000 },
    nameLength: { min: 10, max: 25 },
    keywords: ["Galaxy", "Air"],
    sortBy: [
        { field: "price", order: "ascending" },
        { field: "name", order: "descending" }
    ]
};

console.log(filterAndSortProducts(products, criteria));
module.exports = { filterAndSortProducts };
