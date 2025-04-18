// ZamarBrandingPage.jsx
import { useState } from 'react';
import './Branding.css';

export default function ZamarBrandingPage() {
  const [activeTab, setActiveTab] = useState('all');

  // Branding project data
  const brandingProjects = [
    {
      id: 1,
      title: "Vehicle Branding",
      client: "Sam West Distributors",
      year: "2017",
      category: "vehicle",
      imageUrl: "/branding/sam_west_vehicle.jpg",
      description: "Custom vehicle branding design and implementation for Sam West Distributors' fleet, creating mobile brand visibility throughout their distribution routes."
    },
    {
      id: 2,
      title: "Multi-Country Branding Campaign",
      client: "Lato Milk",
      year: "2017-2020",
      category: "comprehensive",
      imageUrl: "/branding/lato_milk_branding.jpg",
      description: "Extensive branding campaign across Kenya, Rwanda, Uganda, and South Sudan, including wall branding, signage, and dealer materials to establish consistent brand identity across multiple markets."
    },
    {
      id: 3,
      title: "Wall Branding & Dealer Panels",
      client: "Dodla Dairy Kenya Limited (Dairy Top Milk)",
      year: "2018",
      category: "wall",
      imageUrl: "/branding/dodla_dairy_wall.jpg",
      description: "Strategic wall branding and dealer panels designed to increase brand visibility and recognition at key retail touchpoints."
    },
    {
      id: 4,
      title: "Free Standing Units & Till Branding",
      client: "Pascha Milk",
      year: "2018",
      category: "retail",
      imageUrl: "/branding/pascha_milk_units.jpg",
      description: "Custom free-standing display units and till branding solutions for enhanced point-of-sale presence and customer engagement."
    },
    {
      id: 5,
      title: "Wall Branding",
      client: "CFL Dairy - Alfresh Milk",
      year: "2019",
      category: "wall",
      imageUrl: "/branding/cfl_dairy_wall.jpg",
      description: "Impactful wall branding design and implementation to maximize brand visibility in high-traffic areas."
    },
    {
      id: 6,
      title: "Dealer Panels",
      client: "KEDA Tiles Ltd (House Mart Limited)",
      year: "2021",
      category: "retail",
      imageUrl: "/branding/keda_tiles_panels.jpg",
      description: "Custom dealer panel designs featuring product offerings and brand messaging for retail partner locations."
    },
    {
      id: 7,
      title: "Wall Branding & Signages",
      client: "Devyani Food Industries",
      year: "2022-2023",
      category: "wall",
      imageUrl: "/branding/devyani_wall_signage.jpg",
      description: "Comprehensive branding package including wall designs and custom signage for enhanced brand presence."
    },
    {
      id: 8,
      title: "International Wall Branding",
      client: "SATO Tanzania",
      year: "2021",
      category: "wall",
      imageUrl: "/branding/sato_tanzania_wall.jpg",
      description: "Strategic wall branding campaign designed for the Tanzanian market, ensuring cultural relevance while maintaining brand consistency."
    },
    {
      id: 9,
      title: "Footbridge Branding",
      client: "Medispa Limited (Dr. Stasch)",
      year: "2023",
      category: "outdoor",
      imageUrl: "/branding/medispa_footbridge.jpg",
      description: "High-visibility footbridge branding at Chiromo, utilizing unique outdoor advertising space for maximum exposure."
    },
    {
      id: 10,
      title: "Dealer Panels and Wall Branding",
      client: "Startimes Media Company Kenya Limited",
      year: "2023",
      category: "comprehensive",
      imageUrl: "/branding/startimes_branding.jpg",
      description: "Nationwide dealer panels and strategic wall branding implementation to support brand awareness and retail presence."
    },
    {
      id: 11,
      title: "Category Branding",
      client: "Josera",
      year: "2024",
      category: "retail",
      imageUrl: "/branding/josera_category.jpg",
      description: "In-store category branding to enhance product visibility and create brand dominance within the product category."
    },
    {
      id: 12,
      title: "Wall Branding & Dealer Panel",
      client: "Ideal Paints",
      year: "2023",
      category: "wall",
      imageUrl: "/branding/ideal_paints_wall.jpg",
      description: "Comprehensive branding package for paint retailers featuring wall designs and dealer panels with color-focused visuals."
    },
    {
      id: 13,
      title: "Wall Branding",
      client: "KAPA",
      year: "2024",
      category: "wall",
      imageUrl: "/branding/kapa_wall.jpg",
      description: "Strategic wall branding execution to increase brand visibility in target markets."
    }
  ];

  const tabs = [
    { id: 'all', name: 'All Projects' },
    { id: 'wall', name: 'Wall Branding' },
    { id: 'vehicle', name: 'Vehicle Branding' },
    { id: 'retail', name: 'Retail Branding' },
    { id: 'outdoor', name: 'Outdoor Branding' },
    { id: 'comprehensive', name: 'Comprehensive Campaigns' }
  ];

  const filteredProjects = activeTab === 'all' 
    ? brandingProjects 
    : brandingProjects.filter(project => project.category === activeTab);

  return (
    <div className="branding-page">
      <section className="branding-hero">
        <div className="branding-hero-content">
          <h1>Branding & Design Services</h1>
          <p>Creating impactful visual identities that elevate your brand presence</p>
        </div>
      </section>

      <section className="branding-services">
        <div className="services-container">
          <div className="services-header">
            <h2>Our Branding Services</h2>
            <p>We help businesses establish strong visual identities across multiple touchpoints</p>
          </div>
          
          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon wall-icon"></div>
              <h3>Wall Branding</h3>
              <p>Eye-catching wall designs that transform ordinary spaces into powerful brand statements, creating lasting impressions on customers and passersby.</p>
            </div>
            
            <div className="service-card">
              <div className="service-icon dealer-icon"></div>
              <h3>Dealer Panels / Boards</h3>
              <p>Custom dealer branding solutions that enhance product visibility at retail outlets and strengthen brand positioning at point of sale.</p>
            </div>
            
            <div className="service-card">
              <div className="service-icon vehicle-icon"></div>
              <h3>Vehicle Branding</h3>
              <p>Mobile advertising solutions that transform company vehicles into moving billboards, extending brand reach throughout service areas.</p>
            </div>
            
            <div className="service-card">
              <div className="service-icon fsu-icon"></div>
              <h3>Free Standing Units</h3>
              <p>Custom POS displays designed to showcase products effectively, increase visibility, and drive consumer engagement at retail locations.</p>
            </div>
            
            <div className="service-card">
              <div className="service-icon billboard-icon"></div>
              <h3>Hoardings & Billboards</h3>
              <p>High-impact outdoor advertising solutions that capture attention and deliver your brand message to mass audiences.</p>
            </div>
            
            <div className="service-card">
              <div className="service-icon promo-icon"></div>
              <h3>Promotional Items</h3>
              <p>Branded merchandise and promotional materials that extend brand presence and create lasting connections with your audience.</p>
            </div>
            
            <div className="service-card">
              <div className="service-icon category-icon"></div>
              <h3>Instore Category Branding</h3>
              <p>Strategic retail branding solutions that define and dominate product categories, creating brand prominence at point of purchase.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="branding-process">
        <div className="process-container">
          <div className="process-header">
            <h2>Our Branding Process</h2>
            <p>How we bring your brand vision to life</p>
          </div>
          
          <div className="process-steps">
            <div className="process-step">
              <div className="step-number">1</div>
              <h3>Discovery</h3>
              <p>We start by understanding your brand, target audience, objectives, and competitive landscape to inform our creative direction.</p>
            </div>
            
            <div className="process-step">
              <div className="step-number">2</div>
              <h3>Design Concept</h3>
              <p>Our creative team develops design concepts that align with your brand identity and messaging objectives.</p>
            </div>
            
            <div className="process-step">
              <div className="step-number">3</div>
              <h3>Refinement</h3>
              <p>We refine and perfect the designs based on your feedback until they meet your exact specifications and requirements.</p>
            </div>
            
            <div className="process-step">
              <div className="step-number">4</div>
              <h3>Production</h3>
              <p>Using premium materials and advanced printing techniques, we produce high-quality branding materials built to last.</p>
            </div>
            
            <div className="process-step">
              <div className="step-number">5</div>
              <h3>Implementation</h3>
              <p>Our experienced team handles the installation and implementation process with precision and attention to detail.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="branding-portfolio">
        <div className="portfolio-header">
          <h2>Our Branding Portfolio</h2>
          <p>Explore our recent branding projects</p>
        </div>
        
        <div className="portfolio-tabs">
          {tabs.map(tab => (
            <button 
              key={tab.id}
              className={activeTab === tab.id ? 'active' : ''} 
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.name}
            </button>
          ))}
        </div>
        
        <div className="portfolio-grid">
          {filteredProjects.map(project => (
            <div key={project.id} className="portfolio-card">
              <div className="portfolio-image">
                <img src={project.imageUrl} alt={project.title} />
                <div className="portfolio-overlay">
                  <div className="overlay-content">
                    <span className="project-category">{tabs.find(tab => tab.id === project.category)?.name}</span>
                    <p>{project.description}</p>
                  </div>
                </div>
              </div>
              <div className="portfolio-info">
                <h3>{project.title}</h3>
                <div className="project-meta">
                  <span className="client">{project.client}</span>
                  <span className="year">{project.year}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="branding-cta">
        <h2>Ready to Transform Your Brand Presence?</h2>
        <p>Let's work together to create impactful branding solutions that help your business stand out.</p>
        <button className="cta-button">Request a Consultation</button>
      </section>
    </div>
  );
}