import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTableRecipes1739577661240 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
              name: "recipes",
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
                  name: "preparation_time",
                  type: "time",
                  isNullable: false,
                },
                {
                  name: "is_fitness",
                  type: "boolean",
                  default: false,
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
        }
        
    
    
    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("recipes");
      }
    
    }

