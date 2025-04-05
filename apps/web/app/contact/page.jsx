import { Mail, MapPin, Phone } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-50 text-blue-900 px-6 py-12">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-5xl font-bold mb-6 text-blue-700 drop-shadow-md">Contact Us</h1>
        <p className="text-lg mb-10 max-w-xl mx-auto">
          Have a question or want to collaborate? We'd love to hear from you.
        </p>

        <div className="space-y-6 text-left">
          <div className="flex items-center gap-4 bg-white p-4 rounded-xl shadow hover:scale-105 transition-transform">
            <Mail className="text-blue-500 h-6 w-6" />
            <span className="text-md">support@alzcare.health</span>
          </div>
          <div className="flex items-center gap-4 bg-white p-4 rounded-xl shadow hover:scale-105 transition-transform">
            <Phone className="text-blue-500 h-6 w-6" />
            <span className="text-md">+91-9876543210</span>
          </div>
          <div className="flex items-center gap-4 bg-white p-4 rounded-xl shadow hover:scale-105 transition-transform">
            <MapPin className="text-blue-500 h-6 w-6" />
            <span className="text-md">21st Floor, HealthTech Tower, Bengaluru, India</span>
          </div>
        </div>
      </div>
    </div>
  );
}