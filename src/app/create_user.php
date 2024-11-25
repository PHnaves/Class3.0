<?php
include_once 'config.php';

// Criar usuário de teste
$nome = "Usuário Teste";
$email = "teste@teste.com";
$senha = password_hash("123456", PASSWORD_DEFAULT);

$sql = "INSERT INTO users (nome, email, senha) VALUES (?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("sss", $nome, $email, $senha);

if ($stmt->execute()) {
    echo "Usuário criado com sucesso!\n";
    echo "\nCredenciais para teste:\n";
    echo "Email: teste@teste.com\n";
    echo "Senha: 123456\n";
} else {
    echo "Erro ao criar usuário: " . $stmt->error;
}

$conn->close();
?>
