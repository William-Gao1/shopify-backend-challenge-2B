UPDATE shipment_item SET quantity = $2 WHERE shipment_item_id = $1
RETURNING *;