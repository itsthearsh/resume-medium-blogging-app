import { Route, Routes } from "react-router-dom";
import { Signup } from "./pages/Signup";
import { Signin } from "./pages/Signin";
import { Blogs } from "./pages/Blogs";
import { Blog } from "./pages/Blog";
import { Publish } from "./pages/Publish";
import { Edit } from "./pages/Edit";
import { SavedPosts } from "./pages/SavedPosts";
import { ProtectedRoute } from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Blogs />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/blog/:id" element={<Blog />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/publish" element={<Publish />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/saved" element={<SavedPosts />} />
      </Route>
    </Routes>
  );
}

export default App;
