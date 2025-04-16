export default function About() {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-surface-300">About Promptly</h1>
      
      <div className="card prose dark:prose-invert">
        <p>
          Promptly is your AI prompt co-pilot. It helps you write better, more effective prompts for AI tools like ChatGPT, Claude, and Bard. Whether you're writing code, a blog post, or a research summary, Promptly can rewrite your request to be more structured, context-aware, and tailored to your task.
        </p>
        
        <h2 className="text-xl font-semibold mt-6 mb-3">Why Use Promptly?</h2>
        
        <p>
          The quality of your prompts directly affects the quality of AI responses. Promptly helps you:
        </p>
        
        <ul className="list-disc pl-6 space-y-2">
          <li>Create more structured requests</li>
          <li>Add necessary context that AIs need</li>
          <li>Specify the desired output format</li>
          <li>Clarify your expectations</li>
          <li>Save time by getting better results on the first try</li>
        </ul>
        
        <h2 className="text-xl font-semibold mt-6 mb-3">How It Works</h2>
        
        <p>
          Simply enter your rough prompt, add optional details like task type, tone, or context, and Promptly will rewrite it into a more effective version that's optimized for AI understanding.
        </p>
        
        <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700">
          <p className="italic">
            "Promptly uses advanced prompt engineering techniques learned from thousands of successful AI interactions to transform your basic requests into powerful, context-rich prompts."
          </p>
        </div>
      </div>
    </div>
  );
} 