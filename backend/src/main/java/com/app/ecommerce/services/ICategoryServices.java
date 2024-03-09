package com.app.ecommerce.services;

import java.util.List;

import com.app.ecommerce.DTO.brand.BrandProductResponse;
import com.app.ecommerce.DTO.category.CategoryBrandProductResponse;
import com.app.ecommerce.DTO.category.CategoryProductResponse;
import com.app.ecommerce.DTO.category.CreateCategoryDTO;
import com.app.ecommerce.DTO.category.UpdateCategoryDTO;
import com.app.ecommerce.models.Category;

public interface ICategoryServices {
    public List<Category> getCategories(boolean active);

    public Category getCategorybyName(String name);

    public List<CategoryProductResponse> getProductOfCategory();

    public List<CategoryBrandProductResponse> getBrandofCategory();

    public CategoryProductResponse getCategoryProductResponsebyName(String name);

    public BrandProductResponse getCategoryProductResponse(String name, String brandName);

    public Category saveCategory(CreateCategoryDTO request);

    public Category updateCategory(String id, UpdateCategoryDTO request);

    public Category activeCategory(String id);

    public void softDeleteCategory(int id);
}
