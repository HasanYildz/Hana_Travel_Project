import type { Author } from "../types/author"
import type { Post } from "../types/post"

const BASE_URL = "https://jsonplaceholder.typicode.com"

export async function getAuthors(): Promise<Author[]> {
  const response = await fetch(`${BASE_URL}/users`)
  if (!response.ok) {
    throw new Error("Authors could not be fetched")
  }
  return response.json()
}

export async function getAuthorById(id: string): Promise<Author> {
  const response = await fetch(`${BASE_URL}/users/${id}`)
  if (!response.ok) {
    throw new Error("Author could not be fetched")
  }
  return response.json()
}


export async function createAuthor(
  author: Omit<Author, "id">
): Promise<Author> {
  const response = await fetch(`${BASE_URL}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(author),
  })

  if (!response.ok) {
    throw new Error("Author could not be created")
  }

  return response.json()
}


export async function getPostsByAuthorId(
  userId: string
): Promise<Post[]> {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
  )

  if (!response.ok) {
    throw new Error("Posts could not be fetched")
  }

  return response.json()
}