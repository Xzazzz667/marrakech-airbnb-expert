import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import propertiesImage from "@/assets/properties-showcase.jpg";
import { MapPin, Users, Star, Euro } from "lucide-react";

const Properties = () => {
  const properties = [
    {
      id: 1,
      type: "Riad de charme",
      name: "Riad Atlas Médina",
      quartier: "Médina",
      capacity: "8 personnes",
      bedrooms: "4 suites",
      features: ["Patio traditionnel", "Piscine privée", "4 suites luxueuses", "Décoration artisanale"],
      price: "350",
      rating: 4.9,
      reviews: 127,
      image: propertiesImage,
      description: "Magnifique riad traditionnel au cœur de la médina de Marrakech. Architecture authentique avec patio central, fontaine traditionnelle et décoration raffinée alliant art marocain et confort moderne."
    },
    {
      id: 2,
      type: "Villa contemporaine",
      name: "Villa Palmier d'Or",
      quartier: "Palmeraie",
      capacity: "12 personnes",
      bedrooms: "6 chambres",
      features: ["Jardin paysager", "Piscine chauffée", "6 chambres spacieuses", "Spa privé"],
      price: "700",
      rating: 4.8,
      reviews: 89,
      image: propertiesImage,
      description: "Villa de luxe dans la prestigieuse Palmeraie. Design contemporain avec vue sur l'Atlas, piscine chauffée et jardins privés. Parfaite pour les séjours en famille ou entre amis."
    },
    {
      id: 3,
      type: "Appartement luxe",
      name: "Penthouse Guéliz",
      quartier: "Guéliz",
      capacity: "4 personnes",
      bedrooms: "2 chambres",
      features: ["Grande terrasse", "Vue Atlas", "Résidence sécurisée", "Design moderne"],
      price: "120",
      rating: 4.7,
      reviews: 156,
      image: propertiesImage,
      description: "Penthouse moderne dans le quartier branché de Guéliz. Terrasse panoramique avec vue sur l'Atlas, finitions haut de gamme et proximité des meilleurs restaurants."
    },
    {
      id: 4,
      type: "Riad traditionnel",
      name: "Riad Kasbah Royal",
      quartier: "Kasbah",
      capacity: "6 personnes",
      bedrooms: "3 chambres",
      features: ["Terrasse panoramique", "Personnel de maison", "Architecture authentique", "Vue Koutoubia"],
      price: "250",
      rating: 4.9,
      reviews: 98,
      image: propertiesImage,
      description: "Riad historique rénové dans la Kasbah avec vue imprenable sur la mosquée Koutoubia. Service de conciergerie inclus et terrasse sur le toit pour admirer les couchers de soleil."
    },
    {
      id: 5,
      type: "Loft moderne",
      name: "Loft Hivernage",
      quartier: "Hivernage",
      capacity: "2 personnes",
      bedrooms: "1 chambre",
      features: ["Design épuré", "Proximité clubs", "Balcon privé", "Équipements haut de gamme"],
      price: "90",
      rating: 4.6,
      reviews: 203,
      image: propertiesImage,
      description: "Loft contemporain dans le quartier chic d'Hivernage. Idéal pour les couples, proche des meilleurs restaurants et de la vie nocturne de Marrakech."
    },
    {
      id: 6,
      type: "Villa avec piscine",
      name: "Villa Oasis Route de Fès",
      quartier: "Route de Fès",
      capacity: "10 personnes",
      bedrooms: "5 chambres",
      features: ["Grand jardin", "Piscine olympique", "Salle de sport", "Cuisine d'été"],
      price: "480",
      rating: 4.8,
      reviews: 74,
      image: propertiesImage,
      description: "Villa spacieuse avec piscine olympique et grand jardin. Parfaite pour les grands groupes recherchant le calme tout en restant proche du centre-ville."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section 
        className="relative py-24 bg-cover bg-center"
        style={{ backgroundImage: `url(${propertiesImage})` }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge variant="outline" className="mb-4 text-white border-white">
            Nos Propriétés
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Découvrez nos{" "}
            <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              biens d'exception
            </span>
          </h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
            Une sélection de propriétés uniques à Marrakech, gérées par nos experts 
            pour garantir une expérience inoubliable à vos invités.
          </p>
        </div>
      </section>

      {/* Properties Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {properties.map((property) => (
              <Card 
                key={property.id} 
                className="overflow-hidden group hover:shadow-elegant transition-all duration-300 hover:scale-105 bg-gradient-card border-border/50"
              >
                {/* Property Image */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={property.image}
                    alt={property.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge variant="secondary" className="bg-white/90 text-foreground font-semibold">
                      {property.type}
                    </Badge>
                  </div>
                  <div className="absolute top-4 right-4">
                    <Badge variant="default" className="bg-primary text-primary-foreground font-bold">
                      {property.price}€/nuit
                    </Badge>
                  </div>
                  <div className="absolute bottom-4 left-4 flex items-center space-x-2">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-white font-semibold">{property.rating}</span>
                    <span className="text-white/80 text-sm">({property.reviews} avis)</span>
                  </div>
                </div>

                <CardHeader>
                  <CardTitle className="text-xl font-bold text-foreground mb-2">
                    {property.name}
                  </CardTitle>
                  <div className="flex items-center text-muted-foreground mb-4">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>{property.quartier}, Marrakech</span>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    {property.description}
                  </p>
                </CardHeader>

                <CardContent>
                  {/* Capacity & Bedrooms */}
                  <div className="flex items-center justify-between mb-4 text-sm">
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-2 text-primary" />
                      <span className="text-foreground font-medium">{property.capacity}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-foreground font-medium">{property.bedrooms}</span>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="grid grid-cols-2 gap-2 mb-6">
                    {property.features.map((feature, index) => (
                      <div key={index} className="flex items-center text-sm text-muted-foreground">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></div>
                        {feature}
                      </div>
                    ))}
                  </div>

                  {/* Price and CTA */}
                  <div className="flex items-center justify-between pt-4 border-t border-border/50">
                    <div className="flex items-center">
                      <Euro className="w-5 h-5 text-primary mr-1" />
                      <span className="text-2xl font-bold text-foreground">{property.price}</span>
                      <span className="text-muted-foreground ml-1">/nuit</span>
                    </div>
                    <Button variant="hero" size="sm">
                      Voir détails
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-16">
            <div className="bg-gradient-hero p-8 rounded-2xl shadow-elegant">
              <h3 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-4">
                Votre propriété pourrait être la prochaine
              </h3>
              <p className="text-primary-foreground/90 mb-6 max-w-2xl mx-auto">
                Rejoignez notre portfolio de propriétés d'exception et maximisez 
                vos revenus locatifs avec HOST Marrakech.
              </p>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary font-semibold">
                Demander une estimation gratuite
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Properties;