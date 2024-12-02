interface Gambar {
    id: number;
    wisata_id: number;
    url: string;
    secure_url: string;
    public_id: string;
    created_at: string;
    updated_at: string;
}

interface User {
    id: number;
    username: string;
    role: string;
    created_at: string;
}

interface Kategori {
    id: number;
    user_id: number;
    nama: string;
    created_at: string;
    updated_at: string;
}

interface Rating {
    // Misalnya, rating bisa memiliki id, nilai, atau komentar, dan lainnya
    id: number;
    wisata_id: number;
    user_id: number;
    nilai: number;  // Rating berbentuk angka
    komentar?: string;  // Opsional, jika ada komentar
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
    lokasi: string;
    jam: string;
    created_at: string;
    updated_at: string;
    gambar: Gambar[];
    rating: Rating[];  // Menggunakan Rating[] karena rating lebih kompleks
    user: User;
    kategori: Kategori;
}

export interface ResponseCreateWisata {
    code: number;
    data: WisataType;
}

export interface ResponseFetchSingleWisata {
    code: number;
    data: WisataType;
}

export interface ResponseFetchWisata {
    code: number;
    data: WisataType[];
}
