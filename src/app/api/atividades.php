<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, GET, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../config.php';

// GET - Listar atividades
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $sql = "SELECT * FROM atividades ORDER BY dataEntrega ASC";
    $result = $conn->query($sql);
    
    if ($result->num_rows > 0) {
        $atividades = array();
        while($row = $result->fetch_assoc()) {
            array_push($atividades, $row);
        }
        echo json_encode($atividades);
    } else {
        echo json_encode([]);
    }
}

// POST - Criar atividade
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"));
    
    $sql = "INSERT INTO atividades (descricao, dataEntrega, nota, materia) 
            VALUES (?, ?, ?, ?)";
            
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssds", $data->descricao, $data->dataEntrega, $data->nota, $data->materia);
    
    if ($stmt->execute()) {
        echo json_encode(["message" => "Atividade criada com sucesso"]);
    } else {
        echo json_encode(["message" => "Erro ao criar atividade"]);
    }
}

// PUT - Atualizar atividade
if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    $data = json_decode(file_get_contents("php://input"));
    
    $sql = "UPDATE atividades SET descricao=?, dataEntrega=?, nota=?, materia=? WHERE id=?";
    
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssdsi", $data->descricao, $data->dataEntrega, $data->nota, $data->materia, $data->id);
    
    if ($stmt->execute()) {
        echo json_encode(["message" => "Atividade atualizada com sucesso"]);
    } else {
        echo json_encode(["message" => "Erro ao atualizar atividade"]);
    }
}

// DELETE - Excluir atividade
if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $id = isset($_GET['id']) ? $_GET['id'] : die();
    
    $sql = "DELETE FROM atividades WHERE id=?";
    
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $id);
    
    if ($stmt->execute()) {
        echo json_encode(["message" => "Atividade excluída com sucesso"]);
    } else {
        echo json_encode(["message" => "Erro ao excluir atividade"]);
    }
}

$conn->close();
?>
