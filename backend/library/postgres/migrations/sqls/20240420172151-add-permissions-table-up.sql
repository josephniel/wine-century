/* Replace with your SQL commands */

BEGIN;

CREATE TABLE IF NOT EXISTS permissions(
  id    SERIAL        PRIMARY KEY,
  code  VARCHAR(255)  NOT NULL
);

CREATE TABLE IF NOT EXISTS admin_user_permissions(
  id            SERIAL  PRIMARY KEY,
  admin_user_id INTEGER NOT NULL,
  permission_id INTEGER NOT NULL,

  CONSTRAINT admin_permission UNIQUE (admin_user_id, permission_id),
  CONSTRAINT fk_admin_users
     FOREIGN KEY (admin_user_id) 
     REFERENCES admin_users(id)
     ON DELETE CASCADE,
  CONSTRAINT fk_permissions
     FOREIGN KEY (permission_id) 
     REFERENCES permissions(id)
     ON DELETE CASCADE
);

COMMIT;
