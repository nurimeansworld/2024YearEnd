import { Octokit } from 'octokit';
import { YEAR } from './constants';

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

export const paginateOctokit = async (name, url) => {
  try {
    // const commits = await octokit.paginate(octokit.rest.repos.listForUser, {
    const commits = await octokit.paginate('GET {url}', {
      url: url,
      q: `committer-date:${YEAR}-01-01..${YEAR}-12-31 author:${name}`,
      per_page: 100,

      headers: { 'X-GitHub-Api-Version': '2022-11-28' },
    });
    // console.log(commits);

    return commits;
  } catch (err) {
    console.error(err);
  }
};
