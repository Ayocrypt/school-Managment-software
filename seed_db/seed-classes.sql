-- Seed data for classes table
-- Run this after tables.sql has been executed

ALTER SEQUENCE classes_id_seq RESTART WITH 1;

INSERT INTO classes (name, sections)
VALUES
('Grade 1', 'A,B,C'),
('Grade 2', 'A,B,C'),
('Grade 3', 'A,B,C'),
('Grade 4', 'A,B,C'),
('Grade 5', 'A,B,C'),
('Grade 6', 'A,B,C'),
('Grade 7', 'A,B,C'),
('Grade 8', 'A,B,C'),
('Grade 9', 'A,B,C'),
('Grade 10', 'A,B,C'),
('Grade 11', 'A,B,C'),
('Grade 12', 'A,B,C')
ON CONFLICT (name) DO NOTHING;
