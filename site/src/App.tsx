import { Navbar } from "./components/Navbar"
import { Hero } from "./components/Hero"
import { Path } from "./components/Path"
import { Lab } from "./components/Lab"
import { Credentials } from "./components/Credentials"
import { Footer } from "./components/Footer"

export default function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <Path />
      <Lab />
      <Credentials />
      <Footer />
    </>
  )
}
