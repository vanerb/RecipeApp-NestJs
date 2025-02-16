import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn, BeforeInsert, ManyToOne, OneToMany } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/users.entity';
import { Recipe } from 'src/recipes/recipes.entity';

@Entity()
export class Image {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  url: string;

  @Column()
  path: string;

  @ManyToOne(() => Recipe, (recipe) => recipe.images)
  recipe: Recipe;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

}
