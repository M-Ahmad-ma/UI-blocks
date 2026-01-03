
import CodeBlock from "../components/CodeBlock";

const page = () => {
  const code = `# Initialize a project
@zenblockz/ui-blocks init 

# Add a single component
@zenblockz/ui-blocks add button

`;

  return (
    <main className="min-h-screen p-8">
      <div className="flex items-center justify-center">
        <h1 className="mb-6">CLI Manual</h1>
      </div>
      <div className="max-w-4xl mx-auto overflow-y-auto h-[20vh] p-4 bg-white dark:bg-accent rounded-lg shadow-md">
        <CodeBlock code={code} />
      </div>
    </main>
  );
};

export default page;

