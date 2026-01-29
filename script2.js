// MENU TOGGLE (already required)
const menuOpenBtn = document.getElementById("menu-open-button");
const menuCloseBtn = document.getElementById("menu-close-button");
const navMenu = document.querySelector(".nav-menu");

menuOpenBtn.addEventListener("click", () => {
    navMenu.style.left = "0";
});

menuCloseBtn.addEventListener("click", () => {
    navMenu.style.left = "-300px";
});

document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", () => {
        navMenu.style.left = "-300px";
    });
});

// ORDER SYSTEM
const coffeePrices = {
    "Espresso": 200,
    "Latte": 350,
    "Black Coffee": 100,
    "Irish Coffee": 160
};

const coffeeType = document.getElementById("coffeeType");
const quantity = document.getElementById("quantity");
const totalPrice = document.getElementById("totalPrice");
const orderForm = document.querySelector(".order-form");

function updateTotal() {
    const price = coffeePrices[coffeeType.value] || 0;
    totalPrice.textContent = (price * quantity.value).toFixed(2);
}

coffeeType.addEventListener("change", updateTotal);
quantity.addEventListener("input", updateTotal);


// ORDER SUBMIT + FAKE PAYMENT

orderForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("customerName").value.trim();
    const email = document.getElementById("customerEmail").value.trim();
    const coffee = coffeeType.value;
    const qty = quantity.value;
    const payment = document.getElementById("paymentMethod").value;
    const total = totalPrice.textContent;

    if (!name || !email || !coffee || !payment) {
        alert("Please fill in all fields.");
        return;
    }

    // Save order to LocalStorage
    const order = {
        name,
        email,
        coffee,
        qty,
        payment,
        total,
        date: new Date().toLocaleString()
    };

    localStorage.setItem("lastOrder", JSON.stringify(order));

    // Fake payment
    alert("Processing payment...");
    setTimeout(() => {
        alert("Payment successful! Order placed.");

        sendEmail(order);
        orderForm.reset();
        totalPrice.textContent = "0";
    }, 1000);
});

// EMAIL FUNCTION (mailto)

function sendEmail(order) {
    const subject = "New Coffee Order";
    const body =
        `New Order Received:%0D%0A%0D%0A` +
        `Name: ${order.name}%0D%0A` +
        `Email: ${order.email}%0D%0A` +
        `Coffee: ${order.coffee}%0D%0A` +
        `Quantity: ${order.qty}%0D%0A` +
        `Payment: ${order.payment}%0D%0A` +
        `Total: ${order.total} ETB`;

    window.location.href =
        `mailto:betitata96@gmail.com?subject=${subject}&body=${body}`;
}

