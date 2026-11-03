import { AmenityItem, TownshipConcept } from '@/types/plot';

/**
 * 10 Verified Brochure Amenities categorized under a 3-tier delivery status:
 * Existing (On-site confirmed in Phase 0 audit)
 * Under Development
 * Planned (Township blueprint)
 */
export const PROJECT_AMENITIES: AmenityItem[] = [
  {
    id: 'amenity-roads',
    name: 'Well Developed Blacktop Roads',
    category: 'Infrastructure',
    status: 'Existing',
    description: 'Tarred 30ft & 40ft wide internal spine roads with white boundary kerbstones laid across layout sectors.',
    evidenceNotes: 'Photographically audited on-site and confirmed in reference images.',
  },
  {
    id: 'amenity-fencing',
    name: 'Secure Perimeter Fencing',
    category: 'Infrastructure',
    status: 'Existing',
    description: 'Concrete post perimeter fencing enclosing layout boundaries for physical security and boundary protection.',
    evidenceNotes: 'Photographically audited on-site.',
  },
  {
    id: 'amenity-demarcation',
    name: 'Individual Survey Demarcation Stones',
    category: 'Infrastructure',
    status: 'Existing',
    description: 'Concrete boundary pegs with numbered survey markings (such as Stone 85) planted for every plot.',
    evidenceNotes: 'Demarcation stone 85 audited on ground photograph.',
  },
  {
    id: 'amenity-trees',
    name: 'Avenue Plantation & Green Landscaping',
    category: 'Nature',
    status: 'Under Development',
    description: 'Shade-giving avenue trees and native flowering shrubs bordering internal roads for microclimate comfort.',
    evidenceNotes: 'Work in progress along Phase 1 & 2 corridors.',
  },
  {
    id: 'amenity-streetlights',
    name: 'Solar & LED Street Lighting',
    category: 'Infrastructure',
    status: 'Under Development',
    description: 'Energy-efficient street lighting poles positioned along key road intersections.',
    evidenceNotes: 'Pole installation underway.',
  },
  {
    id: 'amenity-arch',
    name: 'Grand Entrance Arch & Security Cabin',
    category: 'Community',
    status: 'Under Development',
    description: 'Monumental gateway directly facing the Chennai–Tirupati National Highway with 24/7 security watch post.',
    evidenceNotes: 'Foundation laid at Krishnapuram frontage.',
  },
  {
    id: 'amenity-pool',
    name: 'Swimming Pool & Sun Deck',
    category: 'Recreation',
    status: 'Planned',
    description: 'Resort-style recreational pool designed for community wellness and family leisure.',
    evidenceNotes: 'Featured in official project brochure concept plan.',
  },
  {
    id: 'amenity-clubhouse',
    name: 'Community Club House & Indoor Games',
    category: 'Community',
    status: 'Planned',
    description: 'Multipurpose clubhouse featuring table tennis, carrom, chess, and residents lounge.',
    evidenceNotes: 'Featured in official project brochure concept plan.',
  },
  {
    id: 'amenity-spa',
    name: 'Health Spa & Wellness Retreat',
    category: 'Wellness',
    status: 'Planned',
    description: 'Therapeutic wellness space dedicated to healthy, rejuvenating living in a peaceful countryside atmosphere.',
    evidenceNotes: 'Featured in brochure wellness section.',
  },
  {
    id: 'amenity-lawn',
    name: 'Multi-Function Lawn & Kids Play Area',
    category: 'Recreation',
    status: 'Planned',
    description: 'Expansive open grass lawn with open-air stage for community celebrations and safe children playground equipment.',
    evidenceNotes: 'Featured in brochure recreation section.',
  },
];

/**
 * 6 Residential Township Concepts featured in official brochure
 */
export const TOWNSHIP_CONCEPTS: TownshipConcept[] = [
  {
    id: 'concept-township',
    title: 'Integrated Residential Township',
    subtitle: 'Clear title, planned avenues, and lifelong security',
    description: 'A master-planned plotted enclave designed with wide roads, organized plot blocks, and seamless highway access for your custom dream home.',
    status: 'Featured in Brochure',
  },
  {
    id: 'concept-retirement',
    title: 'Retirement Community Sanctuary',
    subtitle: 'Peaceful, pollution-free living surrounded by greenery',
    description: 'Serene, clean-air environment away from urban chaos, offering walking trails, fresh groundwater, and close proximity to Thiruvallur temples and healthcare.',
    status: 'Featured in Brochure',
  },
  {
    id: 'concept-namma-gramam',
    title: 'Namma Gramam Cultural Ethos',
    subtitle: 'Rooted in village warmth and organic community bonding',
    description: 'Embracing the rich heritage of Tamil countryside living with open community courtyards, festival spaces, and traditional togetherness.',
    status: 'Featured in Brochure',
  },
  {
    id: 'concept-farmland',
    title: 'Agri & Farmland Living',
    subtitle: 'Fertile red-soil terrain ideal for organic kitchen gardens',
    description: 'Generous plot proportions with fertile soil and high water table, ideal for planting fruit-bearing trees, flowering gardens, and sustainable living.',
    status: 'Featured in Brochure',
  },
  {
    id: 'concept-adventure',
    title: 'Adventure Sports & Outdoor Activity',
    subtitle: 'Active recreation for children and fitness enthusiasts',
    description: 'Dedicated zones for cycling tracks, jogging loops, badminton, and outdoor sports amidst picturesque open horizons.',
    status: 'Featured in Brochure',
  },
  {
    id: 'concept-resort-spa',
    title: 'Holiday Resort & Spa Experience',
    subtitle: 'Weekend rejuvenation without leaving your township',
    description: 'Designed as a tranquil weekend getaway offering resort-inspired relaxation, pristine open skies, and rejuvenating wellness amenities.',
    status: 'Featured in Brochure',
  },
];

export const CONNECTIVITY_LANDMARKS = [
  { name: 'Chennai–Tirupati National Highway (NH 716)', type: 'Immediate Frontage', distance: '0 km (Direct Access)' },
  { name: 'Krishnapuram Bus Stop', type: 'Public Transit', distance: 'Walking distance (approx. 400 m)' },
  { name: 'Thiruvallur Railway Station & Town Hub', type: 'Rail & City Center', distance: 'Approx. 8–10 km' },
  { name: 'Sri Veeraraghava Swamy Temple, Thiruvallur', type: 'Heritage & Pilgrimage', distance: 'Approx. 9 km' },
  { name: 'Pudur / Tirutani Highway Corridor', type: 'Corridor Connection', distance: 'Immediate connecting route' },
  { name: 'Chennai Outer Ring Road (ORR) Junction', type: 'Metropolitan Expressway', distance: 'Direct highway drive via NH 716' },
];
