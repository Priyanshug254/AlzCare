import Link from "next/link"
import { Button } from "@/components/ui/button"

export function LandingHero() {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Comprehensive Care for Alzheimer's Patients
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                AlzCare connects doctors and patients with powerful tools for therapy, tracking, and support in the
                journey with Alzheimer's disease.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link href="/signup">
                <Button size="" className="px-8">
                  Get Started
                </Button>
              </Link>
              <Link href="/features">
                <Button size="" variant="outline" className="px-8 bg-blue-600 text-white">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <img
              alt="AlzCare Dashboard Preview"
              className="aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
              src="/alzimage.png"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

