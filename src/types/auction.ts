export interface AuctionSearchParams {
    page: number;
    limit: number;
    search: {
        date_start_select?: string;
        date_end_select?: string;
        country_id?: number | string;
    };
}

interface AuctionStatus {
    id: number;
    name: string;
    code: string;
}

interface Country {
    id: number;
    name_ru: string;
    short_name_ru: string;
    name_en: string | null;
    short_name_en: string | null;
    active: number;
}

export interface AuctionContent {
    id: number;
    name: string;
    status: AuctionStatus;
    countries: Country[];
    transports: any[];
    transports_count: number;
    countries_text: string[];
    is_closed: number;
    bid_time: number;
    date_start: string;
    date_final: string | null;
}

interface AuctionDay {
    id: number;
    date: string;
    contents: AuctionContent[];
}

interface Pagination {
    total_results: number;
    page: number;
    prev_page: number | null;
    next_page: number | null;
}

export interface AuctionSearchResponse {
    status: string;
    code: number;
    content: AuctionDay[];
    pagination: Pagination;
    reason?: string;
}
