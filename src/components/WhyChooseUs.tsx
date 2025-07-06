import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, MapPin, TrendingUp, Shield } from "lucide-react";

const WhyChooseUs = () => {
  const advantages = [
    {
      icon: MapPin,
      title: "Expertise locale",
      description: "Équipe basée à Marrakech, connaissance du marché et des attentes des voyageurs",
      details: [
        "Connaissance approfondie des quartiers",
        "Réseau de partenaires locaux fiables",
        "Compréhension des spécificités culturelles",
        "Tarification adaptée aux événements locaux"
      ],
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: TrendingUp,
      title: "Rentabilité prouvée",
      description: "Jusqu'à +25% de revenus locatifs grâce à notre gestion optimisée",
      details: [
        "Optimisation continue des tarifs",
        "Taux d'occupation maximal",
        "Réduction des périodes vacantes",
        "Stratégies de yield management"
      ],
      color: "from-green-500 to-green-600"
    },
    {
      icon: CheckCircle,
      title: "Transparence totale",
      description: "Suivi en temps réel de vos revenus et de la performance de votre bien",
      details: [
        "Dashboard propriétaire en temps réel",
        "Rapports détaillés mensuels",
        "Accès aux métriques de performance",
        "Communication proactive"
      ],
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: Shield,
      title: "Sérénité garantie",
      description: "Zéro engagement de durée, gestion de A à Z, vous ne vous occupez de rien",
      details: [
        "Aucun engagement de durée minimum",
        "Gestion complète sans intervention",
        "Support client prioritaire",
        "Garantie satisfaction"
      ],
      color: "from-orange-500 to-red-500"
    }
  ];

  return (
    <section id="avantages" className="py-20 bg-gradient-to-b from-muted/30 to-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 text-primary border-primary">
            Nos Avantages
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
            Pourquoi choisir{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              HOST Marrakech
            </span>
            ?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Nous combinons expertise locale, technologie avancée et service personnalisé 
            pour maximiser vos revenus en toute sérénité.
          </p>
        </div>

        {/* Advantages Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {advantages.map((advantage, index) => {
            const IconComponent = advantage.icon;
            return (
              <Card 
                key={index}
                className="relative overflow-hidden group hover:shadow-elegant transition-all duration-500 hover:scale-105 bg-gradient-card border-border/50"
              >
                <CardHeader className="pb-6">
                  <div className="flex items-start space-x-4">
                    <div className={`w-16 h-16 bg-gradient-to-r ${advantage.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-soft`}>
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                        {advantage.title}
                      </CardTitle>
                      <p className="text-muted-foreground leading-relaxed">
                        {advantage.description}
                      </p>
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  <div className="space-y-3">
                    {advantage.details.map((detail, detailIndex) => (
                      <div 
                        key={detailIndex} 
                        className="flex items-center text-sm text-muted-foreground group-hover:text-foreground transition-colors"
                      >
                        <CheckCircle className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />
                        {detail}
                      </div>
                    ))}
                  </div>
                </CardContent>

                {/* Decorative gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-r ${advantage.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none`}></div>
              </Card>
            );
          })}
        </div>

        {/* Statistics Section */}
        <div className="bg-gradient-hero rounded-2xl p-8 md:p-12 text-center shadow-elegant">
          <h3 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-8">
            Des résultats concrets qui parlent d'eux-mêmes
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary-foreground mb-2">
                +25%
              </div>
              <div className="text-primary-foreground/80 text-sm md:text-base">
                Revenus en moyenne
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary-foreground mb-2">
                85%
              </div>
              <div className="text-primary-foreground/80 text-sm md:text-base">
                Taux d'occupation
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary-foreground mb-2">
                4.8/5
              </div>
              <div className="text-primary-foreground/80 text-sm md:text-base">
                Note moyenne clients
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary-foreground mb-2">
                150+
              </div>
              <div className="text-primary-foreground/80 text-sm md:text-base">
                Propriétés gérées
              </div>
            </div>
          </div>

          <div className="mt-8">
            <button className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-soft">
              Rejoignez nos propriétaires satisfaits
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;