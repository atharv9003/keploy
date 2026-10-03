import fs from 'fs';
import path from 'path';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import DocsLayout from '@/components/DocsLayout';
import Callout from '@/components/Callout';
import Tip from '@/components/Tip';
import Warning from '@/components/Warning';
import Step from '@/components/Step';
import CodeBlock from '@/components/CodeBlock';
import CommandBlock from '@/components/CommandBlock';
import InfoCard from '@/components/InfoCard';
import ArchitectureDiagram from '@/components/ArchitectureDiagram';

// Define Table of Contents items mapped to section IDs in tutorial.mdx
const tocItems = [
  { id: 'overview', text: '1. Overview & Objectives', level: 2 },
  { id: 'what-is-keploy', text: '2. What is Keploy?', level: 2 },
  { id: 'what-youll-build', text: "3. What You'll Build", level: 2 },
  { id: 'architecture', text: '4. Architecture & Mechanics', level: 2 },
  { id: 'prerequisites', text: '5. Prerequisites', level: 2 },
  { id: 'system-verification', text: '6. Environment Verification', level: 2 },
  { id: 'start-redis', text: '7. Starting Redis in Docker', level: 2 },
  { id: 'inspecting-gin-app', text: '8. Deep Dive: Gin Source Code', level: 2 },
  { id: 'step-by-step', text: '9. Hands-On Steps', level: 2 },
  { id: 'step-1-manual-api', text: 'Step 1: Manual API Validation', level: 3 },
  { id: 'step-2-keploy-cli', text: 'Step 2: Keploy CLI & Security', level: 3 },
  { id: 'step-3-record-traffic', text: 'Step 3: Recording API Traffic', level: 3 },
  { id: 'step-4-inspect-artifacts', text: 'Step 4: Inspect Artifacts', level: 3 },
  { id: 'step-5-run-tests', text: 'Step 5: Running Tests on Replay', level: 3 },
  { id: 'step-6-noise-fields', text: 'Step 6: Handling JWT Noise', level: 3 },
  { id: 'how-keploy-works', text: '10. How Keploy Works Internally', level: 2 },
  { id: 'troubleshooting', text: '11. Troubleshooting Common Issues', level: 2 },
  { id: 'key-takeaways', text: '12. Key Takeaways & Reflections', level: 2 },
];

const mdxComponents = {
  Callout,
  Tip,
  Warning,
  Step,
  CodeBlock,
  CommandBlock,
  InfoCard,
  ArchitectureDiagram,
};

export default function Page() {
  const mdxPath = path.join(process.cwd(), 'content', 'tutorial.mdx');
  const source = fs.readFileSync(mdxPath, 'utf8');

  return (
    <DocsLayout tocItems={tocItems}>
      <MDXRemote
        source={source}
        components={mdxComponents}
        options={{
          mdxOptions: {
            remarkPlugins: [remarkGfm],
          },
        }}
      />
    </DocsLayout>
  );
}
