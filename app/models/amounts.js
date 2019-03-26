'use strict'

module.exports = {
  get: (conn, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)

      connection.query(`SELECT * FROM amount_tab WHERE status = 1`, (err, rows) => {
        callback(err, rows)
      })
    })
  }
}