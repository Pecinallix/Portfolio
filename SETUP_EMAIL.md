# Configuração do Formulário de Contato

O formulário de contato está configurado para enviar emails usando **Web3Forms**, um serviço gratuito e simples.

## Passos para ativar o envio de emails:

### 1. Criar uma conta no Web3Forms (GRÁTIS)
Acesse: https://web3forms.com/

### 2. Obter sua Access Key
- Faça login no Web3Forms
- Vá para o Dashboard
- Crie um novo formulário
- Copie a **Access Key** fornecida

### 3. Substituir a Access Key no código
Abra o arquivo `app/components/Contact.tsx` e substitua a chave na linha 28:

```typescript
access_key: 'SUA_CHAVE_AQUI', // Substitua pela sua chave do Web3Forms
```

### 4. Configurar o email de destino
O email já está configurado para `icaropecinalli@gmail.com`.

Você pode alterar na linha 33 do arquivo `Contact.tsx` se necessário:

```typescript
to: 'icaropecinalli@gmail.com',
```

## Recursos do formulário:

✅ Validação de campos obrigatórios
✅ Feedback visual (loading, sucesso, erro)
✅ Animações suaves
✅ Proteção contra spam do Web3Forms
✅ Emails formatados automaticamente
✅ Completamente gratuito (até 250 emails/mês)

## Teste local:

Após configurar a Access Key, teste o formulário:
1. Preencha todos os campos
2. Clique em "Enviar Mensagem"
3. Aguarde a confirmação
4. Verifique seu email (icaropecinalli@gmail.com)

## Alternativa: EmailJS

Se preferir usar EmailJS em vez de Web3Forms, posso ajudar a configurar!
