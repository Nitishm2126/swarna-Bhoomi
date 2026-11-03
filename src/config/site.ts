/**
 * SWARNA BHOOMI — SINGLE SOURCE OF TRUTH (SITE CONFIGURATION)
 * 
 * Governance Notice:
 * All marketing claims, prices, phone numbers, and approvals must be verified
 * before toggling their status to 'verified'.
 * See: docs/phase-0-discovery-report.md
 */

export interface VerificationField<T> {
  value: T;
  status: 'verified' | 'unverified';
  evidenceRequired: string;
  notes?: string;
}

export const siteConfig = {
  // Brand Identity (Audited from reference artwork)
  name: 'Swarna Bhoomi',
  descriptor: 'Premium Residential Plots',
  tagline: 'A Perfect Place to Build Your Dream Home',

  // Corporate Entity (Top-left "MCP" mark discovered in Phase 0 audit)
  developer: {
    brandName: 'MCP',
    legalName: {
      value: 'MCP Promoters (Pending Legal Confirmation)',
      status: 'unverified',
      evidenceRequired: 'Company registration certificate / GST registration',
    } as VerificationField<string>,
  },

  // Contact Information
  contact: {
    // Phone number 7339652776 displayed on artwork
    phoneDisplay: {
      value: '+91 7339652776',
      status: 'unverified',
      evidenceRequired: 'Client confirmation of active call desk',
    } as VerificationField<string>,
    phoneRaw: '7339652776',
    
    // International digits-only format for WhatsApp wa.me links
    whatsappNumber: {
      value: '917339652776',
      status: 'unverified',
      evidenceRequired: 'Confirmation of active WhatsApp Business profile',
    } as VerificationField<string>,

    supportEmail: 'contact@swarnabhoomi.in',
  },

  // Location Details
  location: {
    village: 'Krishnapuram',
    taluk: 'Thiruvallur',
    state: 'Tamil Nadu',
    corridor: 'Chennai–Tirupati National Highway (NH 716)',
    coordinates: {
      value: { lat: 13.1438, lng: 79.9082 }, // Approximate center of Thiruvallur / Krishnapuram
      status: 'unverified',
      evidenceRequired: 'Exact Google Maps pinned location for site gate',
    } as VerificationField<{ lat: number; lng: number }>,
    mapSearchQuery: 'Krishnapuram, Thiruvallur, Tamil Nadu',
  },

  // Commercial Pricing
  pricing: {
    // Artwork states "₹7 LAKHS*" with asterisk; earlier brief mentioned ₹6.5 Lakhs
    startingPriceText: {
      value: 'Starting from ₹7 Lakhs*',
      status: 'unverified',
      evidenceRequired: 'Client sign-off on current base plot cost & asterisk terms',
      terms: 'Terms and conditions apply. Government registration and taxes extra.',
    } as VerificationField<string> & { terms: string },
    // Flag to determine whether price can be shown publicly or if "Contact for Price" should be used
    showPublicPrice: false,
  },

  // Regulatory & Legal Approvals
  approvals: {
    dtcpApproved: {
      value: false, // Held false until official order number is supplied
      status: 'unverified',
      approvalNumber: '',
      evidenceRequired: 'Official DTCP Layout Approval Order & Number',
    } as VerificationField<boolean> & { approvalNumber: string },
    reraRegistered: {
      value: false,
      status: 'unverified',
      registrationNumber: '',
      evidenceRequired: 'TNRERA Registration Certificate or Exemption Order',
    } as VerificationField<boolean> & { registrationNumber: string },
  },

  // Plot Size Configurations (For Lead Enquiry Form)
  plotSizes: [
    { label: '517 – 800 sq.ft.', value: '517-800' },
    { label: '801 – 1,200 sq.ft.', value: '801-1200' },
    { label: '1,201 – 1,600 sq.ft.', value: '1201-1600' },
    { label: 'Not sure yet', value: 'not-sure' },
  ],

  // Enquiry Topics (For Lead Enquiry Form)
  enquiryTopics: [
    { label: 'Price Details & Payment Schedule', value: 'price-details' },
    { label: 'Available Plots & Layout Map', value: 'available-plots' },
    { label: 'Book a Free Site Visit', value: 'site-visit' },
    { label: 'Approval Documents & Title Deed', value: 'approval-documents' },
  ],

  // Domain & Deployment
  domain: {
    value: 'https://www.swarnabhoomi.in',
    status: 'unverified',
    evidenceRequired: 'Client DNS management authority for www.swarnabhoomi.in',
  } as VerificationField<string>,
} as const;
