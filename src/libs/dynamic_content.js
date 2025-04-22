import { createStore } from "zustand/vanilla";

// Define valid keys for fillable content fields (optional for reference)
// const dynamicContentFields = [
//   "clients",
//   "subs",
//   "categories",
//   "showcase",
//   "values",
//   "services",
//   "testimonials",
//   "leaders",
//   "projects"
// ];

const DynamicContentStore = createStore((set, _get) => ({
  categories: new Map(),
  values: new Map(),
  clients: new Map(),
  projects: new Map(),
  showcase: new Map(),
  subs: new Map(),
  texts: new Map().set("landing_title", "Building Brands"),
  services: new Map(),
  testimonials: new Map(),
  leaders: new Map(),

  fill(field, data) {
    const map = new Map(data.map((d) => [d.id, d]));
    set((prev) => ({ ...prev, [field]: map }));
  },
}));

export default DynamicContentStore;
