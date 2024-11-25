# Instruções para Configuração do Banco de Dados

## 1. Configuração do MySQL Workbench

1. Abra o MySQL Workbench
2. Conecte-se ao seu servidor local (geralmente localhost:3306)
3. Abra uma nova query e copie todo o conteúdo do arquivo `setup.sql`
4. Execute o script SQL para criar:
   - O banco de dados `classconnect`
   - A tabela `atividades`
   - O usuário `classconnect_user`
   - Alguns dados de exemplo

## 2. Verificação da Configuração

1. No MySQL Workbench, execute os seguintes comandos para verificar se tudo foi criado corretamente:

```sql
USE classconnect;
SHOW TABLES;
SELECT * FROM atividades;
```

## 3. Configuração do Projeto

1. Certifique-se que o arquivo `db.php` está usando as credenciais corretas:
   - Host: localhost
   - Usuário: classconnect_user
   - Senha: classconnect123
   - Banco: classconnect

## 4. Testando o Sistema

1. Para testar se a conexão está funcionando, você pode executar uma consulta direta no MySQL Workbench:

```sql
SELECT * FROM classconnect.atividades;
```

## 5. Estrutura do Banco de Dados

### Tabela: atividades
- id (INT, AUTO_INCREMENT, PRIMARY KEY)
- descricao (TEXT)
- dataEntrega (DATETIME)
- nota (DECIMAL)
- materia (VARCHAR)
- created_at (TIMESTAMP)

## 6. Operações Disponíveis

O sistema permite:
1. Criar novas atividades
2. Listar todas as atividades
3. Atualizar atividades existentes
4. Excluir atividades
5. Visualizar atividades recentes
6. Contar total de atividades
7. Contar matérias diferentes

## 7. Solução de Problemas

Se encontrar problemas de conexão:

1. Verifique se o MySQL está rodando:
```sql
SHOW VARIABLES LIKE 'port';
```

2. Verifique se o usuário tem as permissões corretas:
```sql
SHOW GRANTS FOR 'classconnect_user'@'localhost';
```

3. Teste a conexão com o usuário criado:
```sql
mysql -u classconnect_user -p
```

4. Se necessário, recrie o usuário com o comando:
```sql
DROP USER 'classconnect_user'@'localhost';
CREATE USER 'classconnect_user'@'localhost' IDENTIFIED BY 'classconnect123';
GRANT ALL PRIVILEGES ON classconnect.* TO 'classconnect_user'@'localhost';
FLUSH PRIVILEGES;
