import { CategoryDto } from "../dto/category.dto";
import categorySchema from "../schema/category.schema";

export class CategoryRepository {

  async create(categoryDto: CategoryDto) {
    const category = new categorySchema({
      name: categoryDto.name,
      color: categoryDto.color,
      user: categoryDto.userId,
    });
    return category.save();
  }

  async findAllCategoryByUserId(
    userId: string
  ): Promise<CategoryDto[] | undefined> {
    try {
      const categories = await categorySchema.find({ user: userId });
      return categories.map((category) => ({
        name: category.name,
        color: category.color,
        userId: category.user?.toString(),
      }));
    } catch (error) {
      console.log(error);
    }
  }

  async findCategoryById(categoryId: string): Promise<CategoryDto | string> {
    const category = await categorySchema.findById(categoryId);
    if (!category) return "Categoria não encontrada";
    return {
      name: category.name,
      color: category.color,
      userId: category.user?.toString(),
    };
  }

  async updateCategory(categoryId: string, category: CategoryDto) {
    const updatedCategory = await categorySchema.findByIdAndUpdate(categoryId, {
      name: category.name,
      color: category.color,
    }, {new: true});
    return updatedCategory;
  }

  async deleteCategory(categoryId: string) {
    try {
      await categorySchema.findByIdAndDelete(categoryId);
      return "Categoria deletada com sucesso";
    } catch (error) {
      throw new Error(`Erro ao remover a categoria: ${error}`);
    }
  }
}
