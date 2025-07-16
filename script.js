let messages = [
  {
    role: "system",
    content:
      "You are a beauty and skincare expert for L'Oréal brands. Always be friendly and helpful. Use only the products provided in the user's prompt.",
  },
];

let selectedProducts = [];

const categoryFilter = document.getElementById("categoryFilter");
const productsContainer = document.getElementById("productsContainer");
const chatForm = document.getElementById("chatForm");
const chatWindow = document.getElementById("chatWindow");
const generateBtn = document.getElementById("generateRoutine");
const clearAllBtn = document.getElementById("clearAllBtn");
const rtlSwitch = document.getElementById("rtlSwitch");

productsContainer.innerHTML = `
  <div class="placeholder-message">
    Select a category to view products
  </div>
`;

async function loadProducts() {
  const response = await fetch("products.json");
  const data = await response.json();
  return data.products;
}

function saveSelectedProducts() {
  localStorage.setItem("lorealSelectedProducts", JSON.stringify(selectedProducts));
}

function displayProducts(products) {
  productsContainer.innerHTML = "";

  products.forEach((product) => {
    const card = document.createElement("div");
    card.classList.add("product-card");

    if (selectedProducts.find((p) => p.name === product.name)) {
      card.classList.add("selected");
    }

    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <div class="product-info">
        <h3>${product.name}</h3>
        <p>${product.brand}</p>
      </div>
    `;

    card.addEventListener("click", () => {
      const exists = selectedProducts.find((p) => p.name === product.name);
      if (exists) {
        selectedProducts = selectedProducts.filter((p) => p.name !== product.name);
      } else {
        selectedProducts.push(product);
      }

      displaySelectedProducts();
      displayProducts(products);
    });

    productsContainer.appendChild(card);
  });
}

function displaySelectedProducts() {
  const list = document.getElementById("selectedProductsList");
  list.innerHTML = "";
  saveSelectedProducts();

  selectedProducts.forEach((product, index) => {
    const item = document.createElement("div");
    item.innerHTML = `
      ${product.name} (${product.brand})
      <button class="remove-btn" data-index="${index}">x</button>
    `;
    list.appendChild(item);
  });

  document.querySelectorAll(".remove-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const index = e.target.dataset.index;
      selectedProducts.splice(index, 1);
      saveSelectedProducts();
      displaySelectedProducts();

      const currentCategory = categoryFilter.value;
      loadProducts().then((products) => {
        const filtered = products.filter((p) => p.category === currentCategory);
        displayProducts(filtered);
      });
    });
  });
}

categoryFilter.addEventListener("change", async (e) => {
  const products = await loadProducts();
  const selectedCategory = e.target.value;
  const filtered = products.filter((p) => p.category === selectedCategory);
  displayProducts(filtered);
});

chatForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const userInput = document.getElementById("userInput").value.trim();
  if (!userInput) return;

  chatWindow.innerHTML += `<div><strong>You:</strong> ${userInput}</div>`;
  chatWindow.innerHTML += `<div><em>L'Oréal Bot is thinking...</em></div>`;
  chatWindow.scrollTop = chatWindow.scrollHeight;

  document.getElementById("userInput").value = "";

  messages.push({ role: "user", content: userInput });

  try {
    const response = await fetch("https://billowing-salad-cbd0.beeqshaik.workers.dev", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "mistral-small-latest",
        messages: messages,
        temperature: 0.7,
      }),
    });

    const data = await response.json();
if (!data.choices || !data.choices[0]) {
  console.error("Unexpected API response:", data);
  chatWindow.innerHTML += `<div style="color:red"><strong>Error:</strong> Invalid API response.</div>`;
  return;
}
const botReply = data.choices[0].message.content;
    messages.push({ role: "assistant", content: botReply });

    const thinkingMsg = chatWindow.querySelector("em");
    if (thinkingMsg) thinkingMsg.remove();
    chatWindow.innerHTML += `<div><strong>L'Oréal Bot:</strong> ${botReply}</div>`;
    chatWindow.scrollTop = chatWindow.scrollHeight;
  } catch (error) {
    chatWindow.innerHTML += `<div style="color:red"><strong>Error:</strong> Could not connect to Mistral API.</div>`;
    console.error(error);
  }
});

generateBtn.addEventListener("click", async () => {
  if (selectedProducts.length === 0) {
    chatWindow.innerHTML += `<div><strong>L'Oréal Bot:</strong> Please select at least one product to build your routine.</div>`;
    return;
  }

  chatWindow.innerHTML += `<div><strong>You:</strong> Generate a routine with my selected products.</div>`;
  chatWindow.innerHTML += `<div><em>L'Oréal Bot is thinking...</em></div>`;
  chatWindow.scrollTop = chatWindow.scrollHeight;

  const productSummary = selectedProducts.map((p, i) =>
    `${i + 1}. ${p.name} by ${p.brand} - ${p.category}`
  ).join("\n");

  const fullPrompt = `Here are the L'Oréal products I've selected:\n${productSummary}\n\nCan you create a personalized beauty routine using these products? Please explain how and when to use each one in a friendly way.`;

  messages.push({ role: "user", content: fullPrompt });

  try {
    const response = await fetch("https://billowing-salad-cbd0.beeqshaik.workers.dev", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "mistral-small-latest",
        messages: messages,
        temperature: 0.7,
      }),
    });

    addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const response = await fetch(request)
  const newResponse = new Response(response.body, response)
  // Set the Access-Control-Allow-Origin header
  newResponse.headers.set('Access-Control-Allow-Origin', 'https://psychic-rotary-phone-x5xj6j6jgj99cvxrw-3000.app.github.dev');
  // You might also need to set other CORS headers like Access-Control-Allow-Methods and Access-Control-Allow-Headers
  return newResponse
}
// Example using Node.js with Express
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://psychic-rotary-phone-x5xj6j6jgj99cvxrw-3000.app.github.dev');
  // Or to allow any origin (less secure):
  // res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});


try {
  const response = await fetch(url, options);
  if (!response.ok) {
    // Handle non-successful HTTP responses (e.g., 404, 500)
    console.error('HTTP error!', response.status);
    // Provide user feedback
  }
  const data = await response.json();
  // Process successful response data
} catch (error) {
  // Handle network errors or other fetch failures
  console.error('Failed to fetch:', error);
  // Provide user feedback about the failure
}

    const data = await response.json();
if (!data.choices || !data.choices[0]) {
  console.error("Unexpected API response:", data);
  chatWindow.innerHTML += `<div style="color:red"><strong>Error:</strong> Invalid API response.</div>`;
  return;
}
const botReply = data.choices[0].message.content;
    messages.push({ role: "assistant", content: botReply });

    const lastMessage = chatWindow.querySelector("em");
    if (lastMessage) lastMessage.remove();
    chatWindow.innerHTML += `<div><strong>L'Oréal Bot:</strong> ${botReply}</div>`;
    chatWindow.scrollTop = chatWindow.scrollHeight;
  } catch (error) {
    chatWindow.innerHTML += `<div style="color:red"><strong>Error:</strong> Could not generate routine.</div>`;
    console.error(error);
  }
});

window.addEventListener("DOMContentLoaded", async () => {
  const saved = localStorage.getItem("lorealSelectedProducts");
  if (saved) {
    selectedProducts = JSON.parse(saved);
    displaySelectedProducts();

    const selectedCategory = categoryFilter.value;
    if (selectedCategory) {
      const allProducts = await loadProducts();
      const filtered = allProducts.filter((p) => p.category === selectedCategory);
      displayProducts(filtered);
    }
  }

  // RTL setup
  if (localStorage.getItem("rtlEnabled") === "true") {
    document.documentElement.setAttribute("dir", "rtl");
    rtlSwitch.checked = true;
  } else {
    document.documentElement.setAttribute("dir", "ltr");
    rtlSwitch.checked = false;
  }

  rtlSwitch.addEventListener("change", () => {
    if (rtlSwitch.checked) {
      document.documentElement.setAttribute("dir", "rtl");
      localStorage.setItem("rtlEnabled", "true");
    } else {
      document.documentElement.setAttribute("dir", "ltr");
      localStorage.setItem("rtlEnabled", "false");
    }
  });
});

if (clearAllBtn) {
  clearAllBtn.addEventListener("click", () => {
    selectedProducts = [];
    saveSelectedProducts();
    displaySelectedProducts();
    productsContainer.querySelectorAll(".product-card").forEach((card) => {
      card.classList.remove("selected");
    });
  });
}
