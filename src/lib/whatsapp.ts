import { Plot } from '@/types/plot';
import { siteConfig } from '@/config/site';

export interface WhatsAppEnquiryOptions {
  name?: string;
  phone?: string;
  topic?: string;
  preferredPlotSize?: string;
  sourceContext?: string;
}

/**
 * Constructs the official WhatsApp click-to-chat URL for Swarna Bhoomi
 * adhering strictly to project specification and avoiding fabricated fields.
 */
export function generateWhatsAppEnquiryUrl(
  plot?: Plot | null,
  options?: WhatsAppEnquiryOptions
): string {
  const whatsappNumber = siteConfig.contact.phoneRaw; // 7339652776
  const internationalNumber = `91${whatsappNumber.replace(/\D/g, '')}`;

  let message = '';

  if (plot) {
    const dimensionsText =
      plot.widthFeet && plot.lengthFeet
        ? `${plot.widthFeet} ft × ${plot.lengthFeet} ft`
        : 'Dimension statement on request';

    const facingText = plot.facing ? `${plot.facing} Facing` : 'Facing on layout';

    message = [
      'Hello Swarna Bhoomi Team,',
      '',
      'I am interested in a plot at Swarna Bhoomi Residential Township.',
      '',
      `Plot Number: ${plot.plotNumber}`,
      `Area: ${plot.areaSqft} Sq.Ft.`,
      `Facing: ${facingText}`,
      `Dimensions: ${dimensionsText}`,
      `Phase: ${plot.phaseName || `Phase ${plot.phaseNumber}`}`,
      '',
      'Please share the pricing, availability, and site visit details.',
      '',
      'Thank you.',
    ].join('\n');
  } else if (options && (options.name || options.topic || options.preferredPlotSize)) {
    const nameLine = options.name ? `Name: ${options.name}` : '';
    const phoneLine = options.phone ? `Mobile: ${options.phone}` : '';
    const sizeLine = options.preferredPlotSize ? `Preferred Plot Size: ${options.preferredPlotSize}` : '';
    const topicLine = options.topic ? `Enquiry: ${options.topic}` : '';

    const details = [nameLine, phoneLine, sizeLine, topicLine].filter(Boolean).join('\n');

    message = [
      'Hello Swarna Bhoomi Team,',
      '',
      'I would like to enquire about residential plots at Swarna Bhoomi Residential Township.',
      '',
      details,
      '',
      'Please share more details on plot availability, pricing, and site visits.',
      '',
      'Thank you.',
    ].join('\n');
  } else {
    message = [
      'Hello Swarna Bhoomi Team,',
      '',
      'I am interested in exploring residential plots at Swarna Bhoomi Residential Township, Krishnapuram, Near Thiruvallur.',
      '',
      'Please share the latest available plot inventory, layout map, pricing, and site visit arrangements.',
      '',
      'Thank you.',
    ].join('\n');
  }

  return `https://wa.me/${internationalNumber}?text=${encodeURIComponent(message)}`;
}

/**
 * Returns telephone link for direct phone calls
 */
export function getPhoneCallHref(): string {
  return `tel:+91${siteConfig.contact.phoneRaw.replace(/\D/g, '')}`;
}
