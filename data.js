/** @typedef {'before-move-in'|'first-week'|'first-month'|'later'} Urgency */
/** @typedef {'bedroom-1'|'bedroom-2'|'bedroom-3'|'living'|'hallway'|'kitchen'|'bathroom'|'office-nursery'|'general'} Room */
/** @typedef {'vasile'|'huda'|'either'|''} Buyer */

/**
 * Default catalog. Prices are typical Stockholm retail ranges (IKEA / Jysk / Elgiganten / Mio).
 * handling: true → "We're handling it" section (excluded from cost totals).
 */
window.DEFAULT_ITEMS = [
  // —— Before move-in (order now, long delivery) ——
  { id: 'sofa', name: 'Sofa (3-seat)', room: 'living', urgency: 'before-move-in', priceMin: 7999, priceMax: 15999, note: 'Measure doorway; modular sofas easier for stairs', buyer: 'either', handling: false },
  { id: 'dining-table', name: 'Dining table', room: 'kitchen', urgency: 'before-move-in', priceMin: 2999, priceMax: 8999, note: 'Seats 4–6; extendable useful for guests', buyer: 'either', handling: false },
  { id: 'dining-chairs', name: 'Dining chairs (set of 4)', room: 'kitchen', urgency: 'before-move-in', priceMin: 1999, priceMax: 4999, note: '', buyer: 'either', handling: false },
  { id: 'wardrobe-br1', name: 'Wardrobe — bedroom 1 (main)', room: 'bedroom-1', urgency: 'before-move-in', priceMin: 2499, priceMax: 7999, note: 'PAX or similar; check ceiling height', buyer: 'either', handling: false },
  { id: 'wardrobe-br2', name: 'Wardrobe — bedroom 2', room: 'bedroom-2', urgency: 'before-move-in', priceMin: 1999, priceMax: 5999, note: '', buyer: 'either', handling: false },
  { id: 'wardrobe-br3', name: 'Wardrobe — bedroom 3 / guest', room: 'bedroom-3', urgency: 'before-move-in', priceMin: 1499, priceMax: 4999, note: 'Can start smaller if guest room later', buyer: 'either', handling: false },
  { id: 'desk', name: 'Desk (home office)', room: 'office-nursery', urgency: 'before-move-in', priceMin: 1499, priceMax: 4999, note: 'Depth for monitor + keyboard', buyer: 'vasile', handling: false },
  { id: 'office-chair', name: 'Office chair', room: 'office-nursery', urgency: 'before-move-in', priceMin: 1999, priceMax: 5999, note: 'Ergonomic if WFH often', buyer: 'vasile', handling: false },
  { id: 'ceiling-living', name: 'Ceiling lamp — living room', room: 'living', urgency: 'before-move-in', priceMin: 399, priceMax: 2499, note: 'Apartment may have no fixed light; electrician if hard-wiring', buyer: 'either', handling: false },
  { id: 'ceiling-bed1', name: 'Ceiling lamp — bedroom 1', room: 'bedroom-1', urgency: 'before-move-in', priceMin: 299, priceMax: 1499, note: '', buyer: 'either', handling: false },
  { id: 'ceiling-bed2', name: 'Ceiling lamp — bedroom 2', room: 'bedroom-2', urgency: 'before-move-in', priceMin: 299, priceMax: 1499, note: '', buyer: 'either', handling: false },
  { id: 'ceiling-kitchen', name: 'Ceiling lamp — kitchen', room: 'kitchen', urgency: 'before-move-in', priceMin: 299, priceMax: 1299, note: '', buyer: 'either', handling: false },
  { id: 'curtains-living', name: 'Curtains + rods — living room', room: 'living', urgency: 'before-move-in', priceMin: 800, priceMax: 3500, note: 'Measure window width × 2 for fullness', buyer: 'huda', handling: false },
  { id: 'curtains-bed1', name: 'Blackout curtains — bedroom 1', room: 'bedroom-1', urgency: 'before-move-in', priceMin: 600, priceMax: 2500, note: '', buyer: 'huda', handling: false },
  { id: 'curtains-bed2', name: 'Curtains — bedroom 2', room: 'bedroom-2', urgency: 'before-move-in', priceMin: 400, priceMax: 1800, note: '', buyer: 'huda', handling: false },
  { id: 'mattress-guest', name: 'Guest mattress (bedroom 3)', room: 'bedroom-3', urgency: 'before-move-in', priceMin: 1999, priceMax: 4999, note: 'If not using spare bed frame yet', buyer: 'either', handling: false },

  // —— First week ——
  { id: 'coffee-table', name: 'Coffee table', room: 'living', urgency: 'first-week', priceMin: 499, priceMax: 2499, note: '', buyer: 'either', handling: false },
  { id: 'tv-stand', name: 'TV bench / media unit', room: 'living', urgency: 'first-week', priceMin: 699, priceMax: 2999, note: 'Cable management gap in back helps', buyer: 'either', handling: false },
  { id: 'rug-living', name: 'Rug — living room', room: 'living', urgency: 'first-week', priceMin: 799, priceMax: 3999, note: '≈160×230 cm or larger', buyer: 'huda', handling: false },
  { id: 'side-tables', name: 'Bedside tables (×2)', room: 'bedroom-1', urgency: 'first-week', priceMin: 398, priceMax: 1998, note: '', buyer: 'either', handling: false },
  { id: 'dresser-br1', name: 'Chest of drawers — bedroom 1', room: 'bedroom-1', urgency: 'first-week', priceMin: 999, priceMax: 3499, note: '', buyer: 'either', handling: false },
  { id: 'floor-lamps', name: 'Floor / reading lamps (×2)', room: 'living', urgency: 'first-week', priceMin: 398, priceMax: 1998, note: 'Until all ceiling lights sorted', buyer: 'either', handling: false },
  { id: 'hall-shoe', name: 'Shoe storage — hallway', room: 'hallway', urgency: 'first-week', priceMin: 299, priceMax: 1499, note: 'Slim bench or cabinet', buyer: 'either', handling: false },
  { id: 'hall-hooks', name: 'Coat hooks / rack — hallway', room: 'hallway', urgency: 'first-week', priceMin: 99, priceMax: 599, note: 'Drill + wall plugs if concrete', buyer: 'either', handling: false },
  { id: 'hall-mirror', name: 'Hall mirror', room: 'hallway', urgency: 'first-week', priceMin: 199, priceMax: 899, note: '', buyer: 'huda', handling: false },
  { id: 'cookware-set', name: 'Cookware set (pots & pans)', room: 'kitchen', urgency: 'first-week', priceMin: 499, priceMax: 1999, note: 'Induction-compatible if applicable', buyer: 'either', handling: false },
  { id: 'tableware', name: 'Plates, bowls, glasses (set for 4)', room: 'kitchen', urgency: 'first-week', priceMin: 400, priceMax: 1200, note: '', buyer: 'either', handling: false },
  { id: 'cutlery', name: 'Cutlery set (4 people)', room: 'kitchen', urgency: 'first-week', priceMin: 149, priceMax: 599, note: '', buyer: 'either', handling: false },
  { id: 'kitchen-utensils', name: 'Kitchen utensils & knives', room: 'kitchen', urgency: 'first-week', priceMin: 300, priceMax: 1200, note: 'Peeler, spatula, scissors, chef knife', buyer: 'either', handling: false },
  { id: 'kettle', name: 'Electric kettle', room: 'kitchen', urgency: 'first-week', priceMin: 199, priceMax: 699, note: '', buyer: 'either', handling: false },
  { id: 'towels-bath', name: 'Towels (bath + hand, set)', room: 'bathroom', urgency: 'first-week', priceMin: 400, priceMax: 1200, note: '2 people + extras', buyer: 'huda', handling: false },
  { id: 'bath-mat', name: 'Bath mat(s)', room: 'bathroom', urgency: 'first-week', priceMin: 99, priceMax: 399, note: '', buyer: 'huda', handling: false },
  { id: 'shower-curtain', name: 'Shower curtain + liner', room: 'bathroom', urgency: 'first-week', priceMin: 99, priceMax: 399, note: '', buyer: 'either', handling: false },
  { id: 'bath-storage', name: 'Bathroom shelf / cabinet', room: 'bathroom', urgency: 'first-week', priceMin: 299, priceMax: 1499, note: 'Over-toilet or wall unit', buyer: 'either', handling: false },
  { id: 'cleaning-starter', name: 'Cleaning supplies starter kit', room: 'general', urgency: 'first-week', priceMin: 300, priceMax: 800, note: 'Detergent, sponges, bin bags', buyer: 'either', handling: false },
  { id: 'bin-kitchen', name: 'Kitchen waste bin', room: 'kitchen', urgency: 'first-week', priceMin: 149, priceMax: 599, note: 'Sortable if you recycle at source', buyer: 'either', handling: false },
  { id: 'extension-cords', name: 'Extension cords & power strips', room: 'general', urgency: 'first-week', priceMin: 200, priceMax: 600, note: 'Swedish plugs (Schuko)', buyer: 'either', handling: false },
  { id: 'light-bulbs', name: 'Light bulbs (assorted)', room: 'general', urgency: 'first-week', priceMin: 150, priceMax: 500, note: 'Check socket types (E27/E14)', buyer: 'either', handling: false },
  { id: 'smoke-detector', name: 'Smoke detector(s)', room: 'general', urgency: 'first-week', priceMin: 199, priceMax: 599, note: 'At least one per floor / near bedrooms', buyer: 'either', handling: false },
  { id: 'fire-blanket', name: 'Fire blanket', room: 'kitchen', urgency: 'first-week', priceMin: 149, priceMax: 349, note: 'Kitchen safety', buyer: 'either', handling: false },
  { id: 'drying-rack', name: 'Laundry drying rack', room: 'general', urgency: 'first-week', priceMin: 199, priceMax: 699, note: 'You have washer; need somewhere to dry', buyer: 'either', handling: false },
  { id: 'router-wifi', name: 'Router / mesh Wi‑Fi (if not from ISP)', room: 'general', urgency: 'first-week', priceMin: 0, priceMax: 2499, note: 'Many Stockholm ISPs include router — confirm first', buyer: 'vasile', handling: false },

  // —— First month ——
  { id: 'bookshelf-living', name: 'Bookcase / shelving — living', room: 'living', urgency: 'first-month', priceMin: 499, priceMax: 2499, note: '', buyer: 'either', handling: false },
  { id: 'shelving-office', name: 'Wall shelves — office', room: 'office-nursery', urgency: 'first-month', priceMin: 199, priceMax: 999, note: '', buyer: 'either', handling: false },
  { id: 'toolkit', name: 'Toolkit + cordless drill', room: 'general', urgency: 'first-month', priceMin: 599, priceMax: 2499, note: 'Essential for IKEA & curtain rods', buyer: 'vasile', handling: false },
  { id: 'step-stool', name: 'Step stool', room: 'general', urgency: 'first-month', priceMin: 199, priceMax: 599, note: '', buyer: 'either', handling: false },
  { id: 'ironing', name: 'Iron + ironing board', room: 'general', urgency: 'first-month', priceMin: 399, priceMax: 999, note: '', buyer: 'either', handling: false },
  { id: 'curtains-bed3', name: 'Curtains — bedroom 3', room: 'bedroom-3', urgency: 'first-month', priceMin: 300, priceMax: 1500, note: '', buyer: 'huda', handling: false },
  { id: 'ceiling-bed3', name: 'Ceiling lamp — bedroom 3', room: 'bedroom-3', urgency: 'first-month', priceMin: 199, priceMax: 999, note: '', buyer: 'either', handling: false },
  { id: 'ceiling-bath', name: 'Ceiling lamp — bathroom', room: 'bathroom', urgency: 'first-month', priceMin: 199, priceMax: 899, note: 'Moisture-rated if possible', buyer: 'either', handling: false },
  { id: 'hall-bench', name: 'Hall bench with storage', room: 'hallway', urgency: 'first-month', priceMin: 699, priceMax: 2499, note: '', buyer: 'either', handling: false },
  { id: 'rug-bedroom', name: 'Rug — bedroom 1', room: 'bedroom-1', urgency: 'first-month', priceMin: 399, priceMax: 1999, note: '', buyer: 'huda', handling: false },
  { id: 'kitchen-storage', name: 'Kitchen pantry / extra storage', room: 'kitchen', urgency: 'first-month', priceMin: 499, priceMax: 2499, note: 'If cabinets feel tight', buyer: 'either', handling: false },
  { id: 'food-containers', name: 'Food storage containers', room: 'kitchen', urgency: 'first-month', priceMin: 149, priceMax: 499, note: '', buyer: 'either', handling: false },

  // —— Later / nice to have ——
  { id: 'armchair', name: 'Armchair / extra seating', room: 'living', urgency: 'later', priceMin: 1999, priceMax: 6999, note: '', buyer: 'either', handling: false },
  { id: 'art-decor', name: 'Art & decor', room: 'living', urgency: 'later', priceMin: 300, priceMax: 3000, note: 'Posters, frames, plants', buyer: 'huda', handling: false },
  { id: 'balcony', name: 'Balcony furniture (if applicable)', room: 'general', urgency: 'later', priceMin: 999, priceMax: 4999, note: 'Check BRF rules', buyer: 'either', handling: false },
  { id: 'guest-bedding', name: 'Extra bedding set (guests)', room: 'bedroom-3', urgency: 'later', priceMin: 399, priceMax: 1200, note: '', buyer: 'either', handling: false },

  // —— Nursery (optional, later) ——
  { id: 'crib', name: 'Crib (baby)', room: 'office-nursery', urgency: 'later', priceMin: 1999, priceMax: 5999, note: 'Optional — plan room layout early', buyer: 'either', handling: false },
  { id: 'changing-table', name: 'Changing table / dresser top', room: 'office-nursery', urgency: 'later', priceMin: 999, priceMax: 3499, note: '', buyer: 'either', handling: false },
  { id: 'nursery-storage', name: 'Nursery storage boxes', room: 'office-nursery', urgency: 'later', priceMin: 199, priceMax: 799, note: '', buyer: 'either', handling: false },
  { id: 'baby-monitor', name: 'Baby monitor', room: 'office-nursery', urgency: 'later', priceMin: 499, priceMax: 1999, note: '', buyer: 'either', handling: false },
  { id: 'blackout-nursery', name: 'Blackout blinds — nursery', room: 'office-nursery', urgency: 'later', priceMin: 399, priceMax: 1500, note: '', buyer: 'huda', handling: false },

  // —— We're handling it (excluded from totals) ——
  { id: 'bed-main', name: 'Bed (double) — bedroom 1', room: 'bedroom-1', urgency: 'before-move-in', priceMin: 4999, priceMax: 12999, note: 'Order ASAP — ~4 weeks delivery typical', buyer: 'either', handling: true },
  { id: 'bedding', name: 'Bed linen & bedding', room: 'bedroom-1', urgency: 'first-week', priceMin: 800, priceMax: 2500, note: 'Duvet 240×220 if double bed', buyer: 'huda', handling: true },
  { id: 'vacuum', name: 'Vacuum cleaner', room: 'general', urgency: 'first-week', priceMin: 1499, priceMax: 4999, note: '', buyer: 'either', handling: true },
];

window.META = {
  moveInDate: '2026-12-01',
  title: 'Our New Home — Shopping Planner',
  subtitle: 'Stockholm · 3-bedroom · move-in 1 Dec 2026',
};
