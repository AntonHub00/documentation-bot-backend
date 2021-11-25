import { getRepository, Repository } from "typeorm";
import IDocumentationDTO from "../../../Domain/UseCases/Contracts/IDocumentationDTO";
import IDocumentationRepository from "../../../Domain/UseCases/Contracts/IDocumentationRepository";
import DocumentationDBEntity from "./DocumentationDBEntity";

export default class DocumentationRepository
  implements IDocumentationRepository
{
  private respository: Repository<DocumentationDBEntity>;

  constructor() {
    this.respository = getRepository(DocumentationDBEntity);
  }

  public async create(documentation: IDocumentationDTO): Promise<void> {
    const newDocumentation = this.respository.create(documentation);
    await this.respository.save(newDocumentation);
  }

  public async findById(id: number): Promise<IDocumentationDTO | undefined> {
    return await this.respository.findOne(id);
  }

  public async findAll(): Promise<IDocumentationDTO[] | undefined> {
    return await this.respository.find();
  }

  public async update(documentation: IDocumentationDTO): Promise<void> {
    await this.respository.update(documentation.id!, documentation);
  }

  public async delete(id: number): Promise<void> {
    await this.respository.delete(id);
  }
}
