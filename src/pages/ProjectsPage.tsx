import React, { useEffect, useState } from 'react';
import { SEO } from '@components/common/SEO';
import { Section } from '@components/common/Section';
import { PageHeader } from '@components/common/PageHeader';
import { LoadingState } from '@components/common/LoadingState';
import { ErrorState } from '@components/common/ErrorState';
import { ProjectCard } from '@components/projects/ProjectCard';
import { ProjectPlaceholder } from '@components/projects/ProjectPlaceholder';
import type { Project } from '@app-types/project';
import { fetchProjects } from '@api/projects';

export const ProjectsPage: React.FC = () => {
  const [projects, setProjects] = useState<Project[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    fetchProjects()
      .then((data) => {
        if (isMounted) {
          setProjects(data);
        }
      })
      .catch(() => {
        if (isMounted) {
          setError('Unable to load projects right now.');
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const isLoading = !projects && !error;

  return (
    <>
      <SEO
        title="Projects"
        description="Honest overview of current and upcoming client projects. No fake case studies—real examples will be added once available."
        canonicalPath="/projects"
      />
      <Section>
        <PageHeader
          title="Projects"
          subtitle="This portfolio is just getting started. Real client work will be added here."
        />
        {isLoading && <LoadingState />}
        {error && <ErrorState message={error} />}

        {!isLoading && !error && (
          <>
            <ProjectPlaceholder />
            <div className="grid grid--two">
              {projects?.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
            <p className="page-footnote">
              Once I complete real client projects, this page will show concrete
              examples, including goals, solutions, and—where possible—measurable
              improvements. Until then, everything here is intentionally minimal
              and honest.
            </p>
          </>
        )}
      </Section>
    </>
  );
};