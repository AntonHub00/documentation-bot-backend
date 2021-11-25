import { Request, Response, Router } from "express";
import { documentationUseCasesHandler } from "../../DependencyInjection/DependencyInjection";

export default class DocumentationController {
  private _router: Router;

  constructor() {
    this._router = Router();

    this.create = this.create.bind(this);
    this.findAll = this.findAll.bind(this);
    this.findById = this.findById.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);

    this._router.post("/", this.create);
    this._router.get("/", this.findAll);
    this._router.get("/:id", this.findById);
    this._router.put("/:id", this.update);
    this._router.delete("/:id", this.delete);
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

  public async findAll(_req: Request, res: Response): Promise<void> {
    try {
      const documentations = await documentationUseCasesHandler.findAll();

      if (documentations?.length) res.status(200).send(documentations);
      else res.status(404).send();
    } catch (error) {
      const e = error as Error;
      res.status(400).send({ error: e.message });
    }
  }

  public async findById(req: Request, res: Response): Promise<void> {
    const id: number = Number(req.params.id);

    if (!id) {
      res.status(400).send({
        error: "You must provide a numeric id",
      });

      return;
    }

    try {
      const documentation = await documentationUseCasesHandler.findById(id);

      if (documentation) res.status(200).send(documentation);
      else res.status(404).send();
    } catch (error) {
      const e = error as Error;
      res.status(400).send({ error: e.message });
    }
  }

  public async update(req: Request, res: Response): Promise<void> {
    const id: number = Number(req.params.id);
    const name: string = req.body.name;
    const description: string = req.body.description;
    const link: string = req.body.link;

    if (!id) {
      res.status(400).send({
        error: "You must provide a numeric id",
      });

      return;
    }

    if (!(name && description && link)) {
      res.status(400).send({
        error: "You must provide name, description and link",
      });

      return;
    }

    try {
      const documentationExists = await documentationUseCasesHandler.findById(
        id
      );

      if (!documentationExists) {
        res.status(404).send();
        return;
      }

      await documentationUseCasesHandler.update({
        id,
        name,
        description,
        link,
      });

      res.status(200).send();
    } catch (error) {
      const e = error as Error;
      res.status(400).send({ error: e.message });
    }
  }

  public async delete(req: Request, res: Response): Promise<void> {
    const id: number = Number(req.params.id);

    if (!id) {
      res.status(400).send({
        error: "You must provide a numeric id",
      });

      return;
    }

    try {
      const documentationExists = await documentationUseCasesHandler.findById(
        id
      );

      if (!documentationExists) {
        res.status(404).send();
        return;
      }

      await documentationUseCasesHandler.delete(id);

      res.status(200).send();
    } catch (error) {
      const e = error as Error;
      res.status(400).send({ error: e.message });
    }
  }
}
