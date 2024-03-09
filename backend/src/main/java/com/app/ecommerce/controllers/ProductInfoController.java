package com.app.ecommerce.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.app.ecommerce.DTO.productInfo.AddProductInfoRequest;
import com.app.ecommerce.DTO.productInfo.DeleteInfoRequest;
import com.app.ecommerce.DTO.productInfo.ProductInfoDTO;
import com.app.ecommerce.DTO.productInfo.UpdateProductInfoRequest;
import com.app.ecommerce.models.Product;
import com.app.ecommerce.models.ProductInfo;
import com.app.ecommerce.services.IProductInfoServices;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/product-info")
@RequiredArgsConstructor
@CrossOrigin
public class ProductInfoController {
  @Autowired
  private IProductInfoServices productInfoServices;

  @PostMapping(value = "/add-info")
  public ResponseEntity<Product> addProductInfos(@RequestBody AddProductInfoRequest request) {
    return ResponseEntity.ok(this.productInfoServices.addProductInfos(request.getProductLine(), request.getInfos()));
  }

  @GetMapping(value = "/get-all")
  public ResponseEntity<List<ProductInfo>> getProductInfos(@RequestParam("productId") int productId) {
    return ResponseEntity.ok(this.productInfoServices.getProductInfosAllAttributes(productId));
  }

  @PatchMapping(value = "/update")
  public ResponseEntity<List<ProductInfoDTO>> updateProductInfos(@RequestBody UpdateProductInfoRequest request) {
    return ResponseEntity
        .ok(this.productInfoServices.updateProductInfo(request.getProductInfos(), request.getProductLine()));
  }

  @DeleteMapping(value = "/delete")
  public void deleteInfos(@RequestBody DeleteInfoRequest request) {
    this.productInfoServices.deleteProductInfos(request.getInfoIds());
  }
}
