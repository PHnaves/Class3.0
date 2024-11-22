<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$servername = "localhost";
$username = "your_db_username"; // substitua pelo seu usuário do banco de dados
$password = "your_db_password"; // substitua pela sua senha do banco de dados
$dbname = "inter_db"; // nome do seu banco de dados

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$request_method = $_SERVER["REQUEST_METHOD"];

switch ($request_method) {
    case 'POST':
        $data = json_decode(file_get_contents("php://input"));
        if (isset($data->action) && $data->action == "login") {
            $identifier = $data->identifier; // pode ser o RA ou o email
            $password = $data->password;

            // Verifica se o identificador é um email
            if (filter_var($identifier, FILTER_VALIDATE_EMAIL)) {
                $sql = "SELECT * FROM aluno WHERE email='$identifier'";
            } else {
                $sql = "SELECT * FROM aluno WHERE ra='$identifier'";
            }

            $result = $conn->query($sql);
            if ($result->num_rows > 0) {
                $user = $result->fetch_assoc();
                if (password_verify($password, $user['senha'])) {
                    echo json_encode(["success" => true, "message" => "Login successful."]);
                } else {
                    echo json_encode(["success" => false, "message" => "Invalid password."]);
                }
            } else {
                echo json_encode(["success" => false, "message" => "User  not found."]);
            }
        }
        break;

    default:
        echo json_encode(["success" => false, "message" => "Invalid request method."]);
        break;
}

$conn->close();
?>