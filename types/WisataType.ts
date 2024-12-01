interface Gambar {
    id: number;
    wisata_id: number;
    url: string;
    secure_url: string;
    public_id: string;
    created_at: string;
    updated_at: string;
}

export interface WisataType {
    id: number;
    user_id: number;
    kategori_id: number;
    nama: string;
    slug: string;
    deskripsi: string;
    harga: number;
    carousel: boolean;
    lokasi: string;
    jam: string;
    created_at: string;
    updated_at: string;
    gambar: Gambar[];
    rating: number[];  // Bisa menggunakan number[] untuk rating atau bisa menggunakan type lebih detail jika diperlukan
}

export interface ResponseCreateWisata {
    code: number;
    data: WisataType;
}

export interface ResponseFetchWisata {
    code: number;
    data: WisataType[];
}