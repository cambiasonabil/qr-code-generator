import Head from 'next/head'
import QrCodeGenerator from './components/QrCodeGenerator'



export default function Home() {
  return (
    <div>
      <Head>
        <title>My Next.js App</title>
        <meta name="description" content="Generate qr code" />
        <link rel="icon" href="/favicon.ico" />
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3431156667078669"
          crossorigin="anonymous"></script>
        <meta name="google-adsense-account" content="ca-pub-3431156667078669" />
      </Head>

      <main>
        <h1>Welcome to My Service</h1>
        <QrCodeGenerator />
      </main>

      <footer>
        No copyright
      </footer>
    </div>
  );
}