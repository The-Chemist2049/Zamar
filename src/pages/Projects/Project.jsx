import React, { useEffect, useMemo } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import ProjectCategorySide from "../../components/Navbar/project-category-side";
import { Image, Text, Title } from "@mantine/core";
import pb from "../../libs/instances/pocketbase";
import { useStore } from "zustand/react";
import DynamicContentStore from "../../libs/dynamic_content";
import "./Projects.css";

const Projects = () => {
  const [searchParams] = useSearchParams();
  const location = useLocation();

  const category = searchParams.get("category")?.toLowerCase() || "all";
  const sub = searchParams.get("sub")?.toLowerCase();

  const { subs, fill } = useStore(DynamicContentStore);
  const [projects, setProjects] = React.useState([]);
  const [subcategories, setSubcategories] = React.useState([]);
  const [services, setServices] = React.useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const subcats = await pb.collection("Subcategory").getList();
        const servs = await pb
          .collection("services")
          .getList(0, 50, { expand: "sub_categories" });
        const projs = await pb
          .collection("Projects")
          .getList(undefined, undefined, {
            expand: "client,category,subcategory",
          });

        setSubcategories(subcats.items);
        setServices(servs.items);
        setProjects(projs.items);

        fill("projects", projs.items);
        fill("subs", subcats.items);
        fill("services", servs.items);
      } catch (error) {
        console.error("Failed to fetch project data:", error);
      }
    };

    fetchData();
  }, []);

  const filteredProjects = useMemo(() => {
    if (!projects) return [];
    if (!category || category === "all") return projects;

    return projects
      .filter((f) => f.expand.category.title.toLowerCase().includes(category))
      .filter((f) => {
        if (!sub) return true;
        const subCategory = subs.get(f.subcategory);
        if (!subCategory) return true;
        return subCategory.subcategory.toLowerCase() === sub;
      });
  }, [category, sub, projects]);

  return (
    <div className="projects-container">
      <ProjectCategorySide />
      <div className="projects-content">
        {filteredProjects.length < 1 && (
          <Text className="empty-message">
            Nothing to show in this category, we're working to show you more
            soon 😊
          </Text>
        )}
        {filteredProjects.map((item, i) => (
          <div className="project-section" key={i}>
            <Title c="primary" order={3}>
              {item.expand.client.name}
            </Title>
            <div className="image-grid">
              {item.images.map((image, k) => (
                <Image
                  key={k}
                  src={`${pb.baseURL}/api/files/${item.collectionId}/${item.id}/${image}`}
                  className="project-image"
                  alt={`Project ${item.expand.client.name}`}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
