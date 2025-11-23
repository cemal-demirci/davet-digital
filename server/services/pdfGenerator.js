// TEMPORARILY DISABLED: Puppeteer removed for Vercel deployment
// const puppeteer = require('puppeteer');

/**
 * Generate PDF from HTML content
 * @param {Object} invitation - Invitation object with design and event info
 * @param {Object} options - PDF generation options (format, quality, etc.)
 * @returns {Buffer} PDF buffer
 */
async function generateInvitationPDF(invitation, options = {}) {
  let browser;

  try {
    // Launch headless browser
    browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();

    // Set viewport based on invitation size
    const dimensions = getSizeDimensions(options.size || 'A6');
    await page.setViewport({
      width: dimensions.width,
      height: dimensions.height,
      deviceScaleFactor: 2 // High quality for print
    });

    // Generate HTML content from invitation design
    const html = generateInvitationHTML(invitation);

    // Set content
    await page.setContent(html, {
      waitUntil: 'networkidle0'
    });

    // Generate PDF
    const pdf = await page.pdf({
      format: options.size || 'A6',
      printBackground: true,
      preferCSSPageSize: true,
      margin: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
      }
    });

    await browser.close();
    return pdf;

  } catch (error) {
    if (browser) await browser.close();
    throw new Error(`PDF generation failed: ${error.message}`);
  }
}

/**
 * Generate HTML for canvas-based designs
 */
function generateCanvasHTML(customDesign) {
  const { previewImage } = customDesign;

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }

          body {
            margin: 0;
            padding: 0;
            overflow: hidden;
          }

          img {
            width: 100vw;
            height: 100vh;
            object-fit: contain;
          }
        </style>
      </head>
      <body>
        <img src="${previewImage}" alt="Invitation Design" />
      </body>
    </html>
  `;
}

/**
 * Get pixel dimensions for invitation sizes
 */
function getSizeDimensions(size) {
  const sizes = {
    'A6': { width: 1050, height: 1480 }, // 105mm x 148mm @ 300 DPI
    'A5': { width: 1480, height: 2100 }, // 148mm x 210mm @ 300 DPI
    'A4': { width: 2100, height: 2970 }, // 210mm x 297mm @ 300 DPI
    'custom': { width: 1200, height: 1800 } // Default custom size
  };

  return sizes[size] || sizes.A6;
}

/**
 * Generate HTML from invitation design
 */
function generateInvitationHTML(invitation) {
  const { customDesign, eventInfo } = invitation;

  // Check if this is a canvas-based design
  if (customDesign.canvasData) {
    return generateCanvasHTML(customDesign);
  }

  const { background, textSections, imageSections } = customDesign;

  // Generate background styles
  let backgroundStyle = '';
  if (background.type === 'solid') {
    backgroundStyle = `background-color: ${background.color};`;
  } else if (background.type === 'gradient') {
    const { from, via, to, direction } = background.gradient;
    backgroundStyle = `background: linear-gradient(${direction}, ${from}, ${via}, ${to});`;
  } else if (background.type === 'image' && background.image) {
    backgroundStyle = `background-image: url('${background.image}'); background-size: cover; background-position: center;`;
  }

  // Generate text elements HTML
  const textElements = textSections.map(section => {
    const style = section.style || {};
    return `
      <div class="text-element" style="
        position: absolute;
        top: ${section.position?.top || 0}%;
        left: ${section.position?.left || 0}%;
        width: ${section.position?.width || 100}%;
        text-align: ${style.textAlign || 'center'};
        font-family: '${style.fontFamily || 'Arial'}', sans-serif;
        font-size: ${style.fontSize || 24}px;
        color: ${style.color || '#000000'};
        font-weight: ${style.fontWeight || 'normal'};
        font-style: ${style.fontStyle || 'normal'};
        text-transform: ${style.textTransform || 'none'};
        line-height: ${style.lineHeight || 1.5};
        letter-spacing: ${style.letterSpacing || 0}px;
        transform: translateX(-50%);
      ">
        ${section.content || ''}
      </div>
    `;
  }).join('');

  // Generate image elements HTML
  const imageElements = imageSections.map(section => {
    return `
      <div class="image-element" style="
        position: absolute;
        top: ${section.position?.top || 0}%;
        left: ${section.position?.left || 0}%;
        width: ${section.position?.width || 100}%;
        height: ${section.position?.height || 'auto'};
        transform: translateX(-50%);
      ">
        <img src="${section.url}" style="
          width: 100%;
          height: 100%;
          object-fit: ${section.style?.objectFit || 'contain'};
          border-radius: ${section.style?.borderRadius || 0}px;
          opacity: ${section.style?.opacity || 1};
        " />
      </div>
    `;
  }).join('');

  // Complete HTML template
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Great+Vibes&family=Poppins:wght@300;400;600&family=Montserrat:wght@400;600&family=Playfair+Display:wght@400;700&family=Dancing+Script:wght@400;700&family=Roboto:wght@300;400;500&display=swap');

          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }

          body {
            margin: 0;
            padding: 0;
            overflow: hidden;
          }

          .invitation-container {
            position: relative;
            width: 100vw;
            height: 100vh;
            ${backgroundStyle}
            overflow: hidden;
          }

          .text-element {
            z-index: 10;
          }

          .image-element {
            z-index: 5;
          }
        </style>
      </head>
      <body>
        <div class="invitation-container">
          ${imageElements}
          ${textElements}
        </div>
      </body>
    </html>
  `;
}

/**
 * Generate high-resolution PDF for print
 */
async function generatePrintPDF(invitation, printOptions) {
  const options = {
    size: printOptions.size || 'A6',
    quality: 'print' // High DPI for printing
  };

  return await generateInvitationPDF(invitation, options);
}

/**
 * Generate digital PDF for download/email
 */
async function generateDigitalPDF(invitation) {
  const options = {
    size: 'A6',
    quality: 'screen' // Optimized for screen viewing
  };

  return await generateInvitationPDF(invitation, options);
}

module.exports = {
  generateInvitationPDF,
  generatePrintPDF,
  generateDigitalPDF,
  generateInvitationHTML
};
