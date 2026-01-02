-- Table pour stocker les biens immobiliers scrappés
CREATE TABLE public.properties (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    source TEXT NOT NULL,
    source_url TEXT,
    title TEXT NOT NULL,
    description TEXT,
    price TEXT,
    surface TEXT,
    location TEXT,
    property_type TEXT,
    images TEXT[] DEFAULT '{}',
    bedrooms INTEGER,
    bathrooms INTEGER,
    amenities TEXT[] DEFAULT '{}',
    scraped_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Index pour recherche par source
CREATE INDEX idx_properties_source ON public.properties(source);

-- Index pour recherche par date de scraping
CREATE INDEX idx_properties_scraped_at ON public.properties(scraped_at DESC);

-- Enable RLS
ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;

-- Policy pour lecture publique (les biens sont visibles par tous)
CREATE POLICY "Properties are viewable by everyone" 
ON public.properties 
FOR SELECT 
USING (true);

-- Function pour mettre à jour le timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Trigger pour mise à jour automatique
CREATE TRIGGER update_properties_updated_at
BEFORE UPDATE ON public.properties
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();