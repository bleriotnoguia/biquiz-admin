import React from 'react'

const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-slate-800 dark:text-slate-100">
      <div className="flex flex-col items-center">
        <svg className="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24"></svg>
        <h1 className="text-3xl font-bold">Loading ...</h1>
      </div>
    </div>
  )
}

export default Loading
