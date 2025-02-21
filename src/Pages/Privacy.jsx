import React from 'react'

function Privacy() {
  return (
    <div>
      <h1 className="text-5xl mx-auto text-[#5c6161] w-fit font-extrabold py-3">Privacy Policy</h1>
      <div className="w-[80vw] mx-auto p-6 bg-white rounded-lg shadow-md space-y-6">
        <h1 className="text-3xl font-semibold text-center text-gray-800"><strong>Privacy Policy for Civic Governance Platform</strong></h1>
        <p className="text-gray-600">Last Updated: <strong>{new Date().toISOString().split('T')[0]}</strong></p>

        <p className="text-gray-700">
          At <strong>Civic Portal</strong>, we prioritize the privacy and security of your personal data. This Privacy Policy explains the types of data we collect, how we use and protect your information, and how we ensure that your activities on the platform remain private and confidential.
        </p>

        <p className="text-gray-700">
          By using our platform, you agree to the practices described in this Privacy Policy.
        </p>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800"><strong>1. Information We Collect</strong></h2>
          <p className="text-gray-700">
            We collect and process the following types of data:
          </p>

          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li><strong>1.1 Personal Information:</strong> We collect the following personal details when you register an account:</li>
            <ul className="list-inside space-y-1">
              <li><strong>Email Address</strong>: Used to create your account, communicate with you, and ensure account security.</li>
              <li><strong>Full Name</strong>: Used to identify you within our system and to personalize your experience.</li>
              <li><strong>Password</strong>: Used to secure your account. We store this information securely using encryption.</li>
            </ul>

            <li><strong>1.2 User-Generated Content:</strong> Your activities, including creating polls, submitting reports, and voting, are stored and processed:</li>
            <ul className="list-inside space-y-1">
              <li><strong>Polls</strong>: Your poll questions and options are stored securely. You have control over whether these are shared.</li>
              <li><strong>Reports</strong>: Reports submitted are kept private, only accessible to authorized administrators.</li>
              <li><strong>Voting Activity</strong>: Your voting actions are recorded but remain confidential.</li>
            </ul>

            <li><strong>1.3 Non-Personal Information:</strong> We may also collect anonymous usage data for the improvement of our platform:</li>
            <ul className="list-inside space-y-1">
              <li><strong>Cookies and Tracking Technologies</strong>: To enhance user experience and analyze platform usage.</li>
              <li><strong>Usage Data</strong>: Information such as pages viewed, time spent on the platform, and interaction metrics.</li>
            </ul>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800"><strong>2. How We Use Your Information</strong></h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li><strong>Provide Services</strong>: To create and manage your account, process your polls, reports, and voting activities.</li>
            <li><strong>Improve User Experience</strong>: To personalize content, analyze usage trends, and enhance platform features.</li>
            <li><strong>Communicate with You</strong>: To send account-related updates, notifications, and other necessary communications.</li>
            <li><strong>Security and Integrity</strong>: To ensure the safety and security of the platform, detect fraud, and prevent unauthorized access.</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800"><strong>3. How We Protect Your Data</strong></h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li><strong>Encryption</strong>: Your password and sensitive account data are encrypted for secure storage.</li>
            <li><strong>Access Control</strong>: Only authorized personnel can access sensitive information.</li>
            <li><strong>Secure Connections</strong>: We use HTTPS to secure data transmission between your device and our platform.</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800"><strong>4. Confidentiality of User Activities</strong></h2>
          <p className="text-gray-700">
            We understand that your engagement with our platform is private. Here’s how we ensure confidentiality:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li><strong>Polls</strong>: Your polls are private unless you decide to share them. Only you control the visibility.</li>
            <li><strong>Reports</strong>: Your reports are kept confidential and only accessible to authorized administrators.</li>
            <li><strong>Voting</strong>: Your voting activity is anonymous, and we do not disclose individual votes to others. Results are displayed as aggregate totals.</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800"><strong>5. Data Retention and Deletion</strong></h2>
          <p className="text-gray-700">
            We will retain your personal data and user-generated content for as long as you have an active account. If you decide to delete your account, all associated data will be removed, except where required by law.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800"><strong>6. Sharing Your Information</strong></h2>
          <p className="text-gray-700">
            We do not share your personal data or activities with any third parties without your consent, except in the following cases:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li><strong>Service Providers</strong>: We may share data with trusted third-party services that assist us in operating the platform.</li>
            <li><strong>Legal Compliance</strong>: We may disclose your information to comply with legal obligations or protect our rights.</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800"><strong>7. Your Rights</strong></h2>
          <p className="text-gray-700">
            You have the following rights regarding your personal data:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li><strong>Access and Correction</strong>: Request to view or update your personal information at any time.</li>
            <li><strong>Deletion</strong>: Request to delete your account and all associated data.</li>
            <li><strong>Withdrawal of Consent</strong>: Opt-out of communications and notifications at any time.</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800"><strong>8. Changes to This Privacy Policy</strong></h2>
          <p className="text-gray-700">
            We reserve the right to update this Privacy Policy. Changes will be posted on this page, and we will notify you of any significant updates.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800"><strong>9. Contact Us</strong></h2>
          <p className="text-gray-700">
            If you have any questions or concerns, please contact us at:
          </p>
          <ul className="space-y-1 text-gray-700">
            <li>Email: <a href="mailto:r120dhiman+debugit@gmail.com" className="text-blue-500">r120dhiman+debugit@gmail.com</a></li>
            <li>Address: Civic Portal, IIT BHU</li>
          </ul>
        </section>
      </div>
    </div>
  )
}

export default Privacy
