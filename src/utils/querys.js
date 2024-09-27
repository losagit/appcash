const querys = {};

querys.insert = (tabla, columns) => {
  const vals = columns.map(() => '?').join(',');
  const sql = `INSERT INTO ${tabla} (${columns.join(', ')}) VALUES (${vals})`
  return sql;
};

querys.select = (tabla, conditions) => {
  let sql = `SELECT * FROM ${tabla} WHERE 1=1 `;
  const vals = [];

  Object.keys(conditions).forEach(key => {
    if (conditions[key] !== undefined) {
      sql += ` AND ${key} = ?`;
      vals.push(conditions[key]);
    }
  });

  return { sql, vals };
};

querys.selectJoin = (tabla1, tabla2, conditions) => {
  let sql = `SELECT * FROM ${tabla1} INNER JOIN ${tabla2} ON `;
  const vals = [];

  Object.keys(conditions).forEach(key => {
    if (conditions[key] !== undefined) {
      sql += `${tabla1}.${key} = ${tabla2}.${conditions[key]} AND `;
    }
  });

  sql = sql.slice(0, -5); // Elimina el último 'AND' redundante

  return { sql, vals };
};

querys.selectJoinMultiple = ( tables, joins, wheres) => {
  let sql = `SELECT * FROM ${tables[0]}`;
  let vals = [];

  for(let i = 1; i< tables.length ; i++){
    const condition = joins[i - 1];
    sql += ` INNER JOIN ${tables[i]} ON ${condition}`;
  }

  if(wheres && Object.keys(wheres).length > 0){
    sql += ` WHERE `;
    Object.keys(wheres).forEach( key => {
      if(wheres[key] !== undefined) {
        sql += `${key} = ? AND `;
        vals.push(wheres[key]);
      }
    });
    sql = sql.slice(0,-5);
  }

  return { sql, vals }

};

module.exports = querys;

