import { supabase } from '@/integrations/supabase/client';

export interface Property {
  id: string;
  source: string;
  source_url: string | null;
  title: string;
  description: string | null;
  price: string | null;
  surface: string | null;
  location: string | null;
  property_type: string | null;
  images: string[];
  bedrooms: number | null;
  bathrooms: number | null;
  amenities: string[];
  scraped_at: string;
  created_at: string;
  updated_at: string;
}

export const propertiesApi = {
  async getAll(): Promise<Property[]> {
    const { data, error } = await supabase
      .from('properties')
      .select('*')
      .order('scraped_at', { ascending: false });

    if (error) {
      console.error('Error fetching properties:', error);
      throw error;
    }

    return data || [];
  },

  async getBySource(source: string): Promise<Property[]> {
    const { data, error } = await supabase
      .from('properties')
      .select('*')
      .eq('source', source)
      .order('scraped_at', { ascending: false });

    if (error) {
      console.error('Error fetching properties:', error);
      throw error;
    }

    return data || [];
  },

  async scrapeProperties(): Promise<{ success: boolean; inserted?: number; error?: string }> {
    const { data, error } = await supabase.functions.invoke('scrape-properties');

    if (error) {
      console.error('Error scraping properties:', error);
      return { success: false, error: error.message };
    }

    return data;
  },

  async deleteAll(): Promise<void> {
    const { error } = await supabase
      .from('properties')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000'); // Delete all

    if (error) {
      console.error('Error deleting properties:', error);
      throw error;
    }
  }
};
