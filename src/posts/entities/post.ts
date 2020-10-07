import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar' })
    author_id: number;

    @Column({ type: 'varchar' })
    author_name: string;

    @Column({ type: 'varchar' })
    title: string;

    @Column({ type: 'text' })
    body: string;

    @Column({ type: 'json', default: null })
    likes: string[];

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    creation_time: Date;
}