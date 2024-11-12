import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

//TODO Crie a entidade de User

import { Post } from './Post';

@Entity({ name: 'User' })
export class User {
  @PrimaryGeneratedColumn()
  id: number = 0

  @Column({ length: 100 })
  firstName: string = ''

  @Column({ length: 100 })
  lastName: string = ''

  @Column({ length: 100 })
  email: string = ''

  @OneToMany(() => Post, post => post.user)
    posts: Post | null = null
}
