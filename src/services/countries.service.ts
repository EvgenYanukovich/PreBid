import axios from 'axios';

export interface Country {
  id: number;
  short_name_ru: string;
  name_ru: string;
  ports: Array<{
    id: number;
    name_ru: string;
    name_en: string;
    auction: {
      id: number;
      name: string;
      code: string;
    };
  }>;
}

interface CountriesResponse {
  status: string;
  code: number;
  countries: Country[];
  pagination: {
    total_results: number;
    page: number;
    prev_page: number | null;
    next_page: number | null;
  };
}

const API_URL = 'https://autoru.neonface.by/api/v2';

const countriesService = {
  async getCountries(): Promise<Country[]> {
    try {
      const response = await axios.get<CountriesResponse>(`${API_URL}/countries`);
      if (response.data.status === 'success') {
        return response.data.countries;
      }
      return [];
    } catch (error) {
      console.error('Error fetching countries:', error);
      return [];
    }
  }
};

export default countriesService;
