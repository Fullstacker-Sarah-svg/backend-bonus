const pool = require('../utils/pool');


module.exports = class Dog {
    id;
    name;
    type;
    characteristic;

    constructor(row) {
      this.id = row.id;
      this.name = row.name;
      this.type = row.type;
      this.characteristic = row.characteristic;
    }

    static async insert(dog) {
      const { rows } = await pool.query(
        'INSERT INTO dogs (name, type, characteristic) VALUES ($1, $2, $3) RETURNING *',
        [dog.name, dog.type, dog.characteristic]
      );

      if(!rows[0]) throw new Error('Could not add the new dog.');

      return new Dog(rows[0]);
    }

    static async find() {
      const { rows } = await pool.query(
        'SELECT * FROM dogs',
      );

      if(!rows[0]) throw new Error('No dogs in database.');

      return rows.map(row => new Dog(row));
    }
    static async findById(id) {
      const { rows } = await pool.query(
        `SELECT * FROM dogs
          WHERE id=$1`,
        [id]
      );

      if(!rows[0]) throw new Error(`No dog matching id of ${id}.`);

      return new Dog(rows[0]);
    }
    static async delete(id) {
      const { rows } = await pool.query(
        `DELETE FROM dogs
            WHERE id=$1
            RETURNING *`,
        [id]
      );
  
      if(!rows[0]) throw new Error(`No dogs matching id of ${id}.`);
  
      return new Dog(rows[0]);
    }
    static async update(dog) {
      const { rows } = await pool.query(
        `UPDATE dogs
          SET name=$1,
          type=$2,
          characteristic=$3  
         WHERE id=$4
          RETURNING *`,
        [dog.name, dog.type, dog.characteristic, dog.id]
      );

      if(!rows[0]) throw new Error(`No dog matching id of ${dog.id}.`);
      return new Dog(rows[0]);
    }
};

