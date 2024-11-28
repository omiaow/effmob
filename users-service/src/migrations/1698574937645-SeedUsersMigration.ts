import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedUsersMigration1698574937645 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    for (let i = 0; i < 1000000; i++) {
      await queryRunner.query(
        `INSERT INTO users (name, surname, age, gender, issues) VALUES ('Name${i}', 'Surname${i}', ${Math.floor(Math.random() * 80) + 18}, 'Male', ${Math.random() > 0.5})`,
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DELETE FROM users');
  }
}
