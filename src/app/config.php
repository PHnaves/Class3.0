<?php
// Configurações de CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Se for uma requisição OPTIONS, retornar apenas os headers
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Configurações do banco de dados
$servername = "localhost";
$username = "root";
$password = "root"; // Senha vazia é comum em instalações locais do XAMPP/MySQL
$dbname = "classconnect";

try {
    // Criar conexão usando PDO
    $conn = new PDO("mysql:host=$servername;dbname=$dbname;charset=utf8", $username, $password);
    
    // Configurar o PDO para lançar exceções em caso de erro
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    // Configurar o charset
    $conn->exec("set names utf8");
    
} catch(PDOException $e) {
    // Retornar erro em formato JSON
    http_response_code(500);
    echo json_encode([
        "status" => "error",
        "message" => "Erro de conexão: " . $e->getMessage()
    ]);
    exit();
}
?>
