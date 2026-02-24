import mongoose from 'mongoose';
import { Category } from '../src/models/category.model.js';
import { TradeDeal } from '../src/models/trade-deal.model.js';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/trandora';

const categories = [
  { name: 'Textiles & Apparel', slug: 'textiles-apparel', level: 1, icon: '🧵' },
  { name: 'Food & Agriculture', slug: 'food-agriculture', level: 1, icon: '🌾' },
  { name: 'Handicrafts & Home Decor', slug: 'handicrafts-home-decor', level: 1, icon: '🏺' },
  { name: 'Gems & Jewellery', slug: 'gems-jewellery', level: 1, icon: '💎' },
  { name: 'Chemicals & Pharmaceuticals', slug: 'chemicals-pharmaceuticals', level: 1, icon: '🧪' },
  { name: 'Engineering & Machinery', slug: 'engineering-machinery', level: 1, icon: '⚙️' },
  { name: 'Leather & Footwear', slug: 'leather-footwear', level: 1, icon: '👞' },
  { name: 'Ayurveda & Wellness', slug: 'ayurveda-wellness', level: 1, icon: '🌿' },
];

const tradeDeals = [
  {
    name: 'India-UK Comprehensive Economic and Trade Agreement',
    shortCode: 'IN-UK-CETA',
    sourceCountry: 'India',
    destinationCountries: ['United Kingdom'],
    status: 'active' as const,
    effectiveDate: new Date('2025-07-01'),
    description: '0% duty on 99% of Indian exports to UK',
    coveragePercentage: 99,
  },
  {
    name: 'India-EU Free Trade Agreement',
    shortCode: 'IN-EU-FTA',
    sourceCountry: 'India',
    destinationCountries: [
      'Germany', 'France', 'Italy', 'Spain', 'Netherlands', 'Belgium',
      'Austria', 'Poland', 'Sweden', 'Denmark', 'Finland', 'Ireland',
      'Portugal', 'Greece', 'Czech Republic', 'Romania', 'Hungary',
      'Slovakia', 'Bulgaria', 'Croatia', 'Lithuania', 'Slovenia',
      'Latvia', 'Estonia', 'Luxembourg', 'Malta', 'Cyprus',
    ],
    status: 'pending_ratification' as const,
    effectiveDate: new Date('2026-01-27'),
    description: '30% at 0% immediately, 96.6% phased reduction',
    coveragePercentage: 96.6,
  },
  {
    name: 'India-US Interim Trade Deal',
    shortCode: 'IN-US-ITD',
    sourceCountry: 'India',
    destinationCountries: ['United States'],
    status: 'active' as const,
    effectiveDate: new Date('2026-02-02'),
    description: '18% average duty (down from 50%)',
    coveragePercentage: 60,
  },
  {
    name: 'India-EFTA Trade and Economic Partnership Agreement',
    shortCode: 'IN-EFTA-TEPA',
    sourceCountry: 'India',
    destinationCountries: ['Switzerland', 'Norway', 'Iceland', 'Liechtenstein'],
    status: 'active' as const,
    effectiveDate: new Date('2025-10-01'),
    description: 'Reduced duties on key Indian exports to EFTA nations',
    coveragePercentage: 75,
  },
  {
    name: 'India-UAE Comprehensive Economic Partnership Agreement',
    shortCode: 'IN-UAE-CEPA',
    sourceCountry: 'India',
    destinationCountries: ['United Arab Emirates'],
    status: 'active' as const,
    effectiveDate: new Date('2022-05-01'),
    description: '0% duty on 80% of goods',
    coveragePercentage: 80,
  },
  {
    name: 'India-ASEAN Free Trade Agreement',
    shortCode: 'IN-ASEAN-FTA',
    sourceCountry: 'India',
    destinationCountries: [
      'Vietnam', 'Thailand', 'Indonesia', 'Malaysia', 'Philippines',
      'Singapore', 'Myanmar', 'Cambodia', 'Laos', 'Brunei',
    ],
    status: 'active' as const,
    effectiveDate: new Date('2010-01-01'),
    description: '90%+ tariff lines liberalized',
    coveragePercentage: 90,
  },
];

async function seed() {
  console.log('Connecting to MongoDB...');
  await mongoose.connect(MONGODB_URI);
  console.log('Connected.');

  // Seed categories
  console.log('Seeding categories...');
  await Category.deleteMany({});
  await Category.insertMany(categories);
  console.log(`  Inserted ${categories.length} categories`);

  // Seed trade deals
  console.log('Seeding trade deals...');
  await TradeDeal.deleteMany({});
  await TradeDeal.insertMany(tradeDeals);
  console.log(`  Inserted ${tradeDeals.length} trade deals`);

  console.log('Seed complete!');
  await mongoose.disconnect();
  process.exit(0);
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
