INSERT INTO item (name, price, description, stock)
VALUES ($1, $2, $3, $4)
RETURNING *;