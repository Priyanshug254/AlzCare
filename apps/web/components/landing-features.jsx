import { Brain, LineChart, Users, MessageSquare, FileText, Shield } from "lucide-react"

export function LandingFeatures() {
  const features = [
    {
      icon: <Brain className="h-10 w-10 text-primary" />,
      title: "Therapy Management",
      description: "Doctors can assign personalized therapy levels and track patient progress.",
    },
    {
      icon: <LineChart className="h-10 w-10 text-primary" />,
      title: "Progress Tracking",
      description: "Visualize improvement over time with detailed analytics and reports.",
    },
    {
      icon: <Users className="h-10 w-10 text-primary" />,
      title: "Community Support",
      description: "Connect with others on similar journeys for advice and encouragement.",
    },
    {
      icon: <MessageSquare className="h-10 w-10 text-primary" />,
      title: "AI Chatbot Support",
      description: "Premium users get 24/7 assistance through our specialized AI chatbot.",
    },
    {
      icon: <FileText className="h-10 w-10 text-primary" />,
      title: "Downloadable Reports",
      description: "Generate and download comprehensive reports for medical appointments.",
    },
    {
      icon: <Shield className="h-10 w-10 text-primary" />,
      title: "Secure & Private",
      description: "Your health data is protected with enterprise-grade security.",
    },
  ]

  return (
    <section className="bg-muted py-20">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Comprehensive Features</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              AlzCare provides powerful tools for both doctors and patients to manage Alzheimer's care effectively.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center space-y-2 rounded-lg border bg-background p-6 shadow-sm transition-transform duration-300 hover:scale-105"
            >
              {feature.icon}
              <h3 className="text-xl font-bold">{feature.title}</h3>
              <p className="text-center text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

