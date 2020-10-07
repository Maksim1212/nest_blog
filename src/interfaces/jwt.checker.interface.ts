interface JWTCheckerInterface {
    isAuthJWT(userAccessToken: string): Promise<boolean>;
}

export default JWTCheckerInterface;
