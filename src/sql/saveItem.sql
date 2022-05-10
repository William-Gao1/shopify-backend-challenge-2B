UPDATE item
SET name = $2,
    price = $3,
    description = $4,
    stock = $5
WHERE id = $1
RETURNING *;