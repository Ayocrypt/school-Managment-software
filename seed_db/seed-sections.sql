-- Seed data for sections table
-- Run this after tables.sql has been executed

ALTER SEQUENCE sections_id_seq RESTART WITH 1;

INSERT INTO sections (name)
VALUES
('A'),
('B'),
('C'),
('D'),
('E')
ON CONFLICT (name) DO NOTHING;
