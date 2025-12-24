export type DummyUser = {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    image: string;
    phone: string;
    username: string;
    ip: string;
    role: string;
    company: Company;
    age: number;
};

export type DummyUsersResponse = {
    users: DummyUser[];
    total: number;
    skip: number;
    limit: number;
};

export type Company = {
    name: string;
}

export async function fetchUsers(limit = 10, skip = 0): Promise<DummyUsersResponse> {
    const url = new URL('https://dummyjson.com/users');
    url.searchParams.set('limit', limit.toString());
    url.searchParams.set('skip', skip.toString());

    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Error fetching users: ${response.statusText}`);
    }
    
    const data = await response.json();
    return data;
}

export async function fetchUserById(id: number): Promise<DummyUser> {
    const res = await fetch (`https://dummyjson.com/users/${id}`);
    if (!res.ok) throw new Error(`HHTP ${res.status}`);

    return res.json();
}

export async function searchUsers(q:string, limit = 12, skip = 0): Promise<DummyUsersResponse> {
    const url = new URL('https://dummyjson.com/users/search')
    url.searchParams.set('q', q)
    url.searchParams.set('limit', String(limit))
    url.searchParams.set('skip', String(skip))

    const res = await fetch(url)
    if (!res.ok) throw new Error(`HHTP ${res.status}`);
    
    return res.json();
}