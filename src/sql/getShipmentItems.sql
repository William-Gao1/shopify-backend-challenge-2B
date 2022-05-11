SELECT json_agg(row_to_json(X)) AS items
FROM (SELECT item_id AS "itemId", quantity FROM inventory.shipment_item WHERE shipment_id = $1) AS X;