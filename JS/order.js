document.addEventListener('DOMContentLoaded', function () {
    const progressPercentage = 39; 
    document.querySelector('.status-progress').style.width = progressPercentage + '%';

    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    const statusContainer = document.querySelector('.status-container');
    const activeCircle = document.querySelector('.status-circle.active:last-child');

    if (statusContainer && activeCircle && !isElementInViewport(activeCircle)) {
        const activePosition = activeCircle.offsetLeft - 100;
        statusContainer.scrollLeft = activePosition;
    }

    function addDragToScroll(element) {
        if (!element) return;

        let isDown = false;
        let startX;
        let scrollLeft;

        element.addEventListener('mousedown', (e) => {
            isDown = true;
            element.classList.add('active');
            startX = e.pageX - element.offsetLeft;
            scrollLeft = element.scrollLeft;
        });

        element.addEventListener('mouseleave', () => {
            isDown = false;
            element.classList.remove('active');
        });

        element.addEventListener('mouseup', () => {
            isDown = false;
            element.classList.remove('active');
        });

        element.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - element.offsetLeft;
            const walk = (x - startX) * 2;
            element.scrollLeft = scrollLeft - walk;
        });
    }

    const productsContainer = document.querySelector('.products-scroll-container');

    addDragToScroll(productsContainer);
    addDragToScroll(statusContainer);
});
const statusData = [
    { label: "Paid", icon: "fa-money-bill", active: true, left: 5 },
    { label: "Failed", icon: "fa-ban", active: true, left: 13.5 },
    { label: "Under Processing", icon: "fa-cog", active: true, left: 23 },
    { label: "Delivered to Fulfilment Center", icon: "fa-dolly", active: true, left: 33.5 },
    { label: "Shipped", icon: "fa-truck", active: false, left: 44 },
    { label: "Delivery Failed", icon: "fa-triangle-exclamation", active: false, left: 54.5 },
    { label: "Delivery Rescheduled", icon: "fa-calendar", active: false, left: 65 },
    { label: "Delivered to Customer", icon: "fa-check-square", active: false, left: 75.5 },
    { label: "Rejected / Returned", icon: "fa-arrow-rotate-left", active: false, left: 86 },
    { label: "Tracking No. Added", icon: "fa-barcode", active: false, left: 95 },
];

const statusLine = document.querySelector('.status-line');
const statusProgress = document.querySelector('.status-progress');
const statusLabels = document.querySelector('.status-labels');

statusData.forEach((status, index) => {
    const circle = document.createElement('div');
    circle.classList.add('status-circle', status.active ? 'active' : 'inactive');
    circle.style.left = `${status.left}%`;

    const icon = document.createElement('i');
    icon.classList.add('fas', status.icon);
    circle.appendChild(icon);
    statusLine.appendChild(circle);

    const label = document.createElement('div');
    label.classList.add('status-label');
    label.textContent = status.label;
    statusLabels.appendChild(label);
});

const activeStatuses = statusData.filter(status => status.active);
const lastActive = activeStatuses[activeStatuses.length - 1];
statusProgress.style.width = `${lastActive ? lastActive.left : 0}%`;

const products = [
    { img: "../Image/image.png", alt: "Dell Laptop", details: ["Dell Laptop with 500GB HDD", "8GB RAM"], price: "$950" },
    { img: "../Image/image.png", alt: "HP Laptop", details: ["HP Laptop with 500GB HDD", "8GB RAM"], price: "$850" },
    { img: "../Image/image.png", alt: "ACER Laptop", details: ["ACER Laptop with 500GB HDD", "8GB RAM"], price: "$650" },
    { img: "../Image/image.png", alt: "MacBook Pro", details: ["MacBook Pro with 1TB SSD", "16GB RAM"], price: "$1850" },
    { img: "../Image/image.png", alt: "Lenovo ThinkPad", details: ["Lenovo ThinkPad with 512GB SSD", "16GB RAM"], price: "$1200" },
    { img: "../Image/image.png", alt: "ASUS ROG", details: ["ASUS ROG Gaming Laptop with 1TB SSD", "32GB RAM"], price: "$1750" },
    { img: "../Image/image.png", alt: "Microsoft Surface", details: ["Microsoft Surface with 512GB SSD", "16GB RAM"], price: "$1350" },
];

const container = document.querySelector('.products-scroll-container');

products.forEach(product => {
    const productItem = document.createElement('div');
    productItem.classList.add('product-item');

    const img = document.createElement('img');
    img.src = product.img;
    img.alt = product.alt;
    img.classList.add('product-img');

    const details = document.createElement('div');
    details.classList.add('product-details');
    product.details.forEach(detail => {
        const detailDiv = document.createElement('div');
        detailDiv.textContent = detail;
        details.appendChild(detailDiv);
    });

    const price = document.createElement('div');
    price.classList.add('product-price');
    price.textContent = product.price;

    productItem.appendChild(img);
    productItem.appendChild(details);
    productItem.appendChild(price);

    container.appendChild(productItem);
});