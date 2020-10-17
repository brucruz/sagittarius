import { useEffect } from "react"

export default function Home() {
  const t = 'ok'

  useEffect(() => {
    console.log(t);
  }, [])


  return (
    <div>
      <h1>Hello Sagittarius</h1>
    </div>
  )
}
