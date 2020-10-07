interface PasswordInterface {
    password: string;
}

interface UpdateDataInterface {
    refreshToken: string;
}

interface TokensInterface {
    accessToken: string;
    refreshToken: string;
}

interface UserMainInterface {
    id: number;
    name: string;
}

export { PasswordInterface, UpdateDataInterface, TokensInterface, UserMainInterface };
