import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Outro, Result } from 'components';
import { useCommitData, useLangData, useUserData, useYearData } from 'hooks';
import { Title } from 'components/layout';

function ResultPage() {
  const location = useLocation();
  if (!location.state) {
    alert('입력된 이름이 없습니다. 다시 입력해주세요.');
    window.location.href = '/';
  }
  const name = location.state ? location.state : '';

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // name이 빈 값이었다가 setName으로 state update 되었을 때
  const { data: user, loading: loadingUser } = useUserData(name);
  const { data: dataofAll, loading: loadingAll } = useYearData(name);
  const { data: dataof2024, loading: loading2024 } = useYearData(name, '2024');
  const { data: langData, loading: loadingLang } = useLangData(name);
  const { data: commitData, loading: loadingCommit } = useCommitData(name);

  useEffect(() => {
    const loadingList = {
      loadingAll: loadingAll,
      loading2024: loading2024,
      loadingUser: loadingUser,
      loadingLang: loadingLang,
      loadingCommit: loadingCommit,
    };
    // if (name) {
    setLoading(
      loadingAll || loading2024 || loadingUser || loadingLang || loadingCommit
    );
    // }

    if (process.env.NODE_ENV !== 'production') {
      var consoleLoading = '';
      for (var e in loadingList) {
        consoleLoading += loadingList[e] == false ? `${e}, ` : '';
      }
      console.log('update 완료:', consoleLoading);
    }
  }, [name, loadingAll, loading2024, loadingUser, loadingLang, loadingCommit]);

  useEffect(() => {
    // if (!loading) {
    setData({
      user: user,
      dataofAll: dataofAll,
      dataof2024: dataof2024,
      mostof2024: {
        sortedDate: commitData?.date,
        sortedRepo: commitData?.repo,
        sortedLang: langData,
      },
    });
    // }
  }, [loading, name, user, dataofAll, dataof2024, commitData, langData]);

  return (
    <>
      <Title />
      {name ? (
        loading ? (
          <p> loading . . . </p>
        ) : (
          <>
            <Result loading={loading} {...data} />
            <Outro {...data} />
          </>
        )
      ) : (
        // CHECK:: 이름 다시 입력하게 유도
        <></>
      )}
    </>
  );
}
export default ResultPage;
