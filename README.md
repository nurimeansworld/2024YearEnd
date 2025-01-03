# <span id="top">✨ 2024 깃허브 연말결산</span>

https://2024yearend.vercel.app/

<img src="https://nurimeansworld.notion.site/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F6ab7a866-335e-4433-9150-77cd09ab51ba%2F1055f654-1685-45af-9ba4-f70b2ab2df0b%2Fimage.png?table=block&id=1686af74-efe2-803d-9652-c8f0d341b983&spaceId=6ab7a866-335e-4433-9150-77cd09ab51ba&width=2000&userId=&cache=v2">

## 목차

1. [프로젝트 설명](#goal)
2. [개발 환경 및 배포 URL](#dev)
3. [프로젝트 구조](#tree)
4. [주요 기능 및 페이지 설명](#pages)
5. [고민 포인트 기록](#issues)

## <span id="goal">1. 프로젝트 설명</span>

- 🌱 GitHub 커밋 기록으로 데이터를 정리해주는 2024 연말 결산 페이지입니다
- 입력된 username을 기준으로 GitHub API를 이용하여 커밋 기록을 가져옵니다.
- 2024년의 커밋, 이슈, PR, 저장소 기록과 자주 사용한 언어, 많은 커밋을 한 날짜를 보여줍니다.
- 결산된 내용은 한 장의 이미지로 저장 가능합니다.

<p align="right"><a href="#top">(Top)</a></p>

## <span id="dev">2. 개발 환경 및 배포 URL</span>

### 🛠️ 개발 환경

- **Front** : React, styled-components
- **API** : GitHub REST API
- 버전 관리 및 이슈 : 🔗[GitHub](https://github.com/nurimeansworld/2024YearEnd/), 🔗[GitHub Issues](https://github.com/nurimeansworld/2024YearEnd//issues)
- 서비스 배포 환경 : 🔗[Vercel](https://vercel.com/)

### 🚀 배포 URL

URL: 🔗 https://2024yearend.vercel.app/

<p align="right"><a href="#top">(Top)</a></p>

## <span id="tree">3. 프로젝트 구조</span>

- `assets/` : 폰트, og 이미지, 아이콘 등
- `components`/` : 페이지를 제외한 버튼, 레이아웃 등의 컴포넌트 파일
- `hooks/` : API 호출 관련 커스텀 훅 파일
- `pages/` : 메인, 결과, 404 페이지 파일
- `utils/` : 커스텀 함수, 상수, GA 설정 등의 유틸 파일

```bash
🎄 2024YearEnd
├── README.md
├── .github/workflows
│    └── deploy.yml
└── yearend
     ├── .env
     ├── package.json
     ├── public
     │    ├── icon/favicon.ico
     │    └── index.html
     └── src
          ├── App.js
          ├── index.css
          ├── index.js
          ├── GlobalStyle.jsx
          ├── assets
          │   └── fonts, icon, og
          ├── components
          │   ├── BtnSaveImg.jsx
          │   ├── BtnShare.jsx
          │   ├── Outro.jsx
          │   ├── Result.jsx
          │   └── layout
          │       ├── Footer.jsx
          │       ├── Header.jsx
          │       ├── Layout.jsx
          │       └── Title.jsx
          ├── hooks
          │   ├── useCommitData.jsx
          │   ├── useLangData.jsx
          │   ├── useUserData.jsx
          │   └── useYearData.jsx
          ├── pages
          │   ├── MainPage.jsx
          │   ├── NotFoundPage.jsx
          │   └── ResultPage.jsx
          └── utils
              ├── GATracker.js
              ├── constants.js
              ├── functions.js
              └── octokit.js
```

<p align="right"><a href="#top">(Top)</a></p>

## <span id="pages">4. 주요 페이지 및 기능 설명</span>

### 1) 페이지

- `MainPage.jsx`
  - 홈페이지 겸 입력 페이지
  - 입력 단계에서 정규식 검사(`validateID()`), 실존하는 유저네임(`checkExistID()`)인지 확인
  - Enter 키를 눌렀을 때와 모바일을 고려해 ENTER 버튼 클릭 시에도 실행되도록 설정
- `ResultPage.jsx`
  - MainPage에서 전달된 `name`으로 관련 데이터를 가져와 상태를 업데이트하는 페이지
  - `name`이 올바르게 넘어오지 않았을 경우 다시 메인으로 이동
  - 각각의 커스텀 훅에서 요청된 `data`와 `loading`을 받아오고, `useEffect`로 각각의 loading 상태가 업데이트될 때 마다 전체 로딩을 체크하는 `setLoading`으로 상태 업데이트
  - 각 값이 업데이트될 때 마다 최종으로 Result에 넘겨줄 data를 `setData`로 업데이트
- `Result.jsx`
  - ResultPage에서 내려받은 유저 데이터를 출력하는 컴포넌트
  - 커스텀 훅으로 넘겨줄 때 출력 형태로 바로 넘겨줄 수도 있었지만 이후 데이터를 추가적으로 사용할 가능성과 최종적으로 보여지는 컴포넌트에서 수정하는 것이 확실하다 생각하여, 일부 데이터는 Result 컴포넌트에서 문자열 자르기 혹은 형변환 진행
  - Section 태그로 묶인 영역을 이미지로 저장하기 위해 `useRef`로 ref 값 `Outro` 컴포넌트에 전달
- `Outro.jsx`
  - Result에서 넘겨받은 ref 값을 넘겨줄 이미지 저장버튼(`BtnSaveImg`), 링크 복사 버튼(`BtnShare`), 다시하기 를 감싸는 컴포넌트
  - `BtnSaveImg`, `BtnShare`는 각 기능을 독립적으로 수행 가능하게 컴포넌트로 생성
- `BtnSaveImg.jsx`

  - `domtoimage`를 이용하여 props로 받은 ref 데이터와 기존 컴포넌트를 조합하여 생성한 `ImgWrapper`를 `useRef`로 받아와 이미지로 저장
  - 디스플레이 해상도에 의해 줄넘김 등이 통일되지 않을 것을 우려하여 저장된 이미지는 디스플레이 상관없이 고정 사이즈로 저장
  - 고정 사이즈 저장을 위해 이미지 저장용 div를 따로 생성하여 css로 화면에 보이지 않게 설정. 이럴경우 렌더링이 되지 않아 `domtoimage`를 이용하여 저장시 사이즈만 고정된 빈 이미지로 저장
  - 저장 버튼을 클릭할 경우에만 일시적으로 렌더링되게 스타일링 한 후 저장완료후 기존 스타일로 바로 적용(깜빡임 현상 있을 수 있음)

    ```js
    // BtnSaveImg.jsx
    const defaultOptions = { ... };
    const originalStyles = {
      position: imgNode.style.position,
      top: imgNode.style.top,
      left: imgNode.style.left,
      ...
    });

    // 캡쳐용 스타일 설정
    Object.assign(imgNode.style, {
      position: 'absolute',
      top: '0',
      left: '0',
      opacity: '1',
      ...
    });

     domtoimage
      .toPng(imgNode, defaultOptions)
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.download = '2024GithubYearEnd.png';
        link.href = dataUrl;
        link.click();
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        // 스타일 복원
        Object.assign(imgNode.style, originalStyles);
      });
    ```

### 2) 커스텀 훅

- `useCommitData.jsx`
  - **query**: search
  - **method**: paginate
  - 사용자의 커밋 데이터를 받아와 가장 많이 커밋한 날짜, 가장 많이 커밋한 저장소를 받아오는 커스텀 훅
  - 받아온 commits 객체에서 각각 사용할 날짜(`dateKey`), 저장소명(`commitRepo`) 데이터만 `forEach`를 사용해 추출
  - 추출하여 `sortCounts` 함수로 내림차순 정렬하여 첫번째 값만 return
- `useLangData.jsx`
  - **query**: repo
  - **method**: request
  - 사용자의 가장 많이 사용한 언어 데이터를 받아오는 커스텀 훅
  - 받아온 data 객체 값으로 `reduce`를 사용하여 중복 제거 등 종합 언어 데이터인 `totalLang` 선언하여 정렬후 return
- `useUserData.jsx`
  - **query**: users
  - **method**: request
  - type을 기준으로 사용자의 계정 데이터와 저장소 데이터를 받아오는 커스텀 훅
- `useYearData.jsx`
  - **query**: search
  - **method**: request
  - year 값을 기준으로 해당 년도 혹은 전체의 커밋, 이슈, pr, 저장소 값들을 받아오는 커스텀 훅
  - 각 요청들을 비동기로 수행하기 때문에 `Propmise.all`을 사용하여 최종 완료시 해당 값 return

### 3) 그 외(`/utils/funtions`)

- `requestOctokit()`: 반복 사용될 octokit을 이용한 데이터 요청을 함수화. name, url, 요청params를 매개변수로 설정하여 최대한 다양하게 사용 가능하게 생성.
- `paginateOctokit()`: requestOctokit의 request 요청 대신 많은 데이터를 받아와 카운트해야하는 데이터의 경우 paginate로 요청하여 해당 기능 함수화.

## <span id="issues">5. 고민 포인트 기록</span>

### 1) 📝 커스텀 훅의 생성 기준

- 상황
  - 재사용성을 고려하여 커스텀 훅을 생성하였지만 진행하다보니 이 커스텀 훅은 1번만 사용하는데 만드는 게 맞는걸까라는 고민을 함
  - 가독성과 깔끔한 파일 구조를 생각하면 만들자 vs 하지만 재사용률이 많이 낮아보이는 기능
- 결론
  - 재사용이 낮다 하더라도 가독성 또한 효율성 측면에 들어간다 생각이 되어서 생성하는 것으로 결정
  - 절대적인 기준은 없다 생각되어 이 프로젝트를 진행함에 편리하고 유용한 방식으로 진행

### 2) 🐛 GitHub Actions + pages를 이용한 배포와 Personal Access Token 보안 문제

- 상황
  - GitHub Actions + Pages 를 이용하여 배포하고 환경변수는 설정의 secrets ans variables에 선언하여 빌드 시도
  - 해당 방식으로 빌드하는 과정에서 API 사용을 위해 발급받은 Personal Access Token이 gh-pages 브랜치에 기록되어 보안상 자동으로 파기되는 이슈 발생
- 결론
  - Actions에서 생성되는 GITHUB_PAGE 토큰으로 대신 진행하려하였으나 scope 설정이 어려워 다른 배포 방식으로 우회
  - Vercel 서비스 + 환경변수 설정 으로 배포 완료
  - Actions+Pages 와 Vercel 둘 중 어떤 것이 더 낫다 정의하기엔 어렵지만 상황에 따라 필요한 배포 서비스를 이용하는 것이 좋겠다는 결론

### 3) 📝 promise.all과 await/async

- 상황
  - `octokit`을 이용한 여러 요청들에 대한 응답을 값으로 하위 컴포넌트에 props로 넘겨줘야 하기 때문에 의존성 배열, loading 값 설정을 명확하게 할 필요성이 있었음
- 결론
  - 커스텀 훅 별 최대한 범용적으로 사용되게 하되, 하나의 데이터를 return 하도록 정의. 그렇게 설정된 각 loading 값으로 체크하여 최종 컴포넌트 loading 상태 업데이트
  - 그 외의 `useYearData` 같이 list로 요청을 보내는 경우 해당 값들을 모두 받아온 다음 return 하도록 `Promise.all` 사용

### 4) 🐛 domtoimage를 사용하여 보여지지 않는 부분 이미지로 저장

- 상황
  - 결과 화면을 하나의 이미지로 저장하는 기능 구현 진행
  - 디바이스별로 텍스트 줄 바꿈 등이 달라 깔끔하게 통일된 이미지 저장을 위해 별도의 레이아웃 구현 필요
  - 하지만 domtoimage가 구현하는 화면은 렌더링 기준이라 화면에 보이지 않으면 렌더링이 올바르게 되지않아 공백의 이미지가 저장되는 상황
- 결론
  - 최초 결과 페이지 렌더링 시에는 css로 화면에 보이지 않게 설정한 뒤, 이미지 다운로드 버튼 클릭시 domtoimage 내장 함수들로 잠시 화면에 보이게 설정+저장 완료 뒤 기존 css로 설정 하는 방식으로 우회

<p align="right"><a href="#top">(Top)</a></p>
