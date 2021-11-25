import IDocumentationDTO from "./Contracts/IDocumentationDTO";
import IDocumentationRepository from "./Contracts/IDocumentationRepository";

export default class DocumentationUseCasesHandler {
  private repository: IDocumentationRepository;

  constructor(respository: IDocumentationRepository) {
    this.repository = respository;
  }

  public async create(documentation: IDocumentationDTO): Promise<void> {
    await this.repository.create(documentation);
  }

  public async findById(id: number): Promise<IDocumentationDTO | undefined> {
    return await this.repository.findById(id);
  }

  public async findAll(): Promise<IDocumentationDTO[] | undefined> {
    return await this.repository.findAll();
  }

  public async update(documentation: IDocumentationDTO): Promise<void> {
    await this.repository.update(documentation);
  }

  public async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
