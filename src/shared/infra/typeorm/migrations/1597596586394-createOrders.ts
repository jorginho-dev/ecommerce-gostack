import { MigrationInterface, QueryRunner, Table, TableColumn, TableForeignKey } from "typeorm";

export class createOrders1597596586394 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
      new Table({
        name: 'orders',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()'
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()'
          },

          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()'
          },
        ]
      })
    )

    await queryRunner.addColumn('orders', new TableColumn(
      {
        name: 'customer_id',
        type: 'uuid',
        isNullable: true,
      }
    ))

    await queryRunner.createForeignKey('orders', new TableForeignKey({
      name: "fk_customerId_orders",
      columnNames: ['customer_id'],
      referencedColumnNames: ['id'],
      referencedTableName: "customers",
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE'

    }))
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropForeignKey('orders', 'fk_customerId_orders');
    await queryRunner.dropColumn('orders', 'curstomer_id');
    await queryRunner.dropTable('orders');
  }

}
