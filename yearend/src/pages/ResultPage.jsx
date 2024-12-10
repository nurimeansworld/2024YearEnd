import styled from 'styled-components';
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
  const [loadtext, setLoadText] = useState([]);

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
    setLoading(
      loadingAll || loading2024 || loadingUser || loadingLang || loadingCommit
    );

    const res = [];
    var count = 0;
    const mesg = [
      '[ ------- LIST ------- ]',
      '✅ 유저 데이터',
      '✅ 2024년의 커밋 데이터',
      '✅ 자주 사용한 언어 데이터',
      '✅ 많이 커밋한 날짜 데이터',
    ];

    for (var e in loadingList) {
      if (loadingList[e] === false) {
        res.push(mesg[count]);
        count++;
      }
    }
    setLoadText(res);
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
      {name && (
        <p className='userName'>
          username : '<span id='userName'>{name}</span>'
        </p>
      )}
      {name ? (
        loading ? (
          <Loading>
            {loadtext.map((item, ind) => {
              return <p key={ind}>{item}</p>;
            })}
            <p className='spinner'> loading . . . </p>
          </Loading>
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

const Loading = styled.section`
  .spinner {
    margin-top: 3rem;
    text-align: center;
    animation: blink-effect 1s step-end infinite;
  }
  @keyframes blink-effect {
    50% {
      opacity: 0;
    }
  }
`;

export default ResultPage;
