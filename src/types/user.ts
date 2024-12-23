export interface UserRole {
    code: string;
    title: string;
    id: number;
}

export interface User {
    id: number;
    email: string;
    active: number;
    active_prebid: number;
    telegram_id: string | null;
    created_at: string;
    updated_at: string;
    notificationCount: number;
}

export interface Client {
    name_ru: string;
    second_name_ru: string;
    name_en: string | null;
    second_name_en: string | null;
    active: number;
    birthday: string | null;
    phone: string;
    telegram: string | null;
    created_at: string;
    updated_at: string;
    id: number;
    type_user: number;
    company_name: string | null;
    country: string | null;
    certificate_number: string | null;
    date_register: string | null;
    ur_address: string | null;
    unp: string | null;
    fio_director: string | null;
    web: string | null;
    user_agreement: string | null;
    year_in_business: string | null;
    docs: any[];
}

export interface UserInformation {
    status: string;
    code: number;
    role: UserRole;
    user: User;
    client: Client;
    access_rights: any | null;
}
