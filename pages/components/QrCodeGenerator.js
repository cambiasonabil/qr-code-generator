import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode.react';
import axios from 'axios';
import cheerio from 'cheerio';
import Image from 'next/image';

function QrCodeGenerator() {
  const [text, setText] = useState('');
  const [faviconUrl, setFaviconUrl] = useState('');

  useEffect(() => {
    // Function to retrieve the website's favicon
    async function getFaviconUrl(websiteUrl) {
      try {
        // Make an HTTP GET request to the website
        const response = await axios.get(websiteUrl);

        // Parse the HTML content of the website using Cheerio
        const $ = cheerio.load(response.data);

        // Find the <link> tag with rel="icon" or rel="shortcut icon"
        const faviconLink = $('link[rel="icon"], link[rel="shortcut icon"]');

        // Extract the href attribute (URL) of the favicon
        const faviconUrl = faviconLink.attr('href');

        if (faviconUrl) {
          // Construct the absolute URL if it's a relative URL
          const absoluteFaviconUrl = new URL(faviconUrl, websiteUrl).href;
          setFaviconUrl(absoluteFaviconUrl);
        }
      } catch (error) {
        console.error('Error retrieving favicon:', error);
      }
    }

    if (text.startsWith('http://') || text.startsWith('https://')) {
      getFaviconUrl(text);
    } else {
      setFaviconUrl(''); // Reset favicon URL if the input is not a valid URL
    }
  }, [text]);

  return (
    <div>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter website URL"
      />
      <QRCode value={text}>
        {/* Add the retrieved favicon as an image in the center of the QR code */}
        {faviconUrl && (
          <Image x={25} y={25} width={50} height={50} xlinkHref={faviconUrl} alt='favicon' />
        )}
      </QRCode>
    </div>
  );
}

export default QrCodeGenerator;
