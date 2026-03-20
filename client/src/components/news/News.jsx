import { useEffect, useState } from 'react'

import NewsPiece from './NewsPiece'
import logo from '../../assets/logo.png'
import * as api from '../../api'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const refreshTime = 5 * 60 * 1000

export default function News() {
  const [news, setNews] = useState([])
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleString())
  const [weather, setWeather] = useState()
  const [isWeatherLoading, setIsWeatherLoading] = useState(false)

  useEffect(() => {
    async function getNews() {
      const data = await api.getNews()
      setNews(data.news)
    }

    getNews()

    const interval = setInterval(getNews, refreshTime)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    function getCurrentTime() {
      setCurrentTime(new Date().toLocaleString())
    }

    const interval = setInterval(getCurrentTime, 1000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    async function getWeather() {
      setIsWeatherLoading(true)

      try {
        const data = await api.getWeather()
        setWeather({
          description: data.weather[0].description,
          icon: data.weather[0].icon,
          temp: Math.round(data.main.temp),
          error: '',
        })
      } catch (err) {
        if (err instanceof api.ApiError) {
          setWeather({
            description: '',
            icon: '',
            temp: '',
            error: err.message,
          })
        }
      } finally {
        setIsWeatherLoading(false)
      }
    }

    getWeather()

    const interval = setInterval(getWeather, refreshTime)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="news">
      <div className="relative h-20 max-w-screen bg-green-800 shadow-md shadow-gray-400">
        <p className="absolute top-1/2 left-5 -translate-y-5/8 text-6xl font-semibold text-gray-100">
          Aktualności ZSM
        </p>
        <img
          className="absolute top-1/2 right-5 h-18 -translate-y-1/2"
          src={logo}
          alt="Logo ZSM"
        />
      </div>

      <div className="m-auto mt-20 flex w-4/5">
        <div className="relative flex w-3/5 flex-col">
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
        <div className="relative ml-5 w-2/5">
          <div className="sticky top-5 flex h-50 w-full flex-col items-center justify-evenly rounded-sm bg-gray-200 shadow-md shadow-gray-400">
            <p className="mt-3 text-4xl">{currentTime}</p>
            <div className="flex items-center justify-evenly">
              {isWeatherLoading ? (
                <FontAwesomeIcon
                  icon="fa-solid fa-arrows-rotate"
                  className="animate-spin text-4xl text-gray-500"
                />
              ) : weather?.error !== '' ? (
                <p className="text-xl">{weather?.error}</p>
              ) : (
                <>
                  <img
                    src={`https://openweathermap.org/img/wn/${weather?.icon}@2x.png`}
                    alt=""
                  />
                  <p className="text-3xl capitalize">{weather?.description}</p>
                  <p className="ml-3 text-3xl">{weather?.temp}&deg;C</p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
