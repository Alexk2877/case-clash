/* =========================================================
   CASE CLASH
   Каталог предметов и их визуальное оформление
   ========================================================= */

const RARITIES = {
  common: {
    name: "Обычный",
    color: "#9ba6bb",
    glow: "rgba(155, 166, 187, 0.25)",
    order: 1
  },

  uncommon: {
    name: "Необычный",
    color: "#55d68a",
    glow: "rgba(85, 214, 138, 0.28)",
    order: 2
  },

  rare: {
    name: "Редкий",
    color: "#4c9fff",
    glow: "rgba(76, 159, 255, 0.3)",
    order: 3
  },

  epic: {
    name: "Эпический",
    color: "#a66cff",
    glow: "rgba(166, 108, 255, 0.35)",
    order: 4
  },

  legendary: {
    name: "Легендарный",
    color: "#ffb84d",
    glow: "rgba(255, 184, 77, 0.38)",
    order: 5
  }
};

/*
  type:
  rifle      автомат
  sniper     снайперская винтовка
  pistol     пистолет
  knife      нож
  gloves     перчатки
  shotgun    дробовик
  smg        пистолет-пулемёт
  sticker     наклейка
*/

const ITEMS = [
  {
    id: "ak-neon-strike",
    name: "Neon Strike",
    weapon: "AK-47",
    type: "rifle",
    rarity: "epic",
    price: 18500,
    imageKey: "ak-neon",
    collection: "Neon Collection",
    description: "Яркий неоновый автомат с энергетическими линиями."
  },

  {
    id: "ak-toxic-grid",
    name: "Toxic Grid",
    weapon: "AK-47",
    type: "rifle",
    rarity: "rare",
    price: 7200,
    imageKey: "ak-toxic",
    collection: "Toxic Collection",
    description: "Кислотно-зелёный узор для тех, кто любит выделяться."
  },

  {
    id: "ak-arctic-wolf",
    name: "Arctic Wolf",
    weapon: "AK-47",
    type: "rifle",
    rarity: "legendary",
    price: 125000,
    imageKey: "ak-wolf",
    collection: "Arctic Collection",
    description: "Редкий ледяной дизайн с силуэтом северного волка."
  },

  {
    id: "awp-dragon-fury",
    name: "Dragon Fury",
    weapon: "AWP",
    type: "sniper",
    rarity: "legendary",
    price: 250000,
    imageKey: "awp-dragon",
    collection: "Dragon Collection",
    description: "Легендарная снайперская винтовка с драконом."
  },

  {
    id: "awp-cyber-core",
    name: "Cyber Core",
    weapon: "AWP",
    type: "sniper",
    rarity: "epic",
    price: 42000,
    imageKey: "awp-cyber",
    collection: "Cyber Collection",
    description: "Футуристический корпус с цифровым ядром."
  },

  {
    id: "m4-cyberstorm",
    name: "Cyberstorm",
    weapon: "M4A4",
    type: "rifle",
    rarity: "epic",
    price: 32500,
    imageKey: "m4-cyber",
    collection: "Cyber Collection",
    description: "Тактический дизайн с голубыми энергетическими вставками."
  },

  {
    id: "m4-forest-shadow",
    name: "Forest Shadow",
    weapon: "M4A4",
    type: "rifle",
    rarity: "uncommon",
    price: 3200,
    imageKey: "m4-forest",
    collection: "Forest Collection",
    description: "Камуфляжный дизайн для скрытного стиля."
  },

  {
    id: "m4-royal-burst",
    name: "Royal Burst",
    weapon: "M4A4",
    type: "rifle",
    rarity: "legendary",
    price: 175000,
    imageKey: "m4-royal",
    collection: "Royal Collection",
    description: "Золотой корпус с королевскими деталями."
  },

  {
    id: "deagle-royal",
    name: "Royal Eagle",
    weapon: "Desert Eagle",
    type: "pistol",
    rarity: "epic",
    price: 21500,
    imageKey: "deagle-royal",
    collection: "Royal Collection",
    description: "Тяжёлый пистолет с золотым орнаментом."
  },

  {
    id: "deagle-inferno",
    name: "Inferno Bite",
    weapon: "Desert Eagle",
    type: "pistol",
    rarity: "legendary",
    price: 110000,
    imageKey: "deagle-inferno",
    collection: "Inferno Collection",
    description: "Огненный дизайн с раскалёнными линиями."
  },

  {
    id: "glock-toxic",
    name: "Toxic Pulse",
    weapon: "Glock-18",
    type: "pistol",
    rarity: "rare",
    price: 5800,
    imageKey: "glock-toxic",
    collection: "Toxic Collection",
    description: "Ядовитый зелёный импульс на корпусе."
  },

  {
    id: "usp-arctic",
    name: "Arctic Silence",
    weapon: "USP-S",
    type: "pistol",
    rarity: "rare",
    price: 8900,
    imageKey: "usp-arctic",
    collection: "Arctic Collection",
    description: "Холодный бело-синий дизайн с глушителем."
  },

  {
    id: "knife-fire",
    name: "Fire Fang",
    weapon: "Knife",
    type: "knife",
    rarity: "legendary",
    price: 450000,
    imageKey: "knife-fire",
    collection: "Inferno Collection",
    description: "Огненный нож с сияющим лезвием."
  },

  {
    id: "knife-galaxy",
    name: "Galaxy Edge",
    weapon: "Knife",
    type: "knife",
    rarity: "legendary",
    price: 750000,
    imageKey: "knife-galaxy",
    collection: "Galaxy Collection",
    description: "Космический клинок с эффектом звёздной пыли."
  },

  {
    id: "knife-shadow",
    name: "Shadow Talon",
    weapon: "Knife",
    type: "knife",
    rarity: "epic",
    price: 65000,
    imageKey: "knife-shadow",
    collection: "Shadow Collection",
    description: "Тёмный клинок с фиолетовым свечением."
  },

  {
    id: "gloves-cyber",
    name: "Cyber Gloves",
    weapon: "Gloves",
    type: "gloves",
    rarity: "epic",
    price: 38000,
    imageKey: "gloves-cyber",
    collection: "Cyber Collection",
    description: "Перчатки с цифровыми вставками и неоновыми полосами."
  },

  {
    id: "gloves-dragon",
    name: "Dragon Claws",
    weapon: "Gloves",
    type: "gloves",
    rarity: "legendary",
    price: 320000,
    imageKey: "gloves-dragon",
    collection: "Dragon Collection",
    description: "Перчатки с узором драконьей чешуи."
  },

  {
    id: "mp7-neon",
    name: "Neon Runner",
    weapon: "MP7",
    type: "smg",
    rarity: "uncommon",
    price: 2800,
    imageKey: "mp7-neon",
    collection: "Neon Collection",
    description: "Компактный пистолет-пулемёт с яркими линиями."
  },

  {
    id: "p90-void",
    name: "Void Engine",
    weapon: "P90",
    type: "smg",
    rarity: "rare",
    price: 9800,
    imageKey: "p90-void",
    collection: "Void Collection",
    description: "Тёмный футуристический корпус с фиолетовым ядром."
  },

  {
    id: "nova-sunrise",
    name: "Sunrise",
    weapon: "Nova",
    type: "shotgun",
    rarity: "common",
    price: 900,
    imageKey: "nova-sunrise",
    collection: "Sunrise Collection",
    description: "Простой, но стильный солнечный дизайн."
  },

  {
    id: "sticker-clash",
    name: "Clash Champion",
    weapon: "Sticker",
    type: "sticker",
    rarity: "rare",
    price: 4500,
    imageKey: "sticker-clash",
    collection: "Champion Collection",
    description: "Наклейка с эмблемой первого сезона."
  }
];

/* =========================================================
   Вспомогательные функции
   ========================================================= */

function getItemById(itemId) {
  return ITEMS.find(item => item.id === itemId) || null;
}

function getRarityData(rarity) {
  return RARITIES[rarity] || RARITIES.common;
}

function formatNumber(value) {
  return Number(value || 0).toLocaleString("ru-RU");
}

function getItemPrice(item) {
  if (!item) return 0;
  return Number(item.price || 0);
}

function getItemColor(item) {
  return getRarityData(item?.rarity).color;
}

function getItemGlow(item) {
  return getRarityData(item?.rarity).glow;
}

function getRarityName(rarity) {
  return getRarityData(rarity).name;
}

/* =========================================================
   SVG-арт предметов
   ========================================================= */

function createItemSVG(item, size = 150) {
  const color = getItemColor(item);
  const glow = getItemGlow(item);
  const type = item?.type || "rifle";

  const safeName = String(item?.name || "Item")
    .replace(/[<>&"]/g, "");

  let shape = "";

  if (type === "knife") {
    shape = `
      <path
        d="M28 105 L125 48 L92 88 L154 75 L113 108 L165 119 L92 124 Z"
        fill="url(#metalGradient)"
        stroke="${color}"
        stroke-width="2"
      />
      <path
        d="M22 105 L65 105 L88 126 L55 137 L18 124 Z"
        fill="#252b3b"
        stroke="${color}"
        stroke-width="2"
      />
      <path
        d="M38 113 L65 113"
        stroke="${color}"
        stroke-width="4"
        stroke-linecap="round"
      />
    `;
  } else if (type === "gloves") {
    shape = `
      <path
        d="M45 132
           L35 74
           Q34 62 43 59
           Q52 57 56 67
           L61 91
           L62 40
           Q63 29 72 29
           Q81 29 82 41
           L84 89
           L87 31
           Q88 20 97 21
           Q106 22 106 34
           L106 91
           L112 48
           Q114 37 123 39
           Q132 41 131 53
           L126 105
           Q124 128 105 138 Z"
        fill="url(#metalGradient)"
        stroke="${color}"
        stroke-width="2"
      />
      <path
        d="M44 106 Q77 120 120 102"
        fill="none"
        stroke="${color}"
        stroke-width="5"
        opacity="0.8"
      />
    `;
  } else if (type === "pistol") {
    shape = `
      <path
        d="M24 64
           L127 64
           L153 79
           L120 92
           L83 92
           L72 133
           L42 133
           L50 91
           L28 87 Z"
        fill="url(#metalGradient)"
        stroke="${color}"
        stroke-width="2"
      />
      <path
        d="M119 64 L165 64 L165 78 L130 82 Z"
        fill="#252b3b"
        stroke="${color}"
        stroke-width="2"
      />
      <path
        d="M48 92 L82 92"
        stroke="${color}"
        stroke-width="4"
        stroke-linecap="round"
      />
    `;
  } else if (type === "sniper") {
    shape = `
      <path
        d="M18 79 L144 66 L165 77 L140 89 L68 97 L45 112 L21 105 Z"
        fill="url(#metalGradient)"
        stroke="${color}"
        stroke-width="2"
      />
      <path
        d="M53 94 L76 101 L64 139 L39 132 Z"
        fill="#252b3b"
        stroke="${color}"
        stroke-width="2"
      />
      <rect
        x="68"
        y="50"
        width="42"
        height="15"
        rx="6"
        fill="#252b3b"
        stroke="${color}"
        stroke-width="2"
      />
      <circle
        cx="88"
        cy="57"
        r="5"
        fill="${color}"
      />
    `;
  } else if (type === "shotgun") {
    shape = `
      <path
        d="M20 75 L148 75 L167 87 L145 98 L82 98 L65 128 L38 128 L50 96 L24 91 Z"
        fill="url(#metalGradient)"
        stroke="${color}"
        stroke-width="2"
      />
      <path
        d="M45 96 L70 99 L57 136 L35 130 Z"
        fill="#252b3b"
        stroke="${color}"
        stroke-width="2"
      />
      <path
        d="M82 62 L158 62 L158 74 L82 74 Z"
        fill="#252b3b"
        stroke="${color}"
        stroke-width="2"
      />
    `;
  } else if (type === "smg") {
    shape = `
      <path
        d="M25 67 L130 67 L155 80 L130 93 L82 93 L74 130 L47 130 L53 92 L29 87 Z"
        fill="url(#metalGradient)"
        stroke="${color}"
        stroke-width="2"
      />
      <path
        d="M123 67 L164 67 L164 80 L133 84 Z"
        fill="#252b3b"
        stroke="${color}"
        stroke-width="2"
      />
      <path
        d="M65 94 L87 94 L80 137 L59 137 Z"
        fill="#252b3b"
        stroke="${color}"
        stroke-width="2"
      />
    `;
  } else if (type === "sticker") {
    shape = `
      <circle
        cx="95"
        cy="95"
        r="57"
        fill="url(#metalGradient)"
        stroke="${color}"
        stroke-width="4"
      />
      <path
        d="M95 53 L106 82 L137 83 L113 101 L121 131 L95 114 L69 131 L77 101 L53 83 L84 82 Z"
        fill="${color}"
        opacity="0.9"
      />
      <text
        x="95"
        y="158"
        text-anchor="middle"
        fill="${color}"
        font-size="10"
        font-weight="900"
      >
        CLASH
      </text>
    `;
  } else {
    shape = `
      <path
        d="M17 76 L132 62 L163 76 L140 91 L79 96 L67 130 L39 130 L48 94 L22 89 Z"
        fill="url(#metalGradient)"
        stroke="${color}"
        stroke-width="2"
      />
      <path
        d="M119 63 L166 63 L166 76 L132 82 Z"
        fill="#252b3b"
        stroke="${color}"
        stroke-width="2"
      />
      <path
        d="M50 94 L81 96 L72 137 L45 132 Z"
        fill="#252b3b"
        stroke="${color}"
        stroke-width="2"
      />
      <path
        d="M80 70 L120 70"
        stroke="${color}"
        stroke-width="4"
        stroke-linecap="round"
      />
    `;
  }

  return `
    <svg
      class="generated-item-svg"
      width="${size}"
      height="${size}"
      viewBox="0 0 190 190"
      role="img"
      aria-label="${safeName}"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="metalGradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#f8fbff" stop-opacity="0.9"/>
          <stop offset="35%" stop-color="${color}" stop-opacity="0.8"/>
          <stop offset="100%" stop-color="#161b2a" stop-opacity="0.95"/>
        </linearGradient>

        <radialGradient id="backgroundGradient">
          <stop offset="0%" stop-color="${color}" stop-opacity="0.2"/>
          <stop offset="100%" stop-color="${color}" stop-opacity="0"/>
        </radialGradient>

        <filter id="itemGlow">
          <feGaussianBlur stdDeviation="4" result="blur"/>
          <feMerge>
            <feMergeNode in="blur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      <circle
        cx="95"
        cy="95"
        r="82"
        fill="url(#backgroundGradient)"
      />

      <g filter="url(#itemGlow)">
        ${shape}
      </g>

      <circle
        cx="95"
        cy="95"
        r="78"
        fill="none"
        stroke="${color}"
        stroke-opacity="0.12"
        stroke-width="1"
        stroke-dasharray="4 8"
      />
    </svg>
  `;
}

/* =========================================================
   HTML-карточка предмета
   ========================================================= */

function createItemCard(item, options = {}) {
  if (!item) return "";

  const {
    showAction = false,
    actionText = "Продать",
    actionClass = "",
    actionAttribute = "",
    compact = false
  } = options;

  const rarity = getRarityData(item.rarity);
  const price = formatNumber(getItemPrice(item));

  return `
    <article
      class="item-card ${compact ? "compact-item-card" : ""}"
      style="
        --item-color: ${rarity.color};
        --item-glow: ${rarity.glow};
      "
      data-item-id="${item.id}"
    >
      <div class="item-visual">
        <span class="item-condition">Factory New</span>
        <div class="item-art">
          ${createItemSVG(item, compact ? 105 : 145)}
        </div>
      </div>

      <div class="item-info">
        <div class="item-rarity">${rarity.name}</div>

        <div class="item-name" title="${item.name}">
          ${item.name}
        </div>

        <div class="item-type">
          ${item.weapon} · ${item.collection}
        </div>

        <div class="item-footer">
          <span class="item-value">◈ ${price}</span>

          ${
            showAction
              ? `
                <button
                  class="item-action ${actionClass}"
                  ${actionAttribute}
                >
                  ${actionText}
                </button>
              `
              : ""
          }
        </div>
      </div>
    </article>
  `;
}

/* =========================================================
   HTML-карточка кейса
   ========================================================= */

function createCaseIcon(caseData, size = 100) {
  const color = caseData?.color || "#7c5cff";

  return `
    <svg
      width="${size}"
      height="${size}"
      viewBox="0 0 160 160"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="${caseData?.name || "Case"}"
    >
      <defs>
        <linearGradient id="caseGradient${caseData?.slug || "default"}"
          x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="${color}" stop-opacity="0.95"/>
          <stop offset="100%" stop-color="#161b2a"/>
        </linearGradient>

        <filter id="caseShadow${caseData?.slug || "default"}">
          <feGaussianBlur stdDeviation="3" result="blur"/>
          <feMerge>
            <feMergeNode in="blur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      <circle
        cx="80"
        cy="80"
        r="62"
        fill="${color}"
        opacity="0.08"
      />

      <g filter="url(#caseShadow${caseData?.slug || "default"})">
        <path
          d="M35 50 L80 27 L125 50 L125 111 L80 136 L35 111 Z"
          fill="url(#caseGradient${caseData?.slug || "default"})"
          stroke="${color}"
          stroke-width="3"
        />

        <path
          d="M35 50 L80 75 L125 50"
          fill="none"
          stroke="${color}"
          stroke-width="3"
        />

        <path
          d="M80 75 L80 136"
          stroke="${color}"
          stroke-width="3"
        />

        <path
          d="M56 57 L80 44 L104 57 L80 70 Z"
          fill="${color}"
          opacity="0.75"
        />

        <circle
          cx="80"
          cy="91"
          r="13"
          fill="#0b0e18"
          stroke="${color}"
          stroke-width="3"
        />

        <path
          d="M80 84 L80 99"
          stroke="${color}"
          stroke-width="3"
          stroke-linecap="round"
        />
      </g>
    </svg>
  `;
}

/* =========================================================
   Экспорт в глобальную область
   ========================================================= */

window.CASE_CLASH = {
  ITEMS,
  RARITIES,
  getItemById,
  getRarityData,
  getRarityName,
  getItemPrice,
  getItemColor,
  getItemGlow,
  formatNumber,
  createItemSVG,
  createItemCard,
  createCaseIcon
};