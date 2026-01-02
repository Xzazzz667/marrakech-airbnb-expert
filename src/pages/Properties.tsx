import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import propertiesImage from "@/assets/properties-showcase.jpg";
import { MapPin, Users, Star, Euro, RefreshCw, Database, ExternalLink, Home, Bath, Bed } from "lucide-react";
import { propertiesApi, Property } from "@/lib/api/properties";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";

const Properties = () => {
  const [dbProperties, setDbProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isScraping, setIsScraping] = useState(false);
  const [showDbProperties, setShowDbProperties] = useState(false);
  const { toast } = useToast();

  // Static properties for display
  const staticProperties = [
    {
      id: "1",
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
      id: "2",
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
      id: "3",
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
      id: "4",
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
      id: "5",
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
      id: "6",
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

  useEffect(() => {
    loadProperties();
  }, []);

  const loadProperties = async () => {
    setIsLoading(true);
    try {
      const data = await propertiesApi.getAll();
      setDbProperties(data);
    } catch (error) {
      console.error('Error loading properties:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleScrape = async () => {
    setIsScraping(true);
    toast({
      title: "Scraping en cours...",
      description: "Récupération des annonces depuis Mubawab, Avito et Villas Marrakech. Cela peut prendre quelques minutes.",
    });

    try {
      const result = await propertiesApi.scrapeProperties();
      
      if (result.success) {
        toast({
          title: "Scraping terminé !",
          description: `${result.inserted || 0} nouvelles annonces importées.`,
        });
        await loadProperties();
        setShowDbProperties(true);
      } else {
        toast({
          title: "Erreur de scraping",
          description: result.error || "Une erreur est survenue",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message || "Impossible de scraper les annonces",
        variant: "destructive",
      });
    } finally {
      setIsScraping(false);
    }
  };

  const handleClearData = async () => {
    try {
      await propertiesApi.deleteAll();
      setDbProperties([]);
      toast({
        title: "Données effacées",
        description: "Toutes les annonces ont été supprimées.",
      });
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const renderDbPropertyCard = (property: Property) => (
    <Card 
      key={property.id} 
      className="overflow-hidden group hover:shadow-elegant transition-all duration-300 hover:scale-[1.02] bg-gradient-card border-border/50"
    >
      {/* Property Image */}
      <div className="relative h-48 overflow-hidden bg-muted">
        {property.images && property.images.length > 0 ? (
          <img
            src={property.images[0]}
            alt={property.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            onError={(e) => {
              (e.target as HTMLImageElement).src = propertiesImage;
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-accent/20">
            <Home className="w-12 h-12 text-muted-foreground" />
          </div>
        )}
        <div className="absolute top-3 left-3">
          <Badge variant="secondary" className="bg-white/90 text-foreground font-semibold text-xs">
            {property.source}
          </Badge>
        </div>
        {property.price && (
          <div className="absolute top-3 right-3">
            <Badge variant="default" className="bg-primary text-primary-foreground font-bold text-xs">
              {property.price}
            </Badge>
          </div>
        )}
      </div>

      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-bold text-foreground line-clamp-2">
          {property.title}
        </CardTitle>
        <div className="flex items-center text-muted-foreground text-sm">
          <MapPin className="w-3 h-3 mr-1" />
          <span>{property.location || 'Marrakech'}</span>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        {/* Details */}
        <div className="flex items-center gap-4 mb-3 text-sm text-muted-foreground">
          {property.surface && (
            <div className="flex items-center">
              <Home className="w-3 h-3 mr-1" />
              <span>{property.surface}</span>
            </div>
          )}
          {property.bedrooms && (
            <div className="flex items-center">
              <Bed className="w-3 h-3 mr-1" />
              <span>{property.bedrooms} ch.</span>
            </div>
          )}
          {property.bathrooms && (
            <div className="flex items-center">
              <Bath className="w-3 h-3 mr-1" />
              <span>{property.bathrooms} sdb</span>
            </div>
          )}
        </div>

        {/* Description */}
        {property.description && (
          <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3 mb-3">
            {property.description}
          </p>
        )}

        {/* Amenities */}
        {property.amenities && property.amenities.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {property.amenities.slice(0, 4).map((amenity, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {amenity}
              </Badge>
            ))}
          </div>
        )}

        {/* Source Link */}
        {property.source_url && (
          <a 
            href={property.source_url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center text-sm text-primary hover:underline"
          >
            <ExternalLink className="w-3 h-3 mr-1" />
            Voir sur {property.source}
          </a>
        )}
      </CardContent>
    </Card>
  );

  const renderStaticPropertyCard = (property: typeof staticProperties[0]) => (
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
  );

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
          <p className="text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed mb-8">
            Une sélection de propriétés uniques à Marrakech, gérées par nos experts 
            pour garantir une expérience inoubliable à vos invités.
          </p>

          {/* Scraping Controls */}
          <div className="flex flex-wrap justify-center gap-4">
            <Button 
              onClick={handleScrape}
              disabled={isScraping}
              size="lg"
              className="bg-white text-primary hover:bg-white/90"
            >
              {isScraping ? (
                <>
                  <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                  Scraping en cours...
                </>
              ) : (
                <>
                  <Database className="w-5 h-5 mr-2" />
                  Scraper les annonces
                </>
              )}
            </Button>
            
            {dbProperties.length > 0 && (
              <>
                <Button 
                  onClick={() => setShowDbProperties(!showDbProperties)}
                  variant="outline"
                  size="lg"
                  className="border-white text-white hover:bg-white hover:text-primary"
                >
                  {showDbProperties ? "Voir nos biens" : `Voir annonces scrappées (${dbProperties.length})`}
                </Button>
                <Button 
                  onClick={handleClearData}
                  variant="outline"
                  size="lg"
                  className="border-red-400 text-red-400 hover:bg-red-400 hover:text-white"
                >
                  Effacer les données
                </Button>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Properties Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {showDbProperties && dbProperties.length > 0 ? (
            <>
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  Annonces Scrappées
                </h2>
                <p className="text-muted-foreground">
                  {dbProperties.length} annonces récupérées depuis Mubawab, Avito et Villas Marrakech
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {isLoading ? (
                  Array(6).fill(0).map((_, i) => (
                    <Card key={i} className="overflow-hidden">
                      <Skeleton className="h-48 w-full" />
                      <CardHeader>
                        <Skeleton className="h-6 w-3/4" />
                        <Skeleton className="h-4 w-1/2 mt-2" />
                      </CardHeader>
                      <CardContent>
                        <Skeleton className="h-20 w-full" />
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  dbProperties.map(renderDbPropertyCard)
                )}
              </div>
            </>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {staticProperties.map(renderStaticPropertyCard)}
            </div>
          )}

          {/* Bottom CTA */}
          <div className="text-center mt-16">
            <div className="bg-gradient-hero p-8 rounded-2xl shadow-elegant">
              <h3 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-4">
                Votre propriété pourrait être la prochaine
              </h3>
              <p className="text-primary-foreground/90 mb-6 max-w-2xl mx-auto">
                Rejoignez notre portfolio de propriétés d'exception et maximisez 
                vos revenus locatifs avec NBL PRIME.
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
