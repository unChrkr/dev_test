import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";

//TODO Crie a entidade de Post

import { User } from './User';

@Entity({ name: 'Post' })
export class Post {
  @PrimaryGeneratedColumn()
  id: number = 0

  @Column({ length: 100 })
  title: string = ''

  @Column({ length: 100 })
  description: string = ''

  @ManyToOne(() => User, user => user.posts)
  user!: User
}
