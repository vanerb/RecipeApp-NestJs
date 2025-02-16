import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn, BeforeInsert, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/users.entity';
import { Recipe } from 'src/recipes/recipes.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => User, (user) => user.categories)
  user: User;

  @OneToMany(() => Recipe, (recipes) => recipes.category)
  recipe: Recipe[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

}
