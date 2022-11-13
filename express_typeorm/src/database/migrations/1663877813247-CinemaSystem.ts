import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';
import {
  addYears,
  format,
  subYears,
  setMonth,
  setDate,
  setHours,
} from 'date-fns';

export class CinemaSystem1663877813247 implements MigrationInterface {
  /**
   # ToDo: Create a migration that creates all tables for the following user stories

   For an example on how a UI for an api using this might look like, please try to book a show at https://in.bookmyshow.com/.
   To not introduce additional complexity, please consider only one cinema.

   Please list the tables that you would create including keys, foreign keys and attributes that are required by the user stories.

   Tables:
   - movies
   - shoroom
   - shows
   - bookings 

   ## User Stories

   **Movie exploration**
   * As a user I want to see which films can be watched and at what times
   * As a user I want to only see the shows which are not booked out

   **Show administration**
   * As a cinema owner I want to run different films at different times
   * As a cinema owner I want to run multiple films at the same time in different showrooms

   **Pricing**
   * As a cinema owner I want to get paid differently per show
   * As a cinema owner I want to give different seat types a percentage premium, for example 50 % more for vip seat

   **Seating**
   * As a user I want to book a seat
   * As a user I want to book a vip seat/couple seat/super vip/whatever
   * As a user I want to see which seats are still available
   * As a user I want to know where I'm sitting on my ticket
   * As a cinema owner I dont want to configure the seating for every show
   */
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'movies',
        columns: [
          {
            name: 'id',
            isPrimary: true,
            type: 'integer',
            isGenerated: true,
            generationStrategy: 'increment',
          },
          { name: 'name', type: 'varchar' },
          { name: 'description', type: 'varchar' },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
    );

    await queryRunner.createTable(
      new Table({
        name: 'showroom',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          { name: 'room', type: 'varchar' },
          { name: 'noOfSeats', type: 'integer' },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
    );

    await queryRunner.createTable(
      new Table({
        name: 'shows',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          { name: 'movieId', type: 'integer' },
          { name: 'isBooked', type: 'boolean' },
          { name: 'showroomId', type: 'integer' },
          { name: 'price', type: 'float' },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          { name: 'start', type: 'timestamp' },
          { name: 'end', type: 'timestamp' },
        ],
      }),
    );

    await queryRunner.createTable(
      new Table({
        name: 'bookings',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          { name: 'movieId', type: 'integer' },
          { name: 'seat', type: 'varchar' },
          { name: 'showId', type: 'integer' },
          { name: 'price', type: 'float' },
          { name: 'seatType', type: 'varchar' },
          { name: 'percentagePremium', type: 'float' },
          { name: 'totalPrice', type: 'float' },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'shows',
      new TableForeignKey({
        columnNames: ['movieId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'movies',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'shows',
      new TableForeignKey({
        columnNames: ['showroomId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'showroom',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'bookings',
      new TableForeignKey({
        columnNames: ['movieId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'movies',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'bookings',
      new TableForeignKey({
        columnNames: ['showroomId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'showroom',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'shows',
      new TableForeignKey({
        columnNames: ['movieId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'movies',
        onDelete: 'CASCADE',
      }),
    );

  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
