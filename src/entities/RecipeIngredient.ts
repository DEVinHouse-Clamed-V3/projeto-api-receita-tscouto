import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { Recipe } from "./Recipe";

@Entity("recipes_ingredients") // Nome da tabela no banco
export class RecipeIngredient {
    
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 200, nullable: false })
  name: string;

  @Column({type: 'int', nullable: false})
  recipe_id: number

  @CreateDateColumn({ type: "timestamp" })
  created_at: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updated_at: Date;

  @ManyToOne(() => Recipe, recipe => recipe.ingredients)
  @JoinColumn({ name: "recipe_id" })
  recipe: Recipe;

}