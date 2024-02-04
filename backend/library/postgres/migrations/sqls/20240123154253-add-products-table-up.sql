/* Replace with your SQL commands */
BEGIN;

CREATE TABLE IF NOT EXISTS product_categories(
  id          INT           GENERATED ALWAYS AS IDENTITY,
  name        VARCHAR(255)  NOT NULL,
  created_at  TIMESTAMP     NOT NULL DEFAULT now(),

  PRIMARY KEY(id),
  CONSTRAINT product_category_name_unique UNIQUE (name)
);

CREATE TABLE IF NOT EXISTS products(
  id            INT               GENERATED ALWAYS AS IDENTITY,
  name          VARCHAR(255)      NOT NULL,
  category_id   INT               NOT NULL,
  details       VARCHAR(1000)     NOT NULL,
  price         DECIMAL           NOT NULL,
  created_at    TIMESTAMP         NOT NULL DEFAULT now(),
  updated_at    TIMESTAMP         NOT NULL DEFAULT now(),

  PRIMARY KEY(id),
  CONSTRAINT product_name_unique UNIQUE (name),
  CONSTRAINT fk_product_categories
    FOREIGN KEY(category_id) 
	  REFERENCES product_categories(id)
    ON DELETE CASCADE
);

COMMIT;
