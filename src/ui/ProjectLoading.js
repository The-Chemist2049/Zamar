import { Skeleton, Title } from "@mantine/core";
import "./ProjectLoading.css";

export default function ProjectLoading() {
  return (
    <div className="project-loading-container">
      <div className="project-loading-sidebar">
        <div className="category-section">
          <Title order={3}>Categories</Title>
          <div className="category-skeletons">
            <Skeleton className="category-skeleton" />
            <Skeleton className="category-skeleton" />
            <Skeleton className="category-skeleton" />
            <Skeleton className="category-skeleton" />
            <Skeleton className="category-skeleton" />
          </div>
        </div>
      </div>
      <div className="project-loading-main">
        <div className="project-section">
          <Skeleton className="project-title-skeleton" />
          <div className="project-images-skeletons">
            <Skeleton className="image-skeleton" />
            <Skeleton className="image-skeleton" />
            <Skeleton className="image-skeleton" />
            <Skeleton className="image-skeleton" />
          </div>
        </div>
      </div>
    </div>
  );
}
