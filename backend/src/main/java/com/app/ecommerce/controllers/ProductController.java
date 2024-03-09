package com.app.ecommerce.controllers;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

import javax.ws.rs.QueryParam;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.app.ecommerce.DTO.product.CreateProductRequest;
import com.app.ecommerce.DTO.product.GetProductReponse;
import com.app.ecommerce.DTO.product.ProductCardOfBrandResponse;
import com.app.ecommerce.DTO.product.ProductCardResponse;
import com.app.ecommerce.DTO.product.SearchProduct;
import com.app.ecommerce.DTO.product.TopSellingProduct;
import com.app.ecommerce.DTO.product.UpdateProductLineRequest;
import com.app.ecommerce.DTO.productInfo.ProductInfoDTO;
import com.app.ecommerce.models.Product;
import com.app.ecommerce.models.ProductWarranty;
import com.app.ecommerce.services.IProductInfoServices;
import com.app.ecommerce.services.IProductServices;
import com.app.ecommerce.services.IProductWarrantyServices;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/product")
@RequiredArgsConstructor
@CrossOrigin
public class ProductController {

  @Autowired
  private IProductServices productServices;

  @Autowired
  private IProductInfoServices productInfoServices;

  @Autowired
  private IProductWarrantyServices productWarrantyServices;

  @PostMapping(value = "/create", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
  public ResponseEntity<Product> createProductLine(
      @RequestPart(name = "thumbnail", required = true) MultipartFile thumbnail,
      @RequestPart(name = "images", required = true) MultipartFile[] images,
      @RequestPart("json") @Valid CreateProductRequest request) throws IOException {
    return ResponseEntity.ok(this.productServices.create(request, thumbnail, images));
  }

  @PatchMapping(value = "/update", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
  public ResponseEntity<Product> updateProductLine(
      @RequestPart(name = "thumbnail", required = false) MultipartFile thumbnail,
      @RequestPart(name = "images", required = false) MultipartFile[] images,
      @RequestPart("data") @Valid UpdateProductLineRequest request) throws IOException {
    return ResponseEntity.ok(this.productServices.update(request, thumbnail, images));
  }

  @GetMapping(value = "/all")
  public @ResponseBody ResponseEntity<Object> getAll() {
    List<ProductCardResponse> listProducts = this.productServices.getProducts();
    return new ResponseEntity<Object>(listProducts, HttpStatus.OK);
  }

  @GetMapping(value = "/allOfBrand")
  public @ResponseBody ResponseEntity<Object> getAllproductOfBrand() {
    List<ProductCardOfBrandResponse> listProducts = this.productServices.getProductsOfBrand();
    return new ResponseEntity<Object>(listProducts, HttpStatus.OK);
  }

  @GetMapping(value = "/{productLine}")
  public ResponseEntity<GetProductReponse> getProduct(@PathVariable("productLine") String productLine) {
    Product product = this.productServices.getProduct(productLine);
    List<String> productImages = this.productServices.getProductImages(productLine);
    String productThumbnail = this.productServices.getProductThumbnail(productLine);
    List<ProductInfoDTO> productInfos = this.productInfoServices.getProductInfos(product.getId());
    List<ProductWarranty> productWarranties = this.productWarrantyServices
        .getAllProductWarrantiesByProductId(product.getId());
    return ResponseEntity.ok(GetProductReponse.builder()
        .product(product)
        .brandId(product.getBrand().getId())
        .categoryId(product.getCategory().getId())
        .warrantyPeriodId(product.getWarrantyPeriod().getId())
        .thumbnailUri(productThumbnail)
        .imageUris(productImages)
        .productInfos(productInfos)
        .stock(productWarranties.size())
        .categoryName(product.getCategory().getName())
        .brandName(product.getBrand().getBrandName())
        .warrantyPeriod(product.getWarrantyPeriod().getMonths())
        .build());
  }

  @GetMapping(value = "/get-file", produces = { MediaType.IMAGE_JPEG_VALUE, MediaType.IMAGE_PNG_VALUE })
  public ResponseEntity<Resource> getFile(@QueryParam("filePath") String filePath) throws IOException {
    String fileBasePath = "/app/src/main/resources/";

    Path path = Paths.get(fileBasePath + filePath);
    Resource resource = null;

    try {
      resource = new UrlResource(path.toUri());
    } catch (MalformedURLException e) {
      e.printStackTrace();
    }

    return ResponseEntity.ok()
        .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
        .body(resource);
  }

  @DeleteMapping(value = "/delete")
  public ResponseEntity<Product> deleteProduct(@QueryParam("productLine") String productLine) {
    return ResponseEntity.ok(this.productServices.softDelete(productLine));
  }

  @PatchMapping(value = "/undo-delete")
  public ResponseEntity<Product> undoDeleteProduct(@QueryParam("productLine") String productLine) {
    return ResponseEntity.ok(this.productServices.undoSoftDelete(productLine));
  }

  @GetMapping(value = "/getTopSelling")
  public ResponseEntity<List<TopSellingProduct>> getTopSellingProduct() {
    return ResponseEntity.ok(this.productServices.getTopSellingProducts());
  }

  @PostMapping(value = "/search")
  public ResponseEntity<List<ProductCardResponse>> searchProduct(@RequestBody SearchProduct request) {
    return ResponseEntity.ok(this.productServices.searchProducts(request.getSearch()));
  }
}
