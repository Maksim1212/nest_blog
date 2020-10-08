import ServiceConfigInterface from './interfaces/service.config.interface';

export const serviceConfig: ServiceConfigInterface = {
    jwt: {
        refreshSecret: process.env.JWT_Refresh_Secret_KEY || 'vscode',
        accessSecret: process.env.JWT_Access_Secret_KEY || 'keyboard',
    },
};

export const sessionSecret: string = process.env.SESSION_SECRET || 'keyboard cat';
