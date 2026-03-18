import formatDate from '../../formatDate'

export default function NewsPiece({ text, category, date }) {
  return (
    <div className="mb-6 w-full rounded-sm font-semibold shadow-md shadow-gray-400">
      <div className="flex items-center justify-between rounded-t-sm bg-green-800 px-5 py-3 text-gray-100">
        <p className="text-2xl capitalize">{category}:</p>
        <p className="text-gray-300">{formatDate(date)}</p>
      </div>
      <div className="min-h-24 rounded-b-sm bg-gray-200 text-gray-600">
        <p className="p-5 pt-3 wrap-break-word capitalize">{text}</p>
      </div>
    </div>
  )
}
