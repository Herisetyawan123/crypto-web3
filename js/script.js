const header = document.querySelector('.header');
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const faqItems = document.querySelectorAll('.faq-item');
const elements = document.querySelectorAll('.fade-in');

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  initAnimations();
  loadCoinData();
});

// Handle scroll events
window.addEventListener('scroll', () => {
  // Add header shadow on scroll
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }

  // Trigger animations on scroll
  animateOnScroll();
});

// Mobile menu toggle
if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuToggle.setAttribute(
      'aria-expanded',
      navLinks.classList.contains('active') ? 'true' : 'false'
    );
  });
}

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});

// FAQ accordion functionality
if (faqItems.length > 0) {
  faqItems.forEach((item) => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
      // Close other items
      faqItems.forEach((otherItem) => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
        }
      });

      // Toggle current item
      item.classList.toggle('active');
    });
  });
}

// Scroll animations
function animateOnScroll() {
  elements.forEach((element) => {
    const elementPosition = element.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (elementPosition < windowHeight - 100) {
      element.classList.add('visible');
    }
  });
}

// Initialize animations
function initAnimations() {
  // Set initial state for animations
  setTimeout(() => {
    animateOnScroll();
  }, 100);
}

// Fetch and display crypto coin data
async function loadCoinData() {
  const coinCardsContainer = document.querySelector('.coin-cards');
  const marketTable = document.querySelector('.market-table tbody');

  if (!coinCardsContainer && !marketTable) return;

  try {
    const coins = [
      {
        id: 'bitcoin',
        name: 'Bitcoin',
        symbol: 'BTC',
        image: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png',
        current_price: 49830.52,
        price_change_percentage_24h: 2.1,
        market_cap: 973494595832,
        volume: 31693246144,
      },
      {
        id: 'ethereum',
        name: 'Ethereum',
        symbol: 'ETH',
        image:
          'https://assets.coingecko.com/coins/images/279/large/ethereum.png',
        current_price: 2365.33,
        price_change_percentage_24h: 1.8,
        market_cap: 284684684149,
        volume: 15784215339,
      },
      {
        id: 'binancecoin',
        name: 'Binance Coin',
        symbol: 'BNB',
        image:
          'https://assets.coingecko.com/coins/images/825/large/bnb-icon2_2x.png',
        current_price: 607.25,
        price_change_percentage_24h: -0.4,
        market_cap: 93408807891,
        volume: 2314568923,
      },
      {
        id: 'solana',
        name: 'Solana',
        symbol: 'SOL',
        image:
          'https://assets.coingecko.com/coins/images/4128/large/solana.png',
        current_price: 142.1,
        price_change_percentage_24h: 3.6,
        market_cap: 60785943218,
        volume: 2145784521,
      },
      {
        id: 'cardano',
        name: 'Cardano',
        symbol: 'ADA',
        image:
          'https://assets.coingecko.com/coins/images/975/large/cardano.png',
        current_price: 0.513,
        price_change_percentage_24h: -1.2,
        market_cap: 18023615742,
        volume: 741236854,
      },
      {
        id: 'ripple',
        name: 'XRP',
        symbol: 'XRP',
        image:
          'https://assets.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png',
        current_price: 0.5625,
        price_change_percentage_24h: 0.8,
        market_cap: 30587412587,
        volume: 1258741236,
      },
      {
        id: 'polkadot',
        name: 'Polkadot',
        symbol: 'DOT',
        image:
          'https://assets.coingecko.com/coins/images/12171/large/polkadot.png',
        current_price: 6.82,
        price_change_percentage_24h: 4.1,
        market_cap: 9841236852,
        volume: 485612384,
      },
      {
        id: 'dogecoin',
        name: 'Dogecoin',
        symbol: 'DOGE',
        image: 'https://assets.coingecko.com/coins/images/5/large/dogecoin.png',
        current_price: 0.1363,
        price_change_percentage_24h: 5.3,
        market_cap: 18745213658,
        volume: 1854796321,
      },
    ];

    // Add coin cards to homepage or cryptocurrencies page
    if (coinCardsContainer) {
      const topCoins = coins.slice(0, 4);
      topCoins.forEach((coin) => {
        const card = createCoinCard(coin);
        coinCardsContainer.appendChild(card);
      });
    }

    if (marketTable) {
      coins.forEach((coin, index) => {
        const row = createCoinTableRow(coin, index + 1);
        marketTable.appendChild(row);
      });
    }
  } catch (error) {
    console.error('Error loading coin data:', error);
  }
}

// Create coin card element
function createCoinCard(coin) {
  const card = document.createElement('div');
  card.className = 'coin-card';

  const isPositive = coin.price_change_percentage_24h >= 0;
  const changeClass = isPositive ? 'positive' : 'negative';
  const changeIcon = isPositive ? '↑' : '↓';

  card.innerHTML = `
    <div class="coin-header">
      <img src="${coin.image}" alt="${coin.name}" class="coin-icon">
      <div>
        <div class="coin-name">${coin.name}</div>
        <div class="coin-symbol">${coin.symbol}</div>
      </div>
    </div>
    <div class="coin-price">$${coin.current_price.toLocaleString()}</div>
    <div class="coin-change ${changeClass}">
      ${changeIcon} ${Math.abs(coin.price_change_percentage_24h).toFixed(2)}%
    </div>
  `;

  return card;
}

// Create table row for coin
function createCoinTableRow(coin, rank) {
  const row = document.createElement('tr');

  const isPositive = coin.price_change_percentage_24h >= 0;
  const changeClass = isPositive ? 'text-success' : 'text-error';
  const changeIcon = isPositive ? '↑' : '↓';

  row.innerHTML = `
    <td>${rank}</td>
    <td>
      <div class="coin-info">
        <img src="${coin.image}" alt="${coin.name}">
        <div class="coin-name-symbol">
          <div>${coin.name}</div>
          <div class="symbol">${coin.symbol}</div>
        </div>
      </div>
    </td>
    <td>$${coin.current_price.toLocaleString()}</td>
    <td class="${changeClass}">${changeIcon} ${Math.abs(
    coin.price_change_percentage_24h
  ).toFixed(2)}%</td>
    <td>$${(coin.market_cap / 1000000000).toFixed(2)}B</td>
    <td>$${(coin.volume / 1000000000).toFixed(2)}B</td>
  `;

  return row;
}
