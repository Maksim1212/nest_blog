import UserService from '../users/user.service';
import PermissionCheckerInterface from '../interfaces/permission.checker.interface';

export default class PermissionChecker implements PermissionCheckerInterface {
    constructor(private readonly userService: UserService) {}

    async isAdmin(id: number): Promise<boolean> {
        const user = await this.userService.findByUserId(id);
        if (user && user.is_admin) {
            return true;
        }
        return false;
    }
}
