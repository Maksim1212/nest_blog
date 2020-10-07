interface CreateUserDataInterface {
    name: string;
    email: string;
    password: string;
}
interface OneUserInterface {
    id: number;
    name: string;
    email: string;
    password: string;
    refreshToken: string;
    is_admin: boolean;
}

export { CreateUserDataInterface, OneUserInterface };
