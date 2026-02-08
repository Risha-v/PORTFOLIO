import React from 'react';
import type { Project } from '@app-types/project';
import { Card } from '@components/common/Card';
import { Badge } from '@components/common/Badge';

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const statusTone =
    project.status === 'delivered'
      ? 'success'
      : project.status === 'in-progress'
      ? 'warning'
      : 'neutral';

  return (
    <Card>
      <div className="project-card">
        <div className="project-card__header">
          <h3>{project.title}</h3>
          <Badge label={project.status} tone={statusTone} />
        </div>
        <p className="project-card__summary">{project.summary}</p>
        {project.techStackHint && project.techStackHint.length > 0 && (
          <p className="project-card__tech">
            Tech focus: <span>{project.techStackHint.join(', ')}</span>
          </p>
        )}
        {project.industryHint && (
          <p className="project-card__industry">
            Typical industry: <span>{project.industryHint}</span>
          </p>
        )}
        {/* NOTE: No real client links are shown until you have permission. */}
      </div>
    </Card>
  );
};