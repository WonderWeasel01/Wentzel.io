'use client';

import Image from 'next/image';
import ProjectImagePlaceholder from './ProjectImagePlaceholder';

type ProjectImageFields = {
  title: string;
  website: string;
  imagePlaceholder?: boolean;
};

type ProjectImageVariant = 'hero' | 'card' | 'screenshot' | 'phone';

interface ProjectImageProps {
  project: ProjectImageFields;
  src: string;
  alt: string;
  variant?: ProjectImageVariant;
  className?: string;
  imageClassName?: string;
  fill?: boolean;
}

export default function ProjectImage({
  project,
  src,
  alt,
  variant = 'card',
  className,
  imageClassName,
  fill = true,
}: ProjectImageProps) {
  if (project.imagePlaceholder) {
    return (
      <ProjectImagePlaceholder
        title={project.title}
        website={project.website}
        variant={variant}
        className={className}
        fill={fill}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill={fill}
      className={imageClassName ?? className}
      unoptimized
    />
  );
}
