const db = require('../../database');

class CategoryRepository {
  async findAll(orderBy = 'ASC') {
    const direction = orderBy.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';

    const row = await db.query(`
    SELECT categories.*, COUNT(contacts.*) AS contacts_count
    FROM categories
    LEFT JOIN contacts ON contacts.category_id = categories.id
    GROUP BY categories.id, categories.name
    ORDER BY categories.name ${direction}`);

    return row;
  }

  async create({ name }) {
    const [row] = await db.query(`
        INSERT INTO categories (name)
        VALUES ($1)
        RETURNING *
    `, [name]);

    return row;
  }

  async findById(id) {
    const [row] = await db.query(`
        SELECT * FROM categories WHERE id = $1
    `, [id]);

    return row;
  }

  async getAllContacts(id) {
    const [row] = await db.query(`
        SELECT COUNT(*)
        FROM contacts
        WHERE category_id = $1
    `, [id]);

    return row;
  }

  async update(id, { name }) {
    const [row] = await db.query(`
        UPDATE categories
        SET name = $1
        WHERE id = $2
        RETURNING *
    `, [name, id]);

    return row;
  }

  async delete(id) {
    await db.query(`
        UPDATE contacts
        SET category_id = null
        WHERE category_id = $1
    `, [id]);

    const deleteOp = await db.query(`
        DELETE FROM categories
        WHERE id = $1
    `, [id]);

    return [deleteOp];
  }
}

module.exports = new CategoryRepository();
