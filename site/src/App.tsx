import { Background } from "./components/Background"
import { Navbar } from "./components/Navbar"
import { Hero } from "./components/Hero"
import { Path } from "./components/Path"
import { Lab } from "./components/Lab"
import { Work } from "./components/Work"
import { Footer } from "./components/Footer"

export default function App() {
  return (
    <>
      <Background />
      <Navbar />
      <Hero />
      <Path />
      <Lab />
      <Work />
      <Footer />
    </>
  )
}
