import GlobalStyle from 'GlobalStyle';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { MainPage, ResultPage, NotFoundPage } from 'pages';
import { Layout } from 'components/layout';
import GATracker from 'utils/GATracker';

function App() {
  return (
    <>
      <GlobalStyle />

      <BrowserRouter>
        <GATracker />
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
