package com.app.ecommerce.controllers;

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

import com.app.ecommerce.DTO.brand.BrandProductResponse;
import com.app.ecommerce.DTO.brand.CreateBrandDTO;
import com.app.ecommerce.DTO.brand.UpdateBrandDTO;
import com.app.ecommerce.models.Brand;
import com.app.ecommerce.models.Category;
import com.app.ecommerce.services.IBrandServices;
import com.app.ecommerce.services.ICategoryServices;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController // This means that this class is a Controller
@RequestMapping(value = "/brand") // This means URL's start with /demo (after Application path)
@RequiredArgsConstructor
@CrossOrigin
public class BrandController {

    @Autowired
    private IBrandServices brandServices;

    @Autowired
    private ICategoryServices categoryServices;

    // Get Brand based on active
    // if active == true => getBrand actived
    // if active == false => getAllBrand
    @GetMapping(value = "/all")
    public @ResponseBody ResponseEntity<Object> getBrands(@RequestParam Boolean active) {
        List<Brand> listBrands = brandServices.getBrands(active);
        return new ResponseEntity<Object>(listBrands, HttpStatus.OK);
    }

    @GetMapping(value = "/{categoryId}")
    public @ResponseBody ResponseEntity<Object> getAllCategory(@PathVariable String categoryId) {
        List<Brand> listBrands = brandServices.getCategoryBrands(Integer.parseInt(categoryId));
        return new ResponseEntity<Object>(listBrands, HttpStatus.OK);
    }

    @GetMapping(value = "/allOfBrand")
    public @ResponseBody ResponseEntity<Object> getAllproductOfBrand() {
        List<BrandProductResponse> listProducts = this.brandServices.getProductsOfBrand();
        return new ResponseEntity<Object>(listProducts, HttpStatus.OK);
    }

    @GetMapping(value = "/{categoryName}/{brandName}")
    public @ResponseBody ResponseEntity<Object> getAllBrand(@PathVariable String categoryName, @PathVariable String brandName) {
        Category category = this.categoryServices.getCategorybyName(categoryName);
        Brand listBrand = brandServices.getBrandbyName(brandName, category.getId());
        return new ResponseEntity<Object>(listBrand, HttpStatus.OK);
    }

    @GetMapping(value = "/getByIdOfBrand")
    public @ResponseBody ResponseEntity<Object> getAllProductOfBrand(@RequestParam int id) {
        BrandProductResponse listBrand = brandServices.getBrandProductResponseById(id);
        return new ResponseEntity<Object>(listBrand, HttpStatus.OK);
    }

    @PostMapping(value = "/create")
    public ResponseEntity<Brand> createBrand(
        @Valid
            @RequestBody CreateBrandDTO brand) {
        return ResponseEntity.ok(brandServices.saveBrand(brand));
    }

    @PatchMapping(value = "/{id}/update")
    public ResponseEntity<Brand> updateBrand(@PathVariable String id,
            @RequestBody UpdateBrandDTO brand) {
        return ResponseEntity.ok(brandServices.updateBrand(id, brand));
    }

    @PatchMapping(value = "/{id}/active")
    public ResponseEntity<Brand> activeBrand(@PathVariable String id) {
        return ResponseEntity.ok(brandServices.activeBrand(id));
    }

    @DeleteMapping(value = "/delete")
    public void deleteBrand(@RequestParam String id) {
        brandServices.softDeleteBrand(Integer.parseInt(id));
    }
}
