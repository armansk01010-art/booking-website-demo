import { RoomCategory, ExperienceItem, DiningVenue, GalleryPhoto, BookingAddon } from '../types/retreat';

export const RESORT_IMAGES = {
  hero: '/src/assets/images/hero_resort_exterior_1794218953665.jpg',
  villaPool: '/src/assets/images/villa_pool_deck_1794218954139.jpg',
  dining: '/src/assets/images/dining_pavilion_1794218955598.jpg',
  spa: '/src/assets/images/spa_wellness_bath_1794218956117.jpg',
  gardenRoom: '/src/assets/images/room_garden_view_1794218976247.jpg',
  deluxeValley: '/src/assets/images/room_deluxe_valley_1794218976621.jpg',
  premiumSuite: '/src/assets/images/room_premium_suite_1794218977814.jpg',
};

export const ROOM_CATEGORIES: RoomCategory[] = [
  {
    id: 'garden-view',
    slug: 'garden-view-room',
    name: 'Garden View Room',
    tagline: 'Secluded sanctuary enveloped by native ferns and aromatic coffee shrubs',
    pricePerNight: 5500,
    maxGuests: 2,
    areaSqFt: 420,
    bedType: 'Custom Handcrafted Teak King Bed',
    view: 'Private Tropical Botanical Garden',
    description:
      'Immerse in grounding tranquility. The Garden View Room opens onto a private stone sit-out courtyard shaded by silver oak and wild cardamom, featuring open-air monsoon showers and artisan earthen finishes.',
    detailedStory:
      'Crafted with locally reclaimed timber and natural lime-plastered walls, the Garden View Room is conceived as a mindful sanctuary away from sensory noise. Large sliding timber-framed screens dissolve the boundary between your sleeping quarters and the verdant native flora outside. Begin each morning with bird calls from the canopy and freshly hand-brewed estate coffee on your secluded verandah.',
    primaryImage: RESORT_IMAGES.gardenRoom,
    galleryImages: [
      RESORT_IMAGES.gardenRoom,
      RESORT_IMAGES.spa,
      RESORT_IMAGES.hero,
    ],
    features: [
      '420 sq. ft. living space with private garden verandah',
      'Artisan-crafted teak king bed with organic Belgian linen',
      'Open-to-sky stone monsoon rain shower',
      'In-room single-estate organic tea & pour-over coffee bar',
      'Hand-woven jute rugs and botanical earthen pottery',
    ],
    amenities: [
      'Complimentary estate breakfast',
      'High-speed fiber Wi-Fi',
      'Kama Ayurveda organic bath amenities',
      'Custom brass French press & freshly roasted beans',
      'Natural climate control & silent ceiling fan',
      'Hand-poured beeswax evening turn-down candles',
      'Safety deposit safe & artisanal canvas robes',
      'Refillable copper water carafes',
    ],
    inclusions: [
      'Daily morning guided forest meditation session',
      'Estate high-tea at The Prana Pavilion',
      'Access to natural spring pool & sauna',
      'Welcome botanical herbal elixir upon arrival',
    ],
    sampleAvailability: 4,
  },
  {
    id: 'deluxe-valley',
    slug: 'deluxe-valley-room',
    name: 'Deluxe Valley Room',
    tagline: 'Perched high with sweeping panoramas of rolling mist and emerald ridges',
    pricePerNight: 7500,
    maxGuests: 2,
    areaSqFt: 580,
    bedType: 'King Canopy Bed in Solid Teak',
    view: 'Panoramic Rainforest Valley & Sunrise Ridge',
    description:
      'Elevated along the ridge line, the Deluxe Valley Room offers dramatic unbroken vistas across the misty river gorge. Features a freestanding hand-carved river stone soaking tub with floor-to-ceiling valley views.',
    detailedStory:
      'Positioned to capture both the ethereal morning valley mist and the golden afternoon light filtering through ancient cedar crowns, this room celebrates spatial elegance. An expansive timber sun deck extends toward the horizon, inviting quiet contemplation with binoculars for hornbill spotting. Inside, warm oak flooring and linen upholstery provide an intimate haven.',
    primaryImage: RESORT_IMAGES.deluxeValley,
    galleryImages: [
      RESORT_IMAGES.deluxeValley,
      RESORT_IMAGES.dining,
      RESORT_IMAGES.hero,
    ],
    features: [
      '580 sq. ft. architectural space with expansive viewing deck',
      'Freestanding artisan river-stone bathtub overlooking the gorge',
      'Deep timber daybed for valley reading and stargazing',
      'Twin vanity with hammered bronze sinks',
      'Binoculars and regional flora & fauna field guide',
    ],
    amenities: [
      'Complimentary chef-prepared breakfast spread',
      'In-room soaking bath salts infused with eucalyptus & camphor',
      'Kama Ayurveda restorative bath care collection',
      'Complimentary high-speed Wi-Fi',
      'Artisan pour-over coffee setup with local microlot roasts',
      'Bespoke organic linen robes & woven slippers',
      'In-room climate control with dehumidification',
      'Curated bedside book library on ecology and poetry',
    ],
    inclusions: [
      'Morning guided estate walk with resident naturalist',
      'Sunset herbal tea ceremony overlooking the valley',
      'Unlimited access to the infinity pool & steam room',
      'Daily seasonal fruit basket & roasted seed treats',
    ],
    sampleAvailability: 3,
  },
  {
    id: 'premium-suite',
    slug: 'premium-suite',
    name: 'Premium Suite',
    tagline: 'Expansive private pavilion with dedicated living quarters and sun terrace',
    pricePerNight: 10500,
    maxGuests: 2,
    areaSqFt: 850,
    bedType: 'Custom Grand King Bed with Goose-Down Topper',
    view: 'Dual-Aspect Valley & Forest Canopy',
    description:
      'A sprawling retreat featuring an open-concept timber living pavilion, separate master bedroom, sunken indoor bathing sanctuary, and an expansive wraparound deck framed by towering bamboo groves.',
    detailedStory:
      'The Premium Suite was created for those who cherish generous space and refined architectural intimacy. The separate pavilion lounge features a hand-hewn tree trunk table, low-slung linen sofa, and floor-to-ceiling glass doors that glide open to catch the mountain breezes. A dedicated retreat host caters to your itinerary, arranging in-suite dining or private yoga whenever desired.',
    primaryImage: RESORT_IMAGES.premiumSuite,
    galleryImages: [
      RESORT_IMAGES.premiumSuite,
      RESORT_IMAGES.villaPool,
      RESORT_IMAGES.dining,
    ],
    features: [
      '850 sq. ft. dual-pavilion living and sleeping quarters',
      'Separate lounge with dining table and hand-loomed sofa',
      'Wraparound private hardwood balcony with dual chaise loungers',
      'Sunken slate plunge tub with forest skylight',
      'Dedicated Retreat Host (Butler service on request)',
    ],
    amenities: [
      'Full à la carte breakfast served in suite or pavilion',
      'Daily evening bespoke botanical mocktail and savoury bites',
      'Premium Marshall Bluetooth acoustic sound system',
      'Custom essential oil diffuser with seasonal herbal essences',
      'Unpacking and garment pressing service upon arrival',
      'Complimentary laundry service (up to 4 garments daily)',
      'Plush organic cotton towels and waffle robes',
      'Private mini-pantry stocked with artisanal snacks & cold-pressed tonics',
    ],
    inclusions: [
      'Private sunrise yoga session on your terrace (1 per stay)',
      'Complimentary 45-minute Ayurvedic head & foot relaxation ritual',
      'All-day artisanal tea and single-origin coffee service',
      'Priority reservations for cliffside romantic dining',
    ],
    sampleAvailability: 2,
  },
  {
    id: 'private-pool-villa',
    slug: 'private-pool-villa',
    name: 'Private Pool Villa',
    tagline: 'The pinnacle of secluded luxury with private infinity plunge pool and two suites',
    pricePerNight: 16500,
    maxGuests: 4,
    areaSqFt: 1450,
    bedType: 'Two Grand King Master Suites',
    view: '360° Uninterrupted Valley, River Gorge & Mist Canopy',
    description:
      'Our most exclusive sanctuary. Set on a private cliffside knoll, the villa features a private heated infinity stone plunge pool, secluded sun deck, two full master ensuite bedrooms, and an expansive central dining pavilion.',
    detailedStory:
      'Hidden behind lush walls of wild ginger and silver bamboo, the Private Pool Villa offers complete seclusion. Swim out to the edge of your personal heated stone pool as clouds drift gently through the valley below. Designed for discerning families or couples traveling together, this villa blends sustainable architectural grandeur with personalized service, including a private chef barbecue experience available on your pool terrace.',
    primaryImage: RESORT_IMAGES.villaPool,
    galleryImages: [
      RESORT_IMAGES.villaPool,
      RESORT_IMAGES.premiumSuite,
      RESORT_IMAGES.dining,
      RESORT_IMAGES.spa,
    ],
    features: [
      '1,450 sq. ft. private estate with walled courtyard & cliffside terrace',
      'Private 8m heated natural stone infinity plunge pool',
      'Two master suites with king beds and private stone ensuite baths',
      'Private dining pavilion with outdoor barbecue hearth',
      'Dedicated 24-hour Villa Host & Concierge',
    ],
    amenities: [
      'Custom breakfast prepared poolside by private chef',
      'Complimentary roundtrip airport / private station luxury transfer',
      'In-villa Ayurvedic massage setup on private deck',
      'Curated cellar selection of zero-proof botanical spirits and fine teas',
      'Subtle ambient landscape lighting and outdoor fire pit',
      'Complimentary unlimited daily laundry',
      'High-speed private mesh Wi-Fi network',
      'Private telescope on the deck for night constellation viewing',
    ],
    inclusions: [
      'Private 4-course bespoke dinner on your pool terrace (1 per stay)',
      'Complimentary 60-minute Ayurvedic massage for two guests',
      'Private guided plantation safari and waterfall trek',
      'Early check-in & late check-out priority subject to availability',
    ],
    sampleAvailability: 2,
  },
];

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: 'ayurveda-spa',
    title: 'The Lotus & Ayurveda Sanctuary',
    category: 'Wellness & Spa',
    duration: '60 – 120 mins',
    schedule: 'Daily, 08:00 – 19:30',
    image: RESORT_IMAGES.spa,
    shortDesc:
      'Time-honored Vedic wellness therapies administered by certified practitioners using herb-infused warm botanical oils.',
    fullDesc:
      'Tucked beside a natural mountain stream, the wellness pavilion uses medicinal herbs cultivated on the estate grounds. Treatments begin with a calming foot cleanse and herbal tea consultation, followed by personalized Abhyanga synchronised massage, Shirodhara oil flow, or warm herbal poultice therapies.',
    highlights: [
      'Authentic herbal oils formulated on-site with sesame and mountain botanicals',
      'Sunken granite floral soaking tubs overlooking natural spring waters',
      'Pre-treatment pulse diagnosis and dosha alignment consultation',
      'Open-air bamboo treatment suites with soothing water murmur',
    ],
    includedInStay: false,
    priceNote: 'Therapies from ₹2,400',
  },
  {
    id: 'horizon-pool',
    title: 'Spring-Fed Horizon Infinity Pool',
    category: 'Wellness & Spa',
    duration: 'All day leisure',
    schedule: 'Daily, 06:30 – 19:00',
    image: RESORT_IMAGES.villaPool,
    shortDesc:
      'A natural stone infinity pool seamlessly merging with the edge of the rainforest valley and distant mountain peaks.',
    fullDesc:
      'Carved into the natural hillside contour, the pool is fed by filtered mineral mountain springs and treated without harsh chemicals. Relax on hand-carved teak loungers shaded by linen umbrellas while attentive staff serve chilled fresh coconut water and seasonal fruit skewers.',
    highlights: [
      'Mineral spring-water filtration gentle on skin and eyes',
      'Unbroken panoramic vantage over the morning sea of clouds',
      'Adjacent heated thermal plunge tub and cedar sauna',
      'Complimentary infused waters and organic sun mist',
    ],
    includedInStay: true,
  },
  {
    id: 'prana-dining',
    title: 'The Prana Pavilion & Hearth',
    category: 'Dining & Hearth',
    duration: 'Breakfast, Lunch & Dinner',
    schedule: 'Daily, 07:00 – 22:30',
    image: RESORT_IMAGES.dining,
    shortDesc:
      'Hyper-seasonal farm-to-table cuisine celebrating native spices, heirloom grains, and regional culinary heritage.',
    fullDesc:
      'Set beneath lofty timber rafters open to the mountain breeze, The Prana Pavilion serves honest food deeply connected to the land. Our kitchen sources over 80% of ingredients from our own organic garden and smallholder farmers within a 20-kilometer radius.',
    highlights: [
      'Zero-kilometre vegetables, edible herbs, and unpolished heirloom rice',
      'Wood-fired clay oven breads and slow-simmered earthen pot curries',
      'Seasonal botanical tasting menu paired with artisanal infusions',
      'Candlelit terrace tables overlooking the twinkling gorge',
    ],
    includedInStay: true,
  },
  {
    id: 'bamboo-trail',
    title: 'Guided Wilderness & Canopy Trail',
    category: 'Outdoors & Wilderness',
    duration: '2.5 hours',
    schedule: 'Daily at 06:30 & 16:00',
    image: RESORT_IMAGES.hero,
    shortDesc:
      'Wander with our resident naturalist through ancient bamboo forests, hidden cascades, and rare medicinal groves.',
    fullDesc:
      'The 75-acre Vaana sanctuary is home to over 130 species of endemic birds, rare tree frogs, and ancient flora. Our naturalist introduces you to the delicate forest ecology, tracking wildlife signs and discovering indigenous foraging traditions.',
    highlights: [
      'Guided by passionate native naturalists and botanists',
      'High-grade binoculars and field spotting scopes provided',
      'Rest stop at a secluded natural stream waterfall',
      'Suitable for all fitness levels with gentle undulating paths',
    ],
    includedInStay: true,
  },
  {
    id: 'tea-estate',
    title: 'Artisanal Tea Plucking & Tasting Masterclass',
    category: 'Cultural & Estate',
    duration: '90 mins',
    schedule: 'Tuesdays, Thursdays & Saturdays at 11:00',
    image: RESORT_IMAGES.gardenRoom,
    shortDesc:
      'Hand-pick two leaves and a bud across heritage tea slopes followed by a sommelier cupping session.',
    fullDesc:
      'Experience the delicate craft of high-altitude orthodox tea making. Learn traditional hand-rolling techniques from fourth-generation tea masters and sample rare white, oolong, and silver needle teas harvested on the retreat ridge.',
    highlights: [
      'Traditional woven bamboo harvesting basket provided',
      'Comparative cupping of five micro-lot artisanal teas',
      'Take-home tin of your own hand-selected batch',
      'Accompanied by freshly baked cardamom scones and local honey',
    ],
    includedInStay: false,
    priceNote: '₹1,500 per guest',
  },
  {
    id: 'stargazing',
    title: 'Celestial Ridge Stargazing & Campfire',
    category: 'Outdoors & Wilderness',
    duration: '1.5 hours',
    schedule: 'Clear evenings at 20:30',
    image: RESORT_IMAGES.deluxeValley,
    shortDesc:
      'Deep dark sky astronomy far from urban light pollution with computerized celestial telescopes and warm cocoa.',
    fullDesc:
      'Because Vaana is nestled in an ecologically protected high valley with minimal light interference, the night sky comes alive in dazzling detail. Gaze at the rings of Saturn, nebulae, and stellar nurseries while wrapped in warm wool throws beside an open hearth.',
    highlights: [
      'Professional 10-inch reflector optical telescope',
      'Laser-guided constellation navigation and mythical storytelling',
      'Warm spiced organic hot chocolate and toasted estate chestnuts',
      'Acoustic traditional flute accompaniment',
    ],
    includedInStay: true,
  },
];

export const DINING_INFO: DiningVenue = {
  id: 'prana-pavilion',
  name: 'The Prana Pavilion',
  concept: 'Slow Food, Wild Herbs & Ancient Grains',
  timings: '07:00 – 10:30 (Breakfast) | 12:30 – 15:30 (Lunch) | 19:00 – 22:30 (Dinner)',
  cuisine: 'Progressive Regional & Vedic Inspired Gastronomy',
  setting: 'Open-sided teak pavilion perched above misty forest canopy',
  image: RESORT_IMAGES.dining,
  description:
    'Dining at Vaana is an act of nourishment and reverence. Executive Chef Ananya Sen crafts menus guided by the six Ayurvedic tastes (Shad Rasa), bringing together wild forest mushrooms, cold-pressed mustard oil, fermented sourdoughs, and freshly plucked organic greens.',
  menuHighlights: [
    {
      category: 'Morning Nourishment (07:00 – 10:30)',
      items: [
        {
          name: 'Steamed Heritage Red Rice Idli with Cardamom Pod Chutney',
          desc: 'Ancient grains ground fresh daily, served with raw coconut sambal and drumstick leaf broth',
          dietary: 'vegan',
          price: 'Included in stay',
        },
        {
          name: 'Wild Forest Honey & Roasted Spelt Porridge',
          desc: 'Simmered in slow-churned almond milk with toasted pumpkin seeds and stewed mountain plums',
          dietary: 'vegan',
          price: 'Included in stay',
        },
        {
          name: 'Free-Range Farm Egg Omelette with Foraged Forest Morels',
          desc: 'Fresh thyme from our kitchen patch, cultured hill butter, and toasted sourdough slice',
          dietary: 'organic',
          price: 'Included in stay',
        },
      ],
    },
    {
      category: 'Luncheon & Afternoon Hearth (12:30 – 15:30)',
      items: [
        {
          name: 'Smoked Green Banana & Jackfruit Kofta Curry',
          desc: 'Clay-pot braised in roasted coriander and stone-ground coconut cream, served with millet roti',
          dietary: 'vegetarian',
          price: '₹750',
        },
        {
          name: 'Estate Farm Green Salad with Wood-Pressed Mustard Dressing',
          desc: 'Crisp watercress, peppery radish, pickled ridge gourd ribbons, and toasted sesame crunch',
          dietary: 'vegan',
          price: '₹550',
        },
        {
          name: 'Slow-Cooked Free-Range Country Chicken with Black Sesame',
          desc: 'Heritage homestyle preparation spiced with roasted peppercorn and ginger root, unpolished rice',
          dietary: 'organic',
          price: '₹950',
        },
      ],
    },
    {
      category: 'Twilight & Dinner Feast (19:00 – 22:30)',
      items: [
        {
          name: 'Charred River Fish Wrapped in Turmeric Leaves',
          desc: 'Caught sustainably from upland stream, marinated in crushed kaffir leaf, raw turmeric, and shallots',
          dietary: 'organic',
          price: '₹1,150',
        },
        {
          name: 'Roasted Butternut Squash & Lotus Stem Risotto',
          desc: 'Prepared with short-grain fragrant rice, toasted pine nuts, cold-pressed virgin coconut milk',
          dietary: 'vegan',
          price: '₹850',
        },
        {
          name: 'Slow-Smoked Lamb Shanks with Star Anise & Mountain Cinnamon',
          desc: 'Eight-hour reduction served over whipped purple yam purée and charred young shallots',
          dietary: 'organic',
          price: '₹1,450',
        },
        {
          name: 'Warm Palm Jaggery Pudding with Smoked Coconut Sorbet',
          desc: 'Steamed in banana leaf parcels with crushed cardamom brittle and sea salt crystal',
          dietary: 'vegetarian',
          price: '₹480',
        },
      ],
    },
  ],
};

export const GALLERY_ITEMS: GalleryPhoto[] = [
  {
    id: 'g-1',
    title: 'Architectural Forest Pavilion at Twilight',
    category: 'property',
    caption: 'Reclaimed teak timbers and reflecting water ponds blending into the mountain slope',
    src: RESORT_IMAGES.hero,
    featured: true,
  },
  {
    id: 'g-2',
    title: 'Private Infinity Plunge Pool & Mist Deck',
    category: 'rooms',
    caption: 'Natural granite plunge pool overlooking the emerald canopy at dawn',
    src: RESORT_IMAGES.villaPool,
    featured: true,
  },
  {
    id: 'g-3',
    title: 'Candlelit Open-Air Dining Pavilion',
    category: 'dining',
    caption: 'Linen-draped evening tables lit by handcrafted bronze lanterns',
    src: RESORT_IMAGES.dining,
    featured: true,
  },
  {
    id: 'g-4',
    title: 'The Lotus Sunken Stone Soaking Bath',
    category: 'wellness',
    caption: 'Granite bath scattered with fresh white lotus and natural stream water',
    src: RESORT_IMAGES.spa,
    featured: true,
  },
  {
    id: 'g-5',
    title: 'Garden View Room Private Verandah',
    category: 'rooms',
    caption: 'Serene handcrafted king bed opening directly to native botanical gardens',
    src: RESORT_IMAGES.gardenRoom,
  },
  {
    id: 'g-6',
    title: 'Deluxe Valley Suite Balcony View',
    category: 'rooms',
    caption: 'Freestanding stone bathtub with unbroken vistas across mist-filled valleys',
    src: RESORT_IMAGES.deluxeValley,
  },
  {
    id: 'g-7',
    title: 'Premium Suite Living Pavilion',
    category: 'rooms',
    caption: 'Spacious timber lounge area with natural linen seating and open rafters',
    src: RESORT_IMAGES.premiumSuite,
  },
  {
    id: 'g-8',
    title: 'Pristine Mountain Ridges Surrounding Vaana',
    category: 'surroundings',
    caption: 'Protected rainforest buffer zone ensuring stillness and untouched biodiversity',
    src: RESORT_IMAGES.hero,
  },
];

export const BOOKING_ADDONS: BookingAddon[] = [
  {
    id: 'addon-spa',
    name: 'Traditional Ayurvedic Abhyanga Massage (60 min)',
    category: 'Wellness',
    price: 2400,
    unit: 'per person',
    description: 'Harmonizing warm herbal oil body massage tailored to your individual Ayurvedic dosha.',
  },
  {
    id: 'addon-dinner',
    name: 'Four-Course Candlelit Chef’s Degustation for Two',
    category: 'Dining',
    price: 3600,
    unit: 'per booking',
    description: 'Private candlelit table setup on the cliffside deck featuring rare estate ingredients and botanical pairings.',
  },
  {
    id: 'addon-trek',
    name: 'Private Sunrise Waterfall Trek & Breakfast Hamper',
    category: 'Experience',
    price: 1800,
    unit: 'per booking',
    description: 'Naturalist-led excursion to hidden cascades with warm artisanal croissants, organic fruit and coffee.',
  },
  {
    id: 'addon-transfer',
    name: 'Chauffeured Luxury Hybrid SUV Transfer (One-Way)',
    category: 'Transport',
    price: 2800,
    unit: 'per booking',
    description: 'Seamless arrival or departure transfer from Calicut Airport or Mysore Railway Station with cold towels & refreshments.',
  },
];

export const RESORT_FACTS = [
  { label: 'Estate Grounds', value: '75 Acres', note: 'Organic Sanctuary' },
  { label: 'Elevation', value: '1,150 m', note: 'Above Sea Level' },
  { label: 'Private Sanctuaries', value: '18 Units', note: 'Low Density' },
  { label: 'Solar & Spring Powered', value: '100%', note: 'Sustainable Energy' },
];
