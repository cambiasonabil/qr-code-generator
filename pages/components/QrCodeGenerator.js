import React, { useState } from 'react';
// import QRCode from 'qrcode.react';
import { QRCode } from 'react-qrcode-logo';
function QrCodeGenerator() {
  const [url, setUrl] = useState('');
  const [qrCodeUrl, setQrCodeUrl] = useState('');

  // Function to handle generating the QR code
  const generateQRCode = () => {
    let formattedUrl = url.trim();

    // Check if the URL starts with "http://" or "https://"
    if (!formattedUrl.startsWith('http://') && !formattedUrl.startsWith('https://')) {
      formattedUrl = 'https://' + formattedUrl;
    }

    setQrCodeUrl(formattedUrl);
  };

  return (
    <div>
      <h2>QR Code Generator</h2>
      <input
        type="text"
        placeholder="Enter website URL (without http:// or https://)"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <button onClick={generateQRCode}>Generate QR Code</button>

      {qrCodeUrl && (
        <div>
          <p>Website URL: {qrCodeUrl}</p>
          {/* <QRCode value={qrCodeUrl}
          imageSettings={{
            src:`https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://mediaelegant.com&size=16`,
            x: 32,
            y: 32,
            height: 20,
            width: 20,
            excavate: true

          }}
           /> */}
           <QRCode value={qrCodeUrl}
           logoImage={`https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${qrCodeUrl}&size=128`}
           removeQrCodeBehindLogo={true}
           size={350}
           ecLevel={'H'}
           eyeColor={'grey'}
           eyeRadius={[[10, 10, 0, 10],50,5]}
          //  logoHeight={32}
          //  logoWidth={32}
          //  bgColor='black'
          //  fgColor='white'
          //  logoPadding={10}
          logoHeight={64} // Adjust logo height to your preference
          logoWidth={64}  // Adjust logo width to your preference
          bgColor='white'  // Use a light background color to improve readability
          fgColor='black'  // Use a dark foreground color to improve readability
          logoPadding={5}  // Adjust logo padding to your preference
          logoPaddingStyle={'circle'}
            />
        </div>
      )}
    </div>
  );
}

export default QrCodeGenerator;
