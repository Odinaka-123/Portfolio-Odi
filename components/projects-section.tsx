import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/ui/button";

const projects = [
  {
    title: "Data Breach Detector",
    description:
      "A modern e-commerce website built with Next.js and Stripe integration. Features include product catalog, shopping cart, and secure checkout process.",
    image: "https://ik.imagekit.io/ovkmq81lc/Magenfront.png?updatedAt=1754414707868",
    technologies: ["Next.js", "Tailwind CSS", "MongoDB"],
    codeUrl: "https://github.com/Odinaka-123/MAGEN",
    liveUrl: "https://magan.vercel.app",
  },
  {
    title: "Portfolio Website",
    description:
      "A responsive portfolio website for a creative agency. Includes animated sections, project galleries, and contact forms with smooth user experience.",
    image: "https://ik.imagekit.io/ovkmq81lc/portfoliohero.png?updatedAt=1754416856645",
    technologies: ["React", "Tailwind CSS", "Netlify"],
    codeUrl: "https://github.com/Odinaka-123/Portfolio-Odi",
    liveUrl: "https://portfolio-odi.netlify.app",
  },
  {
    title: "Kruscat",
    description:
      "A collaborative task management application with real-time updates, team collaboration features, and intuitive drag-and-drop interface.",
    image: "https://ik.imagekit.io/ovkmq81lc/kruscathero.jpg?updatedAt=1754417974715",
    technologies: ["React", "Node.js", "Socket.io", "PostgreSQL"],
    codeUrl: "https://github.com/Kruscat/",
    liveUrl: "https://kruscat.com", 
  },
];

export function ProjectsSection() {
  return (
    <section id="projects" className="py-20 px-4 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Featured Projects
          </h2>
          <div className="w-24 h-1 bg-blue-500 mx-auto rounded-full" />
          <p className="text-xl text-gray-600 dark:text-gray-400 mt-6 max-w-2xl mx-auto">
            Here are some of my recent projects that showcase my skills in web
            development and design
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Card
              key={index}
              className="rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700"
            >
              <div className="relative overflow-hidden">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">
                  {project.title}
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-4">
                <CardDescription className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {project.description}
                </CardDescription>

                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-sm rounded-full font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex gap-3 pt-4">
                  {project.codeUrl && (
                    <a
                      href={project.codeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button
                        variant="outline"
                        size="sm"
                        className="rounded-full bg-transparent dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
                      >
                        <Github className="w-4 h-4 mr-2" />
                        Code
                      </Button>
                    </a>
                  )}

                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button size="sm" className="rounded-full">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Live Demo
                      </Button>
                    </a>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}