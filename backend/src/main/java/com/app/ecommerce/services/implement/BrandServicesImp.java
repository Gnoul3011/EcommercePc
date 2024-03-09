package com.app.ecommerce.services.implement;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.ecommerce.DTO.brand.BrandProductResponse;
import com.app.ecommerce.DTO.brand.CreateBrandDTO;
import com.app.ecommerce.DTO.brand.UpdateBrandDTO;
import com.app.ecommerce.DTO.product.ProductCardOfBrandResponse;
import com.app.ecommerce.exceptions.ResourceNotFoundException;
import com.app.ecommerce.models.Brand;
import com.app.ecommerce.models.Category;
import com.app.ecommerce.models.Product;
import com.app.ecommerce.respositories.BrandRepository;
import com.app.ecommerce.respositories.CategoryRepository;
import com.app.ecommerce.services.IBrandServices;
import com.app.ecommerce.services.IProductServices;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BrandServicesImp implements IBrandServices {

    @Autowired
    private BrandRepository repo;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private IProductServices productServices;

    @Override
    public List<Brand> getBrands(boolean active) {
        if (active == true) {
            return repo.findAllBrandlActive();
        }
        return repo.findAll();
    }

    @Override
    public List<BrandProductResponse> getProductsOfBrand() {
        List<Brand> brands = repo.findAllBrandlActive();
        List<BrandProductResponse> productCardOfBrandResponses = new ArrayList<BrandProductResponse>();
        for (Brand brand : brands) {
            List<ProductCardOfBrandResponse> brandProducts = new ArrayList<ProductCardOfBrandResponse>();
            for (Product product : brand.getProducts()) {
                brandProducts
                        .add(ProductCardOfBrandResponse
                                .builder()
                                .thumbnailUri(productServices.getProductThumbnail(product.getProductLine()))
                                .id(product.getId())
                                .productLine(product.getProductLine())
                                .productName(product.getProductName())
                                .price(product.getPrice())
                                .discount(product.getDiscount())
                                .brandName(brand.getBrandName())
                                .build());
            }
            productCardOfBrandResponses.add(
                    BrandProductResponse.builder().products(brandProducts).brandName(brand.getBrandName())
                            .id(brand.getId()).build());
        }
        return productCardOfBrandResponses;
    }

    @Override
    public Brand getBrandbyName(String name, Integer categoryId) {
        Optional<Brand> opt = repo.findBrandByName(name, categoryId);
        if (opt.isPresent()) {
            return opt.get();
        } else {
            throw new ResourceNotFoundException("Cannot found brand with name: " + name + " Not Found");
        }
    }

    public BrandProductResponse getBrandProductResponseById(int id) {
        Optional<Brand> opt = repo.findById(id);
        BrandProductResponse bResponse = new BrandProductResponse();
        List<ProductCardOfBrandResponse> brandProducts = new ArrayList<ProductCardOfBrandResponse>();
        if (opt.isPresent()) {
            var brand = opt.get();
            for (Product product : brand.getProducts()) {
                brandProducts.add(ProductCardOfBrandResponse.builder()
                        .thumbnailUri(productServices.getProductThumbnail(product.getProductLine()))
                        .id(product.getId())
                        .productLine(product.getProductLine())
                        .productName(product.getProductName())
                        .price(product.getPrice())
                        .discount(product.getDiscount())
                        .brandName(brand.getBrandName())
                        .build());
            }
            bResponse.setBrandName(brand.getBrandName());
            bResponse.setId(id);
            bResponse.setProducts(brandProducts);
            return bResponse;
        } else {
            throw new ResourceNotFoundException("Cannot found brand with name: " + id + " Not Found");
        }
    }

    @Override
    public Brand saveBrand(CreateBrandDTO request) {
        Category category = categoryRepository.findById(request.getCategoryId()).get();
        var brand = Brand.builder().brandName(request.getBrandName()).category(category).build();
        return repo.save(brand);
    }

    @Override
    public Brand updateBrand(String id, UpdateBrandDTO request) {
        Optional<Brand> brandFound = repo.findById(Integer.parseInt(id));
        if (brandFound.isPresent()) {
            var brand = brandFound.get();
            brand.setBrandName(request.getBrandName().isEmpty() ? brand.getBrandName() : request.getBrandName());
            return repo.save(brand);
        } else {
            throw new ResourceNotFoundException("Brand with id: " + id + " Not Found");
        }
    }

    @Override
    public Brand activeBrand(String id) {
        Optional<Brand> brandFound = repo.findById(Integer.parseInt(id));
        if (brandFound.isPresent()) {
            // Get value accoutFound
            var brand = brandFound.get();
            brand.setDeletedAt(null);
            return repo.save(brand);
        } else {
            throw new ResourceNotFoundException("Brand with Id  : " + id + " Not Found");
        }
    }

    @Override
    public void softDeleteBrand(int id) {
        Optional<Brand> brandFound = repo.findById(id);
        if (brandFound.isPresent()) {
            // Create date
            Date date = new Date();
            Timestamp timestamp = new Timestamp(date.getTime());

            // Get value accoutFound
            var brand = brandFound.get();
            brand.setDeletedAt(timestamp);
            repo.save(brand);
        } else {
            throw new ResourceNotFoundException("Brand with Id  : " + id + " Not Found");
        }
    }

    @Override
    public List<Brand> getCategoryBrands(int categoryId) {
        return this.repo.getCategoryBrands(categoryId);    
    }

}
