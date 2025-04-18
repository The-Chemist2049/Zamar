// ZamarPortfolioPage.jsx
import { useState } from 'react';
import './Portfolio.css';

export default function ZamarPortfolioPage() {
  const [activeCategory, setActiveCategory] = useState('all');

  const portfolioItems = [
    {
      id: 1,
      title: "Vehicle Branding",
      client: "Sam West Distributors",
      year: "2017",
      category: "branding",
      imageUrl: "/portfolio/sam_west_vehicle.jpg",
      description: "Vehicle branding for Sam West Distributors fleet"
    },
    {
      id: 2,
      title: "Milk Branding",
      client: "Lato Milk",
      year: "2017-2020",
      category: "branding",
      imageUrl: "/portfolio/lato_milk.jpg",
      description: "Comprehensive branding for Lato Milk across Kenya, Rwanda, Uganda, and South Sudan"
    },
    {
      id: 3,
      title: "Wall Branding & Dealer Panel",
      client: "Dodla Dairy Kenya Limited (Dairy Top Milk)",
      year: "2018",
      category: "branding",
      imageUrl: "/portfolio/dodla_dairy.jpg",
      description: "Strategic wall branding and dealer panels to increase brand visibility"
    },
    {
      id: 4,
      title: "Free Standing Units & Till Branding",
      client: "Pascha Milk",
      year: "2018",
      category: "branding",
      imageUrl: "/portfolio/pascha_milk.jpg",
      description: "In-store branding solutions including free standing units and till branding"
    },
    {
      id: 5,
      title: "Product Seeding & Sampling Campaign",
      client: "Devyani Food Industries",
      year: "2018",
      category: "activation",
      imageUrl: "/portfolio/devyani_sampling.jpg",
      description: "School-focused sampling program targeting administrators and students"
    },
    {
      id: 6,
      title: "Seeding and Market Storm",
      client: "Tissue Kenya Ltd (Propack)",
      year: "2022-2023",
      category: "activation",
      imageUrl: "/portfolio/tissue_kenya.jpg",
      description: "Market activation campaign to introduce products to new territories"
    },
    {
      id: 7,
      title: "Wall Branding",
      client: "CFL Dairy - Alfresh Milk",
      year: "2019",
      category: "branding",
      imageUrl: "/portfolio/cfl_dairy.jpg",
      description: "Strategic wall branding for increased brand visibility"
    },
    {
      id: 8,
      title: "Dealer Panels",
      client: "KEDA Tiles (House Mart Limited)",
      year: "2021",
      category: "branding",
      imageUrl: "/portfolio/keda_tiles.jpg",
      description: "Custom dealer panels for retail partners"
    },
    {
      id: 9,
      title: "Airtime Activation",
      client: "Mawingu Airtime Limited (CREDO FASTER *264#)",
      year: "2022",
      category: "activation",
      imageUrl: "/portfolio/mawingu_airtime.jpg",
      description: "Campaign to increase awareness and adoption of the *264# service"
    },
    {
      id: 10,
      title: "Wall Branding & Signages",
      client: "Devyani Food Industries",
      year: "2022-2023",
      category: "branding",
      imageUrl: "/portfolio/devyani_branding.jpg",
      description: "Comprehensive branding package including walls and custom signage"
    },
    {
      id: 11,
      title: "Wall Branding",
      client: "SATO Tanzania",
      year: "2021",
      category: "branding",
      imageUrl: "/portfolio/sato_branding.jpg",
      description: "Strategic wall branding campaign in Tanzania"
    },
    {
      id: 12,
      title: "Footbridge Branding",
      client: "Medispa Limited (Dr. Stasch)",
      year: "2023",
      category: "branding",
      imageUrl: "/portfolio/medispa_footbridge.jpg",
      description: "High-visibility footbridge branding at Chiromo"
    },
    {
      id: 13,
      title: "In-store Activations",
      client: "Nala Noodles & Prestige Margarine",
      year: "2024-2025",
      category: "activation",
      imageUrl: "/portfolio/nala_prestige.jpg",
      description: "Strategic in-store activations to drive product awareness and sales"
    },
    {
      id: 14,
      title: "WIFI Activation",
      client: "KEMNET Technologies",
      year: "2024",
      category: "activation",
      imageUrl: "/portfolio/kemnet_wifi.jpg",
      description: "WIFI activation campaign in Mlolongo, Machakos County"
    },
    {
      id: 15,
      title: "Dealer Panels and Wall Branding",
      client: "Startimes Media Company Kenya Limited",
      year: "2023",
      category: "branding",
      imageUrl: "/portfolio/startimes_branding.jpg",
      description: "Nationwide dealer panel distribution and wall branding"
    },
    {
      id: 16,
      title: "Category Branding",
      client: "Josera",
      year: "2024",
      category: "branding",
      imageUrl: "/portfolio/josera_category.jpg",
      description: "In-store category branding to enhance product visibility"
    },
    {
      id: 17,
      title: "Wall Branding & Dealer Panel",
      client: "Ideal Paints",
      year: "2023",
      category: "branding",
      imageUrl: "/portfolio/ideal_paints.jpg",
      description: "Comprehensive branding package for paint retailers"
    },
    {
      id: 18,
      title: "Wall Branding",
      client: "KAPA",
      year: "2024",
      category: "branding",
      imageUrl: "/portfolio/kapa_branding.jpg",
      description: "Strategic wall branding for increased brand visibility"
    }
  ];

  const filteredItems = activeCategory === 'all' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === activeCategory);

  return (
    <div className="portfolio-page">
      <div className="portfolio-header">
        <h1>Our Portfolio</h1>
        <p>Explore our diverse range of branding and activation projects</p>
      </div>

      <div className="portfolio-filters">
        <button 
          className={activeCategory === 'all' ? 'active' : ''} 
          onClick={() => setActiveCategory('all')}
        >
          All Projects
        </button>
        <button 
          className={activeCategory === 'branding' ? 'active' : ''} 
          onClick={() => setActiveCategory('branding')}
        >
          Branding
        </button>
        <button 
          className={activeCategory === 'activation' ? 'active' : ''} 
          onClick={() => setActiveCategory('activation')}
        >
          Activations
        </button>
      </div>

      <div className="portfolio-grid">
        {filteredItems.map(item => (
          <div key={item.id} className="portfolio-item">
            <div className="portfolio-image">
              <img src={item.imageUrl} alt={item.title} />
              <div className="portfolio-overlay">
                <div className="portfolio-category">{item.category === 'branding' ? 'Branding' : 'Activation'}</div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </div>
            <div className="portfolio-info">
              <h3>{item.title}</h3>
              <p className="client"><strong>Client:</strong> {item.client}</p>
              <p className="year"><strong>Year:</strong> {item.year}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}