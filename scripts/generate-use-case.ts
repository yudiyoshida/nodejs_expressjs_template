import * as fs from 'fs/promises';
import * as path from 'path';
import { convertToPascalCase } from './utils/convert-pascalcase';

// Execução.
const args = process.argv.slice(2, 4);
if (args.length !== 2) {
  console.error('Erro. Uso correto: npx tsx scripts/generate-module.ts <nome-do-modulo> <use-case>');
  process.exit(1);
}

main(args[0], args[1]);
// --

async function main(moduleName: string, useCaseName: string) {
  const modulePath = path.join(__dirname, '..', 'src', 'modules', moduleName);
  const useCasesPath = path.join(modulePath, 'use-cases', useCaseName);
  const useCasesDtoPath = path.join(modulePath, 'use-cases', useCaseName, 'dtos');

  // Tenta acessar a pasta do módulo para ver se existe.
  try {
    await fs.access(modulePath);
  }
  catch (err) {
    return console.error(`Erro! O módulo "${moduleName}" não existe. Crie-o primeiro e depois tente novamente.`);
  }

  // Tenta acessar a pasta do use-case para ver se existe.
  try {
    await fs.access(useCasesPath);
    return console.error(`Erro! O use case "${useCaseName}" já existe.`);
  }
  catch (err) {
    // O use-case não existe, então segue o fluxo.
  }

  // Cria a pasta do use-case.
  await fs.mkdir(useCasesPath);

  // Cria a pasta dtos em use-case.
  await fs.mkdir(useCasesDtoPath);

  // Cria o arquivo dto e teste.
  await fs.writeFile(
    path.join(useCasesDtoPath, `${useCaseName}.dto.ts`),
    generateDtoContent(useCaseName),
  );
  await fs.writeFile(
    path.join(useCasesDtoPath, `${useCaseName}.dto.spec.ts`),
    generateDtoSpecContent(useCaseName),
  );

  // Cria o arquivo controller.
  await fs.writeFile(
    path.join(useCasesPath, `${useCaseName}.controller.ts`),
    generateControllerContent(useCaseName),
  );

  // Cria o arquivo service e teste.
  await fs.writeFile(
    path.join(useCasesPath, `${useCaseName}.service.ts`),
    generateServiceContent(moduleName, useCaseName),
  );
  await fs.writeFile(
    path.join(useCasesPath, `${useCaseName}.service.spec.ts`),
    generateServiceSpecContent(useCaseName),
  );

  console.log(`Use case "${useCaseName}" criado com sucesso.`);
}

function generateDtoContent(useCase: string) {
  return `export class ${convertToPascalCase(useCase)}Dto {}`;
}

function generateDtoSpecContent(useCase: string) {
  return `describe('${convertToPascalCase(useCase)}Dto', () => {});`;
}

function generateServiceSpecContent(useCase: string) {
  return `describe('${convertToPascalCase(useCase)}Service', () => {});`;
}

function generateControllerContent(useCase: string) {
  const pascalUseCase = convertToPascalCase(useCase);

  return `import { Request, Response } from 'express';
import { container } from 'shared/ioc/inversify.config';
import { ${pascalUseCase}Service } from './${useCase}.service';

export class ${pascalUseCase}Controller {
  // local para decorators de autenticação.
  // local para decorators de validação.
  public async handle(req: Request, res: Response) {
    const service = container.resolve(${pascalUseCase}Service);

    const result = await service.execute();
    res.status(20X).json(result);
  }
}`;
}

function generateServiceContent(module: string, useCase: string) {
  const pascalUseCase = convertToPascalCase(useCase);
  const pascalModule = convertToPascalCase(module);

  return `import { inject, injectable } from 'inversify';
import { TOKENS } from 'shared/ioc/token';
import { I${pascalModule}Repository } from '../../repositories/${module}-repository.interface';
import { ${pascalUseCase}Dto } from './dtos/${useCase}.dto';

@injectable()
export class ${pascalUseCase}Service {
  constructor(
    @inject(TOKENS.I${pascalModule}Repository) private repository: I${pascalModule}Repository,
  ) {}

  public async execute(data: ${pascalUseCase}Dto) {}
}`;
}
