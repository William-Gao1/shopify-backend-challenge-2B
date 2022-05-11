ALTER TABLE shipment_item
DROP CONSTRAINT shipment_item_item_id_fkey;

ALTER TABLE shipment_item
ADD CONSTRAINT shipment_item_item_id_fkey
    FOREIGN KEY (item_id)
    REFERENCES item
        (id)
    ON DELETE CASCADE ON UPDATE NO ACTION;