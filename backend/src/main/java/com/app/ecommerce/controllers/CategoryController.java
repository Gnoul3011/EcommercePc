package com.app.ecommerce.controllers;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.app.ecommerce.DTO.category.CategoryBrandDTO;
import com.app.ecommerce.DTO.brand.BrandProductResponse;
import com.app.ecommerce.DTO.category.CategoryBrandProductResponse;
import com.app.ecommerce.DTO.category.CategoryProductResponse;
import com.app.ecommerce.DTO.category.CategorySimpleResponse;
import com.app.ecommerce.DTO.category.CreateCategoryDTO;
import com.app.ecommerce.DTO.category.UpdateCategoryDTO;
import com.app.ecommerce.models.Brand;
import com.app.ecommerce.models.Category;
import com.app.ecommerce.services.ICategoryServices;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController // This means that this class is a Controller
@RequestMapping(value = "/category") // This means URL's start with /demo (after Application path)
@RequiredArgsConstructor
@CrossOrigin
public class CategoryController {

    @Autowired
    private ICategoryServices categoryServices;

    // Get Category based on active
    // if active == true => getCategory actived
    // if active == false => getAllCategory
    @GetMapping(value = "/all")
    public @ResponseBody ResponseEntity<Object> getAllCategory(@RequestParam boolean active) {
        List<Category> listCategories = categoryServices.getCategories(active);
        return new ResponseEntity<Object>(listCategories, HttpStatus.OK);
    }

    @GetMapping(value = "/all/simple")
    public @ResponseBody ResponseEntity<Object> getAllSimpleCategory(@RequestParam boolean active) {
        List<Category> listCategories = categoryServices.getCategories(active);
        List<CategorySimpleResponse> categoryResponse = new ArrayList<CategorySimpleResponse>();
        for (Category category : listCategories) {
            if (category.getDeletedAt() != null) {
                continue;
            }
            List<CategoryBrandDTO> brands = new ArrayList<CategoryBrandDTO>();
            for (Brand brand : category.getBrands()) {
                brands.add(CategoryBrandDTO.builder().brandName(brand.getBrandName()).id(brand.getId()).build());
            }
            categoryResponse
                    .add(CategorySimpleResponse.builder().id(category.getId()).name(category.getName())
                            .brands(brands).build());
        }
        return new ResponseEntity<Object>(categoryResponse, HttpStatus.OK);
    }

    @GetMapping(value = "/allOfCategory")
    public @ResponseBody ResponseEntity<Object> getAllproductOfBrand() {
        List<CategoryProductResponse> listProducts = this.categoryServices.getProductOfCategory();
        return new ResponseEntity<Object>(listProducts, HttpStatus.OK);
    }

    @GetMapping(value = "/allOfCategoryBrand")
    public @ResponseBody ResponseEntity<Object> getAllBrandOfCategory() {
        List<CategoryBrandProductResponse> list = this.categoryServices.getBrandofCategory();
        return new ResponseEntity<Object>(list, HttpStatus.OK);
    }

    @GetMapping(value = "/getByName")
    public @ResponseBody ResponseEntity<Object> getAllBrand(@RequestParam String name) {
        Category listCategories = categoryServices.getCategorybyName(name);
        return new ResponseEntity<Object>(listCategories, HttpStatus.OK);
    }

    @GetMapping(value = "/{name}")
    public @ResponseBody ResponseEntity<Object> getAllProductOfCategory(@PathVariable String name) {
        CategoryProductResponse listCategory = categoryServices.getCategoryProductResponsebyName(name);
        return new ResponseEntity<Object>(listCategory, HttpStatus.OK);
    }

    @GetMapping(value = "/{name}/{brandName}")
    public @ResponseBody ResponseEntity<Object> getAllProductOfCategory(@PathVariable("name") String name,
            @PathVariable("brandName") String brandName) {
        BrandProductResponse brand = categoryServices.getCategoryProductResponse(name, brandName);
        return new ResponseEntity<Object>(brand, HttpStatus.OK);
    }

    @PostMapping(value = "/create")
    public ResponseEntity<Category> createBrand(
           @Valid @RequestBody CreateCategoryDTO category) {
        return ResponseEntity.ok(categoryServices.saveCategory(category));
    }

    @PatchMapping(value = "/{id}/update")
    public ResponseEntity<Category> updateBrand(@PathVariable String id,
            @RequestBody UpdateCategoryDTO category) {
        return ResponseEntity.ok(categoryServices.updateCategory(id, category));
    }

    @PatchMapping(value = "/{id}/activeCategory")
    public ResponseEntity<Category> activeCategory(@PathVariable String id) {
        return ResponseEntity.ok(categoryServices.activeCategory(id));
    }

    @DeleteMapping(value = "/deleteCategory")
    public void deleteCategory(@RequestParam String id) {
        categoryServices.softDeleteCategory(Integer.parseInt(id));
    }
}
