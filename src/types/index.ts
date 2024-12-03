export interface Character {
    id: number;
    name: string;
    status: string;
    species: string;
    type: string;
    gender: string;
    origin: Origin;
    location: Location;
    image: string;
    episode: string[];
    created: string;
    url: string;
}

interface Origin {
    name: string;
    url: string;
}

interface Location {
    name: string;
    url: string;
}

export interface ApiResponse {
    results: Character[];
}

export interface CharacterListProps {
    characters: Character[];
}

export interface SearchBarProps {
    onSearch: (searchTerm: string) => void;
    loading: boolean;
    placeholder?: string;
    ariaLabel?: string;
}