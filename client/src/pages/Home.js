import Clients from "../components/Clients";
import Project from "../components/Project";
import Header from "../components/Header";
import AddButtons from "../components/AddButtons";

export default function Home() {
  return (
    <>
      <Header />
      <AddButtons />
      <Project />
      <Clients />
    </>
  );
}
