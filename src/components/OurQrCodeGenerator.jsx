import Head from 'next/head';
import domtoimage from 'dom-to-image';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { QRCode } from 'react-qrcode-logo';
import placeholder from '../../assets/placeholder.webp';
import html2canvas from 'html2canvas'; // Import html2canvas library for creating PDF
import jsPDF from 'jspdf'; // Import jsPDF library for creating PDF
import ReactDOM from 'react-dom/client';



export default function OurQrCodeGenerator() {
  const qrcodeContainerRef = useRef(null);
  const [resolution, setResolution] = useState(360);
  const [url, setUrl] = useState('');
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [selectedFormat, setSelectedFormat] = useState('png');
  const [selectedBackgroundColor, setSelectedBackgroundColor] = useState('#FFFFFF');
  const [selectedForegroundColor, setSelectedForegroundColor] = useState('#000000');
  const [selectedEyeColor, setSelectedEyeColor] = useState('#111111');
  const [topLeft, setTopLeft] = useState([10, 10, 0, 10]);
  const [topRight, setTopRight] = useState([10, 10, 0, 10]);
  const [bottomLeft, setBottomLeft] = useState([10, 10, 0, 10]);
  const [base64Logo, setBase64Logo] = useState('');

  useEffect(() => {
    if (qrCodeUrl !== '') {
      fetch(`https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${qrCodeUrl}&size=128`)
        .then(response => response.blob())
        .then(blob => {
          const reader = new FileReader();
          reader.readAsDataURL(blob);
          reader.onloadend = function () {
            const base64data = reader.result;
            setBase64Logo(base64data);
          }
        })
        .catch(error => {
          console.error('Error fetching or converting the image:', error);
        });
    }
  }, [qrCodeUrl]);

  const handleResolutionChange = (e) => {
    const value = parseInt(e.target.value, 10);
    switch (value) {
      case 1:
        setResolution(360);
        break;
      case 2:
        setResolution(720);
        break;
      case 3:
        setResolution(1080);
        break;
      default:
        setResolution(360);
    }
  };

  // Function to handle generating the QR code
  const generateQRCode = () => {
    let formattedUrl = url.trim();

    // Check if the URL starts with "http://" or "https://"
    if (!formattedUrl.startsWith('http://') && !formattedUrl.startsWith('https://')) {
      formattedUrl = 'https://' + formattedUrl;
    }

    setQrCodeUrl(formattedUrl);
  };

  const handleTopLeftRadius = (data, index) => (event) => {
    const newValues = [...data]; // Copy the current values
    newValues[index] = parseInt(event.target.value, 10); // Update the specific index
    setTopLeft(newValues); // Set the new values
  };

  const handleTopRightRadius = (data, index) => (event) => {
    const newValues = [...data]; // Copy the current values
    newValues[index] = parseInt(event.target.value, 10); // Update the specific index
    setTopRight(newValues); // Set the new values
  };

  const handleBottomLeftRadius = (data, index) => (event) => {
    const newValues = [...data]; // Copy the current values
    newValues[index] = parseInt(event.target.value, 10); // Update the specific index
    setBottomLeft(newValues); // Set the new values
  };




  const dowloadPDF = () => {
    const element = document.getElementById('the-qrcode-container');

    html2canvas(element).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'px', 'a4');
      pdf.addImage(imgData, 'PNG', 30, 30);
      pdf.save('qrcode.pdf');
    });
  };

  const downloadQRCodeAsHDImage = () => {
    // Create a container for the high-resolution QR code
    const tempDiv = document.createElement('div');
    tempDiv.id = 'high-res-qrcode-container';
    tempDiv.style.position = 'absolute';
    tempDiv.style.left = '-9999px'; // Position off-screen
    tempDiv.style.top = '-9999px'; // Ensure it's fully off-screen
    document.body.appendChild(tempDiv);

    // Render high-resolution QR code inside the container
    ReactDOM.createRoot(tempDiv).render(
      <QRCode
        value={qrCodeUrl}
        logoImage={base64Logo}
        removeQrCodeBehindLogo={true}
        size={resolution} // High resolution size
        ecLevel={'H'}
        eyeColor={selectedEyeColor}
        eyeRadius={[topLeft, topRight, bottomLeft]}
        bgColor={selectedBackgroundColor}
        fgColor={selectedForegroundColor}
        logoHeight={90} // Adjusted for high resolution
        logoWidth={90} // Adjusted for high resolution
        logoPadding={15} // Adjusted for high resolution
        logoPaddingStyle={'circle'}
      />
    );

    // Use a timeout to ensure the high-res QR code is rendered
    setTimeout(() => {
      if (selectedFormat === 'pdf') {
        dowloadPDF();
      } else {
        html2canvas(tempDiv, { logging: true, useCORS: true }).then((canvas) => {
          const imgData = canvas.toDataURL(`${selectedFormat === 'png' ? 'image/png' : 'image/jpeg'}`);
          const link = document.createElement('a');
          link.download = `qrcode-${resolution}.${selectedFormat === 'png' ? 'png' : 'jpg'}`;
          link.href = imgData;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          document.body.removeChild(tempDiv);
        });
      }
    }, 1000); 
  };


  return (
    <div className="bg-purple-500 min-h-screen flex px-30 lg:flex-row md:flex-col sm:flex-col xs:flex-col flex-col justify-evenly  items-center">
      <Head>
        <title>QR Code Generator</title>
      </Head>

      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md md:my-16 sm:my-16 xs:my-16 my-16 lg:my-0">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold text-gray-700">GENERATE QR CODE</h1>
          <span className="text-sm text-gray-500">mediaelegant.com</span>
        </div>

        <div className="mb-4">
          <label htmlFor="url" className="text-sm text-gray-600">Enter URL</label>
          <input type="text" id="url" placeholder="https://www.example.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="mt-1 w-full p-2 border rounded" />
        </div>

        <div className="mb-4">

          <div className="flex justify-between items-center mt-6">

            <div className='flex flex-col items-center justify-center'>
              <label className="text-sm text-gray-600">Eye color</label>
              <input
                type="color"
                className="border rounded h-10 w-16 mt-2"
                id="foregroundColor"
                value={selectedForegroundColor}
                onChange={(e) => { setSelectedEyeColor(e.target.value) }}
              />
            </div>

            <div className='flex flex-col items-center justify-center'>
              <label className="text-sm text-gray-600">Foreground color</label>
              <input
                type="color"
                className="border rounded h-10 w-16 mt-2"
                id="foregroundColor"
                value={selectedForegroundColor}
                onChange={(e) => { setSelectedForegroundColor(e.target.value) }}
              />
            </div>

            <div className='flex flex-col items-center justify-center'>
              <label className="text-sm text-gray-600">Background color</label>
              <input
                type="color"
                className="border rounded h-10 w-16 mt-2"
                id="backgroundColor"
                value={selectedBackgroundColor}
                onChange={(e) => { setSelectedBackgroundColor(e.target.value) }}
              />
            </div>

          </div>
        </div>

        {/* <div className="flex justify-around items-center mb-4">
          {['YouTube', 'LINE', 'Viber', 'Pinterest', 'Twitter'].map((logo) => (
            <button key={logo} className="p-2 rounded-full bg-gray-200">
              <span className="text-xs">{logo}</span>
            </button>
          ))}
        </div> */}

        <div className="mb-4">
          <div>
            <p>Top Left Eye Radius:</p>
            <div className='flex'>
              {topLeft.map((value, index) => (
                <input
                  key={`topLeft-${index}`}
                  className='w-20 pl-4 py-1 mr-2 mt-2 bg-gray-200 rounded-[10px]'
                  type="number"
                  value={value}
                  onChange={handleTopLeftRadius(topLeft, index)}
                />
              ))}
            </div>
          </div>

          <div>
            <p>Top Right Eye Radius:</p>
            <div className='flex'>
              {topRight.map((value, index) => (
                <input
                  key={`topRight-${index}`}
                  className='w-20 pl-4 py-1 mr-2 mt-2 bg-gray-200 rounded-[10px]'
                  type="number"
                  value={value}
                  onChange={handleTopRightRadius(topRight, index)}
                />
              ))}
            </div>
          </div>

          <div>
            <p>Bottom Left Eye Radius:</p>
            <div className='flex'>
              {bottomLeft.map((value, index) => (
                <input
                  key={`bottomLeft-${index}`}
                  className='w-20 pl-4 py-1 mr-2 mt-2 bg-gray-200 rounded-[10px]'
                  type="number"
                  value={value}
                  onChange={handleBottomLeftRadius(bottomLeft, index)}
                />
              ))}
            </div>
          </div>
        </div>

        <button
          className="mb-4 w-full bg-purple-500 text-white p-2 rounded shadow"
          onClick={generateQRCode}
        >
          Create QR Code
        </button>

        {/* History Section (placeholder) */}
        {/* <div className="mt-4">
          <h2 className="text-sm text-gray-600">History (4)</h2>
          <div className="bg-gray-100 mt-2 p-2 rounded">
            <p className="text-xs text-gray-500">Previous QR codes...</p>
          </div>
        </div> */}

      </div>

      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex flex-col items-center bg-gray-100 rounded  w-full mb-4 p-2" >
          <span className="text-gray-500"></span>
          <h1 className="text-xl font-bold text-gray-700">Your QR Code will appear here</h1>
          {qrCodeUrl ? (
            <div id='the-qrcode-container'>
              <QRCode
                ref={qrcodeContainerRef}
                value={qrCodeUrl}
                logoImage={base64Logo}
                removeQrCodeBehindLogo={true}
                size={300}
                ecLevel={'H'}
                eyeColor={selectedEyeColor}
                eyeRadius={[topLeft, topRight, bottomLeft]}
                //  logoHeight={32}
                //  logoWidth={32}
                //  bgColor='black'
                //  fgColor='white'
                //  logoPadding={10}
                logoHeight={30} // Adjust logo height to your preference
                logoWidth={30}  // Adjust logo width to your preference
                bgColor={selectedBackgroundColor}  // Use a light background color to improve readability
                fgColor={selectedForegroundColor}  // Use a dark foreground color to improve readability
                logoPadding={5}  // Adjust logo padding to your preference
                logoPaddingStyle={'circle'}
              />
            </div>
          )
            : <div>
              <Image
                src={placeholder}
                alt="Placeholder"
                width={500} // Set the width as needed
                height={300} // Set the height as needed
                layout="responsive" // This is optional, depending on your layout needs
              />
            </div>
          }
        </div>

        <div className="mb-4">
          <div className="flex justify-between items-center my-2">
            <label htmlFor="resolution" className="text-sm text-gray-600">Resolution</label>
            <label htmlFor="resolution" className="text-sm text-gray-600">{`${resolution} px`}</label>

          </div>
          <input
            type="range"
            id="resolution"
            min="1"
            max="3"
            value={resolution === 360 ? 1 : resolution === 720 ? 2 : 3}
            onChange={handleResolutionChange}
            className="w-full mt-1"
          />
        </div>

        <div className="flex justify-between items-center my-2">
          <button
            className={`text-lg ${selectedFormat == 'png' ? 'text-purple-900' : 'text-gray-300'}`}
            onClick={() => { setSelectedFormat('png') }}
          >PNG</button>
          <button
            className={`text-lg ${selectedFormat == 'jpg' ? 'text-purple-900' : 'text-gray-300'}`}
            onClick={() => { setSelectedFormat('jpg') }}
          >JPG</button>
          <button
            className={`text-lg ${selectedFormat == 'pdf' ? 'text-purple-900' : 'text-gray-300'}`}
            onClick={() => { setSelectedFormat('pdf') }}
          >PDF</button>
        </div>

        <button
          className="mt-4 w-full bg-green-400 text-white p-2 rounded shadow"
          onClick={downloadQRCodeAsHDImage}
        >
          Download QR Code
        </button>
      </div>
    </div>
  );
}
