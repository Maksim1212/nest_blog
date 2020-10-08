import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class Comment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar' })
    author_id: number;

    @Column({ type: 'text' })
    body: string;

    @Column({ type: 'json', default: null })
    likes: string[];

    @Column({ type: 'varchar' })
    post_id: number;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    creation_time: Date;
}
