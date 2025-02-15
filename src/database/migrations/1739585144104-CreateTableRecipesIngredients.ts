import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateTableRecipesIngredients1739585144104 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
              name: "recipes_ingredients",
              columns: [
                {
                  name: "id",
                  type: "int",
                  isPrimary: true,
                  isGenerated: true,
                  generationStrategy: "increment",
                },
                {
                  name: "name",
                  type: "varchar",
                  length: "200",
                  isNullable: false,
                },
                {
                  name: "recipe_id",
                  type: "int",
                },
                {
                  name: "created_at",
                  type: "timestamp",
                  default: "CURRENT_TIMESTAMP",
                },
                {
                  name: "updated_at",
                  type: "timestamp",
                  default: "CURRENT_TIMESTAMP",
                },
              ],
            })
          );
      
          await queryRunner.createForeignKey(
            "recipes_ingredients",
            new TableForeignKey({
              columnNames: ["recipe_id"],
              referencedColumnNames: ["id"],
              referencedTableName: "recipes",
              onDelete: "CASCADE",
            })
          );

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("recipes_ingredients");
        await queryRunner.dropForeignKey("recipes_ingredients", "recipe_id");
    }

}
