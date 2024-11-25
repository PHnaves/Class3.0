<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once '../config.php';

try {
    // Testa a conexão
    if ($conn->connect_error) {
        throw new Exception("Conexão falhou: " . $conn->connect_error);
    }

    // Testa a tabela de atividades
    $sql = "DESCRIBE atividades";
    $result = $conn->query($sql);
    
    if (!$result) {
        throw new Exception("Tabela 'atividades' não encontrada");
    }

    // Lista as colunas da tabela
    $columns = array();
    while($row = $result->fetch_assoc()) {
        $columns[] = $row;
    }

    // Retorna sucesso
    echo json_encode([
        "status" => "success",
        "message" => "Conexão estabelecida com sucesso",
        "database" => $dbname,
        "table_structure" => $columns
    ]);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        "status" => "error",
        "message" => $e->getMessage()
    ]);
}

$conn->close();
?>
