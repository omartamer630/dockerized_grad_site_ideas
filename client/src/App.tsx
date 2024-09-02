import { Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Home, Header, Idea, PageNotFound, NewIdea } from "./components/index";
import { Loading } from "./components/index"; // Ensure correct import

function App() {
  return (
    <Router>
      <Header />
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/idea/new" element={<NewIdea />} />
          <Route path="/get-idea/:id" element={<Idea />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
