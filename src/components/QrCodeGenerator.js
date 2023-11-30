import React, { useState, useRef } from 'react';
import { QRCode } from 'react-qrcode-logo';
import html2canvas from 'html2canvas'; // Import html2canvas library for creating PDF
import jsPDF from 'jspdf'; // Import jsPDF library for creating PDF

function QrCodeGenerator() {
  const qrcodeContainerRef = useRef(null);
  const [url, setUrl] = useState('');
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [selectedFormat, setSelectedFormat] = useState('png'); // Default format is PNG

  // Function to handle generating the QR code
  const generateQRCode = () => {
    let formattedUrl = url.trim();

    // Check if the URL starts with "http://" or "https://"
    if (!formattedUrl.startsWith('http://') && !formattedUrl.startsWith('https://')) {
      formattedUrl = 'https://' + formattedUrl;
    }

    setQrCodeUrl(formattedUrl);
  };

  // Create a function to download the QR code as PNG
  const downloadCanvasAsPNG = () => {
    const canvas = document.getElementById('react-qrcode-logo');

    // Use the toDataURL method of the canvas to get the image data as a base64-encoded PNG
    const imgData = canvas.toDataURL('image/png');

    // Create a temporary link element to trigger the download
    const a = document.createElement('a');
    a.href = imgData;
    a.download = 'qrcode.png';

    // Trigger the click event on the link to start the download
    a.click();
  };

  // Function to handle the download
  const downloadQRCode = () => {
    if (selectedFormat === 'png') {
      downloadCanvasAsPNG();

    } else if (selectedFormat === 'pdf') {
      // Download as PDF
      const element = document.getElementById('the-qrcode-container');

      html2canvas(element).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'px', 'a4');
        pdf.addImage(imgData, 'PNG', 30, 30);
        pdf.save('qrcode.pdf');
      });
    }
  };

  return (
    <div className='min-w-[100vw] flex justify-center flex-col items-center h-[100vh] bg-slate-900 text-white'>
      <h2 className='text-3xl block'>QR Code Generator</h2>
      <div className='w-100 overflow-x-hidden  flex lg:flex-row md:flex-col sm:flex-col xs:flex-col flex-col justify-center  items-center h-[100vh] bg-slate-900 text-white'>
        <div className='lg:w-[40vw] md:w-[80vw] sm:w-[90vw] xs:w-[90vw] w-[90vw]  flex  justify-center flex-col items-center  bg-red-500 text-white'>

          <input
            type="text"
            placeholder="Enter website URL (without http:// or https://)"
            className=' bg-orange-400'
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <button onClick={generateQRCode} className=' text-cyan-300 text-opacity-40'>Generate QR Code</button>

        </div>

        <div className='lg:w-[40vw] md:w-[80vw] sm:w-[90vw] xs:w-[90vw]  w-[90vw] flex justify-center flex-col items-center  bg-fuchsia-900 text-white'  >

           {/* Dropdown to select format */}
      <select onChange={(e) => setSelectedFormat(e.target.value)}>
        <option value="png">PNG</option>
        <option value="pdf">PDF</option>
      </select>

      {qrCodeUrl && (
        <div id="qrcode-container" >
          <p>Website URL: {qrCodeUrl}</p>
          <div id='the-qrcode-container' ref={qrcodeContainerRef}>
            <QRCode value={qrCodeUrl}
              logoImage={`https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${qrCodeUrl}&size=128`}
              removeQrCodeBehindLogo={true}
              size={350}
              ecLevel={'H'}
              eyeColor={'grey'}
              eyeRadius={[[10, 10, 0, 10], 50, 5]}
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

          <br />
          <br />
          <br />
          <button onClick={downloadQRCode}>Download QR Code</button>
        </div>
      )}
        </div>
      </div>



     
    </div>
  );
}

export default QrCodeGenerator;

// // import React, { useState } from 'react';
// // import { QRCode } from 'react-qrcode-logo';

// // function QrCodeGenerator() {
// //   const [url, setUrl] = useState('');
// //   const [qrCodeUrl, setQrCodeUrl] = useState('');

// //   // Function to handle generating the QR code
// //   const generateQRCode = () => {
// //     let formattedUrl = url.trim();

// //     // Check if the URL starts with "http://" or "https://"
// //     if (!formattedUrl.startsWith('http://') && !formattedUrl.startsWith('https://')) {
// //       formattedUrl = 'https://' + formattedUrl;
// //     }

// //     setQrCodeUrl(formattedUrl);
// //   };

// //   // Function to trigger the download
// //   const downloadQRCode = () => {
// //     const canvas = document.querySelector('canvas'); // Get the canvas element
// //     const image = canvas.toDataURL('image/png'); // Convert the canvas to a data URL

// //     const link = document.createElement('a'); // Create a new anchor element
// //     link.href = image; // Set the anchor's href attribute to the data URL
// //     link.download = 'qrcode.png'; // Set the download attribute to specify the file name

// //     link.click(); // Trigger a click event on the anchor element to start the download
// //   };

// //   return (
// //     <div>
// //       <h2>QR Code Generator</h2>
// //       <input
// //         type="text"
// //         placeholder="Enter website URL (without http:// or https://)"
// //         value={url}
// //         onChange={(e) => setUrl(e.target.value)}
// //       />
// //       <button onClick={generateQRCode}>Generate QR Code</button>

// //       {qrCodeUrl && (
// //         <div>
// //           <p>Website URL: {qrCodeUrl}</p>
// //           <QRCode value={qrCodeUrl}
// //            logoImage={`https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${qrCodeUrl}&size=128`}
// //            removeQrCodeBehindLogo={true}
// //            size={350}
// //            ecLevel={'H'}
// //            eyeColor={'grey'}
// //            eyeRadius={[[10, 10, 0, 10],50,5]}
// //           //  logoHeight={32}
// //           //  logoWidth={32}
// //           //  bgColor='black'
// //           //  fgColor='white'
// //           //  logoPadding={10}
// //           logoHeight={64} // Adjust logo height to your preference
// //           logoWidth={64}  // Adjust logo width to your preference
// //           bgColor='white'  // Use a light background color to improve readability
// //           fgColor='black'  // Use a dark foreground color to improve readability
// //           logoPadding={5}  // Adjust logo padding to your preference
// //           logoPaddingStyle={'circle'}
// //             />
// //           <button onClick={downloadQRCode}>Download QR Code</button> {/* Add the download button */}
// //         </div>
// //       )}
// //     </div>
// //   );
// // }

// // export default QrCodeGenerator;

// import React, { useState } from 'react';
// import QRCode from 'react-qrcode-logo';

// export default function QrCodeGenerator() {

//   const [url, setUrl] = useState('');
//   const [qrCodeUrl, setQrCodeUrl] = useState('');
//   const [selectedFormat, setSelectedFormat] = useState('png'); // Default format is PNG

//   // Function to handle generating the QR code
//   const generateQRCode = () => {
//     let formattedUrl = url.trim();

//     // Check if the URL starts with "http://" or "https://"
//     if (!formattedUrl.startsWith('http://') && !formattedUrl.startsWith('https://')) {
//       formattedUrl = 'https://' + formattedUrl;
//     }

//     setQrCodeUrl(formattedUrl);
//   };

//   // Create a function to download the QR code as PNG
//   const downloadCanvasAsPNG = () => {
//     const canvas = document.getElementById('react-qrcode-logo');

//     // Use the toDataURL method of the canvas to get the image data as a base64-encoded PNG
//     const imgData = canvas.toDataURL('image/png');

//     // Create a temporary link element to trigger the download
//     const a = document.createElement('a');
//     a.href = imgData;
//     a.download = 'qrcode.png';

//     // Trigger the click event on the link to start the download
//     a.click();
//   };

//   // Function to handle the download
//   const downloadQRCode = () => {
//     if (selectedFormat === 'png') {
//       downloadCanvasAsPNG();

//     } else if (selectedFormat === 'pdf') {
//       // Download as PDF
//       const element = document.getElementById('the-qrcode-container');

//       html2canvas(element).then((canvas) => {
//         const imgData = canvas.toDataURL('image/png');
//         const pdf = new jsPDF('p', 'px', 'a4');
//         pdf.addImage(imgData, 'PNG', 30, 30);
//         pdf.save('qrcode.pdf');
//       });
//     }
//   };
//   return (
//     <div className="bg-black text-white min-h-screen flex flex-col items-center justify-center">
//       <h1 className="text-4xl mb-4">QR CODE GENERATOR</h1>
//       <div className="flex w-full max-w-3xl justify-between">
//         <div className="w-1/4">
//           {/* Left ad space */}
//         </div>
//         <div className="w-1/2 flex flex-col items-center">
//           <input
//             type="text"
//             className="p-2 mb-4 border border-gray-300 rounded w-full"
//             placeholder="Enter URL"
//             onChange={(e) => setUrl(e.target.value)}
//           />
//           <button onClick={generateQRCode}>Generate QR Code</button>

//           {qrCodeUrl && (
//             <div className="my-2">
//               <QRCode value={qrCodeUrl}
//                 logoImage={`https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${qrCodeUrl}&size=128`}
//                 removeQrCodeBehindLogo={true}
//                 size={350}
//                 ecLevel={'H'}
//                 eyeColor={'grey'}
//                 eyeRadius={[[10, 10, 0, 10], 50, 5]}
//                 //  logoHeight={32}
//                 //  logoWidth={32}
//                 //  bgColor='black'
//                 //  fgColor='white'
//                 //  logoPadding={10}
//                 logoHeight={64} // Adjust logo height to your preference
//                 logoWidth={64}  // Adjust logo width to your preference
//                 bgColor='white'  // Use a light background color to improve readability
//                 fgColor='black'  // Use a dark foreground color to improve readability
//                 logoPadding={5}  // Adjust logo padding to your preference
//                 logoPaddingStyle={'circle'}
//               />
//             </div>
//           )}
//           {qrCodeUrl && (
//             <div className="my-2">
//               <select
//                 className="p-2 mb-2 border border-gray-300 rounded w-full"
//                 onChange={(e) => setSelectedFormat(e.target.value)}
//               >
//                 <option value="png">PNG</option>
//                 <option value="pdf">PDF</option>
//               </select>
//               {/* <button
//                 className="bg-green-500 hover:bg-green-600 p-2 rounded w-full border border-green-700"
//                 onClick={downloadQRCode}
//               >
//                 Download
//               </button> */}
//             </div>
//           )}
//         </div>
//         <div className="w-1/4">
//           {/* Right ad space */}
//         </div>
//       </div>
//     </div>
//   );
// }

