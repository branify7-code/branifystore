import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  Send,
  Sparkles,
  CheckCircle2,
  Phone,
  Mail,
  Building,
  Globe,
  DollarSign,
  Clock,
  MessageSquare,
  ArrowRight
} from 'lucide-react';
import { ServiceItem, ServicePackage } from '../types';

interface ServiceInquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  service?: ServiceItem;
  selectedPackage?: ServicePackage;
}

export const ServiceInquiryModal: React.FC<ServiceInquiryModalProps> = ({
  isOpen,
  onClose,
  service,
  selectedPackage
}) => {
  const { services, addLead, addToast, settings, currency, detectedCountry } = useApp();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [company, setCompany] = useState('');
  const [serviceName, setServiceName] = useState(service ? service.name : 'Website Development');
  const [packageName, setPackageName] = useState(selectedPackage ? selectedPackage.name : 'Client On-Demand');
  const [budget, setBudget] = useState('Flexible / Custom');
  const [timeline, setTimeline] = useState('1–2 Weeks');
  const [referenceUrl, setReferenceUrl] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Update state when modal props change
  React.useEffect(() => {
    if (service) {
      setServiceName(service.name);
    }
    if (selectedPackage) {
      setPackageName(selectedPackage.name);
    } else {
      setPackageName('Client On-Demand');
    }
  }, [service, selectedPackage, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim() || !description.trim()) {
      addToast('Please fill in all required fields.', 'error');
      return;
    }

    setIsSubmitting(true);

    try {
      await addLead({
        name: fullName,
        email: email,
        whatsapp: whatsapp,
        company: company,
        country: detectedCountry?.countryName || 'International',
        service: `${serviceName} — [Package: ${packageName}]`,
        budget: budget,
        timeline: timeline,
        description: description,
        referenceUrl: referenceUrl
      });

      setIsSubmitting(false);
      setIsSubmitted(true);
      addToast('Your service inquiry has been submitted! Our team will contact you within 2 hours.', 'success');
    } catch (err) {
      setIsSubmitting(false);
      addToast('Failed to submit inquiry. Please try again.', 'error');
    }
  };

  const cleanWhatsAppNumber = (settings?.contactWhatsApp || '+923000000000').replace(/[^0-9]/g, '');
  const whatsAppDirectMessage = encodeURIComponent(
    `Hello BRANIFY Team! I just submitted an inquiry for "${serviceName}" [${packageName}].\n\nName: ${fullName}\nEmail: ${email}\nBudget: ${budget}\nTimeline: ${timeline}\n\nProject details: ${description}`
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-2xl bg-[#080808] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 my-8 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/5 border border-white/10 text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {isSubmitted ? (
          <div className="text-center py-8 space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-black text-white uppercase tracking-tight">
                Inquiry Received Successfully!
              </h3>
              <p className="text-zinc-400 text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
                Thank you, <strong className="text-white">{fullName}</strong>. Our senior technical strategist is reviewing your requirements for <strong className="text-[#F27D26]">{serviceName} ({packageName})</strong>. We will email your tailored proposal and quotation shortly.
              </p>
            </div>

            {/* Instant WhatsApp Connect */}
            <div className="p-4 bg-zinc-950 border border-white/10 rounded-2xl space-y-3 max-w-md mx-auto">
              <div className="text-xs font-bold text-zinc-300">
                Want an instant response or immediate consultation?
              </div>
              <a
                href={`https://wa.me/${cleanWhatsAppNumber}?text=${whatsAppDirectMessage}`}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3 bg-[#25D366] hover:bg-[#20bd5a] text-black font-extrabold text-xs uppercase tracking-widest rounded-full transition-all flex items-center justify-center gap-2 shadow-lg"
              >
                <Phone className="w-4 h-4" />
                Chat Direct on WhatsApp Now
              </a>
            </div>

            <button
              onClick={() => {
                setIsSubmitted(false);
                onClose();
              }}
              className="px-6 py-2.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-xs font-bold uppercase tracking-wider rounded-full border border-white/10 transition-colors"
            >
              Done & Close
            </button>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="space-y-2 pr-8">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/10 text-[#F27D26] text-[10px] font-extrabold uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5 text-[#F27D26]" />
                {packageName === 'Client On-Demand' ? 'Custom Scope Inquiry' : 'Service Quotation Request'}
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
                {service ? service.name : 'Service Inquiry'}
              </h2>
              <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
                {packageName === 'Client On-Demand'
                  ? 'Describe your exact project specifications and our senior solutions architects will formulate a tailored package and quotation.'
                  : `Requesting proposal for the ${packageName} package. Tell us about your goals and we will get back to you with timelines and quotes.`}
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-zinc-300 uppercase tracking-wider">
                    Full Name <span className="text-[#F27D26]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Alex Morgan"
                    className="w-full px-4 py-2.5 bg-zinc-950 border border-white/10 rounded-xl text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-[#F27D26] transition-colors"
                  />
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-zinc-300 uppercase tracking-wider">
                    Work Email <span className="text-[#F27D26]">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="alex@company.com"
                    className="w-full px-4 py-2.5 bg-zinc-950 border border-white/10 rounded-xl text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-[#F27D26] transition-colors"
                  />
                </div>

                {/* WhatsApp */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-zinc-300 uppercase tracking-wider">
                    WhatsApp / Phone Number
                  </label>
                  <input
                    type="tel"
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    placeholder="+1 555 019 2834"
                    className="w-full px-4 py-2.5 bg-zinc-950 border border-white/10 rounded-xl text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-[#F27D26] transition-colors"
                  />
                </div>

                {/* Company Name */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-zinc-300 uppercase tracking-wider">
                    Company / Brand Name
                  </label>
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="e.g. Acme Media / Your Brand"
                    className="w-full px-4 py-2.5 bg-zinc-950 border border-white/10 rounded-xl text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-[#F27D26] transition-colors"
                  />
                </div>

                {/* Target Service */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-zinc-300 uppercase tracking-wider">
                    Service Required
                  </label>
                  <select
                    value={serviceName}
                    onChange={(e) => setServiceName(e.target.value)}
                    className="w-full px-4 py-2.5 bg-zinc-950 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#5A8DFF] transition-colors"
                  >
                    {services && services.length > 0 ? (
                      services.map((s) => (
                        <option key={s.id} value={s.name}>
                          {s.name}
                        </option>
                      ))
                    ) : (
                      <>
                        <option value="Website Development">Website Development</option>
                        <option value="WordPress Development">WordPress Development</option>
                        <option value="Shopify Website Development">Shopify Website Development</option>
                        <option value="E-Commerce Website Development">E-Commerce Website Development</option>
                        <option value="Landing Pages">Landing Pages</option>
                        <option value="UI/UX Design">UI/UX Design</option>
                        <option value="Logo Design">Logo Design</option>
                        <option value="Brand Identity">Brand Identity</option>
                        <option value="Social Media Design">Social Media Design</option>
                        <option value="Business Presentation">Business Presentation</option>
                        <option value="SEO (Search Engine Optimization)">SEO (Search Engine Optimization)</option>
                        <option value="AI Solutions">AI Solutions</option>
                        <option value="Business Consultation">Business Consultation</option>
                      </>
                    )}
                  </select>
                </div>

                {/* Selected Package */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-zinc-300 uppercase tracking-wider">
                    Package Tier
                  </label>
                  <select
                    value={packageName}
                    onChange={(e) => setPackageName(e.target.value)}
                    className="w-full px-4 py-2.5 bg-zinc-950 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#F27D26] transition-colors"
                  >
                    <option value="Basic">Basic Package</option>
                    <option value="Professional">Professional Package</option>
                    <option value="Premium">Premium Package</option>
                    <option value="Client On-Demand">Client On-Demand (Bespoke)</option>
                  </select>
                </div>

                {/* Estimated Budget */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-zinc-300 uppercase tracking-wider">
                    Estimated Budget ({currency})
                  </label>
                  <select
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="w-full px-4 py-2.5 bg-zinc-950 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#F27D26] transition-colors"
                  >
                    <option value="Under $500">Under $500</option>
                    <option value="$500 – $1,000">$500 – $1,000</option>
                    <option value="$1,000 – $2,500">$1,000 – $2,500</option>
                    <option value="$2,500 – $5,000">$2,500 – $5,000</option>
                    <option value="$5,000+">$5,000+ (Enterprise)</option>
                    <option value="Flexible / Custom">Flexible / Needs Discussion</option>
                  </select>
                </div>

                {/* Target Timeline */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-zinc-300 uppercase tracking-wider">
                    Desired Timeline
                  </label>
                  <select
                    value={timeline}
                    onChange={(e) => setTimeline(e.target.value)}
                    className="w-full px-4 py-2.5 bg-zinc-950 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#F27D26] transition-colors"
                  >
                    <option value="Urgent (< 1 Week)">Urgent (&lt; 1 Week)</option>
                    <option value="1–2 Weeks">1–2 Weeks</option>
                    <option value="2–4 Weeks">2–4 Weeks</option>
                    <option value="1–2 Months">1–2 Months</option>
                    <option value="Flexible">Flexible Schedule</option>
                  </select>
                </div>
              </div>

              {/* Reference URL */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-zinc-300 uppercase tracking-wider">
                  Existing Website / Benchmark Reference (Optional)
                </label>
                <input
                  type="url"
                  value={referenceUrl}
                  onChange={(e) => setReferenceUrl(e.target.value)}
                  placeholder="https://example.com"
                  className="w-full px-4 py-2.5 bg-zinc-950 border border-white/10 rounded-xl text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-[#F27D26] transition-colors"
                />
              </div>

              {/* Project Description */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-zinc-300 uppercase tracking-wider">
                  Project Description & Requirements <span className="text-[#F27D26]">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Please describe your core goals, desired pages/features, target audience, and any specific technology or design requirements..."
                  className="w-full px-4 py-2.5 bg-zinc-950 border border-white/10 rounded-xl text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-[#F27D26] transition-colors resize-none"
                />
              </div>

              {/* Actions */}
              <div className="pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                <div className="text-[11px] text-zinc-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#F27D26]" />
                  NDA & Confidentiality Guaranteed
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-5 py-3 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-xs font-bold uppercase tracking-wider rounded-full border border-white/10 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 sm:flex-none px-7 py-3 bg-[#F27D26] hover:bg-orange-500 text-black font-black text-xs uppercase tracking-widest rounded-full transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-3.5 h-3.5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        Submit Inquiry
                        <Send className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};
