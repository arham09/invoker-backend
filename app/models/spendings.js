'use strict'

module.exports = {
  getSpend: (conn, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)

      connection.query(`SELECT * FROM spending_tab WHERE status = 1`, (err, rows) => {
        callback(err, rows)
      })
    })
  },
  checkSpend: (conn, spendingId, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)

      connection.query(`SELECT * FROM spending_tab WHERE status = 1 AND spendingid = ?`, spendingId, (err, rows) => {
        callback(err, rows)
      })
    })
  },
  insertSpend: (conn, data, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)

      connection.query(`INSERT INTO spending_tab SET ?`, data, (err, rows) => {
        if (err) {
          callback(err)
        } else {
          callback(null, _.merge(data, { spendingid: rows.insertId }))
        }
      })
    })
  },
  updateSpend: (conn, data, spendingId, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)

      connection.query(`UPDATE spending_tab SET ? WHERE spendingid = ?`, [data, spendingId], (err, rows) => {
        callback(err, rows.affectedRows > 0 ? _.merge(data, { spendingid: spendingId }) : [])
      })
    })
  },
  deleteSpend: (conn, spendingId, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)

      connection.query(`UPDATE spending_tab SET status = 0 WHERE spendingid = ?`, spendingId, (err, rows) => {
        callback(err, { message: `Data has been deleted` })
      })
    })
  }
}
