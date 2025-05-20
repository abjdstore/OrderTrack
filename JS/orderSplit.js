document.addEventListener('DOMContentLoaded', function () {
    const expandableRows = document.querySelectorAll('.expandable-row');

    expandableRows.forEach(row => {
        row.addEventListener('click', function () {
            const icon = this.querySelector('.expand-icon i');
            const targetId = this.getAttribute('data-bs-target');
            const targetElement = document.querySelector(targetId);

            if (icon.classList.contains('fa-chevron-down')) {
                icon.classList.replace('fa-chevron-down', 'fa-chevron-up');
            } else {
                icon.classList.replace('fa-chevron-up', 'fa-chevron-down');
            }

            if (targetElement) {
                targetElement.classList.toggle('show');
            }
        });
    });

    document.querySelectorAll('[id^="details-"]').forEach(detail => {
        detail.classList.remove('show');
    });
});

const orders = [
    {
        id: "#QNO067",
        date: "NOV 26, 2024 | 4:55 AM",
        customer: "Maher",
        phone: "0785699362",
        store: "Abjd.Store",
        status: "NEW",
        price: "$255.00",
        subOrders: []
    },
    {
        id: "#QNO068",
        date: "NOV 25, 2024 | 8:35 PM",
        customer: "Ali",
        phone: "0785699362",
        store: "Abjd.Store",
        status: "NEW",
        price: "$675.00",
        subOrders: []
    },
    {
        id: "#QNO069",
        date: "NOV 24, 2024 | 3:57 PM",
        customer: "Noor",
        phone: "0785699362",
        store: "Abjd.Store",
        status: "ON PROCESS",
        price: "$345.00",
        subOrders: [
            { id: "#QNO069", date: "NOV 24, 2024 | 3:57 PM", customer: "Noor", phone: "0785699362", store: "Abjd.Store", status: "ON PROCESS", price: "$145.00" },
            { id: "#QNO069", date: "NOV 24, 2024 | 3:57 PM", customer: "Noor", phone: "0785699362", store: "Abjd.Store", status: "ON PROCESS", price: "$200.00" }
        ]
    },
    {
        id: "#QNO070",
        date: "NOV 23, 2024 | 1:26 AM",
        customer: "Khaled",
        phone: "0785699362",
        store: "Abjd.Store",
        status: "COMPLETED",
        price: "$95.00",
        subOrders: []
    },
    {
        id: "#QNO071",
        date: "NOV 22, 2024 | 8:45 AM",
        customer: "Basim",
        phone: "0785699362",
        store: "Abjd.Store",
        status: "COMPLETED",
        price: "$25.00",
        subOrders: [
            { id: "#QNO071", date: "NOV 22, 2024 | 8:45 AM", customer: "Basim", phone: "0785699362", store: "Abjd.Store", status: "COMPLETED", price: "$10.00" },
            { id: "#QNO071", date: "NOV 22, 2024 | 8:45 AM", customer: "Basim", phone: "0785699362", store: "Abjd.Store", status: "COMPLETED", price: "$15.00" }
        ]
    },
    {
        id: "#QNO072",
        date: "NOV 21, 2024 | 6:32 PM",
        customer: "Omar",
        phone: "0785699362",
        store: "Abjd.Store",
        status: "COMPLETED",
        price: "$30.00",
        subOrders: []
    }
];

const rowsPerPage = 3;
let currentPage = 1;

function renderTable(page) {
    const tbody = document.getElementById('orders-tbody');
    tbody.innerHTML = '';

    const startIndex = (page - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const currentOrders = orders.slice(startIndex, endIndex);

    currentOrders.forEach((order, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
                    <td>
                        ${order.subOrders.length > 0 ? `
                            <div class="expand-icon" onclick="toggleSubOrders(${index})">
                                <i class="fa fa-chevron-down" id="icon-${index}"></i>
                            </div>
                        ` : ''}
                    </td>
                    <td><a href="./order.html">${order.id}</a></td>
                    <td>${order.date}</td>
                    <td>${order.customer}</td>
                    <td>${order.phone}</td>
                    <td>${order.store}</td>
                    <td class="status"><span class="status-badge status-${order.status.toLowerCase().replace(' ', '-')}">${order.status}</span></td>
                    <td class="text-end">${order.price}</td>
                `;
        tbody.appendChild(row);

        if (order.subOrders.length > 0) {
            const subOrderRow = document.createElement('tr');
            subOrderRow.className = "collapse collapse-row";
            subOrderRow.id = `suborders-${index}`;
            subOrderRow.innerHTML = `
                        <td colspan="8">
                            <table class="table mb-0">
                                <tbody>
                                    ${order.subOrders.map(subOrder => `
                                        <tr class="suborder-tr">
                                            <td></td>
                                            <td><a href="./order.html">${subOrder.id}</a></td>
                                            <td>${subOrder.date}</td>
                                            <td>${subOrder.customer}</td>
                                            <td>${subOrder.phone}</td>
                                            <td>${subOrder.store}</td>
                                            <td class="status"><span class="status-badge status-${subOrder.status.toLowerCase().replace(' ', '-')}">${subOrder.status}</span></td>
                                            <td class="text-end">${subOrder.price}</td>
                                        </tr>
                                    `).join('')}
                                </tbody>
                            </table>
                        </td>
                    `;
            tbody.appendChild(subOrderRow);
        }
    });
}

function toggleSubOrders(index) {
    const subOrdersRow = document.getElementById(`suborders-${index}`);
    const icon = document.getElementById(`icon-${index}`);
    if (subOrdersRow.classList.contains('show')) {
        subOrdersRow.classList.remove('show');
        icon.classList.replace('fa-chevron-up', 'fa-chevron-down');
    } else {
        subOrdersRow.classList.add('show');
        icon.classList.replace('fa-chevron-down', 'fa-chevron-up');
    }
}

function renderPagination() {
    const pagination = document.getElementById('pagination');
    pagination.innerHTML = '';

    const totalPages = Math.ceil(orders.length / rowsPerPage);

    const prevLi = document.createElement('li');
    prevLi.className = `page-item ${currentPage === 1 ? 'disabled' : ''}`;
    prevLi.innerHTML = `
                <a class="page-link" href="#" aria-label="Previous" onclick="changePage(${currentPage - 1})">
                    <span aria-hidden="true">&laquo;</span>
                </a>
            `;
    pagination.appendChild(prevLi);

    for (let i = 1; i <= totalPages; i++) {
        const pageLi = document.createElement('li');
        pageLi.className = `page-item ${i === currentPage ? 'active' : ''}`;
        pageLi.innerHTML = `<a class="page-link" href="#" onclick="changePage(${i})">${i}</a>`;
        pagination.appendChild(pageLi);
    }

    const nextLi = document.createElement('li');
    nextLi.className = `page-item ${currentPage === totalPages ? 'disabled' : ''}`;
    nextLi.innerHTML = `
                <a class="page-link" href="#" aria-label="Next" onclick="changePage(${currentPage + 1})">
                    <span aria-hidden="true">&raquo;</span>
                </a>
            `;
    pagination.appendChild(nextLi);
}

function changePage(page) {
    const totalPages = Math.ceil(orders.length / rowsPerPage);
    if (page < 1 || page > totalPages) return;

    currentPage = page;
    renderTable(currentPage);
    renderPagination();
}

renderTable(currentPage);
renderPagination();