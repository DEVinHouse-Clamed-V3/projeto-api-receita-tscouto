import "reflect-metadata"
import { DataSource } from "typeorm"
import { Recipe } from "./entities/Recipe"
import { RecipeIngredient } from "./entities/RecipeIngredient"
import { RecipeSteps } from "./entities/RecipeSteps"
require('dotenv').config()


export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432'),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: false,
    logging: process.env.NODE_ENV === 'development' ? true : false ,
    entities: [Recipe,RecipeIngredient,RecipeSteps],
    migrations: ["src/database/migrations/*.ts"],
    subscribers: [],
})
