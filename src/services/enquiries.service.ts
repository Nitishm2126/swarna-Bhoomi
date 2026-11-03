import { Enquiry } from '@/types/plot';
import { supabase, isSupabaseConfigured } from '@/lib/supabase/client';

const ENQUIRIES_STORAGE_KEY = 'swarna_bhoomi_enquiries_v1';

export function getStoredEnquiries(): Enquiry[] {
  if (typeof window === 'undefined') {
    return [];
  }
  try {
    const raw = localStorage.getItem(ENQUIRIES_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.error('Failed to load enquiries', err);
    return [];
  }
}

export async function submitEnquiry(data: {
  customerName: string;
  phone: string;
  preferredPlotSize?: string;
  enquiryTopic: string;
  message?: string;
  plotId?: string | null;
  plotNumber?: string | null;
  source?: 'whatsapp_click' | 'web_form' | 'direct_call';
}): Promise<{ success: boolean; error?: string }> {
  // Validate required inputs
  if (!data.customerName || data.customerName.trim().length < 2) {
    return { success: false, error: 'Please enter your full name.' };
  }
  const cleanPhone = data.phone.replace(/\D/g, '');
  if (cleanPhone.length < 10) {
    return { success: false, error: 'Please enter a valid 10-digit mobile number.' };
  }

  const newEnquiry: Enquiry = {
    id: `enq-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    customerName: data.customerName.trim(),
    phone: cleanPhone,
    preferredPlotSize: data.preferredPlotSize,
    enquiryTopic: data.enquiryTopic,
    message: data.message,
    plotId: data.plotId,
    plotNumber: data.plotNumber,
    source: data.source || 'web_form',
    createdAt: new Date().toISOString(),
  };

  // Local storage save
  if (typeof window !== 'undefined') {
    const current = getStoredEnquiries();
    localStorage.setItem(ENQUIRIES_STORAGE_KEY, JSON.stringify([newEnquiry, ...current]));
  }

  // Supabase save if available
  if (isSupabaseConfigured && supabase) {
    try {
      await supabase.from('enquiries').insert({
        customer_name: newEnquiry.customerName,
        phone: newEnquiry.phone,
        preferred_plot_size: newEnquiry.preferredPlotSize,
        enquiry_type: newEnquiry.enquiryTopic,
        message: newEnquiry.message,
        plot_id: newEnquiry.plotId || null,
        source: newEnquiry.source,
      });
    } catch (err) {
      console.warn('Supabase enquiry insertion error:', err);
    }
  }

  return { success: true };
}
