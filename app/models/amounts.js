'use strict'

module.exports = {
  get: (conn, limit, offset, keyword, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)

      connection.query(`SELECT a.amountid, b.userid, c.spendingid, c.name AS spending, b.fullname AS name, a.amount, a.created_at FROM amount_tab a JOIN users_tab b ON a.userid = b.userid JOIN spending_tab c ON a.spendingid = c.spendingid WHERE a.status = 1 AND (c.name LIKE '%${keyword}%' OR b.fullname LIKE '%${keyword}%') ORDER BY a.created_at DESC LIMIT ${offset}, ${limit}`, (err, rows) => {
        callback(err, rows)
      })
    })
  },
  getAmount: (conn, amountId, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)

      connection.query(`SELECT a.amountid, b.userid, c.spendingid, c.name AS spending, b.fullname AS name, a.amount, a.created_at FROM amount_tab a JOIN users_tab b ON a.userid = b.userid JOIN spending_tab c ON a.spendingid = c.spendingid WHERE a.status = 1 AND amountid = ?`, amountId, (err, rows) => {
        callback(err, rows)
      })
    })
  },
  checkTotalAmount: (conn, keyword, callback) => {
    conn.getConnection((errConnection, connection) => {
      if (errConnection) console.error(errConnection)

      connection.query(`SELECT COUNT(a.amountid) as total FROM amount_tab a JOIN users_tab b ON a.userid = b.userid JOIN spending_tab c ON a.spendingid = c.spendingid WHERE a.status = 1 AND (c.name LIKE '%${keyword}%' OR b.fullname LIKE '%${keyword}%')`, (err, rows) => {
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
