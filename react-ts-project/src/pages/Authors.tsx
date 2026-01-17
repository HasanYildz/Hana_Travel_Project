import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { getAuthors } from "../services/authorService"
import type { Author } from "../types/author"

export default function Authors() {
  const navigate = useNavigate()
  const [authors, setAuthors] = useState<Author[]>([])
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // ⭐ Favoriler (LocalStorage destekli)
  const [favorites, setFavorites] = useState<number[]>(() => {
    const stored = localStorage.getItem("favorites")
    return stored ? JSON.parse(stored) : []
  })

  useEffect(() => {
    getAuthors()
      .then(setAuthors)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  const toggleFavorite = (id: number) => {
    setFavorites((prev) => {
      const updated = prev.includes(id)
        ? prev.filter((favId) => favId !== id)
        : [...prev, id]

      localStorage.setItem("favorites", JSON.stringify(updated))
      return updated
    })
  }

  const filteredAuthors = authors.filter((author) =>
    author.name.toLowerCase().includes(search.toLowerCase())
  )

  if (loading) return <div className="loading">Loading...</div>
  if (error) return <div className="error">{error}</div>

  return (
    <div className="page">
      <h1>Authors</h1>

      <div className="search-container">
        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />

        <button onClick={() => navigate('/create')} className="btn-create">
          <span className="btn-icon">👤</span>
          Create Author
        </button>
      </div>

      {filteredAuthors.length === 0 && <p>No authors found</p>}

      <ul className="author-list">
        {filteredAuthors.map((author) => {
          const isFavorite = favorites.includes(author.id)

          return (
            <li
              key={author.id}
              className={`author-item ${isFavorite ? 'favorite' : ''}`}
            >
              <Link to={`/author/${author.id}`} className="author-link">
                {author.name}
              </Link>

              <button onClick={() => toggleFavorite(author.id)} className="favorite-btn">
                {isFavorite ? "★" : "☆"}
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
