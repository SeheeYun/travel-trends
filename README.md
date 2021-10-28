# Korea travel trends

<img alt="gif" src="https://user-images.githubusercontent.com/77285472/139642353-0a0c44cd-8266-4949-a280-b0043a3d2bb0.gif" width="100%">

한국관광공사 Tour API와 D3.js 라이브러리를 활용한 국내여행 트렌드 시각화 사이트 입니다.<br/>
부족한 API 사용 경험, SPA, SSR 이해를 위해 계획한 프로젝트 입니다.

## Features

- 반응형, 인터랙티브 그래프
- 지역별 추천 여행지 표시
- 추천 여행지에 대한 상세페이지
- 웹 스크래핑한 인기검색어 표시

## Tech/framework used

- JavaScript
- React / Context API
- Next / create-next-app
- Material UI
- Axios
- D3.js
- Topojson
- Puppeteer

## What i learned

구현 과정에서 겪었던 문제와 해결 방법에 대해 서술합니다.

### Next.js

검색 엔진 최적화에 강점을 가진 SSR(Server-Side Rendering) 페이지를 만들고싶었고 React로 만들 수 있는 단순한 SPA(Single Page Application)과의 차이점을 이해하고 싶어서 Next.js를 사용했다.

모든 페이지를 pre-rendering해서 만드는게 아니라 필요하지않은 부분은 일반적인 SPA과 같이 CSR(Client-Side Rendering)으로 만들 수 있기 때문에 각 파트의 성격에 따라 렌더링 방식을 혼합하여 사용할 수 있다.

기본적으로 다양한 기능들을 지원해주기때문에 상세페이지를 구현한다던가 성능을 최적화하고 문제가 발생했을 때의 해결 방법에대해 접근하기가 쉽고 문서나 예제가 잘 돼있어서 SSR에서 Material UI같은 라이브러리를 사용하기위한 별도의 설정같은 것도 비교적 쉽게할 수 있다.

프로젝트를 진행하며 발생한 문제에대해 다음과 같은 기능들을 활용했다.

- **API routes**<br/>
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

### git branch

배포를 하면서 개발 환경과 배포 환경의 차이를 체감하고 실제 제품 환경에서의 테스트 필요성을 느꼈다. 간단한 사이드 프로젝트이고 실사용하는 프로젝트는 아니지만 제품 환경에서 계속 테스트를 하는 것은 커밋도 복잡해지고 옳지않다고 판단, 방법을 찾아보았다.

vercel로 배포를 해보면 Production Deployment와 Preview Deployments로 나누어져있고
'To update your Production Deployment, push to the "main" branch.'라는 힌트를 확인 할 수 있다.

vercel에 git repository를 연동해서 배포하게되면 main 브랜치에 push할때마다 자동으로 빌드와 배포가 이루어지고 이 배포는 사용자에게 제공되는 실제 URL을 가진다. 그 외에 브랜치에 push하게 될 경우 고정되지않은 URL을 가진 미리보기 배포를 생성한다. 이 미리보기 배포는 검색엔진에 색인되지않는다.

이를 이용해서 main 브랜치가 아닌 임의의 브랜치에 커밋하면서 오류를 수정하고 실제 서버환경에서 확인해 볼 수 있었다.

오류 수정이 완료되면 지저분한 커밋들을 `git rebase`를 사용해서 정리하고 `git pr`을 생성해서 main 브랜치와 병합해주었다.

## Acknowledgements

- [코딩앙마](https://www.youtube.com/c/%EC%BD%94%EB%94%A9%EC%95%99%EB%A7%88/featured)
- [The Muratorium](https://www.youtube.com/user/murimuffin/about)
