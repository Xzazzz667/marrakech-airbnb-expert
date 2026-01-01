import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Quote } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Karim Bennani",
      property: "Riad - Médina",
      location: "Marrakech",
      rating: 5,
      comment: "NBL PRIME a transformé ma propriété en véritable source de revenus. Mes gains ont augmenté de 30% et je n'ai plus aucun souci de gestion. L'équipe est professionnelle et toujours disponible.",
      revenue: "+30%",
      period: "6 mois"
    },
    {
      name: "Sarah Martinez",
      property: "Villa - Palmeraie",
      location: "Marrakech", 
      rating: 5,
      comment: "Excellente expérience ! Ils gèrent tout : accueil des clients, nettoyage, maintenance. Mes revenus sont optimisés et ma villa est toujours impeccable. Je recommande vivement.",
      revenue: "+25%",
      period: "1 an"
    },
    {
      name: "Ahmed El Fassi",
      property: "Appartement - Guéliz",
      location: "Marrakech",
      rating: 5,
      comment: "Une équipe locale qui connaît parfaitement Marrakech. Ils savent adapter les prix selon les événements et les saisons. Ma rentabilité n'a jamais été aussi élevée.",
      revenue: "+35%",
      period: "8 mois"
    },
    {
      name: "Fatima Alaoui", 
      property: "Riad traditionnel - Kasbah",
      location: "Marrakech",
      rating: 5,
      comment: "Transparence totale, communication excellente et résultats au rendez-vous. NBL PRIME a dépassé toutes mes attentes. Mon riad n'a jamais été aussi rentable.",
      revenue: "+28%",
      period: "10 mois"
    },
    {
      name: "Jean-Pierre Dubois",
      property: "Loft moderne - Hivernage", 
      location: "Marrakech",
      rating: 5,
      comment: "Investissement français, gestion marocaine parfaite ! L'équipe HOST s'occupe absolument de tout. Je reçois mes revenus sans me soucier de rien. Service impeccable.",
      revenue: "+22%",
      period: "4 mois"
    },
    {
      name: "Nadia Benkirane",
      property: "Villa avec piscine - Route de Fès",
      location: "Marrakech",
      rating: 5,
      comment: "Leur expertise en tarification dynamique est remarquable. Ils optimisent les prix en temps réel selon la demande. Ma villa génère maintenant des revenus constants toute l'année.",
      revenue: "+32%",
      period: "7 mois"
    }
  ];

  return (
    <section id="temoignages" className="py-20 bg-gradient-to-b from-background to-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 text-primary border-primary">
            Témoignages
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
            Ce que disent nos{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              propriétaires
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Découvrez comment NBL PRIME a aidé des dizaines de propriétaires 
            à maximiser leurs revenus locatifs en toute sérénité.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index} 
              className="relative overflow-hidden group hover:shadow-elegant transition-all duration-300 hover:scale-105 bg-gradient-card border-border/50"
            >
              <CardHeader className="pb-4">
                {/* Quote Icon */}
                <div className="flex justify-between items-start mb-4">
                  <Quote className="w-8 h-8 text-primary/30" />
                  <div className="flex items-center space-x-2">
                    <Badge variant="secondary" className="text-xs font-bold text-green-700 bg-green-100">
                      {testimonial.revenue}
                    </Badge>
                  </div>
                </div>

                {/* Stars */}
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, starIndex) => (
                    <Star 
                      key={starIndex} 
                      className="w-5 h-5 text-yellow-400 fill-current" 
                    />
                  ))}
                </div>

                {/* Comment */}
                <CardContent className="p-0">
                  <p className="text-muted-foreground leading-relaxed mb-6 italic">
                    "{testimonial.comment}"
                  </p>

                  {/* Author Info */}
                  <div className="border-t border-border/50 pt-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-semibold text-foreground">
                          {testimonial.name}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {testimonial.property}
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          Propriétaire depuis {testimonial.period}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-primary">
                          {testimonial.location}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </CardHeader>

              {/* Hover effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </Card>
          ))}
        </div>

        {/* Bottom Stats */}
        <div className="bg-gradient-card p-8 rounded-2xl shadow-soft border border-border/50">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-foreground mb-2">98%</div>
              <div className="text-muted-foreground">Taux de satisfaction</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-foreground mb-2">4.9/5</div>
              <div className="text-muted-foreground">Note moyenne</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-foreground mb-2">150+</div>
              <div className="text-muted-foreground">Propriétaires satisfaits</div>
            </div>
          </div>
          
          <div className="text-center mt-8">
            <h3 className="text-xl font-bold text-foreground mb-4">
              Rejoignez nos propriétaires satisfaits
            </h3>
            <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105 shadow-soft hover:shadow-elegant">
              Commencer maintenant
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;