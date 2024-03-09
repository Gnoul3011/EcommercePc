package com.app.ecommerce.controllers;

import java.sql.SQLException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.app.ecommerce.DTO.productWarranty.AddProductWarrantyRequest;
import com.app.ecommerce.models.ProductWarranty;
import com.app.ecommerce.services.IProductWarrantyServices;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/product-warranty")
@RequiredArgsConstructor
@CrossOrigin
public class ProductWarrantyController {

  @Autowired
  private IProductWarrantyServices productWarrantyServices;

  // NOTE: Product should be update by productLine or ProductId => ProductId to
  // synchronize with other methods
  @PostMapping(value = "/create")
  public ResponseEntity<List<ProductWarranty>> addProductWarranties(@RequestBody AddProductWarrantyRequest request) {
    return ResponseEntity.ok(
        this.productWarrantyServices.addProductWarranties(request.getProductLine(), request.getProductWarranties()));
  }

  @GetMapping(value = "/get-all")
  public ResponseEntity<List<ProductWarranty>> getProductWarranties(@RequestParam("productId") int productId) {
    return ResponseEntity.ok(this.productWarrantyServices.getAllProductWarrantiesByProductId(productId));
  }

  @GetMapping(value = "/all")
  public ResponseEntity<List<ProductWarranty>> getAllProductWarranties(@RequestParam("productId") int productId) {
    return ResponseEntity.ok(this.productWarrantyServices.getWarrantyPeriodsByProductId(productId));
  }

  @PostMapping(value = "/active-warranty")
  public ResponseEntity<ProductWarranty> activeProductWarranty(@RequestParam("productLine") String productLine)
      throws NumberFormatException, SQLException {
    return ResponseEntity.ok(this.productWarrantyServices.activeWarranty(productLine));
  }

  @GetMapping(value = "/count")
  public ResponseEntity<Integer> countProductWarranty(@RequestParam("productId") int productId) {
    return ResponseEntity.ok(this.productWarrantyServices.getProductStock(productId));
    // return null;
  }
}
