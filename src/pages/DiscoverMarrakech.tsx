import { Helmet } from "react-helmet";
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, Star, Camera, Utensils, ShoppingBag, Landmark, Palmtree, Sparkles } from "lucide-react";

const activities = [
  {
    id: 1,
    title: "Place Jemaa el-Fna",
    description: "Le cœur battant de Marrakech, classée au patrimoine mondial de l'UNESCO. Découvrez les conteurs, charmeurs de serpents, musiciens et dégustez les spécialités locales.",
    category: "Incontournable",
    duration: "2-4h",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1597212618440-806262de4f6b?w=800&auto=format&fit=crop",
    icon: Landmark,
  },
  {
    id: 2,
    title: "Jardin Majorelle",
    description: "Un havre de paix créé par Jacques Majorelle et restauré par Yves Saint Laurent. Admirez le bleu Majorelle emblématique et la collection de plantes exotiques.",
    category: "Nature",
    duration: "1-2h",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&auto=format&fit=crop",
    icon: Palmtree,
  },
  {
    id: 3,
    title: "Médina & Souks",
    description: "Perdez-vous dans le labyrinthe coloré des souks traditionnels. Épices, tapis, maroquinerie, lanternes... Un festin pour les sens.",
    category: "Shopping",
    duration: "3-5h",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1531501410720-c8d437636169?w=800&auto=format&fit=crop",
    icon: ShoppingBag,
  },
  {
    id: 4,
    title: "Palais Bahia",
    description: "Chef-d'œuvre de l'architecture marocaine du XIXe siècle. Découvrez les jardins luxuriants, les zelliges et les plafonds en bois de cèdre sculpté.",
    category: "Culture",
    duration: "1-2h",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1548018560-c7196548e84d?w=800&auto=format&fit=crop",
    icon: Landmark,
  },
  {
    id: 5,
    title: "Cuisine Marocaine",
    description: "Participez à un cours de cuisine traditionnelle. Apprenez à préparer tajines, couscous et pastilla avec des chefs locaux passionnés.",
    category: "Gastronomie",
    duration: "3-4h",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1541518763669-27fef04b14ea?w=800&auto=format&fit=crop",
    icon: Utensils,
  },
  {
    id: 6,
    title: "Hammam Traditionnel",
    description: "Vivez l'expérience authentique du hammam marocain. Gommage au savon noir, massage à l'huile d'argan et détente absolue.",
    category: "Bien-être",
    duration: "2-3h",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&auto=format&fit=crop",
    icon: Sparkles,
  },
  {
    id: 7,
    title: "Mosquée Koutoubia",
    description: "Le monument emblématique de Marrakech avec son minaret de 77 mètres. Un chef-d'œuvre de l'architecture almohade visible de toute la ville.",
    category: "Culture",
    duration: "30min-1h",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1518553552076-b7d40ce87aca?w=800&auto=format&fit=crop",
    icon: Landmark,
  },
  {
    id: 8,
    title: "Excursion Atlas",
    description: "Évadez-vous dans les montagnes de l'Atlas. Randonnées, villages berbères, cascades d'Ouzoud et panoramas à couper le souffle.",
    category: "Aventure",
    duration: "Journée",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1489493585363-d69421e0edd3?w=800&auto=format&fit=crop",
    icon: Camera,
  },
];

const categoryColors: Record<string, string> = {
  "Incontournable": "bg-primary text-primary-foreground",
  "Nature": "bg-emerald-500 text-white",
  "Shopping": "bg-amber-500 text-white",
  "Culture": "bg-purple-500 text-white",
  "Gastronomie": "bg-rose-500 text-white",
  "Bien-être": "bg-cyan-500 text-white",
  "Aventure": "bg-orange-500 text-white",
};

const DiscoverMarrakech = () => {
  return (
    <>
      <Helmet>
        <title>Découvrir Marrakech | NBL PRIME - Activités touristiques</title>
        <meta
          name="description"
          content="Explorez les meilleures activités touristiques de Marrakech : Jemaa el-Fna, Jardin Majorelle, souks, hammams, cuisine marocaine et excursions dans l'Atlas."
        />
      </Helmet>
      
      <Navbar />
      
      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10" />
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1597212618440-806262de4f6b?w=1920&auto=format&fit=crop')] bg-cover bg-center opacity-10" />
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Badge variant="outline" className="mb-4 border-primary/30 text-primary">
              <MapPin className="h-3 w-3 mr-1" />
              Marrakech, Maroc
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Découvrir{" "}
              <span className="bg-gradient-hero bg-clip-text text-transparent">
                Marrakech
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              La ville ocre vous invite à vivre des expériences inoubliables. 
              Des souks animés aux jardins paisibles, découvrez les trésors de cette cité millénaire.
            </p>
          </div>
        </section>

        {/* Activities Grid */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {activities.map((activity) => {
              const IconComponent = activity.icon;
              return (
                <Card
                  key={activity.id}
                  className="group overflow-hidden border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-elegant"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={activity.image}
                      alt={activity.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                    <Badge
                      className={`absolute top-3 left-3 ${categoryColors[activity.category] || "bg-secondary"}`}
                    >
                      {activity.category}
                    </Badge>
                  </div>
                  
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <IconComponent className="h-5 w-5 text-primary" />
                      {activity.title}
                    </CardTitle>
                  </CardHeader>
                  
                  <CardContent>
                    <CardDescription className="text-sm mb-4 line-clamp-3">
                      {activity.description}
                    </CardDescription>
                    
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>{activity.duration}</span>
                      </div>
                      <div className="flex items-center gap-1 text-amber-500">
                        <Star className="h-4 w-4 fill-current" />
                        <span className="font-medium">{activity.rating}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/50">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Votre pied-à-terre à Marrakech
            </h2>
            <p className="text-muted-foreground mb-8">
              Découvrez nos biens d'exception pour vivre Marrakech comme un local. 
              Riads authentiques, villas avec piscine et appartements modernes vous attendent.
            </p>
            <a
              href="/properties"
              className="inline-flex items-center justify-center px-6 py-3 bg-gradient-hero text-primary-foreground font-medium rounded-lg hover:opacity-90 transition-opacity"
            >
              Voir nos biens
            </a>
          </div>
        </section>
      </main>
    </>
  );
};

export default DiscoverMarrakech;