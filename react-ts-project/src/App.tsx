import { Routes, Route } from "react-router-dom"
import Navbar from "./components/navbar"
import Authors from "./pages/Authors"
import AuthorDetail from "./pages/AuthorDetail"
import CreateAuthor from "./pages/CreateAuthor"
import "./styles/custom.css"

export default function App() {
  return (
    <>
      <Navbar />

      <div className="container">
        <Routes>
          <Route path="/" element={<Authors />} />
          <Route path="/author/:id" element={<AuthorDetail />} />
          <Route path="/create" element={<CreateAuthor />} />
        </Routes>
      </div>
    </>
  )
}
