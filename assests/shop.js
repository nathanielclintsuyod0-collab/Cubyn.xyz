(() => {
    "use strict";

    /* =========================
       CONFIG
       ========================= */

    const config = SERAPHYX;

    /* =========================
       DOM HELPERS
       ========================= */

    const $ = (selector, parent = document) =>
        parent.querySelector(selector);

    const $$ = (selector, parent = document) =>
        [...parent.querySelectorAll(selector)];

    const productsContainer = $("#products");
    const shopTabs = $$(".shop-tabs button");
    const hamburger = $(".hamburger");
    const navigation = $(".header nav");
    const year = $("#year");

    /* =========================
       INITIAL SETUP
       ========================= */

    if (year) {
        year.textContent = new Date().getFullYear();
    }

    /* =========================
       DISCORD LINKS
       ========================= */

    $$("[data-link]").forEach(link => {
        if (config.discord) {
            link.href = config.discord;
        }
    });

    /* =========================
       HTML ESCAPE
       ========================= */

    function escapeHTML(value) {
        return String(value ?? "")
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    /* =========================
       PRODUCT CARD
       ========================= */

    function createProduct(product) {
        const name = escapeHTML(product.name);
        const description = escapeHTML(product.desc);
        const category = escapeHTML(product.cat);
        const icon = escapeHTML(product.icon);
        const price = escapeHTML(product.price);
        const url = escapeHTML(product.url);

        const isExternal =
            typeof product.url === "string" &&
            /^https?:\/\//i.test(product.url);

        const externalAttributes = isExternal
            ? 'target="_blank" rel="noopener noreferrer"'
            : "";

        return `
            <article class="product">

                <div class="product-art">

                    <span aria-hidden="true">
                        ${icon}
                    </span>

                    <small>
                        ${category.toUpperCase()}
                    </small>

                </div>

                <div class="product-body">

                    <h2>
                        ${name}
                    </h2>

                    <p>
                        ${description}
                    </p>

                    <div class="buy">

                        <strong>
                            ${price}
                        </strong>

                        <a
                            class="btn gold"
                            href="${url}"
                            ${externalAttributes}
                            aria-label="Purchase ${name}"
                        >
                            PURCHASE
                        </a>

                    </div>

                </div>

            </article>
        `;
    }

    /* =========================
       RENDER PRODUCTS
       ========================= */

    function renderProducts(category = "all") {

        if (!productsContainer) {
            return;
        }

        const products = Array.isArray(config.products)
            ? config.products
            : [];

        const filteredProducts = products.filter(product => {
            return (
                category === "all" ||
                product.cat === category
            );
        });

        if (filteredProducts.length === 0) {

            productsContainer.innerHTML = `
                <div class="shop-empty">
                    <span>⚔</span>

                    <h2>
                        NO ITEMS FOUND
                    </h2>

                    <p>
                        There are currently no items
                        available in this category.
                    </p>
                </div>
            `;

            return;
        }

        productsContainer.innerHTML =
            filteredProducts
                .map(createProduct)
                .join("");

        /* Re-trigger card animation */

        requestAnimationFrame(() => {

            $$(".product", productsContainer)
                .forEach((product, index) => {

                    product.style.opacity = "0";
                    product.style.transform =
                        "translateY(12px)";

                    setTimeout(() => {

                        product.style.opacity = "1";
                        product.style.transform =
                            "translateY(0)";

                    }, index * 50);
                });
        });
    }

    /* =========================
       CATEGORY TABS
       ========================= */

    function setActiveTab(activeTab) {

        shopTabs.forEach(tab => {
            tab.classList.toggle(
                "active",
                tab === activeTab
            );
        });
    }

    shopTabs.forEach(tab => {

        tab.addEventListener("click", () => {

            const category =
                tab.dataset.cat || "all";

            setActiveTab(tab);

            renderProducts(category);

        });

    });

    /* =========================
       MOBILE NAVIGATION
       ========================= */

    function toggleNavigation() {

        if (!navigation) {
            return;
        }

        navigation.classList.toggle("open");

        const isOpen =
            navigation.classList.contains("open");

        if (hamburger) {
            hamburger.setAttribute(
                "aria-expanded",
                String(isOpen)
            );
        }
    }

    if (hamburger) {

        hamburger.setAttribute(
            "aria-expanded",
            "false"
        );

        hamburger.setAttribute(
            "aria-label",
            "Toggle navigation"
        );

        hamburger.addEventListener(
            "click",
            toggleNavigation
        );
    }

    /* =========================
       CLOSE MOBILE NAV
       ========================= */

    if (navigation) {

        $$("a", navigation).forEach(link => {

            link.addEventListener("click", () => {

                if (
                    navigation.classList.contains("open")
                ) {
                    navigation.classList.remove("open");

                    hamburger?.setAttribute(
                        "aria-expanded",
                        "false"
                    );
                }

            });

        });
    }

    /* =========================
       ESC KEY
       ========================= */

    document.addEventListener("keydown", event => {

        if (
            event.key === "Escape" &&
            navigation?.classList.contains("open")
        ) {

            navigation.classList.remove("open");

            hamburger?.setAttribute(
                "aria-expanded",
                "false"
            );
        }

    });

    /* =========================
       INITIAL RENDER
       ========================= */

    renderProducts("all");

})();
