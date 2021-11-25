import { Request, Response, Router } from "express";
import { documentationUseCasesHandler } from "../../DependencyInjection/DependencyInjection";

export default class DocumentationController {
  private _router: Router;

  constructor() {
    this._router = Router();

    this.create = this.create.bind(this);
    this.findById = this.findById.bind(this);

    this._router.post("/", this.create);
    this._router.get("/:id", this.findById);
  }

  public get router(): Router {
    return this._router;
  }

  public async create(req: Request, res: Response): Promise<void> {
    const name: string = req.body.name;
    const description: string = req.body.description;
    const link: string = req.body.link;

    if (!(name && description && link)) {
      res.status(400).send({ error: "You must provide user and passord" });
      return;
    }

    try {
      await documentationUseCasesHandler.create({ name, description, link });
      res.status(201).send();
    } catch (error) {
      const e = error as Error;
      res.status(400).send({ error: e.message });
    }
  }

  public async findById(req: Request, res: Response): Promise<void> {
    const id: string = req.params.id;

    try {
      const documentation = await documentationUseCasesHandler.findById(id);

      if (documentation) res.status(200).send(documentation);
      else res.status(404).send();

      return;
    } catch (error) {
      const e = error as Error;
      res.status(400).send({ error: e.message });
    }
  }
}
