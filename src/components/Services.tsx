import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, 
  Star, 
  Users, 
  Home, 
  Clock, 
  FileText 
} from "lucide-react";

const Services = () => {
  const services = [
    {
      icon: Star,
      title: "Gestion des annonces",
      description: "Création, optimisation, photos professionnelles, diffusion sur 10+ plateformes",
      features: ["Photos pro HD", "Descriptions optimisées", "Multi-plateformes", "SEO avancé"],
      badge: "Populaire"
    },
    {
      icon: Calendar,
      title: "Tarification dynamique",
      description: "Ajustement des prix selon la saison, les événements et la demande locale",
      features: ["Prix en temps réel", "Analyse concurrentielle", "Événements locaux", "Maximisation revenus"],
      badge: "IA intégrée"
    },
    {
      icon: Users,
      title: "Accueil & Support voyageurs",
      description: "Check-in/check-out, assistance 24/7, conciergerie personnalisée",
      features: ["Accueil personnalisé", "Support 24/7", "Conciergerie", "Solutions d'urgence"],
      badge: "Premium"
    },
    {
      icon: Home,
      title: "Entretien & Ménage",
      description: "Nettoyage professionnel, maintenance régulière, inspections qualité",
      features: ["Équipe certifiée", "Contrôle qualité", "Maintenance préventive", "Suivi détaillé"],
      badge: "Garanti"
    },
    {
      icon: Clock,
      title: "Assurance & Sécurité",
      description: "Assurance gratuite contre les dommages, sélection rigoureuse des locataires",
      features: ["Assurance incluse", "Vérification clients", "Sécurité renforcée", "Couverture complète"],
      badge: "Sécurisé"
    },
    {
      icon: FileText,
      title: "Gestion administrative",
      description: "Aide à l'obtention des licences, gestion des taxes et conformité légale",
      features: ["Licences Airbnb", "Déclarations fiscales", "Conformité légale", "Suivi administratif"],
      badge: "Légal"
    }
  ];

  return (
    <section id="services" className="py-20 bg-gradient-to-b from-background to-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 text-primary border-primary">
            Nos Services
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
            Une gestion complète de A à Z
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Nous nous occupons de tout pour que vous puissiez profiter de vos revenus locatifs 
            sans vous soucier de la gestion quotidienne.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <Card 
                key={index} 
                className="relative overflow-hidden group hover:shadow-elegant transition-all duration-300 hover:scale-105 bg-gradient-card border-border/50"
              >
                {/* Badge */}
                <div className="absolute top-4 right-4">
                  <Badge variant="secondary" className="text-xs font-medium">
                    {service.badge}
                  </Badge>
                </div>

                <CardHeader className="pb-4">
                  <div className="w-16 h-16 bg-gradient-hero rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                    {service.title}
                  </CardTitle>
                  <CardDescription className="text-muted-foreground leading-relaxed">
                    {service.description}
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <div className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center text-sm text-muted-foreground">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mr-3"></div>
                        {feature}
                      </div>
                    ))}
                  </div>
                </CardContent>

                {/* Hover effect gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </Card>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-card p-8 rounded-2xl shadow-soft border border-border/50">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Prêt à maximiser vos revenus ?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Contactez-nous dès aujourd'hui pour une analyse gratuite de votre propriété 
              et découvrez combien vous pourriez gagner.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105 shadow-soft hover:shadow-elegant">
                Demander une estimation
              </button>
              <button className="border border-border hover:bg-muted text-foreground px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105">
                En savoir plus
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;