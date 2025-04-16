interface ExampleProps {
  original: string;
  optimized: string;
}

function Example({ original, optimized }: ExampleProps) {
  return (
    <div className="card mb-6">
      <div className="mb-4">
        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Original Prompt:</h3>
        <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700">
          <p>{original}</p>
        </div>
      </div>
      
      <div>
        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Promptly Optimized:</h3>
        <div className="p-3 bg-primary-50 dark:bg-primary-900/20 rounded-md border border-primary-200 dark:border-primary-800">
          <p>{optimized}</p>
        </div>
      </div>
    </div>
  );
}

export default function Examples() {
  const examples = [
    {
      original: "Write something about remote work.",
      optimized: "Write a persuasive LinkedIn post about the benefits of remote work for startups, using a friendly and informative tone."
    },
    {
      original: "Explain climate change.",
      optimized: "Summarize the concept of climate change in simple terms, as if explaining to a middle school student. Use a calm and educational tone."
    },
    {
      original: "Give me code for a website.",
      optimized: "Create a responsive HTML and CSS code snippet for a contact form that includes name, email, and message fields, with basic validation and a modern, minimalist design."
    },
    {
      original: "Help me with my essay.",
      optimized: "Provide detailed feedback on the structure, argument coherence, and evidence usage in my academic essay on renewable energy policies, focusing on areas for improvement while maintaining an encouraging tone."
    },
    {
      original: "Tell me about space.",
      optimized: "Create an engaging 3-paragraph summary about recent discoveries in deep space exploration, suitable for a science blog aimed at curious adults with basic scientific knowledge."
    }
  ];

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-surface-300">Prompt Examples</h1>
      
      <div className="mb-8 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-md border border-yellow-200 dark:border-yellow-800">
        <p className="text-yellow-800 dark:text-yellow-200">
          <strong>Tip:</strong> Try using a goal like 'for a LinkedIn post' or a tone like 'persuasive and concise' to get more tailored results.
        </p>
      </div>

      <div className="space-y-6">
        {examples.map((example, index) => (
          <Example 
            key={index}
            original={example.original}
            optimized={example.optimized}
          />
        ))}
      </div>
    </div>
  );
} 