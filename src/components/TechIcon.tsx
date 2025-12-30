import React from "react";
import {
  SiGo,
  SiReact,
  SiNodedotjs,
  SiExpress,
  SiSocketdotio,
  SiMongodb,
  SiPython,
  SiGithub,
  SiPandas,
  SiOpencv,
  SiJavascript,
  SiDocker,
  SiHtml5,
  SiCss3,
  SiGraphql,
  SiRedis,
  SiDjango,
  SiFlask,
  SiFastapi,
  SiSpring,
  SiLaravel,
  SiRust,
  SiCplusplus,
  SiSwift,
  SiKotlin,
  SiDart,
  SiFlutter,
  SiAngular,
  SiVuedotjs,
  SiNuxtdotjs,
  SiGatsby,
  SiStrapi,
  SiVercel,
  SiNetlify,
  SiHeroku,
  SiLinux,
  SiFigma,
  SiVisualstudiocode,
  SiSlack,
  SiPostgresql,
  SiTypescript,
  SiNextdotjs,
  SiTailwindcss,
  SiFirebase,
  SiAmazonaws,
  SiKubernetes,
} from "react-icons/si";

type TechIconProps = {
  tech: string;
  size?: number;
};

const ICON_MAP: Record<string, React.ElementType> = {
  // Languages & Frameworks
  Go: SiGo,
  React: SiReact,
  "Node.js": SiNodedotjs,
  Node: SiNodedotjs,
  Express: SiExpress,
  "Socket.io": SiSocketdotio,
  Socketio: SiSocketdotio,
  MongoDB: SiMongodb,
  Mongo: SiMongodb,
  Python: SiPython,
  GitHub: SiGithub,
  Pandas: SiPandas,
  OpenCV: SiOpencv,
  Opencv: SiOpencv,
  JavaScript: SiJavascript,
  JS: SiJavascript,
  TypeScript: SiTypescript,
  TS: SiTypescript,
  "Next.js": SiNextdotjs,
  Nextjs: SiNextdotjs,
  Tailwind: SiTailwindcss,
  "Tailwind CSS": SiTailwindcss,
  Firebase: SiFirebase,
  PostgreSQL: SiPostgresql,
  Postgres: SiPostgresql,
  Docker: SiDocker,
  Kubernetes: SiKubernetes,
  AWS: SiAmazonaws,
  "Amazon Web Services": SiAmazonaws,
  HTML: SiHtml5,
  HTML5: SiHtml5,
  CSS: SiCss3,
  CSS3: SiCss3,
  GraphQL: SiGraphql,
  Redis: SiRedis,
  Django: SiDjango,
  Flask: SiFlask,
  FastAPI: SiFastapi,
  Fastapi: SiFastapi,
  Spring: SiSpring,
  Laravel: SiLaravel,
  Rust: SiRust,
  "C++": SiCplusplus,
  Swift: SiSwift,
  Kotlin: SiKotlin,
  Dart: SiDart,
  Flutter: SiFlutter,
  Angular: SiAngular,
  Vue: SiVuedotjs,
  "Vue.js": SiVuedotjs,
  Nuxt: SiNuxtdotjs,
  "Nuxt.js": SiNuxtdotjs,
  Gatsby: SiGatsby,
  Strapi: SiStrapi,
  Vercel: SiVercel,
  Netlify: SiNetlify,
  Heroku: SiHeroku,
  Linux: SiLinux,
  Figma: SiFigma,
  "VS Code": SiVisualstudiocode,
  VSCode: SiVisualstudiocode,
  Slack: SiSlack,

  // Generic mappings for common terms
  RESTful: SiExpress,
  "RESTful API": SiExpress,
  REST: SiExpress,
  API: SiExpress,
  "RESTful APIs": SiExpress,
  "File System API": SiNodedotjs,
  "Command Line Interface": SiNodedotjs,
  CLI: SiNodedotjs,
  "GitHub API": SiGithub,
  "Git API": SiGithub,
  Automation: SiPython,
  Testing: SiDocker,
  Microservices: SiDocker,
  "Data Visualization": SiPandas,
  "Data Analysis": SiPandas,
  "Data Processing": SiPandas,
  "JWT Authentication": SiNodedotjs,
  JWT: SiNodedotjs,
  Authentication: SiNodedotjs,
  "Weather APIs": SiNodedotjs,
};

const DEFAULT_ICON = SiNodedotjs;

export default function TechIcon({ tech, size = 16 }: TechIconProps) {
  const normalizedTech = tech.trim();

  // Try exact match first
  let IconComponent: React.ElementType | undefined = ICON_MAP[normalizedTech];

  // Try case-insensitive match
  if (!IconComponent) {
    const key = Object.keys(ICON_MAP).find(
      (key) => key.toLowerCase() === normalizedTech.toLowerCase()
    );
    if (key) IconComponent = ICON_MAP[key];
  }

  // Try partial match (e.g., "Node" matches "Node.js")
  if (!IconComponent) {
    const key = Object.keys(ICON_MAP).find(
      (key) => normalizedTech.toLowerCase().includes(key.toLowerCase()) ||
               key.toLowerCase().includes(normalizedTech.toLowerCase())
    );
    IconComponent = key ? ICON_MAP[key] : DEFAULT_ICON;
  }

  const Icon = IconComponent || DEFAULT_ICON;

  return (
    <Icon
      size={size}
      style={{ color: "var(--light-slate)" }}
      title={tech}
    />
  );
}
