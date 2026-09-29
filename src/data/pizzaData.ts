export interface PizzaItem {
  id: string;
  name: string;
  tagline: string;
  price: number;
  image: string;
  badge: string;
  description: string;
  ingredients: string[];
  spiciness: number; // 0 to 3
  isVegetarian?: boolean;
}

export interface CityHub {
  id: string;
  city: string;
  country: string;
  tag: string;
  address: string;
  temp: string;
  transitTime: string;
  specialPie: string;
  image: string;
  coords: { x: number; y: number }; // Percentage for map
}

export const PIZZA_MENU: PizzaItem[] = [
  {
    id: "holy-pepperoni",
    name: "The Holy Pepperoni",
    tagline: "Cup & Char • Calabrian Hot Honey • Fior di Latte",
    price: 21,
    badge: "BESTSELLER",
    image: "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?auto=format&fit=crop&w=1000&q=80",
    description: "72-hour sourdough base, layered with double crispy cup & char pepperoni that curls into hot grease cups, flooded with raw Calabrian chili wildflower honey and hand-torn fior di latte.",
    ingredients: ["San Marzano Sugo", "Cup & Char Pepperoni", "Fior di Latte", "Hot Honey Glaze", "Fresh Basil", "Pecorino Romano"],
    spiciness: 2,
    isVegetarian: false,
  },
  {
    id: "margherita-oro",
    name: "Margherita D.O.P. Oro",
    tagline: "Volcanic San Marzano • Buffalo Mozzarella • EVOO",
    price: 19,
    badge: "PURIST CHOICE",
    image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=1000&q=80",
    description: "The timeless masterwork. Hand-crushed San Marzano tomatoes from Mount Vesuvius slopes, authentic buffalo mozzarella melted at 900°F, sweet Genovese basil leaves, and golden first-press olive oil.",
    ingredients: ["San Marzano D.O.P.", "Campania Buffalo Mozzarella", "Fresh Sweet Basil", "Extra Virgin Olive Oil", "Sea Salt Flakes"],
    spiciness: 0,
    isVegetarian: true,
  },
  {
    id: "truffle-mushroom-cloud",
    name: "Truffle Mushroom Cloud",
    tagline: "Roasted Porcini • Taleggio Melt • White Truffle Crema",
    price: 24,
    badge: "CHEF SPECIAL",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1000&q=80",
    description: "Earth meets flame. Wood-roasted cremini and king oyster mushrooms over a bed of melted taleggio and fontina, drizzled with aged white truffle fonduta and fresh mountain thyme.",
    ingredients: ["White Truffle Crema", "Roasted Wild Mushrooms", "Fontina Val d'Aosta", "Smoked Mozzarella", "Fresh Thyme"],
    spiciness: 0,
    isVegetarian: true,
  },
  {
    id: "spicy-vodka-stracciatella",
    name: "Spicy Vodka Stracciatella",
    tagline: "Slow-Simmered Vodka Sugo • Creamy Stracciatella • Crispy Garlic",
    price: 22,
    badge: "FAN FAVORITE",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=1000&q=80",
    description: "Rich, velvety 8-hour simmered Calabrian chili vodka sauce topped with mounds of cool, pillowy hand-pulled stracciatella cheese, crispy toasted garlic slivers, and basil oil pearls.",
    ingredients: ["Calabrian Vodka Sugo", "Cold Stracciatella", "Garlic Crisp", "Smoked Provola", "Basil Pesto Swirl"],
    spiciness: 2,
    isVegetarian: true,
  },
  {
    id: "hot-honey-quattro",
    name: "The Hot Honey Quattro",
    tagline: "Gorgonzola Dolce • Smoked Scamorza • Taleggio • Hot Honey",
    price: 23,
    badge: "BOLD CHEESE",
    image: "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?auto=format&fit=crop&w=1000&q=80",
    description: "A decadent harmony of pungent Gorgonzola Dolce, aged scamorza, creamy ricotta, and molten fior di latte, tied together with a ferocious drizzle of habanero-infused orange blossom honey.",
    ingredients: ["Gorgonzola Dolce", "Smoked Scamorza", "Fresh Ricotta", "Fior di Latte", "Habanero Blossom Honey"],
    spiciness: 1,
    isVegetarian: true,
  },
];

export const CRUST_DIPS = [
  { id: "hot-honey", name: "Calabrian Hot Honey Pipette", price: 2.0, tag: "SPICY SWEET" },
  { id: "truffle-garlic", name: "Roasted Garlic Truffle Butter", price: 2.5, tag: "SAVORY USET" },
  { id: "pesto-ranch", name: "Green Basil Pesto Buttermilk Ranch", price: 2.0, tag: "HERBACEOUS" },
];

export const WORLD_HUBS: CityHub[] = [
  {
    id: "napoli",
    city: "NAPOLI",
    country: "Italy",
    tag: "HEARTH ZERO",
    address: "Via dei Tribunali 48, Centro Storico",
    temp: "925°F",
    transitTime: "12 MINS",
    specialPie: "Margherita Antica con Burrata",
    image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=800&q=80",
    coords: { x: 52, y: 38 },
  },
  {
    id: "brooklyn",
    city: "NEW YORK",
    country: "USA",
    tag: "SLICE LAB",
    address: "182 Bedford Ave, Williamsburg",
    temp: "915°F",
    transitTime: "15 MINS",
    specialPie: "Hot Honey Double Pepperoni Cup",
    image: "https://images.unsplash.com/photo-1500916434205-0c77489c6cf7?auto=format&fit=crop&w=800&q=80",
    coords: { x: 28, y: 34 },
  },
  {
    id: "london",
    city: "LONDON",
    country: "UK",
    tag: "BRICK HEARTH",
    address: "74 Redchurch St, Shoreditch",
    temp: "910°F",
    transitTime: "14 MINS",
    specialPie: "Truffled St. John Porcini Pie",
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=800&q=80",
    coords: { x: 48, y: 28 },
  },
  {
    id: "tokyo",
    city: "TOKYO",
    country: "Japan",
    tag: "NEON OVEN",
    address: "2-19-8 Jingumae, Shibuya-ku",
    temp: "930°F",
    transitTime: "10 MINS",
    specialPie: "Wagyu Shiso Pepperoni & Yuzu Honey",
    image: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80",
    coords: { x: 82, y: 40 },
  },
  {
    id: "sydney",
    city: "SYDNEY",
    country: "Australia",
    tag: "BONDI OVEN",
    address: "142 Campbell Parade, Bondi Beach",
    temp: "905°F",
    transitTime: "16 MINS",
    specialPie: "Smoked Scamorza & King Prawn Hot Honey",
    image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=800&q=80",
    coords: { x: 86, y: 78 },
  },
];
