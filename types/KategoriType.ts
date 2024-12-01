export interface KategoriType {
    id: number;
    user_id: number;
    nama: string;
    created_at: string;
    updated_at: string;
}

export interface ResponseCreateKategori {
    code: number;
    data: KategoriType;
}

export interface ResponseFetchKategori {
    code: number;
    data: KategoriType[];
}