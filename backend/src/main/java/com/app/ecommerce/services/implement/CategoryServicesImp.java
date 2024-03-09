package com.app.ecommerce.services.implement;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.ecommerce.DTO.brand.BrandProductResponse;
import com.app.ecommerce.DTO.category.CategoryBrandProductResponse;
import com.app.ecommerce.DTO.category.CategoryProductResponse;
import com.app.ecommerce.DTO.category.CreateCategoryDTO;
import com.app.ecommerce.DTO.category.UpdateCategoryDTO;
import com.app.ecommerce.DTO.product.ProductCardOfBrandResponse;
import com.app.ecommerce.exceptions.ResourceNotFoundException;
import com.app.ecommerce.models.Brand;
import com.app.ecommerce.models.Category;
import com.app.ecommerce.models.Product;
import com.app.ecommerce.respositories.BrandRepository;
import com.app.ecommerce.respositories.CategoryRepository;
import com.app.ecommerce.respositories.ProductWarrantyRepository;
import com.app.ecommerce.services.ICategoryServices;
import com.app.ecommerce.services.IProductServices;
import com.app.ecommerce.services.IProductWarrantyServices;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CategoryServicesImp implements ICategoryServices {

    @Autowired
    private CategoryRepository repo;

    @Autowired
    private ProductWarrantyRepository productWarrantyRepository;

    @Autowired
    private BrandRepository brandRepo;

    @Autowired
    private IProductServices productServices;

     @Autowired
    private IProductWarrantyServices productWarrantyServices;

    @Override
    public List<Category> getCategories(boolean active) {
        if (active == true) {
            return repo.findAllCategoryActive();
        }
        return repo.findAll();
    }

    @Override
    public Category getCategorybyName(String name) {
        Optional<Category> opt = repo.findCategoryByName(name);
        if (opt.isPresent()) {
            return opt.get();
        } else {
            throw new ResourceNotFoundException("Category with name: " + name + " Not Found");
        }
    }

    @Override
    public List<CategoryBrandProductResponse> getBrandofCategory() {
        List<Category> categories = repo.findAllCategoryActive();
        List<CategoryBrandProductResponse> categoryBrands = new ArrayList<CategoryBrandProductResponse>();
        for (Category category : categories) {
            List<BrandProductResponse> categoryBrand = new ArrayList<BrandProductResponse>();
            for (Brand brand : category.getBrands()) {
                List<ProductCardOfBrandResponse> categoryProducts = new ArrayList<ProductCardOfBrandResponse>();
                for (Product product : brand.getProducts()) {
                    if (product.getCategory().getId() == category.getId()
                            && product.getBrand().getId() == brand.getId())
                        if (product.getDeletedAt() == null)
                            categoryProducts
                                    .add(ProductCardOfBrandResponse
                                            .builder()
                                            .thumbnailUri(productServices.getProductThumbnail(product.getProductLine()))
                                            .id(product.getId())
                                            .productLine(product.getProductLine())
                                            .productName(product.getProductName())
                                            .price(product.getPrice())
                                            .discount(product.getDiscount())
                                            .name(category.getName())
                                            .stock(this.productWarrantyRepository.findAllByProductId(product.getId())
                                                    .get()
                                                    .size())
                                            .build());
                }
                categoryBrand.add(BrandProductResponse
                        .builder()
                        .id(brand.getId())
                        .brandName(brand.getBrandName())
                        .products(categoryProducts).build());
            }
            categoryBrands.add(CategoryBrandProductResponse.builder().name(category.getName()).id(category.getId())
                    .brands(categoryBrand).build());
        }
        return categoryBrands;

    }

    @Override
    public List<CategoryProductResponse> getProductOfCategory() {
        List<Category> categories = repo.findAllCategoryActive();
        List<CategoryProductResponse> productCardOfCategoryResponses = new ArrayList<CategoryProductResponse>();
        for (Category category : categories) {
            List<ProductCardOfBrandResponse> categoryProducts = new ArrayList<ProductCardOfBrandResponse>();
            for (Product product : category.getProducts()) {
                categoryProducts
                        .add(ProductCardOfBrandResponse
                                .builder()
                                .thumbnailUri(productServices.getProductThumbnail(product.getProductLine()))
                                .id(product.getId())
                                .productLine(product.getProductLine())
                                .productName(product.getProductName())
                                .price(product.getPrice())
                                .discount(product.getDiscount())
                                .name(category.getName())
                                .build());
            }
            productCardOfCategoryResponses.add(
                    CategoryProductResponse.builder().products(categoryProducts).name(category.getName())
                            .id(category.getId()).build());
        }
        return productCardOfCategoryResponses;
    }

    @Override
    public CategoryProductResponse getCategoryProductResponsebyName(String name) {
        Optional<Category> opt = repo.findCategoryByName(name);
        CategoryProductResponse bResponse = new CategoryProductResponse();
        List<ProductCardOfBrandResponse> categoryProducts = new ArrayList<ProductCardOfBrandResponse>();
        if (opt.isPresent()) {
            var category = opt.get();
            for (Product product : category.getProducts()) {
                if (product.getDeletedAt() == null)
                    categoryProducts.add(ProductCardOfBrandResponse.builder()
                            .thumbnailUri(productServices.getProductThumbnail(product.getProductLine()))
                            .id(product.getId())
                            .productLine(product.getProductLine())
                            .productName(product.getProductName())
                            .price(product.getPrice())
                            .discount(product.getDiscount())
                            .name(category.getName())
                            .stock(this.productWarrantyServices.getProductStock(product.getId()))
                            .build());
            }
            bResponse.setName(category.getName());
            ;
            bResponse.setName(name);
            ;
            bResponse.setId(opt.get().getId());
            bResponse.setProducts(categoryProducts);
            return bResponse;
        } else {
            throw new ResourceNotFoundException("Cannot found category with name: " + name + " Not Found");
        }
    }

    @Override
    public BrandProductResponse getCategoryProductResponse(String name, String brandName) {
        Optional<Category> opt = repo.findCategoryByName(name);
        if (opt.isEmpty()) {
            throw new ResourceNotFoundException("Cannot found category with name: " + name + " Not Found");
        } else {
            Optional<Brand> test = brandRepo.findBrandByName(brandName, opt.get().getId());
            BrandProductResponse bResponse = new BrandProductResponse();
            List<ProductCardOfBrandResponse> brandProducts = new ArrayList<ProductCardOfBrandResponse>();
            if (test.isEmpty()) {
                throw new ResourceNotFoundException("Cannot found brand with name: " + brandName + " Not Found");
            } else {
                var brand = test.get();
                for (Product product : brand.getProducts()) {
                    if (product.getDeletedAt() == null)
                        brandProducts.add(ProductCardOfBrandResponse.builder()
                                .thumbnailUri(productServices.getProductThumbnail(product.getProductLine()))
                                .id(product.getId())
                                .productLine(product.getProductLine())
                                .productName(product.getProductName())
                                .price(product.getPrice())
                                .discount(product.getDiscount())
                                .brandName(brand.getBrandName())
                                .stock(this.productWarrantyServices.getProductStock(product.getId()))
                                .build());
                }
                bResponse.setBrandName(brand.getBrandName());
                bResponse.setId(brand.getId());
                bResponse.setProducts(brandProducts);
                return bResponse;
            }
        }
    }

    @Override
    public Category saveCategory(CreateCategoryDTO request) {
        var category = Category.builder().name(request.getCategoryName()).build();
        return repo.save(category);
    }

    @Override
    public Category updateCategory(String id, UpdateCategoryDTO request) {
        Optional<Category> categoryFound = repo.findById(Integer.parseInt(id));
        if (categoryFound.isPresent()) {
            var category = categoryFound.get();
            category.setName(request.getNameCategory().isEmpty() ? category.getName() : request.getNameCategory());
            return repo.save(category);
        } else {
            throw new ResourceNotFoundException("Cannot found brand with id: " + id + " Not Found");
        }
    }

    @Override
    public Category activeCategory(String id) {
        Optional<Category> categoryFound = repo.findById(Integer.parseInt(id));
        if (categoryFound.isPresent()) {
            // Get value accoutFound
            var category = categoryFound.get();
            category.setDeletedAt(null);
            return repo.save(category);
        } else {
            throw new ResourceNotFoundException("Category with Id  : " + id + " Not Found");
        }
    }

    @Override
    public void softDeleteCategory(int id) {
        Optional<Category> categoryFound = repo.findById(id);
        if (categoryFound.isPresent()) {
            // Create date
            Date date = new Date();
            Timestamp timestamp = new Timestamp(date.getTime());

            // Get value accoutFound
            var category = categoryFound.get();
            category.setDeletedAt(timestamp);
            repo.save(category);
        } else {
            throw new ResourceNotFoundException("Category with Id  : " + id + " Not Found");
        }
    }

}
