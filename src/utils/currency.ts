import { Currency } from '../types';

export interface CurrencyConfig {
  code: string;
  name: string;
  symbol: string;
  symbolPosition: 'prefix' | 'suffix';
  flag: string;
  countryName: string;
  countryCode: string;
  decimals: number;
  defaultRate: number; // 1 USD = X Currency
  isPopular?: boolean;
}

export interface DetectedCountry {
  countryCode: string;
  countryName: string;
  currencyCode: string;
  city?: string;
  flag: string;
  ip?: string;
}

// 1. Comprehensive Supported Currencies Registry
export const SUPPORTED_CURRENCIES: Record<string, CurrencyConfig> = {
  USD: {
    code: 'USD',
    name: 'US Dollar',
    symbol: '$',
    symbolPosition: 'prefix',
    flag: '🇺🇸',
    countryName: 'United States',
    countryCode: 'US',
    decimals: 0,
    defaultRate: 1.0,
    isPopular: true
  },
  PKR: {
    code: 'PKR',
    name: 'Pakistani Rupee',
    symbol: 'PKR ',
    symbolPosition: 'prefix',
    flag: '🇵🇰',
    countryName: 'Pakistan',
    countryCode: 'PK',
    decimals: 0,
    defaultRate: 278.5,
    isPopular: true
  },
  AED: {
    code: 'AED',
    name: 'UAE Dirham',
    symbol: 'AED ',
    symbolPosition: 'prefix',
    flag: '🇦🇪',
    countryName: 'United Arab Emirates',
    countryCode: 'AE',
    decimals: 0,
    defaultRate: 3.67,
    isPopular: true
  },
  EUR: {
    code: 'EUR',
    name: 'Euro',
    symbol: '€',
    symbolPosition: 'prefix',
    flag: '🇪🇺',
    countryName: 'European Union',
    countryCode: 'EU',
    decimals: 0,
    defaultRate: 0.92,
    isPopular: true
  },
  GBP: {
    code: 'GBP',
    name: 'British Pound',
    symbol: '£',
    symbolPosition: 'prefix',
    flag: '🇬🇧',
    countryName: 'United Kingdom',
    countryCode: 'GB',
    decimals: 0,
    defaultRate: 0.79,
    isPopular: true
  },
  SAR: {
    code: 'SAR',
    name: 'Saudi Riyal',
    symbol: 'SAR ',
    symbolPosition: 'prefix',
    flag: '🇸🇦',
    countryName: 'Saudi Arabia',
    countryCode: 'SA',
    decimals: 0,
    defaultRate: 3.75,
    isPopular: true
  },
  INR: {
    code: 'INR',
    name: 'Indian Rupee',
    symbol: '₹',
    symbolPosition: 'prefix',
    flag: '🇮🇳',
    countryName: 'India',
    countryCode: 'IN',
    decimals: 0,
    defaultRate: 83.5,
    isPopular: true
  },
  CAD: {
    code: 'CAD',
    name: 'Canadian Dollar',
    symbol: 'CA$',
    symbolPosition: 'prefix',
    flag: '🇨🇦',
    countryName: 'Canada',
    countryCode: 'CA',
    decimals: 0,
    defaultRate: 1.36,
    isPopular: true
  },
  AUD: {
    code: 'AUD',
    name: 'Australian Dollar',
    symbol: 'AU$',
    symbolPosition: 'prefix',
    flag: '🇦🇺',
    countryName: 'Australia',
    countryCode: 'AU',
    decimals: 0,
    defaultRate: 1.52,
    isPopular: true
  },
  QAR: {
    code: 'QAR',
    name: 'Qatari Riyal',
    symbol: 'QAR ',
    symbolPosition: 'prefix',
    flag: '🇶🇦',
    countryName: 'Qatar',
    countryCode: 'QA',
    decimals: 0,
    defaultRate: 3.64,
    isPopular: true
  },
  KWD: {
    code: 'KWD',
    name: 'Kuwaiti Dinar',
    symbol: 'KWD ',
    symbolPosition: 'prefix',
    flag: '🇰🇼',
    countryName: 'Kuwait',
    countryCode: 'KW',
    decimals: 2,
    defaultRate: 0.31,
    isPopular: true
  },
  OMR: {
    code: 'OMR',
    name: 'Omani Rial',
    symbol: 'OMR ',
    symbolPosition: 'prefix',
    flag: '🇴🇲',
    countryName: 'Oman',
    countryCode: 'OM',
    decimals: 2,
    defaultRate: 0.385,
    isPopular: true
  },
  BHD: {
    code: 'BHD',
    name: 'Bahraini Dinar',
    symbol: 'BHD ',
    symbolPosition: 'prefix',
    flag: '🇧🇭',
    countryName: 'Bahrain',
    countryCode: 'BH',
    decimals: 2,
    defaultRate: 0.376,
    isPopular: true
  },
  SGD: {
    code: 'SGD',
    name: 'Singapore Dollar',
    symbol: 'SG$',
    symbolPosition: 'prefix',
    flag: '🇸🇬',
    countryName: 'Singapore',
    countryCode: 'SG',
    decimals: 0,
    defaultRate: 1.34,
    isPopular: true
  },
  JPY: {
    code: 'JPY',
    name: 'Japanese Yen',
    symbol: '¥',
    symbolPosition: 'prefix',
    flag: '🇯🇵',
    countryName: 'Japan',
    countryCode: 'JP',
    decimals: 0,
    defaultRate: 155.0,
    isPopular: true
  },
  TRY: {
    code: 'TRY',
    name: 'Turkish Lira',
    symbol: '₺',
    symbolPosition: 'prefix',
    flag: '🇹🇷',
    countryName: 'Turkey',
    countryCode: 'TR',
    decimals: 0,
    defaultRate: 33.2,
    isPopular: true
  },
  MYR: {
    code: 'MYR',
    name: 'Malaysian Ringgit',
    symbol: 'RM ',
    symbolPosition: 'prefix',
    flag: '🇲🇾',
    countryName: 'Malaysia',
    countryCode: 'MY',
    decimals: 0,
    defaultRate: 4.42,
    isPopular: true
  },
  IDR: {
    code: 'IDR',
    name: 'Indonesian Rupiah',
    symbol: 'Rp ',
    symbolPosition: 'prefix',
    flag: '🇮🇩',
    countryName: 'Indonesia',
    countryCode: 'ID',
    decimals: 0,
    defaultRate: 16100.0,
    isPopular: false
  },
  NGN: {
    code: 'NGN',
    name: 'Nigerian Naira',
    symbol: '₦',
    symbolPosition: 'prefix',
    flag: '🇳🇬',
    countryName: 'Nigeria',
    countryCode: 'NG',
    decimals: 0,
    defaultRate: 1540.0,
    isPopular: false
  },
  ZAR: {
    code: 'ZAR',
    name: 'South African Rand',
    symbol: 'R ',
    symbolPosition: 'prefix',
    flag: '🇿🇦',
    countryName: 'South Africa',
    countryCode: 'ZA',
    decimals: 0,
    defaultRate: 18.2,
    isPopular: false
  },
  BRL: {
    code: 'BRL',
    name: 'Brazilian Real',
    symbol: 'R$',
    symbolPosition: 'prefix',
    flag: '🇧🇷',
    countryName: 'Brazil',
    countryCode: 'BR',
    decimals: 0,
    defaultRate: 5.45,
    isPopular: false
  },
  MXN: {
    code: 'MXN',
    name: 'Mexican Peso',
    symbol: 'Mex$',
    symbolPosition: 'prefix',
    flag: '🇲🇽',
    countryName: 'Mexico',
    countryCode: 'MX',
    decimals: 0,
    defaultRate: 18.6,
    isPopular: false
  },
  CHF: {
    code: 'CHF',
    name: 'Swiss Franc',
    symbol: 'CHF ',
    symbolPosition: 'prefix',
    flag: '🇨🇭',
    countryName: 'Switzerland',
    countryCode: 'CH',
    decimals: 0,
    defaultRate: 0.89,
    isPopular: false
  },
  SEK: {
    code: 'SEK',
    name: 'Swedish Krona',
    symbol: ' kr',
    symbolPosition: 'suffix',
    flag: '🇸🇪',
    countryName: 'Sweden',
    countryCode: 'SE',
    decimals: 0,
    defaultRate: 10.55,
    isPopular: false
  },
  NOK: {
    code: 'NOK',
    name: 'Norwegian Krone',
    symbol: ' kr',
    symbolPosition: 'suffix',
    flag: '🇳🇴',
    countryName: 'Norway',
    countryCode: 'NO',
    decimals: 0,
    defaultRate: 10.7,
    isPopular: false
  },
  DKK: {
    code: 'DKK',
    name: 'Danish Krone',
    symbol: ' kr.',
    symbolPosition: 'suffix',
    flag: '🇩🇰',
    countryName: 'Denmark',
    countryCode: 'DK',
    decimals: 0,
    defaultRate: 6.88,
    isPopular: false
  },
  NZD: {
    code: 'NZD',
    name: 'New Zealand Dollar',
    symbol: 'NZ$',
    symbolPosition: 'prefix',
    flag: '🇳🇿',
    countryName: 'New Zealand',
    countryCode: 'NZ',
    decimals: 0,
    defaultRate: 1.65,
    isPopular: false
  },
  BDT: {
    code: 'BDT',
    name: 'Bangladeshi Taka',
    symbol: '৳',
    symbolPosition: 'prefix',
    flag: '🇧🇩',
    countryName: 'Bangladesh',
    countryCode: 'BD',
    decimals: 0,
    defaultRate: 118.0,
    isPopular: false
  },
  EGP: {
    code: 'EGP',
    name: 'Egyptian Pound',
    symbol: 'EGP ',
    symbolPosition: 'prefix',
    flag: '🇪🇬',
    countryName: 'Egypt',
    countryCode: 'EG',
    decimals: 0,
    defaultRate: 48.6,
    isPopular: false
  },
  PHP: {
    code: 'PHP',
    name: 'Philippine Peso',
    symbol: '₱',
    symbolPosition: 'prefix',
    flag: '🇵🇭',
    countryName: 'Philippines',
    countryCode: 'PH',
    decimals: 0,
    defaultRate: 58.2,
    isPopular: false
  },
  CNY: {
    code: 'CNY',
    name: 'Chinese Yuan',
    symbol: '¥',
    symbolPosition: 'prefix',
    flag: '🇨🇳',
    countryName: 'China',
    countryCode: 'CN',
    decimals: 0,
    defaultRate: 7.25,
    isPopular: false
  },
  HKD: {
    code: 'HKD',
    name: 'Hong Kong Dollar',
    symbol: 'HK$',
    symbolPosition: 'prefix',
    flag: '🇭🇰',
    countryName: 'Hong Kong',
    countryCode: 'HK',
    decimals: 0,
    defaultRate: 7.8,
    isPopular: false
  }
};

// 2. Country Code to Currency Code Mapping (ISO 3166-1 alpha-2 -> Currency)
export const COUNTRY_TO_CURRENCY: Record<string, string> = {
  // Asia & Middle East
  PK: 'PKR', // Pakistan
  AE: 'AED', // United Arab Emirates
  SA: 'SAR', // Saudi Arabia
  IN: 'INR', // India
  QA: 'QAR', // Qatar
  KW: 'KWD', // Kuwait
  OM: 'OMR', // Oman
  BH: 'BHD', // Bahrain
  SG: 'SGD', // Singapore
  MY: 'MYR', // Malaysia
  ID: 'IDR', // Indonesia
  JP: 'JPY', // Japan
  TR: 'TRY', // Turkey
  BD: 'BDT', // Bangladesh
  PH: 'PHP', // Philippines
  CN: 'CNY', // China
  HK: 'HKD', // Hong Kong
  EG: 'EGP', // Egypt

  // Americas
  US: 'USD', // United States
  CA: 'CAD', // Canada
  BR: 'BRL', // Brazil
  MX: 'MXN', // Mexico

  // Europe (Eurozone)
  DE: 'EUR', // Germany
  FR: 'EUR', // France
  IT: 'EUR', // Italy
  ES: 'EUR', // Spain
  NL: 'EUR', // Netherlands
  BE: 'EUR', // Belgium
  AT: 'EUR', // Austria
  IE: 'EUR', // Ireland
  FI: 'EUR', // Finland
  PT: 'EUR', // Portugal
  GR: 'EUR', // Greece
  CY: 'EUR', // Cyprus
  EE: 'EUR', // Estonia
  LV: 'EUR', // Latvia
  LT: 'EUR', // Lithuania
  LU: 'EUR', // Luxembourg
  MT: 'EUR', // Malta
  SK: 'EUR', // Slovakia
  SI: 'EUR', // Slovenia
  HR: 'EUR', // Croatia

  // Europe (Non-Eurozone)
  GB: 'GBP', // United Kingdom
  CH: 'CHF', // Switzerland
  SE: 'SEK', // Sweden
  NO: 'NOK', // Norway
  DK: 'DKK', // Denmark

  // Oceania
  AU: 'AUD', // Australia
  NZ: 'NZD', // New Zealand

  // Africa
  NG: 'NGN', // Nigeria
  ZA: 'ZAR'  // South Africa
};

// Cache constants
const CACHE_KEY_RATES = 'branify_exchange_rates_v1';
const CACHE_KEY_COUNTRY = 'branify_detected_country_v1';
const CACHE_DURATION_RATES = 12 * 60 * 60 * 1000; // 12 hours
const CACHE_DURATION_COUNTRY = 7 * 24 * 60 * 60 * 1000; // 7 days

/**
 * Fetch latest exchange rates with local cache and fallback
 */
export async function getExchangeRates(): Promise<Record<string, number>> {
  // 1. Check local cache
  if (typeof window !== 'undefined') {
    try {
      const cached = localStorage.getItem(CACHE_KEY_RATES);
      if (cached) {
        const parsed = JSON.parse(cached);
        if (parsed.timestamp && Date.now() - parsed.timestamp < CACHE_DURATION_RATES && parsed.rates) {
          return parsed.rates;
        }
      }
    } catch {
      // Ignore localStorage errors
    }
  }

  // 2. Fetch fresh rates from free open API
  const fallbackRates: Record<string, number> = {};
  Object.keys(SUPPORTED_CURRENCIES).forEach((code) => {
    fallbackRates[code] = SUPPORTED_CURRENCIES[code].defaultRate;
  });

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);

    const response = await fetch('https://open.er-api.com/v6/latest/USD', {
      signal: controller.signal
    });
    clearTimeout(timeoutId);

    if (response.ok) {
      const data = await response.json();
      if (data && data.rates) {
        const mergedRates: Record<string, number> = { ...fallbackRates, ...data.rates };
        if (typeof window !== 'undefined') {
          try {
            localStorage.setItem(
              CACHE_KEY_RATES,
              JSON.stringify({
                timestamp: Date.now(),
                rates: mergedRates
              })
            );
          } catch {
            // Ignore storage write errors
          }
        }
        return mergedRates;
      }
    }
  } catch (e) {
    // Network or parse failure, safely fall back
  }

  return fallbackRates;
}

/**
 * Detect customer country automatically via IP Geolocation
 */
export async function detectVisitorCountry(): Promise<DetectedCountry | null> {
  // 1. Check cache first
  if (typeof window !== 'undefined') {
    try {
      const cached = localStorage.getItem(CACHE_KEY_COUNTRY);
      if (cached) {
        const parsed = JSON.parse(cached);
        if (parsed.timestamp && Date.now() - parsed.timestamp < CACHE_DURATION_COUNTRY && parsed.data) {
          return parsed.data;
        }
      }
    } catch {
      // Ignore localStorage errors
    }
  }

  // 2. Query Geolocation Services with fallback redundancy
  const endpoints = [
    {
      url: 'https://ipwho.is/',
      parse: (d: any): DetectedCountry | null => {
        if (d && d.success !== false && d.country_code) {
          const code = d.country_code.toUpperCase();
          const currencyCode = COUNTRY_TO_CURRENCY[code] || (d.currency && d.currency.code) || 'USD';
          return {
            countryCode: code,
            countryName: d.country || code,
            currencyCode: SUPPORTED_CURRENCIES[currencyCode] ? currencyCode : 'USD',
            city: d.city,
            flag: d.flag?.emoji || getFlagEmoji(code),
            ip: d.ip
          };
        }
        return null;
      }
    },
    {
      url: 'https://ipapi.co/json/',
      parse: (d: any): DetectedCountry | null => {
        if (d && d.country_code) {
          const code = d.country_code.toUpperCase();
          const currencyCode = COUNTRY_TO_CURRENCY[code] || d.currency || 'USD';
          return {
            countryCode: code,
            countryName: d.country_name || code,
            currencyCode: SUPPORTED_CURRENCIES[currencyCode] ? currencyCode : 'USD',
            city: d.city,
            flag: getFlagEmoji(code),
            ip: d.ip
          };
        }
        return null;
      }
    }
  ];

  for (const ep of endpoints) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3500);
      const res = await fetch(ep.url, { signal: controller.signal });
      clearTimeout(timeoutId);

      if (res.ok) {
        const json = await res.json();
        const detected = ep.parse(json);
        if (detected) {
          // Cache successful detection
          if (typeof window !== 'undefined') {
            try {
              localStorage.setItem(
                CACHE_KEY_COUNTRY,
                JSON.stringify({
                  timestamp: Date.now(),
                  data: detected
                })
              );
            } catch {
              // Ignore cache write error
            }
          }
          return detected;
        }
      }
    } catch {
      // Try next endpoint
    }
  }

  return null;
}

/**
 * Get country flag emoji from 2-letter ISO code
 */
export function getFlagEmoji(countryCode: string): string {
  if (!countryCode || countryCode.length !== 2) return '🌐';
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}

/**
 * Core Price Formatting Function
 */
export function formatCurrencyPrice(
  amountUSD: number,
  targetCurrency: string = 'USD',
  rates?: Record<string, number>,
  options?: {
    showCode?: boolean;
    compact?: boolean;
  }
): string {
  const config = SUPPORTED_CURRENCIES[targetCurrency] || SUPPORTED_CURRENCIES.USD;
  const rate = (rates && rates[targetCurrency]) || config.defaultRate || 1.0;
  const convertedAmount = amountUSD * rate;

  let formattedNumber: string;

  // Currencies with large whole denominations format cleanly without decimals
  if (config.decimals === 0 || convertedAmount >= 100) {
    formattedNumber = Math.round(convertedAmount).toLocaleString('en-US', {
      maximumFractionDigits: 0
    });
  } else {
    formattedNumber = convertedAmount.toLocaleString('en-US', {
      minimumFractionDigits: config.decimals,
      maximumFractionDigits: config.decimals
    });
  }

  let result = '';
  if (config.symbolPosition === 'prefix') {
    result = `${config.symbol}${formattedNumber}`;
  } else {
    result = `${formattedNumber}${config.symbol}`;
  }

  if (options?.showCode && targetCurrency !== 'USD') {
    result = `${result} (${targetCurrency})`;
  }

  return result;
}

/**
 * Convert USD amount to target currency number
 */
export function convertCurrencyAmount(
  amountUSD: number,
  targetCurrency: string = 'USD',
  rates?: Record<string, number>
): number {
  const config = SUPPORTED_CURRENCIES[targetCurrency] || SUPPORTED_CURRENCIES.USD;
  const rate = (rates && rates[targetCurrency]) || config.defaultRate || 1.0;
  return amountUSD * rate;
}
