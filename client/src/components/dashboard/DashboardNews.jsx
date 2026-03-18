import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'

import formatDate from '../../formatDate'
import { Link } from 'react-router-dom'
import * as api from '../../api'

library.add(fas)

export default function DashboardNews() {
  const [news, setNews] = useState([])
  const [boxList, setBoxList] = useState([])
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [allBox, setAllBox] = useState({ checked: false })
  const [update, setUpdate] = useState(0)

  useEffect(() => {
    async function getNews() {
      const data = await api.getNews()

      setNews(data.news)

      setBoxList(data.news.map((item) => ({ id: item._id, checked: false })))
    }

    getNews()
  }, [update])

  // useEffect(() => {
  //   setBoxList(news.map(({ _id }) => ({ checked: false, value: _id })))
  // }, [news])

  function handleOpenForm() {
    setIsFormOpen((o) => !o)
  }

  function handleCheckboxChange(index) {
    setBoxList((bl) => {
      const updated = bl.map((b, i) =>
        i === index ? { ...b, checked: !b.checked } : b
      )

      const selectedCheckboxes = updated.filter((element) => element.checked)

      if (selectedCheckboxes.length === updated.length) {
        setAllBox({ checked: true })
      } else {
        setAllBox({ checked: false })
      }

      return updated
    })
  }

  function handleAllBoxesSelect() {
    setAllBox((b) => ({
      checked: !b.checked,
    }))
    setBoxList((bl) => bl.map((b) => ({ ...b, checked: !allBox.checked })))
  }

  async function handleDeleteNewsPiece() {
    const ids = boxList.filter((element) => element.checked).map(({ id }) => id)

    if (ids.length == 0) {
      return
    }

    const token = localStorage.getItem('token')

    api.deleteNews(ids, token)

    setAllBox({ checked: false })
    setUpdate((u) => u + 1)
  }

  return (
    <>
      <div className="relative min-h-full w-4/5 text-gray-800">
        <div className="sticky top-0 flex w-full items-center justify-between">
          <Link to={-1} className="text-md mt-5 ml-5 h-13 w-13">
            <button className="h-full w-full cursor-pointer rounded-full bg-gray-300 hover:bg-gray-400">
              <FontAwesomeIcon
                icon="fa-solid fa-arrow-left"
                className="text-gray-800"
              />
            </button>
          </Link>
          <button
            onClick={handleOpenForm}
            className="mt-5 mr-5 cursor-pointer rounded-md bg-sky-900 p-2 text-gray-100 hover:bg-sky-950"
          >
            <FontAwesomeIcon icon="fa-solid fa-plus" /> Dodaj
          </button>
        </div>
        <button
          onClick={handleDeleteNewsPiece}
          className="relative left-1/10 my-2 cursor-pointer rounded-md bg-red-700 p-2 text-gray-100 hover:bg-red-800"
        >
          <FontAwesomeIcon icon="fa-solid fa-trash" /> Usuń zaznaczone
        </button>
        <table className="z-5 m-auto my-5 w-4/5 table-fixed">
          <thead>
            <tr className="border-collapse border-2 border-gray-50 bg-gray-200 text-sm uppercase">
              <td className="w-5">
                <input
                  onChange={handleAllBoxesSelect}
                  className="m-2 transform-[scale(1.5)]"
                  type="checkbox"
                  checked={allBox.checked}
                />
              </td>
              <td className="w-1/6 p-2 wrap-break-word">Kategoria</td>
              <td className="p-2 wrap-break-word">Opis</td>
              <td className="w-1/5 p-2 wrap-break-word">Data</td>
            </tr>
          </thead>
          <tbody>
            {news.length == 0 ? (
              <tr className="text-center">
                <td colSpan="4" className="bg-gray-200 p-2">
                  &mdash; Brak wyników &mdash;
                </td>
              </tr>
            ) : (
              news.map(({ category, text, _id, date }, index) => (
                <tr
                  key={_id}
                  className="border-collapse border-2 border-gray-50 bg-gray-200"
                >
                  <td className="w-fit p-0">
                    <input
                      className="m-2 transform-[scale(1.5)]"
                      type="checkbox"
                      checked={boxList.at(index).checked}
                      value={boxList.at(index).value}
                      onChange={() => handleCheckboxChange(index)}
                    />
                  </td>
                  <td className="p-2 wrap-break-word capitalize">
                    <p>{category}</p>
                  </td>
                  <td className="p-2 wrap-break-word capitalize">
                    <p>{text}</p>
                  </td>
                  <td className="p-2">{formatDate(date)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {isFormOpen && (
        <DashboardForm setUpdate={setUpdate} setIsFormOpen={setIsFormOpen} />
      )}
    </>
  )
}

function DashboardForm({ setUpdate, setIsFormOpen }) {
  const [category, setCategory] = useState('')
  const [text, setText] = useState('')

  function handleCategory(e) {
    if (e.target.value.length <= 64) {
      setCategory(e.target.value)
    }
  }

  function handleText(e) {
    if (e.target.value.length <= 1024) {
      setText(e.target.value)
    }
  }

  async function handleSubmit() {
    if (!(text && category)) {
      return
    }

    const token = localStorage.getItem('token')

    api.createNews(category, text, token)

    setIsFormOpen(false)
    setUpdate((u) => u + 1)
  }

  return (
    <div className="item absolute bottom-0 left-1/2 flex h-1/2 w-1/3 -translate-x-1/2 flex-col items-center justify-end rounded-t-xl border border-gray-400 bg-zinc-100 text-gray-800">
      <div className="flex h-9/10 w-4/5 flex-col">
        <p>Kategoria:</p>
        <input
          type="text"
          className="rounded-sm border-2 border-gray-900 p-1"
          value={category}
          onChange={handleCategory}
        />
        <p className="mb-10 text-sm text-gray-700">{category.length}/64</p>
        <p>Opis:</p>
        <textarea
          value={text}
          onChange={handleText}
          className="h-1/4 w-full resize-none rounded-sm border-2 border-gray-900 p-1"
        ></textarea>
        <p className="mb-10 text-sm text-gray-700">{text.length}/1024</p>
        <button
          className="cursor-pointer self-center rounded-full bg-sky-900 px-4 py-2 text-gray-100 hover:bg-sky-950"
          onClick={handleSubmit}
        >
          Dodaj
        </button>
      </div>
    </div>
  )
}
