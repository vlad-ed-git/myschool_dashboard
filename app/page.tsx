import MainContent from "./components/home/MainContent";
import Navbar from "./components/home/Navbar";
import Sidebar from "./components/home/Sidebar";

export default function Home() {
  return <>
    <Navbar />
    <div>
      <Sidebar />
      <MainContent />
    </div>
  </>;
}
