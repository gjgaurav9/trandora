// ============================================
// Trandora Shared Types
// ============================================

// --- Enums ---

export type UserRole = 'buyer' | 'supplier' | 'admin';
export type UserStatus = 'active' | 'inactive' | 'suspended' | 'pending_verification';
export type SupplierTrustTier = 'basic' | 'silver' | 'gold' | 'platinum';
export type ProductStatus = 'draft' | 'active' | 'paused' | 'archived';
export type RfqStatus = 'open' | 'receiving_quotes' | 'awarded' | 'closed' | 'cancelled';
export type RfqResponseStatus = 'pending' | 'accepted' | 'rejected' | 'withdrawn';
export type OrderStatus =
  | 'pending_payment'
  | 'escrow'
  | 'production'
  | 'quality_check'
  | 'shipped'
  | 'delivered'
  | 'completed'
  | 'disputed'
  | 'cancelled'
  | 'refunded';
export type TransactionStatus = 'pending' | 'completed' | 'failed' | 'refunded';
export type TransactionType = 'escrow_in' | 'escrow_release' | 'refund' | 'commission';
export type TradeDealStatus = 'active' | 'pending_ratification' | 'expired' | 'suspended';
export type NotificationType =
  | 'rfq_received'
  | 'quote_received'
  | 'order_update'
  | 'payment_received'
  | 'review_received'
  | 'system';

// --- API Response ---

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: unknown[];
  };
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
    totalPages?: number;
  };
}

// --- Auth ---

export interface ITokenPayload {
  userId: string;
  email: string;
  role: UserRole;
}

export interface IAuthResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: UserRole;
  };
}

// --- User ---

export interface IUserBase {
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  status: UserStatus;
  phone?: string;
  phoneVerified?: boolean;
  avatar?: string;
}

// --- Supplier ---

export interface ISupplierBase {
  userId: string;
  businessName: string;
  slug: string;
  description?: string;
  businessType?: string;
  yearEstablished?: number;
  employeeCount?: string;
  annualRevenue?: string;
  address: {
    street?: string;
    city: string;
    state: string;
    pincode: string;
    country: string;
  };
  location?: {
    type: 'Point';
    coordinates: [number, number];
  };
  gstNumber?: string;
  panNumber?: string;
  iecCode?: string;
  gstVerified?: boolean;
  panVerified?: boolean;
  trustScore?: number;
  trustTier?: SupplierTrustTier;
  categories?: string[];
  exportMarkets?: string[];
  certifications?: string[];
  website?: string;
  contactEmail?: string;
  contactPhone?: string;
}

// --- Product ---

export interface IProductBase {
  supplierId: string;
  categoryId: string;
  name: string;
  slug: string;
  description: string;
  specifications?: Record<string, string>;
  priceMin: number;
  priceMax: number;
  currency: string;
  moq: number;
  unit: string;
  hsCode?: string;
  exportMarkets?: string[];
  images?: { url: string; alt?: string; isPrimary?: boolean }[];
  status: ProductStatus;
  tags?: string[];
}

// --- Category ---

export interface ICategoryBase {
  name: string;
  slug: string;
  description?: string;
  parentId?: string;
  level: number;
  icon?: string;
  isActive: boolean;
}
