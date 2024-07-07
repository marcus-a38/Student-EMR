const query = "INSERT INTO user () VALUES ";

function acquirePlaceholders(count) {
  let str = "";
  for (let i = 0; i < count; i++) {
    str += "?";
    str += (i === count - 1) ? "":",";
  }
  return str;
}

function singleInsert(cols) {
  let sql = query + "("
  sql += acquirePlaceholders(cols);
  sql += ");";
}

function bulkInsert(count, cols) {

  let sql = query;

  for (let i = 0; i < count; i++) {

    // Open
    sql += "(";
    // Number of placeholders per row
    sql += acquirePlaceholders(cols);
    // Close
    sql += ")";
    sql += (i === cols - 1) ? ";":",";
  }
  
}

// (?);

singleInsert(7)
batchInsert(5, 7);