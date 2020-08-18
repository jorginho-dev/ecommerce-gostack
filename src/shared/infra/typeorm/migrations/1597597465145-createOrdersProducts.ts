import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class createOrdersProducts1597597465145 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
      new Table(
        {
          name: 'orders_products',
          columns: [
            {
              name: 'id',
              type: 'uuid',
              isPrimary: true,
              generationStrategy: 'uuid',
              default: 'uuid_generate_v4()'
            },

            {
              name: 'order_id',
              type: 'uuid',
              isNullable: false,
            },
            {
              name: 'product_id',
              type: 'uuid',
              isNullable: false,
            },
            {
              name: 'price',
              type: 'decimal',
              precision: 13,
              scale: 2,
              isNullable: false,

            },
            {
              name: 'quantity',
              type: 'int',
              isNullable: false,
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
        }
      )
    );


    await queryRunner.createForeignKey('orders_products', new TableForeignKey(
      {
        name: 'fk_orderId_ordersProducts',
        columnNames: ["order_id"],
        referencedTableName: "orders",
        referencedColumnNames: ["id"],
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      }
    ));

    await queryRunner.createForeignKey('orders_products', new TableForeignKey(
      {
        name: 'fk_productId_ordersProducts',
        columnNames: ["product_id"],
        referencedTableName: "products",
        referencedColumnNames: ["id"],
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      }
    ))

  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropForeignKey('orders_products', 'fk_productId_ordersProducts');
    await queryRunner.dropForeignKey('orders_products', 'fk_orderId_ordersProducts');
    await queryRunner.dropTable('orders_products');
  }

}
