"use client"; 

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Mail, Phone, Info } from "lucide-react";



export default function AboutPage() {
  const router = useRouter();

  const handleJoinClick = () => {
    router.push("/signup");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white text-blue-900 px-6 py-12">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl font-bold mb-6 text-blue-700 drop-shadow-md">About AlzCare</h1>
        <p className="text-lg mb-8 max-w-2xl mx-auto">
          AlzCare is your trusted digital companion in the journey of Alzheimer’s care. Designed for both doctors and patients, our platform provides smart tools to connect, treat, and support.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-10">
          <div className="bg-white rounded-2xl p-6 shadow-xl hover:scale-105 transition-transform">
            <Info className="h-8 w-8 text-blue-500 mb-4 mx-auto" />
            <h3 className="text-xl font-semibold mb-2">Smart Therapy</h3>
            <p>Engaging AI-powered cognitive therapy sessions tailored for Alzheimer’s patients.</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-xl hover:scale-105 transition-transform">
            <Phone className="h-8 w-8 text-blue-500 mb-4 mx-auto" />
            <h3 className="text-xl font-semibold mb-2">Doctor-Patient Hub</h3>
            <p>Track progress, manage appointments, and maintain consistent therapy with ease.</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-xl hover:scale-105 transition-transform">
            <Mail className="h-8 w-8 text-blue-500 mb-4 mx-auto" />
            <h3 className="text-xl font-semibold mb-2">Premium Insights</h3>
            <p>Get premium analytics, downloadable reports, and blockchain-integrated tracking.</p>
          </div>
        </div>

        <Button
          onClick={handleJoinClick}
          className="mt-10 bg-blue-600 text-white hover:bg-blue-700"
        >
          Join the Journey
        </Button>
      </div>
    </div>
  );
}
