"use client"; // Adjust if your layout path differs

export default function PrivacyPolicyPage() {
  return (
    
      <section className="py-20 px-6 max-w-4xl mx-auto text-gray-800">
        <h1 className="text-4xl font-bold mb-6 text-center">Privacy Policy</h1>

        <p className="mb-4">
          At <strong>AlzCare</strong>, we value and respect your privacy. This Privacy Policy outlines the type of information we collect, how we use it, and your rights regarding your personal data.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-2">1. Information We Collect</h2>
        <ul className="list-disc ml-6 space-y-2">
          <li><strong>Personal Information:</strong> Name, email, and contact details when registering.</li>
          <li><strong>Health-related Data:</strong> Information voluntarily shared for therapy and appointments.</li>
          <li><strong>Usage Data:</strong> Log data, device info, and activity within the app.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-2">2. How We Use Your Data</h2>
        <p className="mb-4">
          We use the collected data to:
        </p>
        <ul className="list-disc ml-6 space-y-2">
          <li>Provide and improve services</li>
          <li>Schedule appointments and manage therapies</li>
          <li>Analyze usage for better experience</li>
          <li>Send necessary notifications and updates</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-2">3. Data Protection</h2>
        <p className="mb-4">
          We implement secure methods to protect your data including encryption, authentication, and access controls.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-2">4. Sharing of Information</h2>
        <p className="mb-4">
          We do <strong>not</strong> sell or share your personal data with third parties except:
        </p>
        <ul className="list-disc ml-6 space-y-2">
          <li>With your consent</li>
          <li>To comply with legal obligations</li>
          <li>With healthcare professionals linked to your care</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-2">5. Your Rights</h2>
        <p className="mb-4">
          You have the right to access, update, or delete your data. Contact us anytime to exercise these rights.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-2">6. Contact</h2>
        <p className="mb-4">
          If you have any questions about our Privacy Policy, please email us at <a href="mailto:support@alzcare.app" className="text-blue-600 underline">support@alzcare.app</a>.
        </p>

        <p className="text-sm text-gray-500 mt-12 text-center">
          Last updated: April 11, 2025
        </p>
      </section>
   
  );
}
