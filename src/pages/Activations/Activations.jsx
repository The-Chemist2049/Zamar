// ZamarActivationsPage.jsx
import { useState } from 'react';
import './Activations.css';

export default function ZamarActivationsPage() {
  const [activeCategory, setActiveCategory] = useState('all');

  // Activation project data
  const activationProjects = [
    {
      id: 1,
      title: "Schools Product Seeding & Listing Campaign",
      client: "Devyani Food Industries",
      period: "August - November 2018",
      category: "sampling",
      imageUrl: "/activations/devyani_schools.jpg",
      description: "We carried out a successful product seeding and listing campaign targeting schools. The activation involved distributing sample products and engaging school administrators to introduce the brand to students and staff. This initiative aimed at building early brand awareness and securing product placement within school and supply lists.",
      results: "The campaign laid a strong foundation for long-term brand presence and created valuable connections within the education sector."
    },
    {
      id: 2,
      title: "Kenya National Spelling Bee & Sai Office Roadshow",
      client: "Devyani Food Industries",
      period: "March 2020",
      category: "roadshow",
      imageUrl: "/activations/spelling_bee_roadshow.jpg",
      description: "A strategic roadshow activation targeting educational institutions during the Kenya National Spelling Bee event, combined with corporate engagement at Sai offices.",
      results: "Enhanced brand visibility among educational stakeholders and corporate professionals."
    },
    {
      id: 3,
      title: "Market Seeding & Storm Campaign",
      client: "Tissue Kenya Ltd (Propack)",
      period: "October 2022 - May 2023",
      category: "seeding",
      imageUrl: "/activations/propack_seeding.jpg",
      description: "Comprehensive market seeding and storm campaign to establish Propack's presence in new territories and retail outlets.",
      results: "Successful product placement in target markets with increased retail penetration."
    },
    {
      id: 4,
      title: "Airtime Service Activation",
      client: "Mawingu Airtime Limited (CREDO FASTER *264#)",
      period: "September 2022",
      category: "promotion",
      imageUrl: "/activations/credo_activation.jpg",
      description: "Service activation campaign promoting the CREDO FASTER *264# airtime service through direct engagement with potential users.",
      results: "Increased service adoption and user registration in target markets."
    },
    {
      id: 5,
      title: "In-store Product Activations",
      client: "Nala Noodles & Prestige Margarine",
      period: "2024 - 2025",
      category: "instore",
      imageUrl: "/activations/nala_prestige_instore.jpg",
      description: "Strategic in-store activations including sampling, product demonstrations, and promotional offers to drive consumer engagement and product trial.",
      results: "Enhanced product visibility and sales conversion at point of purchase."
    },
    {
      id: 6,
      title: "WIFI Technology Activation",
      client: "KEMNET Technologies",
      period: "February 2024",
      category: "technology",
      imageUrl: "/activations/kemnet_wifi_mlolongo.jpg",
      description: "Technology activation campaign in Mlolongo, Machakos County to introduce and demonstrate KEMNET's WIFI services to potential subscribers.",
      results: "Increased service awareness and subscription rates in the target region."
    }
  ];

  const categories = [
    { id: 'all', name: 'All Activations' },
    { id: 'sampling', name: 'Sampling' },
    { id: 'roadshow', name: 'Roadshows' },
    { id: 'seeding', name: 'Market Seeding' },
    { id: 'instore', name: 'In-store' },
    { id: 'promotion', name: 'Promotions' },
    { id: 'technology', name: 'Technology' }
  ];

  const filteredProjects = activeCategory === 'all' 
    ? activationProjects 
    : activationProjects.filter(project => project.category === activeCategory);

  return (
    <div className="activations-page">
      <div className="activations-header">
        <h1>Brand Activations</h1>
        <p>Engaging consumers through memorable brand experiences</p>
      </div>

      <div className="activations-intro">
        <div className="intro-content">
          <h2>Strategic Brand Activations</h2>
          <p>
            At Zamar Solutions, we specialize in creating impactful brand activation campaigns that connect 
            brands with their target audiences through meaningful interactions. Our activation strategies 
            are designed to create brand awareness, drive engagement, and ultimately convert consumers 
            into loyal customers.
          </p>
          <h3>Our Activation Services Include:</h3>
          <ul className="services-list">
            <li>Strategic consulting</li>
            <li>Retail marketing</li>
            <li>Trade marketing (seeding & sampling)</li>
            <li>Foot soldiering</li>
            <li>Mall marketing</li>
            <li>Street activations</li>
            <li>Sales promotions</li>
            <li>Tavern activations</li>
            <li>Schools & clinic programs</li>
            <li>Roadshows</li>
            <li>Merchandising</li>
          </ul>
        </div>
        <div className="intro-image">
          <img src="/activations/activation_hero.jpg" alt="Zamar Solutions Brand Activation" />
        </div>
      </div>

      <div className="activations-filters">
        {categories.map(category => (
          <button 
            key={category.id}
            className={activeCategory === category.id ? 'active' : ''} 
            onClick={() => setActiveCategory(category.id)}
          >
            {category.name}
          </button>
        ))}
      </div>

      <div className="activations-grid">
        {filteredProjects.map(project => (
          <div key={project.id} className="activation-card">
            <div className="activation-image">
              <img src={project.imageUrl} alt={project.title} />
              <div className="activation-category">{categories.find(cat => cat.id === project.category)?.name}</div>
            </div>
            <div className="activation-content">
              <h3>{project.title}</h3>
              <div className="activation-meta">
                <p><strong>Client:</strong> {project.client}</p>
                <p><strong>Period:</strong> {project.period}</p>
              </div>
              <div className="activation-description">
                <p>{project.description}</p>
              </div>
              <div className="activation-results">
                <h4>Results:</h4>
                <p>{project.results}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="cta-section">
        <h2>Ready to Activate Your Brand?</h2>
        <p>Let us help you create impactful brand experiences that resonate with your target audience.</p>
        <button className="cta-button">Contact Us Today</button>
      </div>
    </div>
  );
}