const { pool } = require("./db");
class ContactService {
  async create(data) {
    const { username, phone } = data;
    const newContact = await pool.query(
      "INSERT INTO contacts (username,phone) values ($1,$2) RETURNING *",
      [username, phone]
    );

    return newContact.rows[0];
  }
  async getContacts() {
    return (await pool.query("SELECT * FROM contacts ORDER BY id DESC")).rows;
  }

  async removeContact(id) {
     await pool.query("DELETE FROM contacts where id=$1", [id]);
     return 'Deleted'
  }

  async updateContact(id, data) {
    const updatedContact = await pool.query(
      "UPDATE contacts set username=$1,phone=$2 where id=$3 RETURNING *",
      [data.username, data.phone, id]
    );
    return updatedContact.rows[0];
  }
}

module.exports = new ContactService();
