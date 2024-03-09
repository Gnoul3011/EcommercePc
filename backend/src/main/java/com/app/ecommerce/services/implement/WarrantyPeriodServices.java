package com.app.ecommerce.services.implement;

import java.sql.Timestamp;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.ecommerce.DTO.warrantyPeriod.UpdateWarrantyRequest;
import com.app.ecommerce.exceptions.ResourceNotFoundException;
import com.app.ecommerce.models.WarrantyPeriod;
import com.app.ecommerce.respositories.WarrantyPeriodRepository;
import com.app.ecommerce.services.IWarrantyPeriodServices;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class WarrantyPeriodServices implements IWarrantyPeriodServices {

  @Autowired
  private final WarrantyPeriodRepository warrantyPeriodRepository;

  @Override
  public WarrantyPeriod create(int months) {
    return this.warrantyPeriodRepository.save(WarrantyPeriod.builder().months(months).build());
  }

  @Override
  public WarrantyPeriod getWarrantyPeriodById(int id) {
    Optional<WarrantyPeriod> opt = this.warrantyPeriodRepository.findById(id);
    if (!opt.isPresent()) {
      throw new ResourceNotFoundException("Warranty Period not found");
    }
    return opt.get();
  }

  @Override
  public WarrantyPeriod updateWarrantyPeriod(int id, UpdateWarrantyRequest request) {
    Optional<WarrantyPeriod> warrantyFound = warrantyPeriodRepository.findById(id);
    if (warrantyFound.isPresent()) {
      var warrantyPeriod = warrantyFound.get();
      warrantyPeriod.setMonths(
          request.getMonths().isEmpty() ? warrantyPeriod.getMonths() : Integer.parseInt(request.getMonths()));
      return warrantyPeriodRepository.save(warrantyPeriod);
    } else {
      throw new ResourceNotFoundException("WarrantyPeriod with id: " + id + " Not Found");
    }
  }

  public WarrantyPeriod activeWarrantyPeriod(int id) {
    Optional<WarrantyPeriod> warrantyFound = warrantyPeriodRepository.findById(id);
    if (warrantyFound.isPresent()) {
      // Get value accoutFound
      var warrantyPeriod = warrantyFound.get();
      warrantyPeriod.setDeletedAt(null);
      return warrantyPeriodRepository.save(warrantyPeriod);
    } else {
      throw new ResourceNotFoundException("WarrantyPeriod  : " + id + " Not Found");
    }
  }

  @Override
  public void softDeleteWarrantyPeriod(int id) {
    Optional<WarrantyPeriod> warrantyFound = warrantyPeriodRepository.findById(id);
    if (warrantyFound.isPresent()) {
      // Create date
      Date date = new Date();
      Timestamp timestamp = new Timestamp(date.getTime());

      // Get value accoutFound
      var warrantyPeriod = warrantyFound.get();
      warrantyPeriod.setDeletedAt(timestamp);
      warrantyPeriodRepository.save(warrantyPeriod);
    } else {
      throw new ResourceNotFoundException("WarantyPeriod with Id  : " + id + " Not Found");
    }
  }

  @Override
  public List<WarrantyPeriod> getWarrantyPeriod() {
    return this.warrantyPeriodRepository.findAll();
  }

}
