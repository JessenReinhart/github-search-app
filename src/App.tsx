import { FormEvent, useEffect, useState } from 'react'

import { useGitHubAPI } from './hooks/useGitHubAPI';
import { GitHubUserData } from './types';

const App: React.FC = () => {
  const [query, setQuery] = useState<string>('')
  const [displayName, setDisplayName] = useState<string>('')
  const [selectedUser, setSelectedUser] = useState<string>('')
  const { 
    loading, 
    data, 
    error, 
    fetchData, 
    fetchGitHubRepositories, 
    detail, 
    loadingDetail } = useGitHubAPI(query);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setDisplayName(query)
    if (query) fetchData()
  }

  useEffect(() => {
    if (selectedUser) fetchGitHubRepositories(selectedUser)
  }, [selectedUser])

  return (
    <section className="flex h-screen w-screen">
      <form onSubmit={handleSubmit} className="flex flex-col p-6 m-auto w-80 rounded-lg shadow-lg gap-2 border bg-gray-100">
        <input 
          type="text" 
          className="p-2 rounded border" 
          placeholder="🔎 Enter username..." 
          value={query} 
          onChange={(e) => setQuery(e.target.value.trim())}
        />
        <button className="bg-blue-600 p-2 text-white rounded hover:bg-blue-500 hover:shadow transition">Search</button>
        {loading && (
          <ul>
            {Array.from({ length: 5 }).map((idx) => <li className="animate-pulse bg-gray-300 h-6 my-1 rounded" />)}            
          </ul>
        )}

        {error && <span className="text-red-500 text-sm bg-red-200 p-2 rounded text-center font-semibold">Error: {error}</span>}

        {(!loading && !error && displayName?.length > 0) && (data?.length > 0 ? (
          <>
            <small className="text-gray-400 text-sm">Showing results for '{displayName}'</small>
            <ul className="flex flex-col gap-2">
              {data.map((item: GitHubUserData) => (
                <>
                  <li 
                    key={item.id} 
                    className="bg-gray-200 py-2 px-4 cursor-pointer flex flex-row justify-between items-center" 
                    onClick={() => setSelectedUser(selectedUser === item.login ? "" : item.login)}>
                    {item.login}
                    <img 
                      src="https://cdn.onlinewebfonts.com/svg/img_195827.png" 
                      alt="chevron" 
                      className={`h-4 w-4 opacity-40 transition ${selectedUser === item.login ? 'rotate-180' : ''}`} />
                  </li>
                  {selectedUser === item.login && (loadingDetail ? <li className="animate-pulse bg-gray-300 h-6 my-1 rounded" /> : 
                    detail?.length > 0 ? detail.map((data) => <div key={data.full_name} className="p-2 ml-2 flex flex-row bg-gray-300 justify-between">
                      <div className="flex flex-col">
                        <span className="font-bold">{data.name}</span>
                        <p className='text-sm'>{data.description}</p>
                      </div>
                      <div className="font-bold flex flex-row gap-1">
                        <span>{data.stargazers_count}</span>
                        <span>&#9733;</span>
                      </div>
                    </div>) : <small className="text-gray-500 text-sm bg-gray-200 p-2 rounded mx-2 text-center font-semibold">No repositories found</small>
                  )}
                </>
              ))}
            </ul>
          </>
        ) : <small className="text-gray-500 text-sm bg-gray-200 p-2 rounded my-2 text-center font-semibold">No results for '{displayName}'</small>)}
      </form>
    </section>
  )
}

export default App
