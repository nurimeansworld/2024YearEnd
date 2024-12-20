import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ReactGA from 'react-ga4';

const GATracker = () => {
  const GA_ID = 'G-VNCRHFMQD0';
  const location = useLocation();
  const [initialized, setInitialized] = useState(false);

  // 실서버용
  useEffect(() => {
    // localhost는 추적 X
    if (!window.location.href.includes('localhost')) {
      ReactGA.initialize(GA_ID);
    }
    setInitialized(true);
  }, []);

  useEffect(() => {
    if (initialized) {
      ReactGA.send({ hitType: 'pageview', page: location.pathname });
    }
  }, [initialized, location]);

  // // 개발용
  // useEffect(() => {
  //   ReactGA.initialize(GA_ID, { debug: true });
  //   ReactGA.send({ hitType: 'pageview', page: location.pathname });
  // }, [location]);
};

export default GATracker;
