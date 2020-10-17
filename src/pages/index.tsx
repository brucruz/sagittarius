import { useEffect } from "react"
import Navbar from "../components/organisms/Navbar";

export default function Home() {
  const t = 'ok'

  useEffect(() => {
    console.log(t);
  }, [])


  return (
    <>
      <Navbar />
      <h1>Varios exames para agendar?<br />
        Deixa com a Heali!</h1>
    </>
  )
}
