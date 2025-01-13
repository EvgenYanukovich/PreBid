import api from '../api/axios';
import { AuctionSearchParams, AuctionSearchResponse } from '../types/auction';

interface CreateAuctionDto {
  name: string;
  is_closed: number;
  bid_time: number;
  countries: number[];
  date_start: string;
}

interface CreateAuctionResponse {
  status: string;
  code: number;
  message: string;
}

class AuctionService {
  private static instance: AuctionService;

  private constructor() {}

  public static getInstance(): AuctionService {
    if (!AuctionService.instance) {
      AuctionService.instance = new AuctionService();
    }
    return AuctionService.instance;
  }

  async searchAuctions(params: AuctionSearchParams): Promise<AuctionSearchResponse> {
    try {
      const { page, limit, search } = params;
      const { data } = await api.post<AuctionSearchResponse>(
        `/auctions/search?page=${page}&limit=${limit}`,
        { search }
      );
      console.log('Search response:', data);
      return data;
    } catch (error) {
      console.error('Search error:', error);
      if (error instanceof Error) {
        return {
          status: 'fail',
          code: 500,
          reason: error.message,
          content: [],
          pagination: {
            total_results: 0,
            page: 1,
            prev_page: null,
            next_page: null
          }
        };
      }
      return {
        status: 'fail',
        code: 500,
        reason: 'Unknown error',
        content: [],
        pagination: {
          total_results: 0,
          page: 1,
          prev_page: null,
          next_page: null
        }
      };
    }
  }

  async createAuction(data: CreateAuctionDto): Promise<CreateAuctionResponse> {
    const response = await api.post<CreateAuctionResponse>('/auctions', data);
    return response.data;
  }
}

const auctionService = AuctionService.getInstance();

export default {
  searchAuctions: auctionService.searchAuctions.bind(auctionService),
  createAuction: auctionService.createAuction.bind(auctionService),
};
