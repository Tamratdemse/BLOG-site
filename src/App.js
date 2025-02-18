// src/App.js

import Categories from "./Components/Categories";
import MostCommentedPosts from "./Components/MostCommentedPosts";
import AllPosts from "./Components/AllPosts";
import About from "./Components/About";
import Footer from "./Components/Footer";
import NavigationHeader from "./Components/NavigationHeader"; // Import NavigationHeader

function App() {
  return (
    <div>
      {/* Static NavigationHeader */}
      <NavigationHeader />

      {/* Content Below Header */}
      <div className="p-8 space-y-6 bg-[#10243b]   ">
        {/* Section for about */}
        <section id="about">
          <About />
        </section>

        {/* Section for Categories */}
        <section id="categories">
          <Categories />
        </section>

        {/* Section for Most Commented Posts */}
        <section id="posts">
          <MostCommentedPosts />
        </section>

        {/* Section for All Posts */}
        <section id="all-posts">
          <AllPosts />
        </section>

        <section id="footer">
          <Footer />
        </section>
      </div>
    </div>
  );
}

export default App;
