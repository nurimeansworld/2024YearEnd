import GlobalStyle from 'GlobalStyle';
import MainPage from 'pages/MainPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <>
      <GlobalStyle />

      <BrowserRouter>
        <Routes>
          <Route path='/' element={<MainPage />} />
          <Route path='/result' element={<MainPage />} />
        </Routes>
      </BrowserRouter>

      {/* <MainPage /> */}
    </>
  );
}

export default App;
