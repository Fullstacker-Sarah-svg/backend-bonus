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

};

