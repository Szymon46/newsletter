import { useEffect, useState } from 'react'

import NewsPiece from './NewsPiece'
import logo from '../../assets/logo.png'

const refreshTime = 5 * 60 * 1000

export default function News() {
  const [news, setNews] = useState([])

  useEffect(() => {
    async function getNews() {
      const res = await fetch(
        `http://${import.meta.env.VITE_SERVER_HOST || 'localhost'}:${import.meta.env.VITE_SERVER_PORT || 3000}/api/news`
      )

      const data = await res.json()

      const parsedData = data.map((d) => ({
        ...d,
        date: new Date(d.date),
      }))

      setNews(parsedData)
    }

    getNews()

    const interval = setInterval(getNews, refreshTime)

    return () => clearInterval(interval)
  }, [])

  return (
    <>
      <div className="news overflow-x-hidden">
        <div className="relative h-20 w-screen bg-green-800">
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
          {/* <div className="absolute top-0 left-0 h-screen bg-[url(/src/assets/logo.png)] bg-cover bg-no-repeat"></div> */}
        </div>
      </div>
    </>
  )
}
