import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { createAuthor } from "../services/authorService"
import type { Author } from "../types/author"

type CreateAuthorForm = {
  name: string
  username: string
  email: string
  phone: string
  website: string

  street: string
  suite: string
  city: string
  zipcode: string

  companyName: string
  catchPhrase: string
  bs: string
}

export default function CreateAuthor() {
  const navigate = useNavigate()

  const [form, setForm] = useState<CreateAuthorForm>({
    name: "",
    username: "",
    email: "",
    phone: "",
    website: "",

    street: "",
    suite: "",
    city: "",
    zipcode: "",

    companyName: "",
    catchPhrase: "",
    bs: "",
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const newAuthor: Omit<Author, "id"> = {
      name: form.name,
      username: form.username,
      email: form.email,
      phone: form.phone,
      website: form.website,

      address: {
        street: form.street,
        suite: form.suite,
        city: form.city,
        zipcode: form.zipcode,
        geo: {
          lat: "0",
          lng: "0",
        },
      },

      company: {
        name: form.companyName,
        catchPhrase: form.catchPhrase,
        bs: form.bs,
      },
    }

    try {
      await createAuthor(newAuthor)
      navigate("/")
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page">
      <button onClick={() => navigate('/')} className="btn-secondary back-btn">
        ← Back to Authors
      </button>

      <h1>Create New Author</h1>

      <form onSubmit={handleSubmit}>
        <h2>Basic Information</h2>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input id="name" name="name" placeholder="Full name" onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input id="username" name="username" placeholder="Username" onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" placeholder="Email address" onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <input id="phone" name="phone" type="tel" placeholder="Phone number" onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="website">Website</label>
          <input id="website" name="website" type="url" placeholder="Website URL" onChange={handleChange} />
        </div>

        <h2>Address</h2>
        <div className="form-group">
          <label htmlFor="street">Street</label>
          <input id="street" name="street" placeholder="Street address" onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="suite">Suite</label>
          <input id="suite" name="suite" placeholder="Suite/Apt" onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="city">City</label>
          <input id="city" name="city" placeholder="City" onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="zipcode">Zipcode</label>
          <input id="zipcode" name="zipcode" placeholder="Zipcode" onChange={handleChange} />
        </div>

        <h2>Company</h2>
        <div className="form-group">
          <label htmlFor="companyName">Company Name</label>
          <input id="companyName" name="companyName" placeholder="Company name" onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="catchPhrase">Catch Phrase</label>
          <input id="catchPhrase" name="catchPhrase" placeholder="Catch phrase" onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="bs">Business</label>
          <input id="bs" name="bs" placeholder="Business description" onChange={handleChange} />
        </div>

        <button type="submit" disabled={loading} className="btn-primary">
          {loading ? "Creating..." : "Create Author"}
        </button>
      </form>

      {error && <div className="error">{error}</div>}
    </div>
  )
}
