const Errors = {
  ACCOUNT_ALREADY_EXISTS: 'Já existe uma conta com os dados informados.',
  EMAIL_NOT_VALIDATED: 'Para continuar, é necessário validar o email.',
  CODE_EXPIRED: 'Código expirado. Solicite um novo código.',
  INCORRECT_CODE_PASS: 'Erro. Código incorreto.',
  INTERNAL_SERVER_ERROR: 'Erro interno no servidor.',
  INVALID_CREDENTIALS: 'Credenciais incorretas.',
  INVALID_PASSWORD: 'Senha informada incorreta.',
  PASSWORDS_MUST_MATCH: 'Senhas informadas estão diferentes.',

  ACCOUNT_NOT_FOUND: 'Conta não encontrada na base de dados.',
  FAQ_NOT_FOUND: 'FAQ não encontrada na base de dados.',
  TEXT_NOT_FOUND: 'Texto não encontrado na base de dados.',

  FORBIDDEN: 'Sem permissão para acessar esse recurso.',
  INACTIVE: 'Sua conta foi suspensa.',
  PENDING: 'Sua conta ainda não foi aprovada. Aguarde.',
  REPROVED: 'Sua conta não foi aceita, pois não condiz com nossos termos de uso.',
  UNATHORIZED: 'Você precisa estar autenticado para prosseguir.',
};

export { Errors };
