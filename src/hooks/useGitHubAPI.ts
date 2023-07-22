import { useState } from 'react';
import { GitHubRepository, GitHubUserData } from '../types';

const GITHUB_API_BASE_URL = 'https://api.github.com';
const GITHUB_ACCESS_TOKEN = import.meta.env.VITE_GITHUB_ACCESS_TOKEN;

export const useGitHubAPI = (query: string) => {
	const [loading, setLoading] = useState(false);
	const [loadingDetail, setLoadingDetail] = useState<boolean>(false)
	const [data, setData] = useState<GitHubUserData[]>([]);
	const [detail, setDetail] = useState<GitHubRepository[]>([])
	const [error, setError] = useState<string | null>(null);

	const fetchGitHubRepositories = async (selectedUser: string) => {
		try {
			setLoadingDetail(true)
			const response = await fetch(`${GITHUB_API_BASE_URL}/users/${selectedUser}/repos`, {
				headers: {
					Authorization: `token ${GITHUB_ACCESS_TOKEN}`,
				},
			});
			const responseData = await response.json();
			setDetail(responseData);
		} catch (error) {
			setError('Error fetching repositories from GitHub API');
		} finally {
			setLoadingDetail(false)
		}
	};

	const fetchData = async () => {
		try {
			setLoading(true)
			const response = await fetch(`${GITHUB_API_BASE_URL}/search/users?q=${query}&per_page=5`, {
				headers: {
					Authorization: `token ${GITHUB_ACCESS_TOKEN}`,
				},
			});
			const responseData = await response.json();
			setData(responseData.items);
		} catch (error) {
			setError('Error fetching data from GitHub API');
		} finally {
			setLoading(false)
		}
	};

	return { loading, data, error, fetchData, detail, loadingDetail, fetchGitHubRepositories };
};
