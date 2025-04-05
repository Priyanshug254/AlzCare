export function LandingTestimonials() {
  const testimonials = [
    {
      quote:
        "AlzCare has transformed how I manage my patients with Alzheimer's. The therapy assignment and tracking tools save me hours each week.",
      author: "Dr. Anuj Kumar",
      role: "Neurologist",
    },
    {
      quote:
        "The premium features have been invaluable for my father's care. The AI chatbot answers our questions at any time of day.",
      author: "Pankaj Gupta",
      role: "Family Caregiver",
    },
    {
      quote:
        "Even with the free tier, I've seen remarkable improvements in my cognitive abilities through the therapy activities.",
      author: "Nikhil Singh",
      role: "Patient",
    },
  ]

  return (
    <section className="py-20">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Trusted by Professionals and Patients
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              See what our users are saying about AlzCare's impact on their Alzheimer's care journey.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="flex flex-col justify-between space-y-4 rounded-lg border bg-background p-6 shadow-sm"
            >
              <p className="text-muted-foreground italic">"{testimonial.quote}"</p>
              <div>
                <p className="font-semibold">{testimonial.author}</p>
                <p className="text-sm text-muted-foreground">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

