// Single source of truth for business details and content.
// Change details here and they update across the whole site.

export const BUSINESS = {
  name: 'MTR Removals',
  tagline: 'Move. Truck. Removals.',
  phone: '0469 799 346',
  phoneHref: 'tel:+61469799346',
  email: 'mtrremovals.au@gmail.com',
  website: 'https://www.mtrremovals.com.au',
  area: 'Newcastle and surrounding areas',
  areaNote: 'Interstate moves available',
  hours: 'Mon to Sun, 7am to 7pm',
};

export const IS_PREVIEW = import.meta.env.VITE_PREVIEW === '1';

const unsplash = (id, w = 1200) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=75`;

// Preview build is fully self-contained (no external images), so it uses only local photos.
export const IMAGES = {
  hero: '/images/movers-carrying-sofa.jpg',
  truck: '/images/mtr-truck.jpg',
  logo: '/images/mtr-logo.png',
  // MTR Removals service photos
  home: '/images/home-moves-newcastle.jpg',
  office: '/images/office-moves-newcastle.jpg',
  furniture: '/images/furniture-removals-newcastle.jpg',
  boxes: IS_PREVIEW ? '/images/boxes-trolley.jpg' : unsplash('photo-1624137527136-66e631bdaa0e'),
  road: IS_PREVIEW ? '/images/mtr-truck.jpg' : unsplash('photo-1716441453610-846d175a7759', 1600),
  newcastle: IS_PREVIEW ? '/images/mtr-truck.jpg' : unsplash('photo-1717714959031-8f544db6f51a', 1600),
  // Live site: own photo for each slot so no picture repeats
  about: IS_PREVIEW ? '/images/movers-carrying-sofa.jpg' : unsplash('photo-1714647211923-a3881cd1300f'),
};

export const SERVICES = [
  {
    slug: 'home-moves',
    type: 'home',
    icon: 'Home',
    title: 'Home Moves',
    heading: 'Home Moves in Newcastle',
    short: 'Units, townhouses and family homes moved with care, from first box to last bed frame.',
    image: IMAGES.home,
    alt: 'MTR Removals team carrying a wrapped wardrobe out of a house during a home move in Newcastle',
    body: 'Whether you are moving a one bedroom unit in Newcastle East or a five bedroom family home in Lake Macquarie, our removalists wrap, load and unload every item like it is our own. Mattresses get covers, furniture gets blankets and stretch wrap, and fragile items travel separately.',
    points: ['1 to 5+ bedroom homes', 'Blanket wrapping and stretch wrap included', 'Beds and tables dismantled and reassembled', 'Stairs, lifts and tight access handled'],
  },
  {
    slug: 'office-moves',
    type: 'office',
    icon: 'Building2',
    title: 'Office Moves',
    heading: 'Office Moves in Newcastle',
    short: 'Business relocations planned around you, including after hours and weekends to cut downtime.',
    image: IMAGES.office,
    alt: 'MTR Removals crew wheeling office chairs, desks and IT boxes into an office building in Newcastle',
    body: 'Moving an office is about keeping your business running. We plan the move with you, label by room or desk, and can work after hours or on weekends so your team walks into a ready workspace on Monday.',
    points: ['Desks, workstations and filing cabinets', 'IT equipment handled carefully', 'After hours and weekend moves', 'Clear labelling system by room'],
  },
  {
    slug: 'furniture-removals',
    type: 'furniture',
    icon: 'Sofa',
    title: 'Furniture Removals',
    heading: 'Furniture Removals in Newcastle',
    short: 'Single items or a full truck: sofas, fridges, wardrobes and marketplace pick-ups.',
    image: IMAGES.furniture,
    alt: 'Two MTR Removals movers carrying a wrapped timber chest of drawers to the truck in Newcastle',
    body: 'Bought a couch on Marketplace? Need a fridge moved across town or a heavy wardrobe taken upstairs? We do single item and small furniture removals across Newcastle and the Hunter, fast and without fuss.',
    points: ['Single item and small moves', 'Heavy and bulky items', 'Marketplace and store pick-ups', 'Storage unit runs'],
  },
  {
    slug: 'interstate-moves',
    type: 'interstate',
    icon: 'MapPin',
    title: 'Interstate Moves',
    heading: 'Interstate Moves from Newcastle',
    short: 'Newcastle to Sydney, Brisbane, Melbourne and beyond, with one team handling your move start to finish.',
    image: IMAGES.road,
    alt: 'Highway road used for interstate removals from Newcastle',
    body: 'Moving out of NSW or relocating to Newcastle from interstate? Our team handles long distance moves with secure loading, careful wrapping and clear communication on pickup and delivery times.',
    points: ['Sydney, Brisbane, Melbourne, Canberra', 'Secure load and tie-down', 'Clear pickup and delivery windows', 'Dedicated or shared loads'],
  },
];

export const PACKING = {
  title: 'Packing Assistance',
  heading: 'Packing Assistance in Newcastle',
  teaser: 'Add it to any booking. We bring the cartons, paper and bubble wrap and pack the breakables for you.',
  body: 'Short on time? Our team can pack your kitchen, fragile items or the whole home with quality boxes and wrapping, so everything arrives in one piece.',
  image: IMAGES.boxes,
};

export const AREAS = [
  'Newcastle', 'Newcastle East', 'Merewether', 'Hamilton', 'The Junction', 'Mayfield', 'Wallsend',
  'Charlestown', 'Kotara', 'Adamstown', 'Lambton', 'Jesmond', 'Warabrook', 'Belmont', 'Lake Macquarie',
  'Cardiff', 'Toronto', 'Swansea', 'Maitland', 'East Maitland', 'Rutherford', 'Thornton', 'Cessnock',
  'Kurri Kurri', 'Raymond Terrace', 'Port Stephens', 'Nelson Bay', 'Medowie', 'Hunter Valley', 'Central Coast',
];

export const VALUES = [
  { icon: 'ShieldCheck', title: 'Reliable', text: 'We turn up on time, on the day we promised, with the right truck and the right crew.' },
  { icon: 'PackageCheck', title: 'Safe', text: 'Every piece is blanket wrapped, strapped and loaded properly. Your belongings are protected the whole way.' },
  { icon: 'BadgeCheck', title: 'Professional', text: 'Uniformed, friendly removalists, clear quotes with no surprises, and a team that treats your home with respect.' },
];

// About page only (different wording to the Home page)
export const ABOUT_VALUES = [
  { icon: 'ShieldCheck', title: 'Reliable', text: 'Your booking is locked in. If traffic shifts our arrival, you hear from us before you have to ask.' },
  { icon: 'PackageCheck', title: 'Safe', text: 'Padded blankets, film wrap, mattress bags and tie-down straps come on every job as standard.' },
  { icon: 'BadgeCheck', title: 'Professional', text: 'MTR Removals crews arrive in uniform, work tidy, and finish with furniture placed where you want it.' },
];

export const PROPERTY_TYPES = [
  'Apartments and units', 'Townhouses', 'Family homes', 'Granny flats', 'Retirement villas', 'Rental properties',
  'Offices', 'Retail shops', 'Medical clinics', 'Storage units', 'Student share houses',
];

export const STEPS = [
  { n: '01', title: 'Call or request a quote', text: 'Tell us what you are moving, where from and where to. Takes two minutes.' },
  { n: '02', title: 'Lock in your date', text: 'We confirm a clear price and the time our truck will arrive.' },
  { n: '03', title: 'We move you', text: 'Our crew wraps, loads, transports and places everything where you want it.' },
];

export const FAQS = [
  {
    q: 'How much do removalists cost in Newcastle?',
    a: 'Price depends on the size of your move, distance, access (stairs, lifts, long walks) and whether you need packing. Call 0469 799 346 or send a quote request and we will give you a clear price before moving day.',
  },
  {
    q: 'How far in advance should I book my move?',
    a: 'One to two weeks ahead is ideal, and earlier for end of month, weekends and school holidays. Need to move sooner? Call us, we often have same week availability.',
  },
  {
    q: 'Do you move outside Newcastle?',
    a: 'Yes. We cover Newcastle, Lake Macquarie, Maitland, Port Stephens, Cessnock and the wider Hunter region, and we do interstate moves to Sydney, Brisbane, Melbourne and more.',
  },
  {
    q: 'Do you wrap and protect furniture?',
    a: 'Yes. Furniture is wrapped in moving blankets and stretch wrap, mattresses go into covers, and everything is strapped inside the truck so nothing shifts.',
  },
  {
    q: 'Can you pack for me?',
    a: 'Yes. We offer full or partial packing assistance, including kitchens and fragile items. Just tick packing help on the quote form or mention it when you call.',
  },
  {
    q: 'Do you move single items?',
    a: 'Yes. We do single item furniture removals such as sofas, fridges, washing machines, wardrobes and Marketplace pick-ups.',
  },
];
