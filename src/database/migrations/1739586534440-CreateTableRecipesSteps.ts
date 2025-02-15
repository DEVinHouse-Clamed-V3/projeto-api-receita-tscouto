import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateTableRecipesSteps1739586534440 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "recipes_steps",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment",
                    },
                    {
                        name: "description",
                        type: "varchar",
                        length: "100",
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
            "recipes_steps",
            new TableForeignKey({
                columnNames: ["recipe_id"],
                referencedColumnNames: ["id"],
                referencedTableName: "recipes",
                onDelete: "CASCADE",
            })
        );

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("recipes_steps");
        await queryRunner.dropForeignKey("recipes_steps", "recipe_id");
    }

}
