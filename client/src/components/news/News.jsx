import { useEffect, useState } from 'react'

import NewsPiece from './NewsPiece'
import logo from '../../assets/logo.png'
import * as api from '../../api'

const refreshTime = 5 * 60 * 1000

export default function News() {
  const [news, setNews] = useState([])

  useEffect(() => {
    async function getNews() {
      const data = await api.getNews()
      setNews(data.news)
    }

    getNews()

    const interval = setInterval(getNews, refreshTime)

    return () => clearInterval(interval)
  }, [])

  return (
    <>
      <div className="news overflow-x-hidden">
        <div className="relative h-20 w-screen bg-green-800 shadow-md shadow-gray-400">
          <p className="absolute top-1/2 left-5 -translate-y-5/8 text-6xl font-semibold text-gray-100">
            Aktualności ZSM
          </p>
          <img
            className="absolute top-1/2 right-5 h-18 -translate-y-1/2"
            src={logo}
            alt="Logo ZSM"
          />
        </div>

        <div className="relative m-auto mt-10 flex w-4/5 flex-col">
          {news.length == 0 ? (
            <p className="self-center text-xl font-semibold text-gray-500">
              Brak wyników
            </p>
          ) : (
            news.map(({ text, category, _id, date }) => (
              <NewsPiece
                text={text}
                category={category}
                key={_id}
                date={date}
              />
            ))
          )}
        </div>
      </div>
    </>
  )
}
