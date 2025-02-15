import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { Recipe } from "./Recipe";

@Entity("recipes_steps") // Nome da tabela no banco
export class RecipeSteps {
    
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 100, nullable: false })
  description: string;

  @Column({type: 'int', nullable: false})
  recipe_id: number

  @CreateDateColumn({ type: "timestamp" })
  created_at: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updated_at: Date;

  @ManyToOne(() => Recipe, recipe => recipe.steps)
  @JoinColumn({ name: "recipe_id" })
  recipe: Recipe;

}