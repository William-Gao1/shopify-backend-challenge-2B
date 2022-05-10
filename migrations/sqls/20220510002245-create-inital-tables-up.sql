CREATE TABLE item (
    id              SERIAL PRIMARY KEY,
    name            TEXT NOT NULL,
    price           REAL NOT NULL,
    description     TEXT,
    stock           INTEGER DEFAULT 0 NOT NULL 
);

CREATE TABLE shipment (
    id              SERIAL PRIMARY KEY
);

CREATE TABLE shipment_item (
    item_id         INTEGER REFERENCES item,
    shipment_id     INTEGER REFERENCES shipment
);