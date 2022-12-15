export default [
  {
    'testName': 'sending name = null (400)',
    'request': {
      'body': {
        'name': null,
      },
    },
    'response': {
      'status': 400,
      'message': 'name deve ser uma string.',
    },
  },
  {
    'testName': 'sending name = "" (400)',
    'request': {
      'body': {
        'name': '',
      },
    },
    'response': {
      'status': 400,
      'message': 'name é um campo obrigatório.',
    },
  },
  {
    'testName': 'sending name = "   " (400)',
    'request': {
      'body': {
        'name': '   ',
      },
    },
    'response': {
      'status': 400,
      'message': 'name é um campo obrigatório.',
    },
  },
  {
    'testName': 'sending email = null (400)',
    'request': {
      'body': {
        'name': 'Nome teste',
        'email': null,
      },
    },
    'response': {
      'status': 400,
      'message': 'email deve ser uma string.',
    },
  },
  {
    'testName': 'sending email = "" (400)',
    'request': {
      'body': {
        'name': 'Nome teste',
        'email': '',
      },
    },
    'response': {
      'status': 400,
      'message': 'email é um campo obrigatório.',
    },
  },
  {
    'testName': 'sending email = "   " (400)',
    'request': {
      'body': {
        'name': 'Nome teste',
        'email': '   ',
      },
    },
    'response': {
      'status': 400,
      'message': 'email é um campo obrigatório.',
    },
  },
  {
    'testName': 'sending message = null (400)',
    'request': {
      'body': {
        'name': 'Nome teste',
        'email': 'email@teste.com',
        'message': null,
      },
    },
    'response': {
      'status': 400,
      'message': 'message deve ser uma string.',
    },
  },
  {
    'testName': 'sending message = "" (400)',
    'request': {
      'body': {
        'name': 'Nome teste',
        'email': 'email@teste.com',
        'message': '',
      },
    },
    'response': {
      'status': 400,
      'message': 'message é um campo obrigatório.',
    },
  },
  {
    'testName': 'sending message = "   " (400)',
    'request': {
      'body': {
        'name': 'Nome teste',
        'email': 'email@teste.com',
        'message': '   ',
      },
    },
    'response': {
      'status': 400,
      'message': 'message é um campo obrigatório.',
    },
  },
];
