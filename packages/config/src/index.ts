// ============================================
// Trandora Shared Config & Constants
// ============================================

export const COLORS = {
  navy: '#1a365d',
  saffron: '#f6ad55',
  white: '#ffffff',
} as const;

export const API_PREFIX = '/api/v1';

export const PAGINATION_DEFAULTS = {
  page: 1,
  limit: 20,
  maxLimit: 100,
} as const;

export const TRUST_SCORE = {
  MIN: 0,
  MAX: 100,
  TIERS: {
    basic: { min: 0, max: 29 },
    silver: { min: 30, max: 59 },
    gold: { min: 60, max: 84 },
    platinum: { min: 85, max: 100 },
  },
} as const;

export const SUBSCRIPTION_TIERS = {
  free: { price: 0, maxProducts: 10 },
  starter: { price: 999, maxProducts: 50 },
  professional: { price: 4999, maxProducts: 200 },
  enterprise: { price: 14999, maxProducts: -1 }, // unlimited
} as const;
