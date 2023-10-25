import React, { useState } from 'react';
import QRCode from 'qrcode.react';
import axios from 'axios';

function QrCodeGenerator() {
  const [text, setText] = useState('');
  const [size, setSize] = useState('16');
  const [faviconUrl, setFaviconUrl] = useState('');

  const fetchFavicon = async () => {
    try {
      // Construct the URL for fetching the favicon based on the input URL and selected size
      const faviconApiUrl = `https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${text}&size=${size}`;

      // Make a request to fetch the favicon
      const response = await axios.get(faviconApiUrl);
console.log(response)
      // Check if the response contains data
      if (response.data) {
        setFaviconUrl(faviconApiUrl); // Set the favicon URL
      } else {
        console.error('No favicon found');
      }
    } catch (error) {
      console.error('Error fetching favicon:', error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter website URL"
      />
      <select value={size} onChange={(e) => setSize(e.target.value)}>
        <option value="16">16x16</option>
        <option value="32">32x32</option>
        <option value="64">64x64</option>
      </select>
      <button onClick={fetchFavicon}>Fetch Favicon</button>
      {faviconUrl && (
        <QRCode value={text}>
          {/* Display the fetched favicon as an image in the center of the QR code */}
          <image x={25} y={25} width={size} height={size} xlinkHref={faviconUrl} />
        </QRCode>
      )}
    </div>
  );
}

export default QrCodeGenerator;
