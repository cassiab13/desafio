import {
  CannotBeCreated,
  CategoryNotFoundError,
  InternalError,
  NotFound,
} from "./../errors/customErrors";
import { CategoryDto } from "./../dto/category.dto";
import { Request, Response } from "express";
import { CategoryService } from "../service/category.service";
import mongoose from "mongoose";
import { HttpStatus } from "../enums/http.status";
import { NOTFOUND } from "dns";

class CategoryController {
  async create(req: Request, res: Response) {
    try {
      const categoryDto: CategoryDto = req.body;
      const user = new mongoose.Types.ObjectId(categoryDto.userId).toString();
      const newCategory = await new CategoryService().create({
        ...categoryDto,
        userId: user,
      });
      return res.status(HttpStatus.CREATED).json(newCategory);
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(CannotBeCreated);
    }
  }

  async findAllCategoryByUserId(req: Request, res: Response) {
    try {
      const userId = req.params.userId;
      const categories = await new CategoryService().findAllCategoryByUserId(
        userId
      );
      res.status(HttpStatus.OK).json(categories);
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).json(NotFound);
    }
  }

  async findCategoryById(req: Request, res: Response) {
    try {
      const categoryId = req.params.categoryId;
      const category = await new CategoryService().findCategoryById(categoryId);
      return res.status(HttpStatus.OK).json(category);
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).json(NotFound);
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
      return res.status(HttpStatus.OK).json(updatedCategory);
    } catch (error) {
      res.status(HttpStatus.NOT_FOUND).json({ NotFound });
    }
  }

  async deleteCategory(req: Request, res: Response) {
    try {
      const categoryId = req.params.categoryId;
      const deletedCategory = await new CategoryService().deleteCategory(
        categoryId
      );
      return res.status(HttpStatus.NO_CONTENT).json(deletedCategory);
    } catch (error) {
      res.status(HttpStatus.NOT_FOUND).json({
        NotFound,
      });
    }
  }
}

export default new CategoryController();
