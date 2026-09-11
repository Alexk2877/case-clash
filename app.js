(function () {
  "use strict";

  const GAME = window.CASE_CLASH || {};

  const STORAGE_KEY = "case_clash_save_v1";
  const START_BALANCE = 100000;

  const state = {
    balance: START_BALANCE,
    inventory: [],
    openedCases: 0,
    totalSpent: 0,
    totalEarned: 0,
    selectedCase: null,
    isOpening: false
  };

  const elements = {
    balance: null,
    casesGrid: null,
    inventoryGrid: null,
    openModal: null,
    modalTitle: null,
    modalCaseVisual: null,
    modalResult: null,
    modalOpenButton: null,
    modalCloseButton: null,
    toastContainer: null,
    openedCases: null,
    totalSpent: null,
    totalEarned: null
  };

  function $(selector) {
    return document.querySelector(selector);
  }

  function formatNumber(value) {
    if (typeof GAME.formatNumber === "function") {
      return GAME.formatNumber(value);
    }

    return Number(value).toLocaleString("ru-RU");
  }

  function saveGame() {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        balance: state.balance,
        inventory: state.inventory,
        openedCases: state.openedCases,
        totalSpent: state.totalSpent,
        totalEarned: state.totalEarned
      })
    );
  }

  function loadGame() {
    try {
      const saved = JSON.parse(
        localStorage.getItem(STORAGE_KEY)
      );

      if (!saved) {
        return;
      }

      state.balance = Number(saved.balance ?? START_BALANCE);
      state.inventory = Array.isArray(saved.inventory)
        ? saved.inventory
        : [];

      state.openedCases = Number(saved.openedCases || 0);
      state.totalSpent = Number(saved.totalSpent || 0);
      state.totalEarned = Number(saved.totalEarned || 0);
    } catch (error) {
      console.warn("Не удалось загрузить сохранение:", error);
    }
  }

  function cacheElements() {
    elements.balance =
      $("#balance") ||
      $("[data-balance]") ||
      $(".balance-value");

    elements.casesGrid =
      $("#casesGrid") ||
      $("[data-cases-grid]") ||
      $(".cases-grid");

    elements.inventoryGrid =
      $("#inventoryGrid") ||
      $("[data-inventory-grid]") ||
      $(".inventory-grid");

    elements.openModal =
      $("#openCaseModal") ||
      $("#caseModal") ||
      $(".case-modal");

    elements.modalTitle =
      $("#modalCaseTitle") ||
      "[data-modal-case-title]";

    elements.modalCaseVisual =
      $("#modalCaseVisual") ||
      "[data-modal-case-visual]";

    elements.modalResult =
      $("#modalResult") ||
      "[data-modal-result]";

    elements.modalOpenButton =
      $("#modalOpenButton") ||
      "[data-modal-open]";

    elements.modalCloseButton =
      $("#modalCloseButton") ||
      "[data-modal-close]";

    elements.toastContainer =
      $("#toastContainer") ||
      $(".toast-container");

    elements.openedCases =
      $("#openedCases") ||
      "[data-opened-cases]";

    elements.totalSpent =
      $("#totalSpent") ||
      "[data-total-spent]";

    elements.totalEarned =
      $("#totalEarned") ||
      "[data-total-earned]";
  }

  function updateElement(target, value) {
    if (!target) {
      return;
    }

    if (typeof target === "string") {
      const element = $(target);

      if (element) {
        element.textContent = value;
      }

      return;
    }

    target.textContent = value;
  }

  function updateBalance() {
    updateElement(
      elements.balance,
      `${formatNumber(state.balance)} ◈`
    );

    updateElement(elements.openedCases, formatNumber(state.openedCases));
    updateElement(elements.totalSpent, `${formatNumber(state.totalSpent)} ◈`);
    updateElement(elements.totalEarned, `${formatNumber(state.totalEarned)} ◈`);
  }

  function showToast(message, type = "info") {
    let container = elements.toastContainer;

    if (!container) {
      container = document.createElement("div");
      container.className = "toast-container";
      document.body.appendChild(container);
      elements.toastContainer = container;
    }

    const toast = document.createElement("div");
    toast.className = `toast toast-${type}`;
    toast.textContent = message;

    container.appendChild(toast);

    requestAnimationFrame(() => {
      toast.classList.add("toast-visible");
    });

    setTimeout(() => {
      toast.classList.remove("toast-visible");

      setTimeout(() => {
        toast.remove();
      }, 300);
    }, 2800);
  }

  function getItemName(item) {
    return item?.name || "Неизвестный предмет";
  }

  function getItemPrice(item) {
    return Number(item?.price || 0);
  }

  function getRarityName(item) {
    const names = {
      common: "Обычный",
      uncommon: "Необычный",
      rare: "Редкий",
      epic: "Эпический",
      legendary: "Легендарный"
    };

    return names[item?.rarity] || "Предмет";
  }

  function getRarityColor(item) {
    const colors = {
      common: "#9ca3af",
      uncommon: "#55d66b",
      rare: "#4da6ff",
      epic: "#b56cff",
      legendary: "#ffb52e"
    };

    return colors[item?.rarity] || "#ffffff";
  }

  function getItemArt(item) {
    if (typeof GAME.createItemSVG === "function") {
      return GAME.createItemSVG(item, 240);
    }

    return `
      <div class="item-art-fallback">
        ${item?.weapon || "ITEM"}
      </div>
    `;
  }

  function createInventoryCard(entry, index) {
    const item = entry.item || entry;
    const price = getItemPrice(item);
    const rarityColor = getRarityColor(item);

    return `
      <article
        class="inventory-card"
        style="--item-rarity:${rarityColor};"
        data-inventory-index="${index}"
      >
        <div class="inventory-card-art">
          ${getItemArt(item)}
        </div>

        <div class="inventory-card-info">
          <span class="inventory-card-rarity">
            ${getRarityName(item)}
          </span>

          <h3>${getItemName(item)}</h3>

          <p>${item?.weapon || "Коллекционный предмет"}</p>

          <div class="inventory-card-footer">
            <strong>${formatNumber(price)} ◈</strong>
            <button
              type="button"
              class="sell-item-btn"
              data-action="sell-item"
              data-inventory-index="${index}"
            >
              Продать
            </button>
          </div>
        </div>
      </article>
    `;
  }

  function renderInventory() {
    const container = elements.inventoryGrid;

    if (!container) {
      return;
    }

    if (!state.inventory.length) {
      container.innerHTML = `
        <div class="empty-inventory">
          <div class="empty-inventory-icon">▣</div>
          <h3>Инвентарь пуст</h3>
          <p>Открой первый кейс, чтобы получить предмет.</p>
        </div>
      `;

      return;
    }

    container.innerHTML = state.inventory
      .map(createInventoryCard)
      .join("");
  }

  function openModal(caseData) {
    state.selectedCase = caseData;

    if (!elements.openModal) {
      createModal();
    }

    const modal = elements.openModal;

    const titleElement =
      typeof elements.modalTitle === "string"
        ? $(elements.modalTitle)
        : elements.modalTitle;

    const visualElement =
      typeof elements.modalCaseVisual === "string"
        ? $(elements.modalCaseVisual)
        : elements.modalCaseVisual;

    const resultElement =
      typeof elements.modalResult === "string"
        ? $(elements.modalResult)
        : elements.modalResult;

    if (titleElement) {
      titleElement.textContent = caseData.name;
    }

    if (visualElement) {
      visualElement.innerHTML =
        typeof GAME.createCaseIcon === "function"
          ? GAME.createCaseIcon(caseData, 220)
          : `<div class="case-modal-icon">${caseData.icon || "▣"}</div>`;
    }

    if (resultElement) {
      resultElement.innerHTML = "";
      resultElement.classList.remove("result-visible");
    }

    modal.classList.add("modal-visible");
    document.body.classList.add("modal-open");
  }

  function closeModal() {
    if (!elements.openModal) {
      return;
    }

    elements.openModal.classList.remove("modal-visible");
    document.body.classList.remove("modal-open");

    state.selectedCase = null;
    state.isOpening = false;
  }

  function createModal() {
    const modal = document.createElement("div");
    modal.id = "openCaseModal";
    modal.className = "case-modal";

    modal.innerHTML = `
      <div class="case-modal-backdrop" data-modal-close></div>

      <div class="case-modal-window">
        <button
          class="case-modal-close"
          type="button"
          data-modal-close
        >
          ×
        </button>

        <div class="case-modal-header">
          <span class="section-kicker">CASE OPENING</span>
          <h2 id="modalCaseTitle">Открытие кейса</h2>
        </div>

        <div id="modalCaseVisual" class="case-modal-visual"></div>

        <div id="modalResult" class="case-modal-result"></div>

        <button
          id="modalOpenButton"
          class="modal-open-btn"
          type="button"
          data-modal-open
        >
          Открыть кейс
        </button>
      </div>
    `;

    document.body.appendChild(modal);

    elements.openModal = modal;
    elements.modalTitle = $("#modalCaseTitle");
    elements.modalCaseVisual = $("#modalCaseVisual");
    elements.modalResult = $("#modalResult");
    elements.modalOpenButton = $("#modalOpenButton");
    elements.modalCloseButton = $("[data-modal-close]");

    modal.addEventListener("click", (event) => {
      if (event.target.closest("[data-modal-close]")) {
        closeModal();
      }

      if (event.target.closest("[data-modal-open]")) {
        performOpening();
      }
    });
  }

  function showOpeningAnimation() {
    const visualElement =
      typeof elements.modalCaseVisual === "string"
        ? $(elements.modalCaseVisual)
        : elements.modalCaseVisual;

    if (!visualElement) {
      return;
    }

    visualElement.classList.remove("case-shaking");

    requestAnimationFrame(() => {
      visualElement.classList.add("case-shaking");
    });
  }

  function showResult(result) {
    const resultElement =
      typeof elements.modalResult === "string"
        ? $(elements.modalResult)
        : elements.modalResult;

    if (!resultElement || !result?.item) {
      return;
    }

    const item = result.item;
    const rarityColor = getRarityColor(item);
    const itemPrice = getItemPrice(item);

    resultElement.innerHTML = `
      <div
        class="result-rarity"
        style="color:${rarityColor};"
      >
        ${getRarityName(item)}
      </div>

      <div class="result-art">
        ${getItemArt(item)}
      </div>

      <h3 class="result-item-name">${getItemName(item)}</h3>

      <p class="result-item-type">
        ${item.weapon || "Коллекционный предмет"}
      </p>

      <div class="result-item-price">
        Стоимость: <strong>${formatNumber(itemPrice)} ◈</strong>
      </div>

      <div class="result-drop-chance">
        Шанс выпадения: ${result.chance}%
      </div>

      <button
        type="button"
        class="result-continue-btn"
        data-action="result-close"
      >
        Забрать предмет
      </button>
    `;

    resultElement.classList.add("result-visible");

    resultElement
      .querySelector('[data-action="result-close"]')
      ?.addEventListener("click", closeModal);
  }

  function performOpening() {
    if (state.isOpening) {
      return;
    }

    const caseData = state.selectedCase;

    if (!caseData) {
      return;
    }

    if (!GAME.canAffordCase(caseData.price, caseData)) {
      showToast("Недостаточно средств для открытия кейса.", "error");
      return;
    }

    state.isOpening = true;

    const button =
      typeof elements.modalOpenButton === "string"
        ? $(elements.modalOpenButton)
        : elements.modalOpenButton;

    if (button) {
      button.disabled = true;
      button.textContent = "Открытие...";
    }

    state.balance -= caseData.price;
    state.totalSpent += caseData.price;
    state.openedCases += 1;

    updateBalance();
    saveGame();

    showOpeningAnimation();

    setTimeout(() => {
      const result = GAME.rollCaseDrop(caseData);

      if (!result || !result.item) {
        state.isOpening = false;

        if (button) {
          button.disabled = false;
          button.textContent = "Открыть кейс";
        }

        showToast("Произошла ошибка выпадения предмета.", "error");
        return;
      }

      const item = result.item;
      const itemPrice = getItemPrice(item);

      state.inventory.unshift({
        ...item,
        obtainedAt: Date.now(),
        caseId: caseData.id
      });

      state.totalEarned += itemPrice;

      updateBalance();
      renderInventory();
      saveGame();

      showResult(result);

      if (button) {
        button.disabled = false;
        button.textContent = "Открыть ещё раз";
      }

      state.isOpening = false;

      showToast(
        `Выпал предмет: ${getItemName(item)}`,
        "success"
      );
    }, 1900);
  }

  function sellInventoryItem(index) {
    const item = state.inventory[index];

    if (!item) {
      return;
    }

    const price = getItemPrice(item);

    state.balance += price;
    state.inventory.splice(index, 1);

    updateBalance();
    renderInventory();
    saveGame();

    showToast(
      `Предмет продан за ${formatNumber(price)} ◈`,
      "success"
    );
  }

  function bindInventoryEvents() {
    if (!elements.inventoryGrid) {
      return;
    }

    elements.inventoryGrid.addEventListener("click", (event) => {
      const button = event.target.closest(
        '[data-action="sell-item"]'
      );

      if (!button) {
        return;
      }

      const index = Number(button.dataset.inventoryIndex);
      sellInventoryItem(index);
    });
  }

  function bindGlobalEvents() {
    document.addEventListener("click", (event) => {
      const openButton = event.target.closest(
        '[data-action="open-case"]'
      );

      if (openButton) {
        const caseId = openButton.dataset.caseId;
        const caseData = GAME.getCaseById(caseId);

        if (caseData) {
          openModal(caseData);
        }

        return;
      }

      const closeButton = event.target.closest(
        '[data-modal-close]'
      );

      if (closeButton) {
        closeModal();
      }

      const modalOpenButton = event.target.closest(
        '[data-modal-open]'
      );

      if (modalOpenButton) {
        performOpening();
      }

      const resultCloseButton = event.target.closest(
        '[data-action="result-close"]'
      );

      if (resultCloseButton) {
        closeModal();
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeModal();
      }
    });
  }

  function init() {
    loadGame();
    cacheElements();

    if (elements.casesGrid && typeof GAME.renderCases === "function") {
      GAME.renderCases(elements.casesGrid, openModal);
    }

    renderInventory();
    updateBalance();
    bindInventoryEvents();
    bindGlobalEvents();

    createModal();

    window.CASE_CLASH_STATE = state;

    console.log("Case Clash запущен.");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();