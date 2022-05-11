INSERT INTO shipment_item (shipment_id, item_id, quantity)
VALUES ($1, $2, $3)
RETURNING *;