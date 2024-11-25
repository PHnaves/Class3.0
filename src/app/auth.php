<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Content-Type: application/json; charset=UTF-8");

include_once 'config.php';

// Receber dados do POST
$data = json_decode(file_get_contents("php://input"));

if (!isset($data->action)) {
    echo json_encode(['status' => 'error', 'message' => 'Ação não especificada']);
    exit;
}

switch ($data->action) {
    case 'login':
        if (!isset($data->email) || !isset($data->senha)) {
            echo json_encode(['status' => 'error', 'message' => 'Email e senha são obrigatórios']);
            exit;
        }

        $stmt = $conn->prepare("SELECT id, nome, email, senha FROM users WHERE email = ?");
        $stmt->bind_param("s", $data->email);
        $stmt->execute();
        $result = $stmt->get_result();
        
        if ($user = $result->fetch_assoc()) {
            if (password_verify($data->senha, $user['senha'])) {
                // Atualizar último login
                $updateStmt = $conn->prepare("UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE id = ?");
                $updateStmt->bind_param("i", $user['id']);
                $updateStmt->execute();

                // Remover senha antes de enviar
                unset($user['senha']);
                
                echo json_encode([
                    'status' => 'success',
                    'message' => 'Login realizado com sucesso',
                    'user' => $user
                ]);
            } else {
                echo json_encode(['status' => 'error', 'message' => 'Senha incorreta']);
            }
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Usuário não encontrado']);
        }
        break;

    case 'register':
        if (!isset($data->nome) || !isset($data->email) || !isset($data->senha)) {
            echo json_encode(['status' => 'error', 'message' => 'Todos os campos são obrigatórios']);
            exit;
        }

        // Verificar se email já existe
        $stmt = $conn->prepare("SELECT id FROM users WHERE email = ?");
        $stmt->bind_param("s", $data->email);
        $stmt->execute();
        if ($stmt->get_result()->num_rows > 0) {
            echo json_encode(['status' => 'error', 'message' => 'Email já cadastrado']);
            exit;
        }

        // Criar novo usuário
        $hashedPassword = password_hash($data->senha, PASSWORD_DEFAULT);
        $stmt = $conn->prepare("INSERT INTO users (nome, email, senha) VALUES (?, ?, ?)");
        $stmt->bind_param("sss", $data->nome, $data->email, $hashedPassword);
        
        if ($stmt->execute()) {
            $userId = $stmt->insert_id;
            echo json_encode([
                'status' => 'success',
                'message' => 'Usuário registrado com sucesso',
                'user' => [
                    'id' => $userId,
                    'nome' => $data->nome,
                    'email' => $data->email
                ]
            ]);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Erro ao registrar usuário']);
        }
        break;

    case 'update':
        if (!isset($data->id)) {
            echo json_encode(['status' => 'error', 'message' => 'ID do usuário não fornecido']);
            exit;
        }

        $updateFields = [];
        $types = "";
        $values = [];

        if (isset($data->nome)) {
            $updateFields[] = "nome = ?";
            $types .= "s";
            $values[] = $data->nome;
        }
        if (isset($data->email)) {
            $updateFields[] = "email = ?";
            $types .= "s";
            $values[] = $data->email;
        }
        if (isset($data->senha)) {
            $updateFields[] = "senha = ?";
            $types .= "s";
            $values[] = password_hash($data->senha, PASSWORD_DEFAULT);
        }
        if (isset($data->foto_perfil)) {
            $updateFields[] = "foto_perfil = ?";
            $types .= "s";
            $values[] = $data->foto_perfil;
        }

        if (empty($updateFields)) {
            echo json_encode(['status' => 'error', 'message' => 'Nenhum campo para atualizar']);
            exit;
        }

        $values[] = $data->id;
        $types .= "i";

        $sql = "UPDATE users SET " . implode(", ", $updateFields) . " WHERE id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param($types, ...$values);

        if ($stmt->execute()) {
            // Buscar usuário atualizado
            $stmt = $conn->prepare("SELECT id, nome, email, foto_perfil FROM users WHERE id = ?");
            $stmt->bind_param("i", $data->id);
            $stmt->execute();
            $user = $stmt->get_result()->fetch_assoc();

            echo json_encode([
                'status' => 'success',
                'message' => 'Perfil atualizado com sucesso',
                'user' => $user
            ]);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Erro ao atualizar perfil']);
        }
        break;

    default:
        echo json_encode(['status' => 'error', 'message' => 'Ação inválida']);
        break;
}

$conn->close();
?>
