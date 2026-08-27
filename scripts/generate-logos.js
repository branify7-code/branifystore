import fs from 'fs';
import path from 'path';
import { Resvg } from '@resvg/resvg-js';

const publicDir = path.join(process.cwd(), 'public');
const downloadsDir = path.join(process.cwd(), 'public', 'downloads');

if (!fs.existsSync(downloadsDir)) {
  fs.mkdirSync(downloadsDir, { recursive: true });
}

// System font definition & font styling
const fontStyle = `
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@800;900&amp;display=swap');
    text {
      font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    }
  </style>
`;

// 1. Primary High-Res Icon (Transparent)
const iconTransparentSvg = `<svg width="1024" height="1024" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="blue-grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#5A8DFF" />
      <stop offset="45%" stop-color="#3B6EF6" />
      <stop offset="100%" stop-color="#2450C7" />
    </linearGradient>
    <linearGradient id="silver-grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#EDEFF3" />
      <stop offset="60%" stop-color="#C7CBD4" />
      <stop offset="100%" stop-color="#9AA0AC" />
    </linearGradient>
    <mask id="upper-cutout">
      <rect width="120" height="120" fill="white" />
      <path d="M 48 26 H 75 C 83 26 89 30 89 37 C 89 44 83 48 73 48 L 41 28 L 48 26 Z" fill="black" />
      <path d="M 38 41 L 83 67 L 76 72 L 30 46 Z" fill="black" />
    </mask>
  </defs>

  <!-- Top Cobalt Blue Wing -->
  <path
    d="M 18 36 L 42 14 H 80 C 98 14 110 25 110 41 C 110 54 99 63 83 67 L 40 40 L 18 36 Z"
    fill="url(#blue-grad)"
    mask="url(#upper-cutout)"
  />

  <!-- Lower Silver Loop -->
  <path
    d="M 14 78 L 52 53 H 84 C 102 53 114 64 114 80 C 114 98 98 106 74 106 H 32 C 22 106 18 98 28 98 L 72 98 C 86 98 94 91 94 80 C 94 69 86 63 70 63 L 40 81 L 14 78 Z"
    fill="url(#silver-grad)"
  />
</svg>`;

// 2. Icon on Dark Background
const iconDarkSvg = `<svg width="1024" height="1024" viewBox="0 0 140 140" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="blue-grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#5A8DFF" />
      <stop offset="45%" stop-color="#3B6EF6" />
      <stop offset="100%" stop-color="#2450C7" />
    </linearGradient>
    <linearGradient id="silver-grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#EDEFF3" />
      <stop offset="60%" stop-color="#C7CBD4" />
      <stop offset="100%" stop-color="#9AA0AC" />
    </linearGradient>
    <linearGradient id="bg-grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#12131A" />
      <stop offset="100%" stop-color="#060608" />
    </linearGradient>
  </defs>

  <rect width="140" height="140" rx="32" fill="url(#bg-grad)" stroke="#242838" stroke-width="2" />

  <g transform="translate(10, 10)">
    <path
      d="M 18 36 L 42 14 H 80 C 98 14 110 25 110 41 C 110 54 99 63 83 67 L 40 40 L 18 36 Z"
      fill="url(#blue-grad)"
    />
    <path
      d="M 48 26 H 75 C 83 26 89 30 89 37 C 89 44 83 48 73 48 L 41 28 L 48 26 Z"
      fill="#0A0A0D"
    />
    <path
      d="M 38 41 L 83 67 L 76 72 L 30 46 Z"
      fill="#0A0A0D"
    />
    <path
      d="M 14 78 L 52 53 H 84 C 102 53 114 64 114 80 C 114 98 98 106 74 106 H 32 C 22 106 18 98 28 98 L 72 98 C 86 98 94 91 94 80 C 94 69 86 63 70 63 L 40 81 L 14 78 Z"
      fill="url(#silver-grad)"
    />
  </g>
</svg>`;

// 3. Full Horizontal Brand Logo (Transparent Background)
const logoHorizontalTransparentSvg = `<svg width="2400" height="720" viewBox="0 0 600 180" fill="none" xmlns="http://www.w3.org/2000/svg">
  ${fontStyle}
  <defs>
    <linearGradient id="blue-grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#5A8DFF" />
      <stop offset="45%" stop-color="#3B6EF6" />
      <stop offset="100%" stop-color="#2450C7" />
    </linearGradient>
    <linearGradient id="silver-grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#EDEFF3" />
      <stop offset="60%" stop-color="#C7CBD4" />
      <stop offset="100%" stop-color="#9AA0AC" />
    </linearGradient>
    <mask id="upper-cutout-h">
      <rect width="120" height="120" fill="white" />
      <path d="M 48 26 H 75 C 83 26 89 30 89 37 C 89 44 83 48 73 48 L 41 28 L 48 26 Z" fill="black" />
      <path d="M 38 41 L 83 67 L 76 72 L 30 46 Z" fill="black" />
    </mask>
  </defs>

  <!-- Left Icon Mark -->
  <g transform="translate(25, 30)">
    <path
      d="M 18 36 L 42 14 H 80 C 98 14 110 25 110 41 C 110 54 99 63 83 67 L 40 40 L 18 36 Z"
      fill="url(#blue-grad)"
      mask="url(#upper-cutout-h)"
    />
    <path
      d="M 14 78 L 52 53 H 84 C 102 53 114 64 114 80 C 114 98 98 106 74 106 H 32 C 22 106 18 98 28 98 L 72 98 C 86 98 94 91 94 80 C 94 69 86 63 70 63 L 40 81 L 14 78 Z"
      fill="url(#silver-grad)"
    />
  </g>

  <!-- Typography BRANIFY -->
  <text x="180" y="98" font-family="'Plus Jakarta Sans', sans-serif" font-weight="900" font-size="68" letter-spacing="3">
    <tspan fill="#FFFFFF">BRAN</tspan><tspan fill="#5A8DFF">IFY</tspan>
  </text>

  <!-- Tagline BUILD. BRAND. GROW. -->
  <text x="184" y="132" font-family="'Plus Jakarta Sans', sans-serif" font-weight="800" font-size="15" letter-spacing="5">
    <tspan fill="#FFFFFF">BUILD.</tspan>
    <tspan fill="#5A8DFF" dx="10">BRAND.</tspan>
    <tspan fill="#FFFFFF" dx="10">GROW.</tspan>
  </text>
  <rect x="184" y="144" width="70" height="3.5" rx="1.75" fill="#5A8DFF" />
</svg>`;

// 4. Full Horizontal Brand Logo (Dark Background)
const logoHorizontalDarkSvg = `<svg width="2400" height="720" viewBox="0 0 640 190" fill="none" xmlns="http://www.w3.org/2000/svg">
  ${fontStyle}
  <defs>
    <linearGradient id="blue-grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#5A8DFF" />
      <stop offset="45%" stop-color="#3B6EF6" />
      <stop offset="100%" stop-color="#2450C7" />
    </linearGradient>
    <linearGradient id="silver-grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#EDEFF3" />
      <stop offset="60%" stop-color="#C7CBD4" />
      <stop offset="100%" stop-color="#9AA0AC" />
    </linearGradient>
    <linearGradient id="bg-grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#12131A" />
      <stop offset="100%" stop-color="#060608" />
    </linearGradient>
  </defs>

  <rect width="640" height="190" rx="28" fill="url(#bg-grad)" stroke="#242838" stroke-width="2" />

  <!-- Left Icon Mark -->
  <g transform="translate(35, 35)">
    <path
      d="M 18 36 L 42 14 H 80 C 98 14 110 25 110 41 C 110 54 99 63 83 67 L 40 40 L 18 36 Z"
      fill="url(#blue-grad)"
    />
    <path
      d="M 48 26 H 75 C 83 26 89 30 89 37 C 89 44 83 48 73 48 L 41 28 L 48 26 Z"
      fill="#12131A"
    />
    <path
      d="M 38 41 L 83 67 L 76 72 L 30 46 Z"
      fill="#12131A"
    />
    <path
      d="M 14 78 L 52 53 H 84 C 102 53 114 64 114 80 C 114 98 98 106 74 106 H 32 C 22 106 18 98 28 98 L 72 98 C 86 98 94 91 94 80 C 94 69 86 63 70 63 L 40 81 L 14 78 Z"
      fill="url(#silver-grad)"
    />
  </g>

  <!-- Typography BRANIFY -->
  <text x="190" y="102" font-family="'Plus Jakarta Sans', sans-serif" font-weight="900" font-size="68" letter-spacing="3">
    <tspan fill="#FFFFFF">BRAN</tspan><tspan fill="#5A8DFF">IFY</tspan>
  </text>

  <!-- Tagline BUILD. BRAND. GROW. -->
  <text x="194" y="136" font-family="'Plus Jakarta Sans', sans-serif" font-weight="800" font-size="15" letter-spacing="5">
    <tspan fill="#FFFFFF">BUILD.</tspan>
    <tspan fill="#5A8DFF" dx="10">BRAND.</tspan>
    <tspan fill="#FFFFFF" dx="10">GROW.</tspan>
  </text>
  <rect x="194" y="148" width="70" height="3.5" rx="1.75" fill="#5A8DFF" />
</svg>`;

// 5. Stacked / Vertical Emblem Logo (Dark Background)
const logoVerticalDarkSvg = `<svg width="1200" height="1200" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
  ${fontStyle}
  <defs>
    <linearGradient id="blue-grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#5A8DFF" />
      <stop offset="45%" stop-color="#3B6EF6" />
      <stop offset="100%" stop-color="#2450C7" />
    </linearGradient>
    <linearGradient id="silver-grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#EDEFF3" />
      <stop offset="60%" stop-color="#C7CBD4" />
      <stop offset="100%" stop-color="#9AA0AC" />
    </linearGradient>
    <linearGradient id="bg-grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#12131A" />
      <stop offset="100%" stop-color="#060608" />
    </linearGradient>
  </defs>

  <rect width="400" height="400" rx="40" fill="url(#bg-grad)" stroke="#242838" stroke-width="2" />

  <!-- Center Top Icon Mark -->
  <g transform="translate(140, 50)">
    <path
      d="M 18 36 L 42 14 H 80 C 98 14 110 25 110 41 C 110 54 99 63 83 67 L 40 40 L 18 36 Z"
      fill="url(#blue-grad)"
    />
    <path
      d="M 48 26 H 75 C 83 26 89 30 89 37 C 89 44 83 48 73 48 L 41 28 L 48 26 Z"
      fill="#12131A"
    />
    <path
      d="M 38 41 L 83 67 L 76 72 L 30 46 Z"
      fill="#12131A"
    />
    <path
      d="M 14 78 L 52 53 H 84 C 102 53 114 64 114 80 C 114 98 98 106 74 106 H 32 C 22 106 18 98 28 98 L 72 98 C 86 98 94 91 94 80 C 94 69 86 63 70 63 L 40 81 L 14 78 Z"
      fill="url(#silver-grad)"
    />
  </g>

  <!-- Wordmark BRANIFY -->
  <text x="200" y="240" text-anchor="middle" font-family="'Plus Jakarta Sans', sans-serif" font-weight="900" font-size="52" letter-spacing="4">
    <tspan fill="#FFFFFF">BRAN</tspan><tspan fill="#5A8DFF">IFY</tspan>
  </text>

  <!-- Tagline BUILD. BRAND. GROW. -->
  <text x="200" y="280" text-anchor="middle" font-family="'Plus Jakarta Sans', sans-serif" font-weight="800" font-size="14" letter-spacing="4">
    <tspan fill="#FFFFFF">BUILD.</tspan>
    <tspan fill="#5A8DFF" dx="8">BRAND.</tspan>
    <tspan fill="#FFFFFF" dx="8">GROW.</tspan>
  </text>
  <rect x="155" y="300" width="90" height="3.5" rx="1.75" fill="#5A8DFF" />
</svg>`;

// Helper function to render and save PNG and SVG
function renderAsset(filename, svgString, width, height) {
  // Save SVG
  const svgPath = path.join(publicDir, `${filename}.svg`);
  const svgDownloadPath = path.join(downloadsDir, `${filename}.svg`);
  fs.writeFileSync(svgPath, svgString);
  fs.writeFileSync(svgDownloadPath, svgString);

  // Render PNG with resvg
  const resvg = new Resvg(svgString, {
    fitTo: {
      mode: 'width',
      value: width,
    },
    shapeRendering: 2, // geometricPrecision
    textRendering: 1, // optimizeLegibility
    imageRendering: 0, // optimizeQuality
  });

  const pngData = resvg.render();
  const pngBuffer = pngData.asPng();

  const pngPath = path.join(publicDir, `${filename}.png`);
  const pngDownloadPath = path.join(downloadsDir, `${filename}.png`);
  fs.writeFileSync(pngPath, pngBuffer);
  fs.writeFileSync(pngDownloadPath, pngBuffer);

  console.log(`Rendered: ${filename}.png (${width}x${height || 'auto'}) & ${filename}.svg`);
}

console.log('Rendering high-res Branify logo assets...');

// 1. Primary full logo (transparent)
renderAsset('branify-logo', logoHorizontalTransparentSvg, 2400);

// 2. Primary full logo (dark background)
renderAsset('branify-logo-dark', logoHorizontalDarkSvg, 2400);

// 3. Primary icon mark (transparent)
renderAsset('branify-icon', iconTransparentSvg, 1024);

// 4. Primary icon mark (dark background)
renderAsset('branify-icon-dark', iconDarkSvg, 1024);

// 5. Vertical Stack Badge Logo (dark background)
renderAsset('branify-logo-vertical', logoVerticalDarkSvg, 1200);

console.log('All PNG and SVG logo assets created successfully in /public and /public/downloads!');
