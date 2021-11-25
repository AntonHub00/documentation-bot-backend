import DocumentationRepository from "../Infrastructure/Database/DBEntities/DocumentationRepository";
import DocumentationUseCasesHandler from "../Domain/UseCases/DocumentationUseCasesHandler";

const documentationRepository = new DocumentationRepository();

const documentationUseCasesHandler = new DocumentationUseCasesHandler(
  documentationRepository
);

export { documentationUseCasesHandler };
