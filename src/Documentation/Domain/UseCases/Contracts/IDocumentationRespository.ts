import IDocumentationDTO from "./IDocumentationDTO";

export default interface IDocumentationRepository {
  create: (documentation: IDocumentationDTO) => Promise<void>;
  findById: (id: string) => Promise<IDocumentationDTO | undefined>;
  findAll: () => Promise<IDocumentationDTO[] | undefined>;
  update: (documentation: IDocumentationDTO) => Promise<void>;
  delete: (id: string) => Promise<void>;
}
