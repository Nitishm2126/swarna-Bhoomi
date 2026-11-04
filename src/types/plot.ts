export type FacingDirection =
  | 'North'
  | 'South'
  | 'East'
  | 'West'
  | 'North-East'
  | 'North-West'
  | 'South-East'
  | 'South-West';

export type PlotAvailability = 'Available' | 'Reserved' | 'Sold';

export interface Plot {
  id: string;
  projectId: string;
  phaseId: string;
  phaseNumber: number;
  phaseName: string;
  plotNumber: string;
  areaSqft: number;
  facing?: FacingDirection | null;
  widthFeet?: number | null;
  lengthFeet?: number | null;
  availability: PlotAvailability;
  // Commercial & Pricing
  price?: number; // Total price in INR (e.g. 700000, 805000)
  pricePerSqft?: number; // Price per sq.ft. in INR (e.g. 1150)
  // Structural & Layout attributes
  isCorner?: boolean;
  cornerPosition?: string | null; // e.g. "Adjoining 30ft 1st Street & 40ft Main Avenue"
  roadWidthFeet?: number; // e.g. 30 or 40
  description?: string | null;
  images?: string[];
  additionalSpecifications?: Record<string, string | number | boolean>;
  // Layout simulator geometry
  layoutX?: number | null;
  layoutY?: number | null;
  layoutWidth?: number | null;
  layoutHeight?: number | null;
  layoutRotation?: number | null;
  notes?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export type SearchMode = 'exact' | 'nearby' | 'min';

export interface PlotFilterCriteria {
  area?: number | null;
  searchMode: SearchMode;
  tolerance: number; // e.g. 50 sqft for nearby search
  facing: FacingDirection | 'All';
  phase: number | 'All';
  minWidth?: number | null;
  minLength?: number | null;
  availability: PlotAvailability | 'All';
  sortBy: 'area_asc' | 'area_desc' | 'plot_asc' | 'phase_asc';
}

export type CornerPreference = 'any' | 'corner_only' | 'non_corner';

export interface SmartPlotPreferences {
  minArea?: number | null;
  maxArea?: number | null;
  minBudget?: number | null;
  maxBudget?: number | null;
  facing?: FacingDirection | 'All';
  cornerPreference?: CornerPreference;
  phase?: number | 'All';
  availability?: PlotAvailability | 'All';
  sortBy?: 'price_asc' | 'price_desc' | 'area_asc' | 'area_desc' | 'plot_asc' | 'phase_asc';
  page?: number;
  limit?: number;
}

export interface SmartPlotResponse {
  plots: Plot[];
  totalMatches: number;
  totalInventory: number;
  page: number;
  limit: number;
  totalPages: number;
  hasMore: boolean;
}

export interface Project {
  id: string;
  name: string;
  slug: string;
  descriptor: string;
  description: string;
  location: string;
  village: string;
  taluk: string;
  district: string;
  state: string;
  corridor: string;
  contactPhone: string;
  whatsappNumber: string;
  startingPriceText: string;
  createdAt: string;
  updatedAt: string;
}

export interface Phase {
  id: string;
  projectId: string;
  phaseNumber: number;
  phaseName: string;
  totalPlots: number;
  description?: string;
  layoutImagePath?: string | null;
}

export interface Enquiry {
  id: string;
  plotId?: string | null;
  plotNumber?: string | null;
  customerName: string;
  phone: string;
  preferredPlotSize?: string;
  enquiryTopic: string;
  message?: string;
  source: 'whatsapp_click' | 'web_form' | 'direct_call';
  createdAt: string;
}

export interface AmenityItem {
  id: string;
  name: string;
  category: 'Recreation' | 'Infrastructure' | 'Wellness' | 'Community' | 'Nature';
  status: 'Existing' | 'Under Development' | 'Planned';
  description: string;
  evidenceNotes: string;
}

export interface TownshipConcept {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  status: 'Featured in Brochure';
}
