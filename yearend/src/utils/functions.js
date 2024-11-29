export const sortCounts = (dataObj) => {
  return Object.entries(dataObj)
    .map(([name, counts]) => ({ name, counts }))
    .sort((a, b) => b.counts - a.counts);
};

export const checkExistID = async (str) => {
  let res = await fetch(`https://api.github.com/users/${str}`);
  return res.ok ? true : false;
};

export const validateID = (str) => {
  const reg = /^[A-Za-z0-9]{4,39}$/;
  const regKor = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;

  if (!reg.test(str)) {
    return regKor.test(str)
      ? 'ID는 영문 or 숫자 조합으로 입력해주세요.'
      : 'ID는 4~39자로 입력해주세요.';
  }
  return null;
};
