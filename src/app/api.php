<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include 'config.php'; // Inclui o arquivo de configuração

$request_method = $_SERVER["REQUEST_METHOD"];

switch ($request_method) {
    case 'POST':
        $data = json_decode(file_get_contents("php://input"));
        if (isset($data->action) && $data->action == "login") {
            $identifier = $data->identifier; // Pode ser o RA ou o email
            $password = $data->password;

            // Verifica se o identificador é um email
            if (filter_var($identifier, FILTER_VALIDATE_EMAIL)) {
                $sql = "SELECT * FROM usuario WHERE email='$identifier'";
            } else {
                $sql = "SELECT * FROM usuario WHERE ra='$identifier'";
            }

            $result = $conn->query($sql);
            if ($result->num_rows > 0) {
                $user = $result->fetch_assoc();
                if (password_verify($password, $user['senha'])) {
                    echo json_encode(["success" => true, "message" => "Login successful.", "user" => $user]);
                } else {
                    echo json_encode(["success" => false, "message" => "Invalid password."]);
                }
            } else {
                echo json_encode(["success" => false, "message" => "User  not found."]);
            }
        }
        break;

    case 'GET':
        // Aqui você pode adicionar lógica para recuperar informações do usuário
        break;

    default:
        echo json_encode(["success" => false, "message" => "Invalid request method."]);
        break;
}

$conn->close();
?>