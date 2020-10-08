import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

import { UserMainInterface } from './interfaces/user.model.interface';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar' })
    name: string;

    @Column({ type: 'varchar', unique: true })
    email: string;

    @Column({ type: 'varchar' })
    password: string;

    @Column({ type: 'varchar', default: null })
    refreshToken: string;

    @Column({ type: 'boolean', default: false })
    is_admin: boolean;
}

export function getUserMainFields(user: UserMainInterface): UserMainInterface {
    const { name, id } = user;
    return {
        id,
        name,
    };
}
