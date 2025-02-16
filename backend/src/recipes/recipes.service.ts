import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Recipe } from './recipes.entity';
import * as bcrypt from 'bcrypt';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { Category } from 'src/categories/categories.entity';
import { User } from 'src/users/users.entity';

@Injectable()
export class RecipesService {
    constructor(
        @InjectRepository(Recipe) private recipesRepository: Repository<Recipe>,
        @InjectRepository(Category) private cateoriesRepository: Repository<Category>,
        @InjectRepository(User) private userRepository: Repository<User>,
    ) { }

    async getAllRecipes(): Promise<Recipe[]> {
        return await this.recipesRepository.find();
    }

    async createRecipe(createRecipeDto: CreateRecipeDto): Promise<Recipe> {
        const user = await this.userRepository.findOne({ where: { id: createRecipeDto.userId } });
        if (!user) {
            throw new Error('Usuario no encontrado');
        }
        const category = await this.cateoriesRepository.findOne({ where: { id: createRecipeDto.categoryId } });
        if (!category) {
            throw new Error('Usuario no encontrado');
        }
        const newRecipe = this.recipesRepository.create({ ...createRecipeDto, user, category });
        return this.recipesRepository.save(newRecipe);
    }

    async updateRecipe(id: string, updateRecipeDto: UpdateRecipeDto): Promise<Recipe> {
        const recipe = await this.recipesRepository.findOne({ where: { id } });
        if (!recipe) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }
        await this.recipesRepository.update(id, updateRecipeDto);
        const updatedRecipe = await this.recipesRepository.findOne({ where: { id } });
        const { ...recipeUpdated } = updatedRecipe;
        return recipeUpdated;
    }

    async deleteRecipe(id: string) {
        const recipe = await this.recipesRepository.findOne({ where: { id } });
        if (!recipe) {
            throw new NotFoundException(`Recipe with ID ${id} not found`);
        }

        this.recipesRepository.delete(id);
    }
}
