import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import { getAuthorById, getPostsByAuthorId } from "../services/authorService"
import type { Author } from "../types/author"
import type { Post } from "../types/post"

export default function AuthorDetail() {
  const params = useParams()
  const id = params.id!

  const [author, setAuthor] = useState<Author | null>(null)
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // ➕ Yeni Post state'leri
  const [title, setTitle] = useState("")
  const [body, setBody] = useState("")
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    Promise.all([
      getAuthorById(id),
      getPostsByAuthorId(id),
    ])
      .then(([authorData, postsData]) => {
        setAuthor(authorData)
        setPosts(postsData)
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [id])

  // ➕ Yeni Post ekleme
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          body,
          userId: Number(id),
        }),
      })

      const data: Post = await res.json()

      // Fake API olduğu için state'e manuel ekliyoruz
      setPosts((prev) => [data, ...prev])

      setTitle("")
      setBody("")
    } catch (err) {
      console.error(err)
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) return <div className="loading">Loading...</div>
  if (error) return <div className="error">{error}</div>
  if (!author) return <div className="error">Author not found</div>

  return (
    <div className="page">
      <Link to="/" className="back-link">← Back to Authors</Link>

      <h1>{author.name}</h1>
      <p>{author.email}</p>

      {/* ➕ New Post Form */}
      <form onSubmit={handleSubmit} className="page">
        <h2>Add New Post</h2>

        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            placeholder="Post title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="body">Content</label>
          <textarea
            id="body"
            placeholder="Post content"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={4}
            required
          />
        </div>

        <button type="submit" disabled={submitting} className="btn-primary">
          {submitting ? "Adding..." : "Add Post"}
        </button>
      </form>

      <h2>Posts</h2>

      {posts.length === 0 && <p>No posts found</p>}

      <ul className="post-list">
        {posts.map((post) => (
          <li key={post.id} className="post-item">
            <h3 className="post-title">{post.title}</h3>
            <p className="post-body">{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
