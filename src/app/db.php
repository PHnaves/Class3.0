<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Content-Type: application/json; charset=UTF-8");

// Configuração do banco de dados MySQL Workbench
$host = "localhost";
$user = "classconnect_user";  // Usuário criado no script SQL
$pass = "classconnect123";    // Senha definida no script SQL
$dbname = "classconnect";     // Nome do banco de dados

try {
    $conn = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $user, $pass);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    // Processar requisições
    $method = $_SERVER['REQUEST_METHOD'];
    
    switch($method) {
        case 'GET':
            $stmt = $conn->prepare("SELECT * FROM atividades ORDER BY dataEntrega");
            $stmt->execute();
            $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode(['status' => 'success', 'data' => $result]);
            break;
            
        case 'POST':
            $data = json_decode(file_get_contents("php://input"));
            $stmt = $conn->prepare("INSERT INTO atividades (descricao, dataEntrega, nota, materia) VALUES (?, ?, ?, ?)");
            $stmt->execute([$data->descricao, $data->dataEntrega, $data->nota, $data->materia]);
            echo json_encode([
                'status' => 'success',
                'message' => 'Atividade criada com sucesso',
                'id' => $conn->lastInsertId()
            ]);
            break;
            
        case 'PUT':
            $data = json_decode(file_get_contents("php://input"));
            $stmt = $conn->prepare("UPDATE atividades SET descricao=?, dataEntrega=?, nota=?, materia=? WHERE id=?");
            $stmt->execute([$data->descricao, $data->dataEntrega, $data->nota, $data->materia, $data->id]);
            echo json_encode([
                'status' => 'success',
                'message' => 'Atividade atualizada com sucesso'
            ]);
            break;
            
        case 'DELETE':
            $id = $_GET['id'];
            $stmt = $conn->prepare("DELETE FROM atividades WHERE id=?");
            $stmt->execute([$id]);
            echo json_encode([
                'status' => 'success',
                'message' => 'Atividade excluída com sucesso'
            ]);
            break;
    }
    
} catch(PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'status' => 'error',
        'message' => 'Erro no banco de dados: ' . $e->getMessage()
    ]);
}
?>
