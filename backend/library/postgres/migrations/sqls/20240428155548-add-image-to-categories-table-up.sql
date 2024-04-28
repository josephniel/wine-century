/* Replace with your SQL commands */

ALTER TABLE product_categories
    ADD COLUMN image_link VARCHAR(1000) DEFAULT NULL,
    ADD COLUMN crat TIMESTAMP NOT NULL DEFAULT now();

UPDATE product_categories SET crat=created_at;

ALTER TABLE product_categories
    DROP column created_at CASCADE;

ALTER TABLE product_categories RENAME COLUMN crat TO created_at;
