import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import QrCodeGenerator from './components/QrCodeGenerator'

export default function Home() {
  return (
    <QrCodeGenerator/>
  )
}
