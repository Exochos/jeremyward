import { Navbar } from "@/components/Navbar";
import { Tag } from "@/components/Tag";

// TODO: replace the placeholder content below with your real details.
const experience = [
  {
    role: "Job Title",
    company: "Company",
    period: "2024 — Present",
    summary: "What you owned, what you shipped, and the numbers that moved.",
  },
  {
    role: "Job Title",
    company: "Company",
    period: "2022 — 2024",
    summary: "Pipelines you built, infra you migrated, incidents you fixed.",
  },
];

const projects = [
  {
    name: "This site",
    description: "Next.js + Tailwind, with self-hosted analytics piped out as structured logs.",
    href: "https://github.com/",
  },
  {
    name: "Project two",
    description: "A short line on what it does and why it's interesting.",
    href: "https://github.com/",
  },
];

const skills = ["Linux", "Docker", "Kubernetes", "Terraform", "CI/CD", "AWS", "TypeScript", "Python"];

export default function Home() {
  return (
    <div id="top" className="mx-auto max-w-5xl px-4 pb-24 sm:px-8">
      <div className="pt-8">
        <Navbar />
      </div>

      <main className="mt-24 space-y-24">
        {/* Hero */}
        <Tag
          as="section"
          label="div"
          data-section="hero"
          className="flex min-h-80 max-w-md flex-col justify-center bg-panel p-10 pt-16"
        >
          <p className="mb-4 font-mono text-sm text-accent-bright">Hello, I&apos;m</p>
          <Tag as="h1" corner="bottom-right" className="px-4 pt-3 pb-9 text-4xl font-semibold tracking-tight">
            Jeremy Ward
          </Tag>
          <Tag as="p" corner="bottom-right" className="mt-4 px-4 pt-3 pb-9 text-muted">
            DevOps &amp; software engineer
          </Tag>
        </Tag>

        {/* About */}
        <Tag as="section" id="about" data-section="about" className="scroll-mt-28 bg-panel p-8 pt-14">
          <h2 className="mb-4 font-mono text-sm uppercase tracking-widest text-muted">About</h2>
          <p className="max-w-2xl leading-relaxed">
            A couple of sentences about you: what you like building, what you&apos;re good at, and the kind of
            role you&apos;re looking for.
          </p>
          <Tag as="ul" className="mt-8 flex flex-wrap gap-2 p-4 pt-12">
            {skills.map((skill) => (
              <li key={skill} className="border border-line/40 px-3 py-1 font-mono text-xs">
                {skill}
              </li>
            ))}
          </Tag>
        </Tag>

        {/* Experience */}
        <Tag as="section" id="experience" data-section="experience" className="scroll-mt-28 bg-panel p-8 pt-14">
          <h2 className="mb-6 font-mono text-sm uppercase tracking-widest text-muted">Experience</h2>
          <ol className="space-y-6">
            {experience.map((job, i) => (
              <Tag as="li" key={i} corner="top-right" className="p-6">
                <div className="flex flex-wrap items-baseline justify-between gap-2 pr-12">
                  <h3 className="text-lg font-medium">
                    {job.role} <span className="text-muted">@ {job.company}</span>
                  </h3>
                  <span className="font-mono text-xs text-muted">{job.period}</span>
                </div>
                <p className="mt-2 text-muted">{job.summary}</p>
              </Tag>
            ))}
          </ol>
        </Tag>

        {/* Projects */}
        <section id="projects" data-section="projects" className="scroll-mt-28">
          <h2 className="mb-6 font-mono text-sm uppercase tracking-widest text-muted">Projects</h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {projects.map((project) => (
              <Tag as="article" key={project.name} className="bg-panel p-6 pt-14">
                <h3 className="text-lg font-medium">{project.name}</h3>
                <p className="mt-2 text-muted">{project.description}</p>
                <a
                  href={project.href}
                  className="mt-4 inline-block font-mono text-sm text-accent-bright hover:underline"
                  data-track={`project:${project.name}`}
                >
                  view source →
                </a>
              </Tag>
            ))}
          </div>
        </section>

        {/* Contact */}
        <Tag as="footer" id="contact" data-section="contact" className="scroll-mt-28 bg-panel p-8 pt-14">
          <h2 className="mb-4 font-mono text-sm uppercase tracking-widest text-muted">Contact</h2>
          <p className="mb-6 max-w-xl">Open to DevOps and software engineering roles. Say hi.</p>
          <div className="flex flex-wrap gap-4">
            <a
              href="mailto:you@example.com"
              className="bg-accent px-5 py-2 font-medium text-white hover:bg-accent-bright hover:text-panel"
              data-track="contact:email"
            >
              Email me
            </a>
            <a
              href="https://github.com/"
              className="border border-line/60 px-5 py-2 hover:border-line"
              data-track="contact:github"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com/"
              className="border border-line/60 px-5 py-2 hover:border-line"
              data-track="contact:linkedin"
            >
              LinkedIn
            </a>
          </div>
        </Tag>
      </main>
    </div>
  );
}
