import Clients from "../components/Clients";
import Projects from "../components/Projects";
import Addclientmodal from "../components/Addclientmodal";
import Addprojectmodal from "../components/Addprojectmodal";
export default function Home() {
  return (
    <>
        <div className="d-flex gap-3 mb-4">
        <Addclientmodal />
        <Addprojectmodal />
        </div>
        <Projects />
        <hr />
        <Clients />
    </>
  )
}
