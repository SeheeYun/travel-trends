# Korea travel trends

<img alt="gif" src="https://user-images.githubusercontent.com/77285472/139642353-0a0c44cd-8266-4949-a280-b0043a3d2bb0.gif" width="100%">

한국관광공사 Tour API와 D3.js 라이브러리를 활용한 국내여행 트렌드 시각화 사이트 입니다. [링크](https://travel-trends.vercel.app/)

## Features

- 반응형, 인터랙티브 그래프
- 지역별 추천 여행지 표시
- 추천 여행지에 대한 상세페이지
- 웹 스크래핑한 인기검색어 표시

## Tech Stack

- Next.js / Vercel
- Material UI
- D3.js
- Topojson
- Puppeteer
- react-query
- Jest / testing-library

## Structure

```text
📦pages
 ┣ 📂api
 ┃ ┗ 📜[id].js
 ┣ 📂view
 ┃ ┗ 📜[id].js
 ┣ 📜_app.js
 ┣ 📜_document.js
 ┗ 📜index.js

📦src
 ┣ 📂components
 ┃ ┣ 📂common
 ┃ ┣ 📂geoChartSection
 ┃ ┣ 📂keywordChartSection
 ┃ ┣ 📂itemsSection
 ┃ ┃ ┣ 📂tests
 ┃ ┃ ┣ 📜Item.jsx
 ┃ ┃ ┣ 📜Items.jsx
 ┃ ┃ ┣ 📜ItemsSection.jsx
 ┃ ┃ ┗ 📜SkeletonItem.jsx
 ┣ 📂context
 ┣ 📂hooks
 ┣ 📂api
 ┗ 📂service
```

## What i learned

- **next/API routes**<br/>
  선택한 지역에 따라 클라이언트에서 추천여행지 api를 호출하도록 만들었는데, 사용하는 tour api가 http만 지원해서 [mixed content](https://developer.mozilla.org/en-US/docs/Web/Security/Mixed_content) 이슈로 요청이 차단되어 데이터를 불러올 수 없는 문제가 발생, 서버 구축을 해본적이 없어서 난감하던차에 next.js에서 지원하는 API routes를 적용해보았다.

  API routes는 쉽게 api endpoint를 생성할 수 있는 방법으로 next.js로 만든 앱을 vercel로 배포했을 때, 생성한 api는 자동으로 serverless function이 된다. [참고](https://vercel.com/docs/concepts/next.js/overview#)

  상세페이지를 만드는 것과 마찬가지로 api를 만드는 것도 [dynamic routes](https://nextjs.org/docs/routing/dynamic-routes)를 지원하기 때문에 각 지역에대한 api를 손쉽게 구현할 수 있었다.

- **next/router**<br/>
  사이트에 접속한 후 처음 상세페이지를 불러올 때 로딩에 4초 가량 시간이 소요되고 그 이후 상세페이지를 불러올 땐 1초도 걸리지않는 문제가 있었다.

  vercel을 사용해서 프로젝트를 빌드/배포 했는데 vercel은 AWS lambda를 기반으로 하는 서버리스 플랫폼으로, vercel로 배포한 SSR 페이지는 serverless function으로 렌더링되기 때문에 한동안 사용하지 않았다가 호출하게되면 지연시간이 발생하는 cold start 이슈가 있다.

  지속적으로 함수를 호출하여 따듯하게 유지하는 방법, `getServerSideProps`가 아닌 `getStaticProps`로 미리 빌드 된 SSG(Static-Site-Generation) 페이지를 만드는 방법 등으로 문제를 해결할 수 있다. 각 지역에 대한 추천 여행지가 변경되고 모든 여행지에대한 상세페이지를 미리 빌드하는 것은 많은 아이템을 만들어야하므로 부적절하다고 판단, 내 재량 내에서 해결하고자 했다.

  cold start가 발생할 때 한동안 페이지에 아무런 반응이 없는 것처럼 보이기 때문에 경로가 변경되는 것을 감지할 수 있는 `router.events`를 사용해서 상세페이지를 불러오기 시작할 때 부터 종료될 때까지 Progress indicators를 표시하도록 하였다.

- **next/image**<br/>
  추천여행지 리스트를 표시하는데에 많은 네트워크 비용이 발생하고 이미지에 따라 로딩되는 시점의 차이가 커서 좋지않은 ux를 제공했다.

  next.js의 `next/image`는 지원이 되는 브라우저라면 자동으로 webp로 변환된 최적화된 이미지를 표시하고, 기본적으로 lazy loading을 제공한다. 또는 `blurDataURL` 속성을 사용해서 Progressive Image Loading을 구현하게 할 수도 있다.

  이를 적용해서 처음 페이지를 표시할 때 사용되는 네트워크 비용을 50% 이상 낮췄고, Progressive Image를 적용해서 이미지가 로드되는 동안 콘텐츠를 공백으로 표시하지않도록 했다.
