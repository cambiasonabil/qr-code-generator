import Head from 'next/head'
import QrCodeGenerator from '../src/components/QrCodeGenerator'
import OurQrCodeGenerator from '../src/components/OurQrCodeGenerator';



export default function Home() {
  return (
    <div>
      <Head>
        <title>QR CODE GENERATOR</title>
        <meta name="description" content="Generate qr code" />
        <link rel="icon" href="/favicon.ico" />
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3431156667078669"
          crossorigin="anonymous"></script>
        <meta name="google-adsense-account" content="ca-pub-3431156667078669" />
      </Head>

      <main>
        <OurQrCodeGenerator />
      </main>

      {/* Created by Nabil cambiaso -- Media elegant */}
    </div>
  );
}