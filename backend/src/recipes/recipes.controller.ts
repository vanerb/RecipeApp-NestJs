import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { Recipe } from './recipes.entity';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';

@Controller('recipes')
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) { }
  @Get()
  getAllRecipes(): Promise<Recipe[]> {
    return this.recipesService.getAllRecipes()
  }

  @Post()
  async createRecipe(@Body() createRecipeDto: CreateRecipeDto): Promise<Recipe> {
    return this.recipesService.createRecipe(createRecipeDto);
  }

  @Patch(':id')
  async updateRecipe(@Param('id') id: string, @Body() updateRecipeDto: UpdateRecipeDto) {
    return this.recipesService.updateRecipe(id, updateRecipeDto);
  }

  @Delete(':id')
  async deleteRecipe(@Param('id') id: string) {
    return this.recipesService.deleteRecipe(id);
  }
}
