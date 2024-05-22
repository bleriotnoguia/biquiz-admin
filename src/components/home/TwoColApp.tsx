import Link from 'next/link'

export default function TwoColApp() {
  return (
    <>
      <div className="container flex flex-wrap p-8 mx-auto xl:px-0 lg:gap-10 lg:flex-nowrap">
        <div className="flex flex-wrap items-start w-full lg:w-1/2">
          <div className="mb-5">
            <div className="flex flex-col w-full">
              <div className="relative">
                <h3 className="max-w-2xl mt-3 text-4xl font-bold leading-snug tracking-tight text-gray-800 lg:leading-tight lg:text-5xl dark:text-white">
                  Biquiz
                </h3>
                <div className="absolute bottom-1 left-0 bg-blue-400 z-[-1] w-36 h-3"></div>
              </div>
              <p className="max-w-2xl py-4 text-lg leading-normal text-gray-500 lg:text-xl xl:text-xl dark:text-gray-300">
                Biquiz is a Bible quiz app that helps you learn the Bible in a fun and interactive
                way. Through quizzes and activities, users can explore biblical content and deepen
                their knowledge of scripture.
              </p>
            </div>
            <div className="w-full mt-5">
              <div className="flex items-start mt-8 space-x-3">
                <div className="flex items-center justify-center flex-shrink-0 mt-1 bg-indigo-500 rounded-md w-11 h-11">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-7 h-7 text-indigo-50"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                </div>
                <div>
                  <h4 className="text-xl font-medium text-gray-800 dark:text-gray-200">
                    Interactive Learning
                  </h4>
                  <p className="mt-1 text-gray-500 dark:text-gray-400">
                    Biquiz offers an engaging and interactive platform to learn the Bible in a fun
                    and enjoyable manner.
                  </p>
                </div>
              </div>
              <div className="flex items-start mt-8 space-x-3">
                <div className="flex items-center justify-center flex-shrink-0 mt-1 bg-indigo-500 rounded-md w-11 h-11">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-7 h-7 text-indigo-50"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"
                    ></path>
                  </svg>
                </div>
                <div>
                  <h4 className="text-xl font-medium text-gray-800 dark:text-gray-200">
                    Verification of the Source
                  </h4>
                  <p className="mt-1 text-gray-500 dark:text-gray-400">
                    Biquiz ensures the credibility and accuracy of the quiz content by thoroughly
                    verifying the sources of the questions and answers.
                  </p>
                </div>
              </div>
              <div className="flex items-start mt-8 space-x-3">
                <div className="flex items-center justify-center flex-shrink-0 mt-1 bg-indigo-500 rounded-md w-11 h-11">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-7 h-7 text-indigo-50"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    ></path>
                  </svg>
                </div>
                <div>
                  <h4 className="text-xl font-medium text-gray-800 dark:text-gray-200">
                    Varied Content
                  </h4>
                  <p className="mt-1 text-gray-500 dark:text-gray-400">
                    This variation ensures that users receive a comprehensive understanding of
                    different aspects of the Bible.
                  </p>
                </div>
              </div>
              <div className="flex items-start mt-8 space-x-3">
                <div className="flex items-center justify-center flex-shrink-0 mt-1 bg-indigo-500 rounded-md w-11 h-11">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-7 h-7 text-indigo-50"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"
                    ></path>
                  </svg>
                </div>
                <div>
                  <h4 className="text-xl font-medium text-gray-800 dark:text-gray-200">
                    Score Tracking
                  </h4>
                  <p className="mt-1 text-gray-500 dark:text-gray-400">
                    Biquiz incorporates a scoring system that allows users to track their progress
                    and assess their knowledge at the end of each quiz.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center w-full lg:w-1/2">
          <iframe
            className="shadow-md border-slate-200 border-2 rounded-md"
            src="https://biquiz-app.vercel.app/"
            width={375}
            height={667}
          ></iframe>

          <div className="mt-7">
            <Link target="_blank" href="https://biquiz-app.vercel.app/">
              <span className="w-full px-6 py-2 text-center text-white bg-indigo-500 rounded">
                Full Screen
              </span>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
