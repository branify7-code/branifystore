import React, { useState, useMemo } from 'react';
import { Search, X, Check, Globe, RefreshCw, MapPin, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CurrencyConfig } from '../utils/currency';

interface CurrencySelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CurrencySelectorModal: React.FC<CurrencySelectorModalProps> = ({ isOpen, onClose }) => {
  const {
    currency,
    setCurrency,
    detectedCountry,
    isAutoDetected,
    isDetectingLocation,
    resetToAutoDetected,
    supportedCurrencies,
    exchangeRates
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');

  const currencyList = useMemo(() => {
    return Object.values(supportedCurrencies);
  }, [supportedCurrencies]);

  const popularCurrencies = useMemo(() => {
    return currencyList.filter((c) => c.isPopular);
  }, [currencyList]);

  const filteredCurrencies = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return currencyList;

    return currencyList.filter(
      (c) =>
        c.code.toLowerCase().includes(query) ||
        c.name.toLowerCase().includes(query) ||
        c.countryName.toLowerCase().includes(query) ||
        c.symbol.toLowerCase().includes(query)
    );
  }, [currencyList, searchQuery]);

  if (!isOpen) return null;

  const handleSelectCurrency = (code: string) => {
    setCurrency(code, true);
    onClose();
  };

  const handleResetToAuto = () => {
    resetToAutoDetected();
    onClose();
  };

  return (
    <div
      id="currency-selector-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-[#0c0d12] border border-white/10 rounded-2xl w-full max-w-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] text-left animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between bg-zinc-950/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#5A8DFF]/10 text-[#5A8DFF] border border-[#5A8DFF]/20 flex items-center justify-center">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-black text-white uppercase tracking-tight flex items-center gap-2">
                Currency & Pricing Region
              </h3>
              <p className="text-xs text-zinc-400">
                Choose your display currency or use auto-detected local pricing.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-zinc-400 hover:text-white rounded-xl hover:bg-zinc-800 transition-colors cursor-pointer"
            aria-label="Close currency modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Detected Location Banner */}
        <div className="p-4 bg-zinc-900/50 border-b border-white/10 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-zinc-950/80 p-3.5 rounded-xl border border-white/5">
            <div className="flex items-center gap-3">
              <div className="text-2xl">{detectedCountry ? detectedCountry.flag : '🌐'}</div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black text-white">
                    {detectedCountry
                      ? `${detectedCountry.countryName}${detectedCountry.city ? ` (${detectedCountry.city})` : ''}`
                      : isDetectingLocation
                      ? 'Detecting your location...'
                      : 'Global / Unknown Location'}
                  </span>
                  {isAutoDetected && detectedCountry && (
                    <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-extrabold uppercase rounded-full flex items-center gap-1">
                      <Sparkles className="w-2.5 h-2.5" /> Active Auto-Rate
                    </span>
                  )}
                </div>
                <div className="text-[11px] text-zinc-400">
                  {detectedCountry
                    ? `Default currency: ${detectedCountry.currencyCode} (${supportedCurrencies[detectedCountry.currencyCode]?.symbol || ''})`
                    : 'Default fallback currency: USD ($)'}
                </div>
              </div>
            </div>

            {detectedCountry && !isAutoDetected && (
              <button
                onClick={handleResetToAuto}
                className="px-3 py-1.5 bg-[#5A8DFF]/10 hover:bg-[#5A8DFF]/20 text-[#5A8DFF] border border-[#5A8DFF]/30 text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5 self-start sm:self-auto cursor-pointer"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Use Auto ({detectedCountry.currencyCode})</span>
              </button>
            )}
          </div>

          {/* Search Box */}
          <div className="relative">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by country, currency name or code (e.g. Pakistan, EUR, SAR, Dollar)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-zinc-950 border border-white/10 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#5A8DFF]"
              autoFocus
            />
          </div>
        </div>

        {/* Currency Lists */}
        <div className="p-4 overflow-y-auto space-y-5 flex-1 divide-y divide-white/5">
          {/* Quick Popular Currencies */}
          {!searchQuery && (
            <div className="space-y-2 pb-2">
              <div className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">
                Popular Regional Currencies
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {popularCurrencies.map((c) => {
                  const isSelected = currency === c.code;
                  return (
                    <button
                      key={c.code}
                      onClick={() => handleSelectCurrency(c.code)}
                      className={`p-2.5 rounded-xl border text-left transition-all flex items-center justify-between cursor-pointer ${
                        isSelected
                          ? 'bg-[#5A8DFF]/15 border-[#5A8DFF] text-white shadow-md shadow-[#5A8DFF]/10'
                          : 'bg-zinc-950/60 hover:bg-zinc-900 border-white/5 text-zinc-300 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-2 truncate">
                        <span className="text-base">{c.flag}</span>
                        <div className="truncate">
                          <div className="text-xs font-bold flex items-center gap-1">
                            <span>{c.code}</span>
                            <span className="text-zinc-400 font-normal">({c.symbol.trim()})</span>
                          </div>
                          <div className="text-[10px] text-zinc-500 truncate">{c.countryName}</div>
                        </div>
                      </div>
                      {isSelected && <Check className="w-3.5 h-3.5 text-[#5A8DFF] shrink-0 ml-1" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* All Currencies */}
          <div className="space-y-2 pt-3">
            <div className="flex items-center justify-between text-[10px] font-black text-zinc-400 uppercase tracking-widest">
              <span>{searchQuery ? `Matching Currencies (${filteredCurrencies.length})` : 'All Supported Currencies'}</span>
              <span className="text-zinc-500 font-normal">Base exchange rate vs USD</span>
            </div>

            {filteredCurrencies.length === 0 ? (
              <div className="py-8 text-center text-xs text-zinc-500">
                No currencies matching "{searchQuery}".
              </div>
            ) : (
              <div className="space-y-1 max-h-72 overflow-y-auto pr-1">
                {filteredCurrencies.map((c) => {
                  const isSelected = currency === c.code;
                  const currentRate = exchangeRates[c.code] || c.defaultRate;

                  return (
                    <button
                      key={c.code}
                      onClick={() => handleSelectCurrency(c.code)}
                      className={`w-full p-2.5 rounded-xl border text-left transition-all flex items-center justify-between cursor-pointer ${
                        isSelected
                          ? 'bg-[#5A8DFF]/15 border-[#5A8DFF] text-white'
                          : 'bg-zinc-950/40 hover:bg-zinc-900 border-transparent hover:border-white/5 text-zinc-300 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{c.flag}</span>
                        <div>
                          <div className="text-xs font-bold flex items-center gap-1.5">
                            <span>{c.name}</span>
                            <span className="text-[10px] px-1.5 py-0.2 bg-zinc-800 text-zinc-300 font-mono rounded">
                              {c.code}
                            </span>
                          </div>
                          <div className="text-[10px] text-zinc-500">{c.countryName}</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 text-right">
                        <div>
                          <div className="text-xs font-bold text-white">
                            {c.symbolPosition === 'prefix' ? `${c.symbol}1.00` : `1.00${c.symbol}`}
                          </div>
                          <div className="text-[10px] text-zinc-500 font-mono">
                            {c.code === 'USD' ? 'Base Currency' : `1 USD ≈ ${currentRate >= 100 ? Math.round(currentRate).toLocaleString() : currentRate.toFixed(2)} ${c.code}`}
                          </div>
                        </div>
                        <div className="w-5 flex justify-center">
                          {isSelected && <Check className="w-4 h-4 text-[#5A8DFF]" />}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Footer info */}
        <div className="p-4 bg-zinc-950 border-t border-white/10 flex items-center justify-between text-[11px] text-zinc-400">
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-[#5A8DFF]" />
            <span>Real-time rates cached securely for 12 hours</span>
          </div>
          <span className="font-mono text-zinc-500 text-[10px]">
            Selected: <strong className="text-white">{currency}</strong>
          </span>
        </div>
      </div>
    </div>
  );
};
