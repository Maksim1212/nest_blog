interface PermissionCheckerInterface {
    isAdmin(id: number): Promise<boolean>;
}

export default PermissionCheckerInterface;