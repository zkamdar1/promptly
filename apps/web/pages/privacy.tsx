export default function Privacy() {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-surface-300">Privacy Policy</h1>
      
      <div className="card prose dark:prose-invert">
        <p>
          Promptly does not store your prompts or personal data. No authentication is required. All prompts are processed in real time and discarded after generation.
        </p>
        
        <h2 className="text-xl font-semibold mt-6 mb-3">Data Collection</h2>
        <p>
          We do not collect or retain any of the following:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Your prompts</li>
          <li>Generated outputs</li>
          <li>Personal information</li>
          <li>User accounts or profiles</li>
        </ul>
        
        <h2 className="text-xl font-semibold mt-6 mb-3">Third-Party Services</h2>
        <p>
          Promptly uses the OpenAI API to process your prompts. When you submit a prompt, it is sent to OpenAI's servers for processing. Please refer to OpenAI's privacy policy for information about how they handle data.
        </p>
        
        <h2 className="text-xl font-semibold mt-6 mb-3">Changes to This Policy</h2>
        <p>
          We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
        </p>
        
        <h2 className="text-xl font-semibold mt-6 mb-3">Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy, please contact us.
        </p>
        
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-6">
          Last updated: {new Date().toLocaleDateString()}
        </p>
      </div>
    </div>
  );
} 