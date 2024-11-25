-- Criar o banco de dados
CREATE DATABASE IF NOT EXISTS classconnect;
USE classconnect;

-- Criar tabela de atividades
CREATE TABLE IF NOT EXISTS atividades (
    id INT AUTO_INCREMENT PRIMARY KEY,
    descricao TEXT NOT NULL,
    dataEntrega DATETIME NOT NULL,
    nota DECIMAL(4,2),
    materia VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Inserir algumas atividades de exemplo
INSERT INTO atividades (descricao, dataEntrega, nota, materia) VALUES
('Trabalho de Matemática', '2024-02-20 23:59:59', 10.0, 'Matemática'),
('Apresentação de História', '2024-02-25 14:00:00', 8.5, 'História'),
('Projeto de Ciências', '2024-03-01 23:59:59', 9.0, 'Ciências');

-- Criar usuário para a aplicação (se necessário)
CREATE USER IF NOT EXISTS 'classconnect_user'@'localhost' IDENTIFIED BY 'classconnect123';
GRANT ALL PRIVILEGES ON classconnect.* TO 'classconnect_user'@'localhost';
FLUSH PRIVILEGES;
