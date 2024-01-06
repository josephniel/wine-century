/* Replace with your SQL commands */

BEGIN;

CREATE TABLE IF NOT EXISTS admin_users(
  id            SERIAL        PRIMARY KEY,
  first_name    VARCHAR(255)  NOT NULL,
  last_name     VARCHAR(255)  NOT NULL,
  email         VARCHAR(255)  NOT NULL,
  password_hash VARCHAR(255)  NOT NULL,

  CONSTRAINT email_unique UNIQUE (email)
);

COMMIT;