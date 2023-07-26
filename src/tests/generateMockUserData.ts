import { GitHubUserData } from '../types';

const generateMockUserData = (): GitHubUserData => {
  return {
    avatar_url: 'https://example.com/avatar.png',
    events_url: 'https://example.com/events',
    followers_url: 'https://example.com/followers',
    following_url: 'https://example.com/following',
    gists_url: 'https://example.com/gists',
    gravatar_id: 'gravatarId123',
    html_url: 'https://example.com/user',
    id: 123,
    login: 'exampleUser',
    node_id: 'nodeId123',
    organizations_url: 'https://example.com/organizations',
    received_events_url: 'https://example.com/received_events',
    repos_url: 'https://example.com/repos',
    score: 4.5,
    site_admin: false,
    starred_url: 'https://example.com/starred',
    subscriptions_url: 'https://example.com/subscriptions',
    type: 'User',
    url: 'https://example.com',
  };
};

export default generateMockUserData;

