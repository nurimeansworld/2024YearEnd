import { Octokit } from 'octokit';

const OCTOKIT_TOKEN = process.env.REACT_APP_OCTOKIT_TOKEN;
if (!OCTOKIT_TOKEN) {
  throw new Error('error: octokit token');
}

// octokit instance
export const octokit = new Octokit({
  auth: OCTOKIT_TOKEN,
});

// octokit 요청 함수화
export const requestOctokit = async ({ name, url, params = {} }) => {
  try {
    const { data } = await octokit.request('GET {url}', {
      url: url,
      ...(name && { account_id: name }),
      ...params,
      // per_page: 1,
      // page: 1,

      headers: { 'X-GitHub-Api-Version': '2022-11-28' },
    });

    return data;
  } catch (err) {
    console.error(err);
  }
};
