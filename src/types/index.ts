export type PropertyType = 'Apartment' | 'Villa' | 'Penthouse' | 'Townhouse' | 'Commercial' | 'Plot';
export type ListingType = 'Buy' | 'Rent';
export type FurnishingStatus = 'Furnished' | 'Semi-Furnished' | 'Unfurnished';
export type PossessionStatus = 'Ready to Move' | 'Under Construction';
export type FacingDirection = 'North' | 'East' | 'South' | 'West' | 'North-East' | 'North-West' | 'South-East' | 'South-West';

export interface PropertyImage {
  id: string;
  url: string;
  caption: string;
  isPrimary?: boolean;
}

export interface Amenity {
  id: string;
  name: string;
  iconName: string;
  category: 'General' | 'Security' | 'Leisure' | 'Eco';
}

export interface Property {
  id: string;
  title: string;
  slug: string;
  description: string;
  price: number; // in USD or formatted local currency
  pricePerSqFt: number;
  rentPeriod?: 'month' | 'year';
  listingType: ListingType;
  propertyType: PropertyType;
  bedrooms: number;
  bathrooms: number;
  areaSqFt: number;
  floor?: number;
  totalFloors?: number;
  parkingSpaces: number;
  furnishing: FurnishingStatus;
  possessionStatus: PossessionStatus;
  facing: FacingDirection;
  ageYears: number;
  isFeatured?: boolean;
  isVerified?: boolean;
  isHotDeal?: boolean;

  // Location
  address: string;
  city: string;
  locality: string;
  latitude: number;
  longitude: number;

  // Media & Features
  images: PropertyImage[];
  virtualTourUrl?: string;
  floorPlanUrl?: string;
  amenities: string[]; // Amenity IDs or names

  // Relations
  agentId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Agent {
  id: string;
  name: string;
  email: string;
  phone: string;
  whatsapp?: string;
  avatar: string;
  agencyName: string;
  agencyLogo?: string;
  rating: number;
  reviewCount: number;
  experienceYears: number;
  activeListingsCount: number;
  totalSold: number;
  bio: string;
  specialties: string[];
  verified: boolean;
}

export interface Locality {
  id: string;
  name: string;
  city: string;
  avgPricePerSqFt: number;
  growthRatePercent: number;
  propertyCount: number;
  image: string;
  description: string;
}

export interface SearchFilters {
  query: string;
  listingType: ListingType;
  propertyType: PropertyType | 'All';
  minPrice: number;
  maxPrice: number;
  bedrooms: number | 'Any';
  bathrooms: number | 'Any';
  furnishing: FurnishingStatus | 'All';
  possession: PossessionStatus | 'All';
  locality: string | 'All';
  amenities: string[];
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'newest' | 'area-desc';
}

export interface Enquiry {
  id: string;
  propertyId: string;
  propertyTitle: string;
  agentId: string;
  agentName: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  message: string;
  preferredDate?: string;
  status: 'Pending' | 'Contacted' | 'Visit Scheduled' | 'Closed';
  createdAt: string;
}

export interface ScheduledVisit {
  id: string;
  propertyId: string;
  propertyTitle: string;
  propertyImage: string;
  agentName: string;
  date: string;
  timeSlot: string;
  status: 'Confirmed' | 'Pending' | 'Completed' | 'Cancelled';
  notes?: string;
}
