import IDocumentationDTO from "./IDocumentationDTO";

export default interface IDocumentationRepository {
  create: (documentation: IDocumentationDTO) => Promise<void>;
  findById: (id: number) => Promise<IDocumentationDTO | undefined>;
  findAll: () => Promise<IDocumentationDTO[] | undefined>;
  findByText: (text: string) => Promise<IDocumentationDTO[] | undefined>;
  update: (documentation: IDocumentationDTO) => Promise<void>;
  delete: (id: number) => Promise<void>;
}
