import { Octokit } from 'octokit';

const OCTOKIT_TOKEN = process.env.REACT_APP_OCTOKIT_TOKEN;

if (!OCTOKIT_TOKEN) {
  throw new Error('error: octokit token');
}

export const octokit = new Octokit({
  auth: OCTOKIT_TOKEN,
});
