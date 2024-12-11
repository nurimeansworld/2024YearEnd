import GlobalStyle from 'GlobalStyle';
import MainPage from 'pages/MainPage';
import ResultPage from 'pages/ResultPage';
import NotFoundPage from 'pages/NotFoundPage';
import { Layout } from 'components/layout';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <>
      <GlobalStyle />

      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path='/' element={<MainPage />} />
            <Route path='/result' element={<ResultPage />} />
            <Route path='*' element={<NotFoundPage />} />
          </Routes>
        </Layout>
      </BrowserRouter>

      {/* <MainPage /> */}
    </>
  );
}

export default App;
