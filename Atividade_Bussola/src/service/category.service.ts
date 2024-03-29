import { CategoryDto } from "../dto/category.dto";
import { CategoryRepository } from "../repository/category.repository";

export class CategoryService {
  private categoryRepository: CategoryRepository;

  constructor() {
    this.categoryRepository = new CategoryRepository();
  }

  async create(categoryDto: CategoryDto) {
    return this.categoryRepository.create(categoryDto);
  }

  async findAllCategoryByUserId(categoryId: string) {
    return this.categoryRepository.findAllCategoryByUserId(categoryId);
  }

  async findCategoryById(categoryId: string) {
    return this.categoryRepository.findCategoryById(categoryId);
  }

  async updateCategory(categoryId: string, categoryDto: CategoryDto) {
    return this.categoryRepository.updateCategory(categoryId, categoryDto);
  }

  async deleteCategory(categoryId: string) {
    return this.categoryRepository.deleteCategory(categoryId);
  }
}
