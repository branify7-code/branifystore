/**
 * Centralized WhatsApp URL Builder
 * Strips non-digit characters and generates official wa.me links with custom messages.
 */
export function formatWhatsAppNumber(phone: string): string {
  if (!phone) return '923321029333';
  // Strip all non-digits (spaces, dashes, plus, parentheses)
  const cleaned = phone.replace(/\D/g, '');
  return cleaned || '923321029333';
}

export function getWhatsAppLink(
  phoneOrConfig?: string | any,
  messageOrAction?: string,
  context?: { serviceName?: string; productTitle?: string; budget?: string }
): string {
  if (typeof phoneOrConfig === 'object' && phoneOrConfig !== null) {
    const cfg = phoneOrConfig.whatsappConfig || phoneOrConfig;
    const phone = cfg.whatsappNumber || cfg.phoneNumber || phoneOrConfig.contactWhatsApp || '+92 332 1029333';
    let msg = cfg.defaultMessage || 'Hi BRANIFY, I am visiting your website and would like to discuss a project / custom quote.';

    if (messageOrAction === 'service' && cfg.serviceInquiryTemplate) {
      msg = cfg.serviceInquiryTemplate.replace('{service_name}', context?.serviceName || 'Service');
    } else if (messageOrAction === 'product' && cfg.productSupportTemplate) {
      msg = cfg.productSupportTemplate.replace('{product_title}', context?.productTitle || 'Product');
    } else if (messageOrAction === 'quote' && cfg.customQuoteTemplate) {
      msg = cfg.customQuoteTemplate.replace('{budget}', context?.budget || 'Flexible');
    } else if (messageOrAction === 'partner' && cfg.partnerTemplate) {
      msg = cfg.partnerTemplate;
    }

    const number = formatWhatsAppNumber(phone);
    return `https://wa.me/${number}?text=${encodeURIComponent(msg)}`;
  }

  const number = formatWhatsAppNumber(phoneOrConfig || '+92 332 1029333');
  const defaultMsg = messageOrAction || 'Hi BRANIFY, I am visiting your website and would like to discuss a project / custom quote.';
  return `https://wa.me/${number}?text=${encodeURIComponent(defaultMsg)}`;
}
