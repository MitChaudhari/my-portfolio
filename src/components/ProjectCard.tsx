import React from 'react';
import { GitHubIcon } from "../components/Icons";

interface ProjectProps {
  ProjectName: string;
  QuickDescription: string;
  DetailedDescription: string;
  Category: string[];
  TechStack: string[];
  GithubLink: string | null;
  LiveLink: string | null;
  Images: string[] | null;
}

const ProjectCard: React.FC<ProjectProps> = ({
  ProjectName,
  QuickDescription,
  DetailedDescription,
  TechStack,
  GithubLink,
  LiveLink,
  Images,
}) => {
  const backgroundImage = Images && Images.length > 0 ? Images[0] : "";

  return (
    <div className="project-card">
      {/* Left Side */}
      <div className="project-card-left">
        <h3 className="project-name">{ProjectName}</h3>
        <p className="project-quick-description">{QuickDescription}</p>
        <div className="tech-stack">
          {TechStack.map((tech) => (
            <span key={tech} className="tech-item">
              {tech}
            </span>
          ))}
        </div>
        <div className="project-links">
          {GithubLink && (
            <a href={GithubLink} target="_blank" rel="noopener noreferrer" className="Gitproject-button">
              GitHub <GitHubIcon />
            </a>
          )}
          {LiveLink && (
            <a href={LiveLink} target="_blank" rel="noopener noreferrer" className="Liveproject-button">
              Live 🚀
            </a>
          )}
        </div>
      </div>

      {/* Right Side */}
      <div
        className="project-card-right"
        style={{ 
          // Use a CSS variable to store the background image URL
          '--project-bg': backgroundImage ? `url(${backgroundImage})` : 'none'
        } as React.CSSProperties}
      >
        <div className="project-card-right-content">
          <h4>Description</h4>
          <p>{DetailedDescription}</p>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
