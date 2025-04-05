// components/FeaturesSection.jsx
import { Brain, CalendarCheck, Users, BarChart2, Star, MessageSquareHeart } from "lucide-react";

const features = [
  {
    icon: <Brain className="h-8 w-8 text-blue-500 mb-4" />,
    title: "Cognitive Therapy",
    description: "AI-powered memory games and exercises for Alzheimer’s patients to enhance brain activity.",
  },
  {
    icon: <CalendarCheck className="h-8 w-8 text-blue-500 mb-4" />,
    title: "Appointment Management",
    description: "Easily schedule, reschedule, and track medical consultations and therapy sessions.",
  },
  {
    icon: <Users className="h-8 w-8 text-blue-500 mb-4" />,
    title: "Doctor-Patient Connect",
    description: "Maintain detailed patient records, updates, and two-way communication in one place.",
  },
  {
    icon: <BarChart2 className="h-8 w-8 text-blue-500 mb-4" />,
    title: "Progress Analytics",
    description: "Visualize progress with smart charts, behavior trends, and therapy effectiveness.",
  },
  {
    icon: <Star className="h-8 w-8 text-blue-500 mb-4" />,
    title: "Premium Features",
    description: "Unlock advanced tracking, downloadable reports, and blockchain-secured logs.",
  },
  {
    icon: <MessageSquareHeart className="h-8 w-8 text-blue-500 mb-4" />,
    title: "Supportive Community",
    description: "Join a shared space for caregivers and patients to support each other emotionally.",
  },
];

export default function FeaturesSection() {
  return (
    <section className="bg-gradient-to-br from-blue-50 to-white py-20 px-6 text-blue-900">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-4 drop-shadow-sm">Comprehensive Features</h2>
        <p className="text-lg mb-12 max-w-3xl mx-auto">
          AlzCare provides powerful tools for both doctors and patients to manage Alzheimer’s care effectively.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl shadow-xl p-6 hover:scale-105 transition-transform text-center"
            >
              <div className="flex justify-center">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-blue-800">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
