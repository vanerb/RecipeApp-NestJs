import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './categories.entity';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';

@Module({
      imports: [TypeOrmModule.forFeature([Category])], // Asegúrate de que tus entidades estén registradas
      controllers: [CategoriesController],
      providers: [CategoriesService], 
})
export class CategoriesModule {}
