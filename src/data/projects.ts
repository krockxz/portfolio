import { Project } from "@/types/project";

export const projectsData: Project[] = [
  {
    image: "/images/project1.png",
    projectName: "Poker App",
    projectLink: "https://poker-borg.onrender.com/",
    projectDescription: "A modern, interactive poker application built with a focus on real-time gameplay and user experience. This full-stack application features secure user authentication, real-time game state management, and an intuitive interface for seamless poker gameplay. Players can create or join lobbies, manage their stacks, and enjoy a responsive design that works across devices.",
    projectTech: ["React", "Node.js", "Express", "Socket.io", "MongoDB", "JWT Authentication"],
    projectExternalLinks: {
      github: "https://github.com/krockxz/Poker",
      externalLink: "https://poker-borg.onrender.com/",
    },
  },
  {
    image: "/images/project2.png",
    projectName: "Climatic",
    projectLink: "https://github.com/krockxz/Climatic",
    projectDescription: "An advanced weather application that provides real-time forecasts and climate data visualization. Features include interactive maps, personalized weather alerts, and historical climate data analysis. The application uses modern APIs to deliver accurate forecasts and adapts its interface based on current weather conditions for an immersive user experience.",
    projectTech: ["React", "Node.js", "Weather APIs", "Data Visualization"],
    projectExternalLinks: {
      github: "https://github.com/krockxz/Climatic",
      externalLink: "",
    },
  },
  {
    image: "/images/project3.png",
    projectName: "Gostman",
    projectLink: "https://github.com/krockxz/gostman",
    projectDescription: "A high-performance API testing tool built with Go, designed for microservice architectures. Gostman provides a powerful yet intuitive interface for creating, running, and automating complex API test scenarios. With support for various authentication methods, response validation, and comprehensive reporting, it streamlines the API development and testing workflow for modern applications.",
    projectTech: ["Go", "RESTful APIs", "Testing", "Microservices"],
    projectExternalLinks: {
      github: "https://github.com/krockxz/gostman",
      externalLink: "",
    },
  },
];