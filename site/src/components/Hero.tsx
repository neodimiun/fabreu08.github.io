import { Background } from "./Background"

export function Hero() {
  return (
    <section id="top" className="relative z-[1]">
      <div id="hero-runway" className="hero-runway">
        <div className="hero-stage sticky top-0 h-screen overflow-hidden">
          <Background runwayId="hero-runway" />
          <div className="hero-copy relative z-10 h-full flex flex-col justify-end pb-14 md:justify-center md:pb-0 px-5 sm:px-8 md:px-10 pointer-events-none">
            <div className="max-w-[20rem] sm:max-w-md pointer-events-auto">
              <p className="film-stamp mb-4">Traveler · LS-GEAR · OPT → XR</p>
              <h1 className="hero-name">Jose A. Fernandez Abreu</h1>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
