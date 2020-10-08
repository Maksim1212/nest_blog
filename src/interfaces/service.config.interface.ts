export default interface ServiceConfigInterface {
    jwt: {
        refreshSecret: string;
        accessSecret: string;
    };
}