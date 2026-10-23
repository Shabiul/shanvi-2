// Hand-maintained site data (fleet, tariffs, destinations, services...).
// Long-form SEO copy (FAQs, posts, page meta, reviews) lives in generated.ts.

export const site = {
  name: "Shanvi Tours & Travels",
  url: "https://www.shanvitoursandtravels.com",
  phone: "9611120023",
  phoneIntl: "+919611120023",
  phoneDisplay: "+91 96111 20023",
  phone2: "8050507333",
  email: "info@shanvitoursandtravels.com",
  whatsapp: "919611120023",
  maps: "https://maps.app.goo.gl/xzitq4A2wqQ5V18X7",
  address: "#2472/1, 3rd Block, SMV Layout, Doddabasthihalli, Near Vijaya Hospital, Nagadevanahalli, Bangalore - 560056",
  rating: "5.0",
  reviewCount: 25,
  since: 2013,
};

export const waLink = (text?: string) =>
  `https://wa.me/${site.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ""}`;

export const nav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/fleet", label: "Fleet & Tariffs" },
  { href: "/21-seater-bus-rental-bangalore", label: "21 Seater", hot: true },
  { href: "/blog", label: "Blog" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
];

/** Seat rows: "L" seat, "_" aisle. Rendered left→right, front→back. */
export type Vehicle = {
  id: "12" | "21" | "25" | "33" | "45" | "49";
  name: string;
  seats: string;
  capacity: number;
  minPax: number;
  maxPax: number;
  anchor: string;
  plate: string;
  chassis: string;
  /** credit marks a licensed stock photo standing in for a vehicle we have no own photos of. */
  images: { src: string; alt: string; credit?: string }[];
  local: number;
  localLabel: string;
  extraKm: number;
  extraHr: number;
  rateMin: number;
  rateMax: number;
  bata: number;
  ideal: string;
  desc: string;
  tag?: string;
  page?: string;
  layout: string[];
  perks: string[];
};

// Vehicle photo albums, sorted by the number plate visible in the photos. Clicking
// any of these anywhere on the site opens only that vehicle's album
// (components/photo-viewer.tsx); the first two double as the fleet card photos.
const pic = (file: string, alt: string) => ({ src: `/images/${file}.jpg`, alt });
const albums = {
  tempo: [
    pic("tempo/tempo-front-quarter", "Shanvi Tours & Travels 12+1 Seater Tempo Traveller Bangalore exterior"),
    pic("tempo/tempo-interior-lights", "12+1 Seater Tempo Traveller interior with pushback captain seats"),
    pic("tempo/tempo-side", "Force Tempo Traveller side view, Shanvi Tours & Travels fleet"),
    pic("tempo/tempo-front", "Tempo Traveller front with illuminated grille"),
    pic("tempo/tempo-rear-quarter", "Tempo Traveller rear three-quarter view"),
    pic("tempo/tempo-rear", "Tempo Traveller rear doors and roof ladder"),
    pic("tempo/tempo-side-pink", "Tempo Traveller at dusk with ambient lighting"),
    pic("tempo/tempo-interior-ceiling", "Tempo Traveller cabin with illuminated ceiling panels"),
    pic("tempo/tempo-ceiling-art", "Custom illuminated ceiling art inside a Shanvi Tempo Traveller"),
  ],
  mini: [pic("fleet/mini-bus-exterior", "Shanvi Tours & Travels 21+1 Seater Mercedes Mini Bus Bangalore KA 51 AB 8485")],
  touring: [
    pic("coach/coach-sunset-side", "Shanvi Tours & Travels 33+1 Seater Touring Coach at sunset, Bangalore"),
    pic("coach/coach-interior-aisle", "33+1 Touring Coach interior with red carpet aisle and pushback seats"),
    pic("coach/coach-front-dusk", "33+1 Touring Coach KA 51 AL 7388 front lights at dusk"),
    pic("coach/coach-sunset-front", "33+1 Touring Coach front three-quarter view at sunset"),
    pic("fleet/bus-road-angle", "33+1 Touring Coach on a Bangalore road"),
    pic("fleet/bus-city-street", "33+1 Touring Coach parked on a city street"),
    pic("coach/bus-rear", "33+1 Touring Coach rear with Shanvi branding"),
    pic("coach/coach-interior-seats", "33+1 Touring Coach pushback seats with ambient lighting"),
  ],
  luxury: [
    pic("fleet/luxury-bus-exterior", "Shanvi Tours & Travels 49+1 Seater Luxury Coach KA 51 AL 4498, Bangalore"),
    pic("fleet/luxury-bus-interior", "49+1 Luxury Coach interior with red carpet aisle and plush pushback upholstery"),
    pic("fleet/luxury-bus-temple-1", "49+1 Luxury Coach on a pilgrimage tour from Bangalore"),
    pic("fleet/luxury-bus-parked", "49+1 Luxury Coach parked at a temple, ready for departure"),
    pic("fleet/luxury-bus-temple-2", "49+1 Luxury Coach on a temple pilgrimage circuit"),
    pic("coach/bus-side", "49+1 Luxury Coach side profile"),
  ],
  seater25: [
    pic("seater25/side-front", "Shanvi Tours & Travels 25+1 Seater Mini Coach Bangalore exterior"),
    pic("seater25/front", "25+1 Seater Mini Coach front with Shanvi windscreen branding"),
    pic("seater25/interior-covers", "25+1 Seater Mini Coach interior with Shanvi seat covers and curtains"),
    pic("seater25/side", "25+1 Seater Mini Coach side view with luggage hold"),
    pic("seater25/rear", "25+1 Seater Mini Coach rear with Shanvi Tours & Travels branding"),
    pic("seater25/interior-aisle", "25+1 Seater Mini Coach aisle with pushback seats and red carpet"),
  ],
};
// No own photos yet: licensed stock stand-ins, shown with a "Representative photo"
// tag and credit, and kept out of the gallery (which promises real fleet photos).
const pexels = "Photo: Pexels";
const stock = {
  coach45: [
    { ...pic("stock/coach-45-front", "Representative photo of a 45+1 seater white luxury coach, front view"), credit: pexels },
    { ...pic("stock/coach-45-interior", "Representative photo of a 45+1 seater coach interior with pushback seats and TV screens"), credit: pexels },
    { ...pic("stock/coach-45-rear", "Representative photo of a 45+1 seater white luxury coach, rear view"), credit: pexels },
  ],
};
// Re-saved copies of album photos that some pages still reference.
const photoAliases: Record<string, string> = {
  "/images/fleet/tempo-traveller-exterior.jpg": "/images/tempo/tempo-front.jpg",
  "/images/fleet/tempo-traveller-interior.jpg": "/images/tempo/tempo-interior-ceiling.jpg",
  "/images/fleet/mini-bus-interior.jpg": "/images/tempo/tempo-side.jpg",
  "/images/fleet/bus-exterior.jpg": "/images/coach/coach-front-dusk.jpg",
  "/images/fleet/bus-interior.jpg": "/images/coach/coach-interior-aisle.jpg",
};

export const fleet: Vehicle[] = [
  {
    id: "12",
    name: "Tempo Traveller",
    seats: "12+1 Seater",
    capacity: 12,
    minPax: 1,
    maxPax: 12,
    anchor: "12-tempo-traveller",
    plate: "KA 51 AM 0045",
    chassis: "Force Motors",
    images: albums.tempo,
    local: 4500,
    localLabel: "8 hr / 80 km",
    extraKm: 20,
    extraHr: 250,
    rateMin: 24,
    rateMax: 26,
    bata: 500,
    ideal: "Families, small groups, airport runs, corporate pickups",
    desc: "Our most-booked vehicle for small groups and families. Pushback captain seats, curtained windows, and a roof-mounted AC make it ideal for weekend getaways, airport runs, and corporate pickups.",
    layout: ["L_LL", "L_LL", "L_LL", "L_LL"],
    perks: ["Captain pushback seats", "Roof-mounted dual AC", "Ambient cabin lighting", "Roof carrier + rear boot"],
  },
  {
    id: "21",
    name: "Mercedes Mini Bus",
    seats: "21+1 Seater",
    capacity: 21,
    minPax: 13,
    maxPax: 21,
    anchor: "21-mini-bus",
    plate: "KA 51 AB 8485",
    chassis: "Mercedes-Benz · Singh Motor Coach Builders",
    images: albums.mini,
    local: 6500,
    localLabel: "8 hr / 80 km",
    extraKm: 26,
    extraHr: 350,
    rateMin: 32,
    rateMax: 36,
    bata: 600,
    tag: "Most popular",
    page: "/21-seater-bus-rental-bangalore",
    ideal: "14–21 passengers: team offsites, college tours, family weddings, road trips",
    desc: "Executive 21+1 Seater Mercedes-Chassis Mini Coach built by Singh Motor Coach Builders. Plush 2x2 pushback reclining seats, high-efficiency dual AC, mobile charging points, LED audio-visual system, and a deep luggage boot. The #1 rated vehicle in Bangalore for corporate team outings, wedding guest loops, college excursions, and outstation road trips to Coorg, Ooty, Chikmagalur & Mysore.",
    layout: ["LL_LL", "LL_LL", "LL_LL", "LL_LL", "LLLLL"],
    perks: ["2x2 pushback recliners", "USB charging every row", "LED TV + PA mic", "18–20 bag boot"],
  },
  {
    id: "25",
    name: "Mini Coach",
    seats: "25+1 Seater",
    capacity: 25,
    minPax: 22,
    maxPax: 25,
    anchor: "25-mini-coach",
    plate: "",
    chassis: "Shanvi 25+1 mini coach",
    images: albums.seater25,
    local: 7500,
    localLabel: "8 hr / 80 km",
    extraKm: 30,
    extraHr: 400,
    rateMin: 36,
    rateMax: 40,
    bata: 650,
    ideal: "22–25 passengers: office outings, extended families, college groups",
    desc: "A 25+1 seater mini coach for groups that just outgrow a mini bus. Pushback seats with Shanvi seat covers, curtained windows, a red-carpet aisle, and an underfloor luggage hold — it suits city outings, airport transfers, and weekend trips to Mysore, Coorg, and Chikmagalur.",
    layout: ["LL_LL", "LL_LL", "LL_LL", "LL_LL", "LL_LL", "LLLLL"],
    perks: ["Pushback seats", "Curtained windows", "Underfloor luggage hold", "Speed-governed 80 km/h"],
  },
  {
    id: "33",
    name: "Touring Coach",
    seats: "33+1 Seater",
    capacity: 33,
    minPax: 26,
    maxPax: 33,
    anchor: "33-tourist-bus",
    plate: "KA 51 AL 7388",
    chassis: "Full-size touring coach",
    images: albums.touring,
    local: 9000,
    localLabel: "8 hr / 80 km",
    extraKm: 35,
    extraHr: 450,
    rateMin: 42,
    rateMax: 46,
    bata: 700,
    ideal: "26–33 passengers: pilgrimages, school trips, inter-state holidays",
    desc: "A full-size touring coach with pushback reclining seats and generous legroom, built for long outstation routes across Karnataka, Kerala, Tamil Nadu, Telangana, and Andhra Pradesh.",
    layout: ["LL_LL", "LL_LL", "LL_LL", "LL_LL", "LL_LL", "LL_LL", "LL_LL", "LLLLL"],
    perks: ["2x2 coach pushback", "30+ suitcase bay", "Reading lights", "Speed-governed 80 km/h"],
  },
  {
    id: "45",
    name: "Premium Coach",
    seats: "45+1 Seater",
    capacity: 45,
    minPax: 34,
    maxPax: 45,
    anchor: "45-premium-coach",
    plate: "",
    chassis: "Full-size premium coach",
    images: stock.coach45,
    local: 14000,
    localLabel: "8 hr / 80 km",
    extraKm: 48,
    extraHr: 600,
    rateMin: 54,
    rateMax: 60,
    bata: 800,
    ideal: "34–45 passengers: corporate events, wedding guests, long-distance tours",
    desc: "A full-size 45+1 seater premium coach with 2x2 pushback recliners, onboard TV screens, and a large underfloor luggage hold — built for corporate events, wedding guest movement, and multi-day tours across South India.",
    layout: ["LL_LL", "LL_LL", "LL_LL", "LL_LL", "LL_LL", "LL_LL", "LL_LL", "LL_LL", "LL_LL", "LL_LL", "LLLLL"],
    perks: ["2x2 pushback recliners", "Onboard TV screens", "Underfloor luggage hold", "Curtained windows"],
  },
  {
    id: "49",
    name: "Luxury Coach",
    seats: "49+1 Seater",
    capacity: 49,
    minPax: 46,
    maxPax: 50,
    anchor: "49-luxury-bus",
    plate: "KA 51 AL 4498",
    chassis: "Flagship luxury coach",
    images: albums.luxury,
    local: 12000,
    localLabel: "8 hr / 80 km",
    extraKm: 45,
    extraHr: 550,
    rateMin: 50,
    rateMax: 58,
    bata: 800,
    tag: "Wedding flagship",
    ideal: "46–50 passengers: weddings (200+ guest convoys), summits, large tours",
    desc: "Our flagship coach — 49+1 Luxury Coach with red carpet aisle and plush pushback upholstery, onboard LED entertainment screen, and deep luggage hold. Deployed for wedding transport logistics, multi-vehicle coordinated convoys for weddings with 200+ guests, continuous shuttle loops between guest hotels and reception venues, and multi-day South India tours.",
    layout: ["LL_LL", "LL_LL", "LL_LL", "LL_LL", "LL_LL", "LL_LL", "LL_LL", "LL_LL", "LL_LL", "LL_LL", "LL_LL", "LLLLL"],
    perks: ["Red carpet aisle", "LED entertainment screen", "Underfloor cargo hold", "Ambient mood lighting"],
  },
];

/** The album (vehicle photos) a site image belongs to, or null if it is not a vehicle photo. */
export function albumFor(src: string) {
  const s = photoAliases[src] ?? src;
  for (const v of fleet) {
    const index = v.images.findIndex((p) => p.src === s);
    if (index >= 0) return { title: `${v.name} · ${v.seats}`, photos: v.images, index };
  }
  return null;
}

export const vehicleFor = (pax: number) => fleet.find((v) => pax <= v.maxPax) ?? fleet[fleet.length - 1];

export const services = [
  {
    id: "employee-transport",
    title: "Employee Transport",
    short: "Daily staff shuttles on 12+1 Tempo Travellers and 21+1 Mini Buses with route tracking across Bangalore IT corridors.",
    image: "/images/services/employee-transport.jpg",
    icon: "users",
  },
  {
    id: "corporate",
    title: "Corporate Bus Rental",
    short: "Executive transport for offsites, client visits and conferences in 21, 33 or 49-seater AC coaches with GST invoicing.",
    image: "/images/services/corporate.jpg",
    icon: "briefcase",
  },
  {
    id: "wedding",
    title: "Wedding Transport Logistics",
    short: "49+1 Luxury Coach with red carpet aisle, coordinated convoys for 200+ guests and hotel-to-venue shuttle loops.",
    image: "/images/coach/coach-interior-aisle.jpg",
    icon: "heart",
    tag: "Nov–Feb season",
  },
  {
    id: "school-college",
    title: "School & College Trips",
    short: "Field visits and multi-day student tours on 33+1 and 49+1 seaters with speed governors and safety briefings.",
    image: "/images/fleet/luxury-bus-parked.jpg",
    icon: "graduation",
  },
  {
    id: "outstation",
    title: "Outstation Bus Rental",
    short: "One-way and round trips across Karnataka, Kerala, Tamil Nadu, Andhra Pradesh and Telangana with highway-seasoned drivers.",
    image: "/images/coach/coach-sunset-front.jpg",
    icon: "road",
  },
  {
    id: "package-tours",
    title: "Pilgrimage & Package Tours",
    short: "Temple circuits to Tirupati, Dharmasthala, Kukke and Hampi, plus custom South India holidays sized to your group.",
    image: "/images/fleet/luxury-bus-temple-2.jpg",
    icon: "temple",
  },
] as const;

export const destinations = [
  { slug: "mysore", name: "Mysore", state: "Karnataka", km: 150, hrs: "2.5", lat: 12.3, lng: 76.64, img: "/images/destinations/mysore.jpg", desc: "Palace tours, Chamundi Hills, Brindavan Gardens via the expressway." },
  { slug: "coorg", name: "Coorg", state: "Karnataka", km: 270, hrs: "5.5", lat: 12.42, lng: 75.74, img: "/images/destinations/coorg.jpg", desc: "Coffee country — Abbey Falls, Raja's Seat, Madikeri Fort." },
  { slug: "chikmagalur", name: "Chikmagalur", state: "Karnataka", km: 245, hrs: "4.5", lat: 13.32, lng: 75.77, img: "/images/destinations/chikmagalur.jpg", desc: "Mullayanagiri, Baba Budangiri and Hebbe Falls in the Western Ghats." },
  { slug: "gokarna", name: "Gokarna", state: "Karnataka", km: 485, hrs: "9", lat: 14.55, lng: 74.32, img: "/images/destinations/gokarna.jpg", desc: "Om Beach, Kudle Beach and the Mahabaleshwar Temple." },
  { slug: "wayanad", name: "Wayanad", state: "Kerala", km: 280, hrs: "6", lat: 11.61, lng: 76.08, img: "/images/destinations/wayanad.jpg", desc: "Edakkal Caves, Banasura Sagar Dam and Chembra Peak." },
  { slug: "alleppey", name: "Alleppey", state: "Kerala", km: 540, hrs: "10", lat: 9.49, lng: 76.33, img: "/images/destinations/alleppey.jpg", desc: "Backwater cruises, houseboats and coastal culture." },
  { slug: "munnar", name: "Munnar", state: "Kerala", km: 510, hrs: "10", lat: 10.09, lng: 77.06, img: "/images/destinations/munnar.jpg", desc: "Tea estates, Eravikulam National Park and Mattupetty Dam." },
  { slug: "ooty", name: "Ooty", state: "Tamil Nadu", km: 270, hrs: "6.5", lat: 11.41, lng: 76.7, img: "/images/destinations/ooty.jpg", desc: "Nilgiri Mountain Railway, Botanical Gardens and Pykara." },
  { slug: "pondicherry", name: "Pondicherry", state: "Tamil Nadu", km: 310, hrs: "6.5", lat: 11.94, lng: 79.81, img: "/images/destinations/pondicherry.jpg", desc: "Promenade Beach, Auroville and the French Quarter." },
  { slug: "yercaud", name: "Yercaud", state: "Tamil Nadu", km: 230, hrs: "5", lat: 11.78, lng: 78.21, img: "/images/destinations/yercaud.jpg", desc: "Shevaroy Hills, coffee groves and panoramic viewpoints." },
  { slug: "tirupati", name: "Tirupati", state: "Andhra Pradesh", km: 250, hrs: "5", lat: 13.63, lng: 79.42, img: "/images/destinations/tirupati.jpg", desc: "Lord Venkateswara Temple at Tirumala — one-day and multi-day packages." },
  { slug: "nellore", name: "Nellore", state: "Andhra Pradesh", km: 275, hrs: "5.5", lat: 14.44, lng: 79.99, img: "/images/destinations/nellore.jpg", desc: "Ranganathaswamy Temple, beaches and coastal routes." },
  { slug: "hyderabad", name: "Hyderabad", state: "Telangana", km: 570, hrs: "10", lat: 17.39, lng: 78.49, img: "/images/destinations/hyderabad.jpg", desc: "Charminar, Golconda Fort, Ramoji Film City via NH44." },
];

export const bangalore = { lat: 12.97, lng: 77.59 };

export const areas = [
  "Whitefield", "Electronic City", "Koramangala", "Indiranagar", "HSR Layout", "Marathahalli", "Jayanagar", "JP Nagar",
  "BTM Layout", "Yelahanka", "Hebbal", "Banashankari", "Malleshwaram", "Rajajinagar", "Sarjapur Road", "Bannerghatta Road",
  "KR Puram", "Bellandur", "Outer Ring Road", "Manyata Tech Park", "Bagmane Tech Park", "RT Nagar", "Yeshwanthpur",
  "Nagadevanahalli", "Kengeri", "RR Nagar", "SMV Layout", "Kempegowda Airport (BLR)",
];

export const credentials = [
  "5.0★ Google rating",
  "100% Yellow Board fleet",
  "AIS-140 GPS on every vehicle",
  "All India Tourist Permit",
  "GST invoicing",
  "Police-verified drivers",
  "24/7 live dispatch",
  "Since 2013",
];

export const stats = [
  { value: 12, suffix: "+", label: "Years on the road", sub: "Since 2013" },
  { value: 10000, suffix: "+", label: "Trips completed", sub: "Group journeys" },
  { value: 1.2, suffix: "M+", label: "Passenger-km", sub: "Navigated safely", decimals: 1 },
  { value: 5, suffix: "", label: "States covered", sub: "All India Tourist Permit" },
];

export const process = [
  { title: "Tell us the trip", text: "Headcount, dates, pickup and destination — by call, WhatsApp or the quote form." },
  { title: "Get a fixed quote", text: "We size the exact vehicle and send an itemised, all-inclusive quote with zero hidden charges." },
  { title: "Confirm & relax", text: "A small advance locks the vehicle. Driver and plate details reach you 24 hours before pickup." },
  { title: "Ride with us", text: "AIS-140 tracked, speed-governed, verified chauffeur — and a 24/7 dispatch desk on call." },
];

export const amenities = [
  { icon: "snow", title: "Dual-Zone Air Conditioned", text: "High-capacity cooling with individual overhead AC louvers for each seat row." },
  { icon: "gps", title: "AIS-140 GPS & Panic SOS", text: "Government-certified real-time telematics with emergency alert buttons." },
  { icon: "seat", title: "Pushback Reclining Seats", text: "Plush ergonomic seating with adjustable calf support and ample legroom." },
  { icon: "gauge", title: "Speed Governor Calibrated", text: "Speed limited to a safe 80 km/h in strict compliance with CMVR safety rules." },
  { icon: "bag", title: "Deep Underfloor Luggage Bay", text: "Dedicated boot space accommodating trolleys, duffels, and tour equipment." },
  { icon: "plug", title: "USB & Mobile Charging", text: "Convenient charging sockets along seat rows to keep passenger devices powered." },
  { icon: "music", title: "Audio & Video Entertainment", text: "Integrated Bluetooth music systems and LED display screen on luxury buses." },
  { icon: "aid", title: "First Aid & Fire Safety", text: "Comprehensive medical first-aid kits and operational dry-chemical fire extinguishers." },
];

export const team = [
  { name: "Pradeep H.B.", role: "Founder & Managing Director", text: "Founded Shanvi Tours & Travels in 2013. Guides overall fleet operations, enterprise customer relationships, corporate contracts, and strict compliance with the Karnataka Motor Vehicles Rules. Directly oversees large wedding convoys.", foot: "12+ Years Industry Experience" },
  { name: "Ramesh Kumar", role: "Fleet Safety & Driver Operations", text: "15+ years of highway logistics experience. Oversees driver police verification, CMVR fitness checks, AIS-140 GPS telematics monitoring, routine brake/tire inspections, and highway emergency protocols.", foot: "AIS-140 & CMVR Safety Lead" },
  { name: "Kiran Gowda", role: "Wedding Logistics & Route Dispatch", text: "Specialist in Bangalore wedding season logistics (Nov–Feb). Coordinates 49+1 Luxury Coach convoys for 200+ guests and continuous shuttle loops between guest hotels, reception halls, and airport terminals.", foot: "Wedding Convoy Specialist" },
];

export const galleryPhotos = fleet.flatMap((v) => v.images.filter((i) => !i.credit).map((i) => ({ ...i, label: `${v.name} · ${v.seats}` })));
