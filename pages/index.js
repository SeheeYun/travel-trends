import axios from 'axios';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import chartData from '../src/data/data.json';

export default function Home() {
  return (
    <div>
      <Head>
        <title>국내 여행 트렌드</title>
        <meta
          name="description"
          content="국내 여행 트렌드에 대한 데이터 시각화 사이트입니다."
        />
      </Head>
    </div>
  );
}
