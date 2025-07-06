import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    propertyAddress: "",
    bedrooms: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Notre adresse",
      info: "Quartier Hivernage, Marrakech, Maroc",
      details: "Nous sommes basés au cœur de Marrakech"
    },
    {
      icon: Phone,
      title: "Téléphone",
      info: "+212 5 24 XX XX XX",
      details: "Disponible 24h/24, 7j/7"
    },
    {
      icon: Mail,
      title: "Email",
      info: "contact@hostmarrakech.com",
      details: "Réponse sous 2h en moyenne"
    },
    {
      icon: Clock,
      title: "Horaires",
      info: "24h/24 - 7j/7",
      details: "Support client permanent"
    }
  ];

  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-muted/30 to-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 text-primary border-primary">
            Contact
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
            Obtenez votre{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              estimation gratuite
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Notre équipe d'experts vous fournira une analyse détaillée du potentiel 
            de votre propriété à Marrakech. C'est gratuit et sans engagement.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="bg-gradient-card border-border/50 shadow-elegant">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-foreground">
                Demandez votre estimation
              </CardTitle>
              <p className="text-muted-foreground">
                Remplissez ce formulaire et recevez votre analyse personnalisée sous 24h.
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2" htmlFor="name">
                      Nom complet *
                    </label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Votre nom"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2" htmlFor="email">
                      Email *
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="votre@email.com"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2" htmlFor="phone">
                      Téléphone *
                    </label>
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+212 6XX XX XX XX"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2" htmlFor="bedrooms">
                      Nombre de chambres *
                    </label>
                    <select
                      id="bedrooms"
                      name="bedrooms"
                      value={formData.bedrooms}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border border-input bg-background rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="">Sélectionner</option>
                      <option value="1">1 chambre</option>
                      <option value="2">2 chambres</option>
                      <option value="3">3 chambres</option>
                      <option value="4">4 chambres</option>
                      <option value="5+">5+ chambres</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2" htmlFor="propertyAddress">
                    Adresse de la propriété *
                  </label>
                  <Input
                    id="propertyAddress"
                    name="propertyAddress"
                    value={formData.propertyAddress}
                    onChange={handleChange}
                    placeholder="Quartier, rue, Marrakech"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2" htmlFor="message">
                    Message (optionnel)
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Parlez-nous de votre propriété, vos objectifs..."
                    rows={4}
                  />
                </div>

                <Button 
                  type="submit" 
                  variant="hero" 
                  size="lg" 
                  className="w-full text-lg font-semibold"
                >
                  Obtenir mon estimation gratuite
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  * Champs obligatoires - Vos données sont protégées et ne seront jamais partagées
                </p>
              </form>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <div className="space-y-6">
            <div className="bg-gradient-hero p-8 rounded-2xl text-center shadow-elegant">
              <h3 className="text-2xl font-bold text-primary-foreground mb-4">
                Réponse garantie sous 24h
              </h3>
              <p className="text-primary-foreground/90 mb-6">
                Notre équipe d'experts analysera votre propriété et vous contactera 
                rapidement avec une estimation détaillée.
              </p>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-primary-foreground">95%</div>
                  <div className="text-primary-foreground/80 text-sm">Précision</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary-foreground">24h</div>
                  <div className="text-primary-foreground/80 text-sm">Délai</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary-foreground">0€</div>
                  <div className="text-primary-foreground/80 text-sm">Gratuit</div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {contactInfo.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <Card key={index} className="bg-gradient-card border-border/50 hover:shadow-soft transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-gradient-hero rounded-xl flex items-center justify-center">
                          <IconComponent className="w-6 h-6 text-primary-foreground" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground mb-1">{item.title}</h4>
                          <p className="text-primary font-medium mb-1">{item.info}</p>
                          <p className="text-xs text-muted-foreground">{item.details}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <Card className="bg-gradient-card border-border/50">
              <CardContent className="p-6">
                <h4 className="font-bold text-foreground mb-4">Pourquoi demander une estimation ?</h4>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3"></div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        <strong>Analyse de marché</strong> - Comparaison avec des propriétés similaires
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3"></div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        <strong>Potentiel de revenus</strong> - Estimation précise de vos gains
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3"></div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        <strong>Conseils personnalisés</strong> - Optimisations pour maximiser les revenus
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;