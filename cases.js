(function () {
  "use strict";

  const API = window.CASE_CLASH || {};
  const CURRENCY = "◈";

  const CASES = [
    {
      id: "neon",
      slug: "neon-case",
      name: "NEON CASE",
      subtitle: "Неоновый импульс",
      price: 2500,
      color: "#00e5ff",
      icon: "⚡",
      featured: true,
      description: "Яркий кейс с неоновыми скинами и киберпанк-оружием.",
      drops: [
        { itemId: "mp7-neon", chance: 35 },
        { itemId: "nova-sunrise", chance: 25 },
        { itemId: "glock-toxic", chance: 20 },
        { itemId: "ak-toxic-grid", chance: 12 },
        { itemId: "ak-neon-strike", chance: 6 },
        { itemId: "m4-cyberstorm", chance: 2 }
      ]
    },

    {
      id: "military",
      slug: "military-case",
      name: "MILITARY CASE",
      subtitle: "Боевой стандарт",
      price: 7500,
      color: "#6d8f68",
      icon: "▣",
      description: "Военный кейс с тактическими раскрасками и редким оружием.",
      drops: [
        { itemId: "nova-sunrise", chance: 20 },
        { itemId: "mp7-neon", chance: 25 },
        { itemId: "m4-forest-shadow", chance: 25 },
        { itemId: "glock-toxic", chance: 15 },
        { itemId: "usp-arctic", chance: 8 },
        { itemId: "m4-cyberstorm", chance: 5 },
        { itemId: "awp-cyber-core", chance: 2 }
      ]
    },

    {
      id: "royal",
      slug: "royal-case",
      name: "ROYAL CASE",
      subtitle: "Королевская коллекция",
      price: 25000,
      color: "#ffd166",
      icon: "♛",
      featured: true,
      description: "Роскошный кейс с золотыми, королевскими и элитными предметами.",
      drops: [
        { itemId: "m4-forest-shadow", chance: 18 },
        { itemId: "usp-arctic", chance: 17 },
        { itemId: "ak-toxic-grid", chance: 20 },
        { itemId: "deagle-royal", chance: 20 },
        { itemId: "ak-neon-strike", chance: 12 },
        { itemId: "m4-royal-burst", chance: 8 },
        { itemId: "awp-cyber-core", chance: 5 }
      ]
    },

    {
      id: "galaxy",
      slug: "galaxy-case",
      name: "GALAXY CASE",
      subtitle: "За пределами карты",
      price: 75000,
      color: "#9b6cff",
      icon: "✦",
      featured: true,
      description: "Космический кейс с легендарными ножами, перчатками и оружием.",
      drops: [
        { itemId: "usp-arctic", chance: 20 },
        { itemId: "p90-void", chance: 22 },
        { itemId: "ak-neon-strike", chance: 18 },
        { itemId: "awp-cyber-core", chance: 15 },
        { itemId: "knife-shadow", chance: 12 },
        { itemId: "knife-galaxy", chance: 7 },
        { itemId: "gloves-cyber", chance: 6 }
      ]
    },

    {
      id: "inferno",
      slug: "inferno-case",
      name: "INFERNO CASE",
      subtitle: "Температура повышается",
      price: 250000,
      color: "#ff5b35",
      icon: "🔥",
      featured: true,
      description: "Огненный кейс с пылающими скинами и редкими предметами.",
      drops: [
        { itemId: "nova-sunrise", chance: 18 },
        { itemId: "glock-toxic", chance: 18 },
        { itemId: "mp7-neon", chance: 14 },
        { itemId: "deagle-inferno", chance: 20 },
        { itemId: "m4-cyberstorm", chance: 12 },
        { itemId: "knife-fire", chance: 10 },
        { itemId: "gloves-dragon", chance: 5 },
        { itemId: "awp-dragon-fury", chance: 3 }
      ]
    },

    {
      id: "dragon",
      slug: "dragon-case",
      name: "DRAGON CASE",
      subtitle: "Сила древнего пламени",
      price: 1000000,
      color: "#ff2d55",
      icon: "🐉",
      featured: true,
      description: "Самый дорогой кейс с драконьими предметами и элитными ножами.",
      drops: [
        { itemId: "m4-forest-shadow", chance: 15 },
        { itemId: "ak-toxic-grid", chance: 15 },
        { itemId: "deagle-royal", chance: 15 },
        { itemId: "awp-cyber-core", chance: 15 },
        { itemId: "ak-arctic-wolf", chance: 12 },
        { itemId: "knife-fire", chance: 10 },
        { itemId: "gloves-dragon", chance: 10 },
        { itemId: "awp-dragon-fury", chance: 5 },
        { itemId: "knife-galaxy", chance: 3 }
      ]
    }
  ];

  function escapeHTML(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function formatCoins(value) {
    if (typeof API.formatNumber === "function") {
      return API.formatNumber(value);
    }

    return Number(value).toLocaleString("ru-RU");
  }

  function getItemById(itemId) {
    if (typeof API.getItemById === "function") {
      return API.getItemById(itemId);
    }

    if (Array.isArray(API.ITEMS)) {
      return API.ITEMS.find((item) => item.id === itemId) || null;
    }

    return null;
  }

  function getCaseById(caseId) {
    return CASES.find((caseData) => caseData.id === caseId) || null;
  }

  function getCaseBySlug(slug) {
    return CASES.find((caseData) => caseData.slug === slug) || null;
  }

  function getCases() {
    return [...CASES];
  }

  function canAffordCase(balance, caseData) {
    return Number(balance) >= Number(caseData.price);
  }

  function getDropTable(caseId) {
    const caseData = getCaseById(caseId);

    if (!caseData) {
      return [];
    }

    return caseData.drops.map((drop) => {
      const item = getItemById(drop.itemId);

      return {
        ...drop,
        item
      };
    });
  }

  function rollCaseDrop(caseDataOrId) {
    const caseData =
      typeof caseDataOrId === "string"
        ? getCaseById(caseDataOrId)
        : caseDataOrId;

    if (!caseData || !Array.isArray(caseData.drops)) {
      return null;
    }

    const randomValue = Math.random() * 100;
    let currentChance = 0;

    for (const drop of caseData.drops) {
      currentChance += Number(drop.chance);

      if (randomValue < currentChance) {
        return {
          item: getItemById(drop.itemId),
          itemId: drop.itemId,
          chance: drop.chance,
          caseData
        };
      }
    }

    const lastDrop = caseData.drops[caseData.drops.length - 1];

    return {
      item: getItemById(lastDrop.itemId),
      itemId: lastDrop.itemId,
      chance: lastDrop.chance,
      caseData
    };
  }

  function getRarityColor(item) {
    if (!item) {
      return "#ffffff";
    }

    if (item.rarityColor) {
      return item.rarityColor;
    }

    const rarityColors = {
      common: "#9ca3af",
      uncommon: "#55d66b",
      rare: "#4da6ff",
      epic: "#b56cff",
      legendary: "#ffb52e"
    };

    return rarityColors[item.rarity] || "#ffffff";
  }

  function getRarityName(item) {
    if (!item) {
      return "Предмет";
    }

    const rarityNames = {
      common: "Обычный",
      uncommon: "Необычный",
      rare: "Редкий",
      epic: "Эпический",
      legendary: "Легендарный"
    };

    return rarityNames[item.rarity] || item.rarity || "Предмет";
  }

  function createCaseIcon(caseData, size = 170) {
    if (typeof API.createCaseIcon === "function") {
      return API.createCaseIcon(caseData, size);
    }

    const color = escapeHTML(caseData.color || "#00e5ff");
    const icon = escapeHTML(caseData.icon || "▣");

    return `
      <div
        class="fallback-case-icon"
        style="
          width:${size}px;
          height:${size}px;
          border:2px solid ${color};
          color:${color};
          box-shadow:0 0 35px ${color}55;
        "
      >
        <span>${icon}</span>
      </div>
    `;
  }

  function createDropPreview(caseData) {
    const rarestDrops = [...caseData.drops]
      .sort((a, b) => a.chance - b.chance)
      .slice(0, 4);

    return rarestDrops
      .map((drop) => {
        const item = getItemById(drop.itemId);
        const color = getRarityColor(item);

        return `
          <span
            class="case-drop-dot"
            title="${escapeHTML(item ? item.name : drop.itemId)} • ${drop.chance}%"
            style="--drop-color:${color};"
          ></span>
        `;
      })
      .join("");
  }

  function createCaseCard(caseData) {
    const color = escapeHTML(caseData.color || "#00e5ff");
    const name = escapeHTML(caseData.name);
    const subtitle = escapeHTML(caseData.subtitle || "");
    const description = escapeHTML(caseData.description || "");
    const price = formatCoins(caseData.price);
    const icon = escapeHTML(caseData.icon || "▣");

    return `
      <article
        class="case-card ${caseData.featured ? "case-card-featured" : ""}"
        data-case-id="${escapeHTML(caseData.id)}"
        style="--case-color:${color};"
      >
        <div class="case-card-glow"></div>

        <div class="case-card-top">
          <span class="case-card-label">CASE #${escapeHTML(caseData.id.toUpperCase())}</span>
          <span class="case-card-symbol">${icon}</span>
        </div>

        <div class="case-visual">
          ${createCaseIcon(caseData, 165)}
        </div>

        <div class="case-info">
          <h3 class="case-name">${name}</h3>
          <p class="case-subtitle">${subtitle}</p>
          <p class="case-description">${description}</p>

          <div class="case-card-bottom">
            <div class="case-price">
              <span class="case-price-label">Цена открытия</span>
              <strong>${price} ${CURRENCY}</strong>
            </div>

            <button
              class="case-open-btn"
              type="button"
              data-action="open-case"
              data-case-id="${escapeHTML(caseData.id)}"
            >
              Открыть
            </button>
          </div>

          <div class="case-drop-preview">
            <span class="case-drop-caption">Лучшие шансы</span>
            <div class="case-drop-dots">
              ${createDropPreview(caseData)}
            </div>
          </div>
        </div>
      </article>
    `;
  }

  function renderCases(containerOrSelector, onOpen) {
    const container =
      typeof containerOrSelector === "string"
        ? document.querySelector(containerOrSelector)
        : containerOrSelector;

    if (!container) {
      console.warn("Контейнер для кейсов не найден.");
      return;
    }

    container.innerHTML = CASES.map(createCaseCard).join("");

    if (container.__caseClickHandler) {
      container.removeEventListener(
        "click",
        container.__caseClickHandler
      );
    }

    container.__caseClickHandler = function (event) {
      const button = event.target.closest(
        '[data-action="open-case"]'
      );

      if (!button) {
        return;
      }

      const caseData = getCaseById(button.dataset.caseId);

      if (!caseData) {
        return;
      }

      if (typeof onOpen === "function") {
        onOpen(caseData);
      }
    };

    container.addEventListener(
      "click",
      container.__caseClickHandler
    );
  }

  function renderCaseDropTable(containerOrSelector, caseId) {
    const container =
      typeof containerOrSelector === "string"
        ? document.querySelector(containerOrSelector)
        : containerOrSelector;

    const caseData = getCaseById(caseId);

    if (!container || !caseData) {
      return;
    }

    const drops = getDropTable(caseId);

    container.innerHTML = drops
      .map((drop) => {
        const item = drop.item;
        const itemName = item ? item.name : drop.itemId;
        const rarityName = getRarityName(item);
        const rarityColor = getRarityColor(item);

        return `
          <div class="drop-row">
            <div class="drop-item-info">
              <span
                class="drop-rarity-dot"
                style="background:${rarityColor};"
              ></span>

              <span class="drop-item-name">
                ${escapeHTML(itemName)}
              </span>

              <small>${escapeHTML(rarityName)}</small>
            </div>

            <strong class="drop-chance">
              ${drop.chance}%
            </strong>
          </div>
        `;
      })
      .join("");
  }

  window.CASE_CLASH = Object.assign(
    {},
    window.CASE_CLASH,
    {
      CASES,
      getCases,
      getCaseById,
      getCaseBySlug,
      getDropTable,
      canAffordCase,
      rollCaseDrop,
      createCaseCard,
      renderCases,
      renderCaseDropTable
    }
  );
})();