/* Replace with your SQL commands */
BEGIN;

CREATE TABLE IF NOT EXISTS products(
  id            SERIAL        PRIMARY KEY,
  name          VARCHAR(255)  NOT NULL,
  details       VARCHAR(1000) NOT NULL,
  price         DECIMAL       NOT NULL,
  created_at    TIMESTAMP     NOT NULL DEFAULT now(),
  updated_at    TIMESTAMP     NOT NULL DEFAULT now(),

  CONSTRAINT name_unique UNIQUE (name)
);

COMMIT;
