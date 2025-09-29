import Welcome from "@/components/Landing/page";
import Navigation from "../components/Navigation";

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen font-[family-name:var(--font-geist-sans)]">
      <Navigation />
      <Welcome />
      {/* <main>
        <article className="gap-3 flex px-3 border-1 h-[200px] relative items-center justify-center">
          <span className="ball"></span>
          <span className="ball"></span>
          <span className="ball"></span>
          <span className="ball"></span>
          <span className="ball"></span>
          <span className="ball"></span>
          <span className="ball"></span>
          <span className="ball"></span>
        </article>
      </main> */}
    </div>
  );
}

export default Home;