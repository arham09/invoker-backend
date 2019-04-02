'use strict'

module.exports = {
  insert: (conn, data, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)

      connection.query(`INSERT INTO users_tab SET ?`, data, (err, rows) => {
        if (err) {
          callback(err)
        } else {
          callback(null, _.merge(data, { userid: rows.insertId }))
        }
      })
    })
  },
  getUserByEmail: (conn, email, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)

      connection.query(`SELECT * FROM users_tab WHERE email = ?`, [email], (err, rows) => {
        callback(err, rows)
      })
    })
  }
}
