import React, { useCallback, useMemo, useState, useEffect } from "react";
import { Button, Text, Transition } from "@mantine/core";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import { BiChevronRight, BiChevronDown, BiCategory } from "react-icons/bi";
import { useStore } from "zustand/react";
import { motion, AnimatePresence } from "framer-motion";
import DynamicContentStore from "../../libs/dynamic_content";
import "./project-category-side.css";

const ProjectCategorySide = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { services, subs } = useStore(DynamicContentStore);
  const location = useLocation();
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const category = searchParams.get("category")?.toLowerCase() || "all";
  const sub = searchParams.get("sub")?.toLowerCase();

  // Handle smooth transition on initial load
  useEffect(() => {
    if (isInitialLoad) {
      const timer = setTimeout(() => setIsInitialLoad(false), 100);
      return () => clearTimeout(timer);
    }
  }, [isInitialLoad]);

  const isOpen = useCallback(
    (cat, sub_cat) => {
      const isCategoryMatch = category?.toLowerCase() === cat.toLowerCase();
      const isSubMatch = sub_cat
        ? sub_cat.toLowerCase() === sub
        : isCategoryMatch;
      return isCategoryMatch && isSubMatch;
    },
    [category, sub]
  );

  const handleCategoryClick = (serviceTitle) => {
    if (isOpen(serviceTitle)) {
      setSearchParams({ category: "all", sub: undefined });
    } else {
      setSearchParams({ category: serviceTitle, sub: undefined });
    }
  };

  const handleSubCategoryClick = (serviceTitle, subCategory) => {
    setSearchParams({
      category: serviceTitle.toLowerCase(),
      sub: subCategory.toLowerCase(),
    });
  };

  const servicesArray = useMemo(
    () => Array.from(services.values()),
    [services]
  );

  const categoryNavItems = useMemo(() => {
    return [
      <Link
        key="default"
        to="/projects"
        className="nav-link"
        onClick={(e) => {
          e.preventDefault();
          setSearchParams({ category: "all", sub: undefined });
        }}
      >
        <Button
          radius="xl"
          size="md"
          className="full-width category-button"
          variant={category === "all" ? "filled" : "outline"}
          leftSection={<BiCategory size={18} />}
        >
          All Projects
        </Button>
      </Link>,

      ...servicesArray.map((service) => {
        const isServiceOpen = isOpen(service.title);
        const hasSubcategories = service.sub_categories.length > 0;

        return (
          <div className="nav-group" key={service.id}>
            <Button
              onClick={() => handleCategoryClick(service.title)}
              className={`full-width category-button ${
                isServiceOpen ? "active" : ""
              }`}
              variant={isServiceOpen ? "filled" : "outline"}
              rightSection={
                hasSubcategories ? (
                  isServiceOpen ? (
                    <BiChevronDown size={20} />
                  ) : (
                    <BiChevronRight size={20} />
                  )
                ) : undefined
              }
            >
              {service.title}
            </Button>

            <AnimatePresence>
              {isServiceOpen && hasSubcategories && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className={`sub-nav ${
                    isServiceOpen ? "expanded" : "collapsed"
                  }`}
                >
                  {service.sub_categories.map((sub_cat) => {
                    const subObj = subs.get(sub_cat);
                    if (!subObj) return null;

                    const isSubActive =
                      sub === subObj.subcategory.toLowerCase();

                    return (
                      <motion.div
                        key={subObj.subcategory}
                        initial={{ x: -10, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.2, delay: 0.1 }}
                      >
                        <Button
                          color="black"
                          variant={isSubActive ? "light" : "transparent"}
                          className={`full-width subcategory-button ${
                            isSubActive ? "active-sub" : ""
                          }`}
                          onClick={() =>
                            handleSubCategoryClick(
                              service.title,
                              subObj.subcategory
                            )
                          }
                        >
                          {subObj.subcategory}
                        </Button>
                      </motion.div>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      }),
    ];
  }, [servicesArray, subs, category, sub, isOpen, setSearchParams]);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="category-sidebar"
    >
      <div className="category-wrapper">
        <div className="category-header">
          <Text size="lg" fw={600} className="category-title">
            Project Categories
          </Text>
        </div>
        <div className="nav-container">
          <Transition
            mounted={!isInitialLoad}
            transition="fade"
            duration={500}
            timingFunction="ease"
          >
            {(styles) => <div style={styles}>{categoryNavItems}</div>}
          </Transition>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCategorySide;
