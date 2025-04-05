import { LandingHero } from "@/components/landing-hero"
import { LandingFeatures } from "@/components/landing-features"
import { LandingTestimonials } from "@/components/landing-testimonials"

export default function Home() {





  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <LandingHero />
        <LandingFeatures />
        <LandingTestimonials />
      </main>
    </div>
  )
}

