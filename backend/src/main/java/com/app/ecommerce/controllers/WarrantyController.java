package com.app.ecommerce.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
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
import org.springframework.web.bind.annotation.RestController;

import com.app.ecommerce.DTO.warrantyPeriod.CreateWarrantyRequest;
import com.app.ecommerce.DTO.warrantyPeriod.UpdateWarrantyRequest;
import com.app.ecommerce.models.WarrantyPeriod;
import com.app.ecommerce.services.IWarrantyPeriodServices;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/warranty-period")
@RequiredArgsConstructor
@CrossOrigin
public class WarrantyController {

  @Autowired
  private final IWarrantyPeriodServices warrantyPeriodServices;

  @GetMapping(value = "/{id}")
  public ResponseEntity<WarrantyPeriod> getWarrantyPeriod(@PathVariable String id) {
    return ResponseEntity.ok(warrantyPeriodServices.getWarrantyPeriodById(Integer.parseInt(id)));
  }

  @GetMapping(value = "")
  public ResponseEntity<List<WarrantyPeriod>> getAllWarrantyPeriod() {
    return ResponseEntity.ok(warrantyPeriodServices.getWarrantyPeriod());
  }

  @PostMapping(value = "/create")
  public ResponseEntity<WarrantyPeriod> createWarrantyPeriod(
      @Valid @RequestBody CreateWarrantyRequest createProductRequest) {
    return ResponseEntity.ok(warrantyPeriodServices.create(Integer.parseInt(createProductRequest.getMonths())));
  }

  @PatchMapping(value = "/{id}/update")
  public ResponseEntity<WarrantyPeriod> updateWarrantyPeriod(@PathVariable String id,
      @RequestBody UpdateWarrantyRequest warrantyRequest) {
    return ResponseEntity.ok(warrantyPeriodServices.updateWarrantyPeriod(Integer.parseInt(id), warrantyRequest));
  }

  @PatchMapping(value = "/{id}/active")
  public ResponseEntity<WarrantyPeriod> activeBrand(@PathVariable int id) {
    return ResponseEntity.ok(warrantyPeriodServices.activeWarrantyPeriod(id));
  }

  @DeleteMapping(value = "/delete")
  public void deleteWarrantyPeriod(@RequestParam String id) {
    warrantyPeriodServices.softDeleteWarrantyPeriod(Integer.parseInt(id));
  }
}
