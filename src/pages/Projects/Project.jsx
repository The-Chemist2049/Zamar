import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Image, Text, Title } from "@mantine/core";
import ProjectCategorySide from "../../components/Navbar/project-category-side";
import pb from "../../libs/instances/pocketbase";
import { useStore } from "zustand/react";
import DynamicContentStore from "../../libs/dynamic_content";
import "./Projects.css";

const Projects = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category")?.toLowerCase() || "all";
  const sub = searchParams.get("sub")?.toLowerCase();

  const { subs, fill } = useStore(DynamicContentStore);
  const [data, setData] = useState({
    projects: [],
    subcategories: [],
    services: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [subcats, servs, projs] = await Promise.all([
          pb.collection("Subcategory").getList(),
          pb
            .collection("services")
            .getList(0, 50, { expand: "sub_categories" }),
          pb.collection("Projects").getList(undefined, undefined, {
            expand: "client,category,subcategory",
          }),
        ]);

        const subcatItems = subcats.items;
        const serviceItems = servs.items;
        const projectItems = projs.items;

        setData({
          projects: projectItems,
          subcategories: subcatItems,
          services: serviceItems,
        });

        fill("projects", projectItems);
        fill("subs", subcatItems);
        fill("services", serviceItems);
      } catch (error) {
        console.error("Failed to fetch project data:", error);
      }
    };

    fetchData();
  }, [fill]);

  const filteredProjects = useMemo(() => {
    return data.projects
      .filter((project) => {
        const projectCategory = project?.expand?.category?.title?.toLowerCase();
        return category === "all" || projectCategory?.includes(category);
      })
      .filter((project) => {
        if (!sub) return true;
        const subCategory = subs.get(project.subcategory);
        return subCategory?.subcategory?.toLowerCase() === sub;
      });
  }, [category, sub, data.projects, subs]);

  return (
    <div className="projects-container">
      <ProjectCategorySide />
      <div className="projects-content">
        {filteredProjects.length === 0 ? (
          <Text className="empty-message">
            Nothing to show in this category, we're working to show you more
            soon 😊
          </Text>
        ) : (
          filteredProjects.map((item, i) => (
            <div className="project-section" key={i}>
              <Title c="primary" order={3}>
                {item?.expand?.client?.name ?? "Unnamed Client"}
              </Title>
              <div className="image-grid">
                {item.images?.map((image, k) => (
                  <Image
                    key={k}
                    src={`${pb.baseURL}/api/files/${item.collectionId}/${item.id}/${image}`}
                    className="project-image"
                    alt={`Project ${item?.expand?.client?.name ?? "Image"}`}
                  />
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Projects;
