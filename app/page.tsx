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
    <div id="top" className="mx-auto max-w-5xl px-2 pb-2 sm:px-8">
      <div className="pt-1">
        <Navbar />
      </div>

      <main className="mt-4 space-y-4">
        {/* Hero */}
        <Tag
          as="section"
          label="hero div"
          data-section="hero"
          className="flex min-h-80 max-w-md flex-col justify-center bg-card p-10 pt-6"
        >
          <p className="mb-4 font-mono text-sm text-primary">Hello, I&apos;m</p>
          <Tag as="h1" corner="bottom-right" className="px-4 pt-3 pb-9 text-4xl font-bold tracking-tight text-accent sm:text-5xl">
            Jeremy Ward
          </Tag>
          <Tag as="p" corner="bottom-right" className="mt-4 px-4 pt-3 pb-9 text-lg text-muted-foreground">
            DevOps &amp; software engineer
          </Tag>
        </Tag>

        {/* About */}
        <Tag as="section" id="about" data-section="about" className="scroll-mt-28 bg-card p-8 pt-4">
          <h2 className="mb-4 font-mono text-sm uppercase tracking-widest text-primary">About</h2>
          <p className="max-w-2xl leading-relaxed">
            A couple of sentences about you: what you like building, what you&apos;re good at, and the kind of
            role you&apos;re looking for.
          </p>
          <Tag as="ul" className="mt-8 flex flex-wrap gap-2 p-4 pt-12">
            {skills.map((skill) => (
              <li key={skill} className="rounded-md border border-border bg-background px-3 py-1 font-mono text-xs text-muted-foreground transition-colors hover:border-highlight hover:text-highlight">
                {skill}
              </li>
            ))}
          </Tag>
        </Tag>

        {/* Experience */}
        <Tag as="section" id="experience" data-section="experience" className="scroll-mt-28 bg-card p-8 pt-4">
          <h2 className="mb-6 font-mono text-sm uppercase tracking-widest text-primary">Experience</h2>
          <ol className="space-y-6">
            {experience.map((job, i) => (
              <Tag as="li" key={i} corner="top-right" className="p-6">
                <div className="flex flex-wrap items-baseline justify-between gap-2 pr-12">
                  <h3 className="text-lg font-medium">
                    {job.role} <span className="text-muted-foreground">@ {job.company}</span>
                  </h3>
                  <span className="font-mono text-xs text-highlight">{job.period}</span>
                </div>
                <p className="mt-2 text-muted-foreground">{job.summary}</p>
              </Tag>
            ))}
          </ol>
        </Tag>

        {/* Projects */}
        <section id="projects" data-section="projects" className="scroll-mt-8">
          <h2 className="mb-6 font-mono text-sm uppercase tracking-widest text-primary">Projects</h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {projects.map((project) => (
              <Tag as="article" key={project.name} className="bg-card p-6 pt-14">
                <h3 className="text-lg font-medium">{project.name}</h3>
                <p className="mt-2 text-muted-foreground">{project.description}</p>
                <a
                  href={project.href}
                  className="mt-4 inline-block font-mono text-sm text-primary hover:underline"
                  data-track={`project:${project.name}`}
                >
                  view source →
                </a>
              </Tag>
            ))}
          </div>
        </section>

        {/* Contact */}
        <Tag as="footer" id="contact" data-section="contact" className="scroll-mt-28 bg-card p-8 pt-14">
          <h2 className="mb-4 font-mono text-sm uppercase tracking-widest text-primary">Contact</h2>
          <p className="mb-6 max-w-xl text-muted-foreground">Open to DevOps and software engineering roles. Say hi.</p>
          <div className="flex flex-wrap gap-4">
            <a
              href="mailto:you@example.com"
              className="rounded-md bg-primary px-5 py-2 font-medium text-primary-foreground hover:bg-primary/85"
              data-track="contact:email"
            >
              Email me
            </a>
            <a
              href="https://github.com/"
              className="rounded-md border border-border px-5 py-2 hover:border-primary hover:text-primary"
              data-track="contact:github"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com/"
              className="rounded-md border border-border px-5 py-2 hover:border-primary hover:text-primary"
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
