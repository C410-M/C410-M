const menuData = [
  {
    id: 1,
    name: "Smash Bacon Deluxe",
    description:
      "Blend artesanal 160g, queijo cheddar duplo, bacon crocante, pão brioche e molho da casa.",
    price: "R$ 34,90",
    category: "burgers",
    tag: "Mais pedido"
  },
  {
    id: 2,
    name: "Veggie Power Bowl",
    description:
      "Grãos, legumes assados, guacamole, vinagrete cítrico e mix de folhas frescas.",
    price: "R$ 28,50",
    category: "veggie",
    tag: "Novo"
  },
  {
    id: 3,
    name: "Pizza Pepperoni",
    description:
      "Massa de longa fermentação, mozzarella premium, pepperoni artesanal e mel picante.",
    price: "R$ 62,00",
    category: "pizzas"
  },
  {
    id: 4,
    name: "Combo Família",
    description:
      "2 pizzas grandes à escolha + bebida 2L + sobremesa especial.",
    price: "R$ 119,90",
    category: "pizzas",
    tag: "Oferta"
  },
  {
    id: 5,
    name: "Pink Lemonade",
    description:
      "Limonada artesanal com framboesa, toque de gengibre e hortelã fresca.",
    price: "R$ 12,90",
    category: "drinks"
  },
  {
    id: 6,
    name: "Cheesecake de Frutas Vermelhas",
    description:
      "Base crocante de biscoito, creme suave de cream cheese e calda artesanal.",
    price: "R$ 18,00",
    category: "desserts",
    tag: "Limitado"
  }
];

const menuGrid = document.querySelector("#menu-grid");
const filterButtons = document.querySelectorAll(".filter-btn");
const navToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const contactForm = document.querySelector(".contact-form");

function renderMenu(items) {
  if (!menuGrid) return;
  menuGrid.innerHTML = items
    .map(
      ({ name, description, price, tag }) => `
      <article class="menu-card">
        <header>
          <div>
            <h3>${name}</h3>
            <p>${description}</p>
          </div>
          ${tag ? `<span class="tag">${tag}</span>` : ""}
        </header>
        <footer>
          <span class="price">${price}</span>
          <button class="btn primary">Adicionar</button>
        </footer>
      </article>
    `
    )
    .join("");
}

function handleFilterClick(event) {
  const { category } = event.currentTarget.dataset;
  filterButtons.forEach((button) => button.classList.remove("active"));
  event.currentTarget.classList.add("active");

  if (category === "all") {
    renderMenu(menuData);
    return;
  }

  const filteredItems = menuData.filter((item) => item.category === category);
  renderMenu(filteredItems);
}

renderMenu(menuData);
filterButtons.forEach((button) =>
  button.addEventListener("click", handleFilterClick)
);

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });

  navLinks.querySelectorAll("a").forEach((link) =>
    link.addEventListener("click", () => navLinks.classList.remove("open"))
  );
}

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(contactForm);
    const submission = Object.fromEntries(formData.entries());
    console.table(submission);

    contactForm.reset();
    const button = contactForm.querySelector("button[type='submit']");
    if (button) {
      button.textContent = "Recebido!";
      setTimeout(() => {
        button.textContent = "Quero testar agora";
      }, 2500);
    }
  });
}
