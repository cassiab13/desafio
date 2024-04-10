import { InternalError } from "./../errors/customErrors";
import { CategoryDto } from "./../dto/category.dto";
import { Request, Response } from "express";
import { CategoryService } from "../service/category.service";

class CategoryController {
  async create(req: Request, res: Response) {
    try {
      const categoryDto: CategoryDto = req.body;
      const newCategory = await new CategoryService().create(categoryDto);
      return res.json(newCategory);
    } catch (error) {
      console.log("Não foi possível criar a categoria");
    }
  }

  async findAllCategoryByUserId(req: Request, res: Response) {
    try {
      const userId = req.params.userId;
      const categories = await new CategoryService().findAllCategoryByUserId(
        userId
      );
      res.status(200).json(categories);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async findCategoryById(req: Request, res: Response) {
    try {
      const categoryId = req.params.categoryId;
      const category = await new CategoryService().findCategoryById(categoryId);
      return res.json(category);
    } catch (error) {
      res.status(500).json({ InternalError });
    }
  }
  async updateCategory(req: Request, res: Response) {
    try {
      const categoryId = req.params.categoryId;
      const updatedFields = req.body;
      const updatedCategory = await new CategoryService().updateCategory(
        categoryId,
        updatedFields
      );
      return res.json(updatedCategory);
    } catch (error) {
      res.status(500).json({ InternalError });
    }
  }

  async deleteCategory(req: Request, res: Response) {
    try {
      const categoryId = req.params.categoryId;
      const deletedCategory = await new CategoryService().deleteCategory(
        categoryId
      );
      return res.json(deletedCategory);
    } catch (error) {
      res.status(500).json({ InternalError });
    }
  }
}

export default new CategoryController();
