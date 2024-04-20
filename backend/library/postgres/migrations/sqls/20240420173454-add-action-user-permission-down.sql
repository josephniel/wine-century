/* Replace with your SQL commands */

BEGIN;

DELETE FROM permissions WHERE code = 'VIEW_USER';
DELETE FROM permissions WHERE code = 'ADD_USER';
DELETE FROM permissions WHERE code = 'EDIT_USER';
DELETE FROM permissions WHERE code = 'DELETE_USER';

COMMIT;
