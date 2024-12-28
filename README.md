# <span id="top">✨ 2024 깃허브 연말결산</span>

https://2024yearend.vercel.app/

<img src="https://file.notion.so/f/f/6ab7a866-335e-4433-9150-77cd09ab51ba/1055f654-1685-45af-9ba4-f70b2ab2df0b/image.png?table=block&id=1686af74-efe2-803d-9652-c8f0d341b983&spaceId=6ab7a866-335e-4433-9150-77cd09ab51ba&expirationTimestamp=1735372800000&signature=pydd_2zNZTp-G3qNt4x_aQk26ijg793oy1Frk7E-H-I&downloadName=image.png">

## 개요

- GitHub 커밋 기록으로 데이터를 정리해주는 2024 연말 결산 페이지입니다 🌱
- 입력된 username을 기준으로 GitHub API를 이용하여 커밋 기록을 가져옵니다.
- 2024년의 커밋, 이슈, PR, 저장소 기록과 자주 사용한 언어, 많은 커밋을 한 날짜를 보여줍니다.
- 결산된 내용은 한 장의 이미지로 저장 가능합니다.

## 목차

1. [프로젝트 설명](#goal)
2. [개발 환경 및 배포 URL](#dev)
3. [프로젝트 구조](#tree)
4. [주요 기능 및 페이지 설명](#pages)
5. [고민 포인트 기록](#issues)

## <span id="goal">1. 프로젝트 설명</span>

- 깃허브 프로필의 잔디로 매일의 커밋은 확인 가능하지만, 1년간의 데이터를 한눈에 정리하고 싶었습니다.
- 연말결산 페이지에서 영감을 받아 깃허브 커밋 데이터도 연말결산 형식으로 시각화하고자 했습니다.
- 정리된 기록을 통해 더 구체적인 내년 계획과 목표를 세울 수 있습니다.
- 결과를 한 장의 이미지로 간편하게 보관할 수 있습니다.

<p align="right"><a href="#top">(Top)</a></p>

## <span id="dev">2. 개발 환경 및 배포 URL</span>

### 1) 개발 환경

- Front : React, styled-components
- Back : GitHub REST API
- 버전 관리 및 이슈 : 🔗[GitHub](https://github.com/nurimeansworld/2024YearEnd/), 🔗[GitHub Issues](https://github.com/nurimeansworld/2024YearEnd//issues)
- 서비스 배포 환경 : 🔗[Vercel](https://vercel.com/)

### 2) 배포 URL

URL : 🔗 https://2024yearend.vercel.app/

<p align="right"><a href="#top">(Top)</a></p>

## <span id="tree">3. 프로젝트 구조</span>

- assets/ : 폰트, og 이미지, 아이콘 등
- components/ : 페이지를 제외한 버튼, 레이아웃 등의 컴포넌트 파일
- hooks/ : API 호출 관련 커스텀 훅 파일
- pages/ : 메인, 결과, 404 페이지 파일
- utils/ : 커스텀 함수, 상수, GA 설정 등의 유틸 파일

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

## <span id="pages">4. 주요 기능 및 페이지 설명</span>

### 1) 홈

- 홈페이지 겸 입력 페이지
- `MainPage.jsx`
  - 입력 단계에서 정규식 검사(validateID()), 실존하는 유저네임(checkExistID())인지 확인
- 메인 페이지
- 메인 페이지
- 메인 페이지

| TITLE   | TITLE   |
| ------- | ------- |
| CONTENT | CONTENT |

## <span id="issues">5. 고민 포인트 기록</span>

### 1) 커스텀훅의 생성 기준

#### 내용

- list
- list
- list

#### 결론

- list
- list
- list

### 2) GitHub Actions + pages를 이용한 배포와 Personal Access Token 보안 문제

#### 내용

- list
- list
- list

#### 결론

- list
- list
- list

### 3) promise.all과 await/async

#### 내용

- list
- list
- list

#### 결론

- list
- list
- list

<p align="right"><a href="#top">(Top)</a></p>
