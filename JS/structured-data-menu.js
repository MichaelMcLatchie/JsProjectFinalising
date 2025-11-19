const script = document.createElement('script');
script.type = 'application/ld+json';
script.text = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "CafeOrCoffeeShop",
  "name": "Moorabbin Coffee House",
  "image": "https://MichaelMcLatchie.github.io/morabbin-coffee-house/images/hero.webp",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "488 South Road",
    "addressLocality": "Moorabbin",
    "addressRegion": "VIC",
    "postalCode": "3189",
    "addressCountry": "AU"
  },
  "telephone": "+61 407889208",
  "url": "https://MichaelMcLatchie.github.io/morabbin-coffee-house/menu.html",
  "openingHours": [
    "Mo-Fr 07:00-16:00",
    "Sa-Su 08:00-15:00"
  ],
  "servesCuisine": ["Coffee", "Cafe", "Breakfast", "Brunch"],
  "priceRange": "$$",
  "sameAs": [
    "https://www.instagram.com/moorabbincoffee/",
    "https://x.com/MoorabbinCoffee"
  ],
  "hasMenu": {
    "@type": "Menu",
    "name": "Full Menu",
    "url": "https://MichaelMcLatchie.github.io/morabbin-coffee-house/menu.html",
    "hasMenuSection": [
      {
        "@type": "MenuSection",
        "name": "Coffees",
        "hasMenuItem": [
          {"@type": "MenuItem", "name": "Flat White", "offers": {"@type": "Offer", "price": "4", "priceCurrency": "AUD"}},
          {"@type": "MenuItem", "name": "Latte", "offers": {"@type": "Offer", "price": "4", "priceCurrency": "AUD"}},
          {"@type": "MenuItem", "name": "Long Black", "offers": {"@type": "Offer", "price": "3.5", "priceCurrency": "AUD"}},
          {"@type": "MenuItem", "name": "Cappuccino", "offers": {"@type": "Offer", "price": "4", "priceCurrency": "AUD"}},
          {"@type": "MenuItem", "name": "Espresso", "offers": {"@type": "Offer", "price": "3", "priceCurrency": "AUD"}}
        ]
      },
      {
        "@type": "MenuSection",
        "name": "Hot & Cold Drinks",
        "hasMenuItem": [
          {"@type": "MenuItem", "name": "Hot Chocolate", "offers": {"@type": "Offer", "price": "4", "priceCurrency": "AUD"}},
          {"@type": "MenuItem", "name": "Chai Latte", "offers": {"@type": "Offer", "price": "4", "priceCurrency": "AUD"}},
          {"@type": "MenuItem", "name": "Iced Latte", "offers": {"@type": "Offer", "price": "4.5", "priceCurrency": "AUD"}},
          {"@type": "MenuItem", "name": "Iced Chocolate", "offers": {"@type": "Offer", "price": "4.5", "priceCurrency": "AUD"}},
          {"@type": "MenuItem", "name": "Tea", "offers": {"@type": "Offer", "price": "3", "priceCurrency": "AUD"}}
        ]
      },
      {
        "@type": "MenuSection",
        "name": "Food",
        "hasMenuItem": [
          {"@type": "MenuItem", "name": "Croissant", "offers": {"@type": "Offer", "price": "3.5", "priceCurrency": "AUD"}},
          {"@type": "MenuItem", "name": "Buttermilk Pancakes", "offers": {"@type": "Offer", "price": "6", "priceCurrency": "AUD"}},
          {"@type": "MenuItem", "name": "Avocado Toast", "offers": {"@type": "Offer", "price": "7", "priceCurrency": "AUD"}},
          {"@type": "MenuItem", "name": "Ham & Cheese Toastie", "offers": {"@type": "Offer", "price": "5", "priceCurrency": "AUD"}},
          {"@type": "MenuItem", "name": "Fruit Bowl", "offers": {"@type": "Offer", "price": "4.5", "priceCurrency": "AUD"}}
        ]
      }
    ]
  }
});
document.head.appendChild(script);
