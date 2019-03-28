'use strict'

module.exports = {
  get: (conn, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)

      connection.query(`SELECT * FROM amount_tab WHERE status = 1`, (err, rows) => {
        callback(err, rows)
      })
    })
  },
  checkAmount: (conn, amountId, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)

      connection.query(`SELECT * FROM amount_tab WHERE status = 1 AND amountid = ?`, amountId, (err, rows) => {
        callback(err, rows)
      })
    })
  },
  insertAmount: (conn, data, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)

      connection.query(`INSERT INTO amount_tab SET ?`, data, (err, rows) => {
        if (err) {
          callback(err)
        } else {
          callback(null, _.merge(data, { amountid: rows.insertId }))
        }
      })
    })
  },
  updateAmount: (conn, data, amountId, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)

      connection.query(`UPDATE amount_tab SET ? where amountid = ?`, [data, amountId], (err, rows) => {
        callback(err, rows.affectedRows > 0 ? _.merge(data, { amountid: amountId }) : [])
      })
    })
  },
  deleteAmount: (conn, amountId, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)

      connection.query(`UPDATE amount_tab SET status = 0 WHERE amountid = ?`, amountId, (err) => {
        callback(err, { message: `Data has been deleted` })
      })
    })
  }
}
