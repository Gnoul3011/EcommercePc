package com.app.ecommerce.services;

import java.util.List;

import com.app.ecommerce.DTO.warrantyPeriod.UpdateWarrantyRequest;
import com.app.ecommerce.models.WarrantyPeriod;

public interface IWarrantyPeriodServices {
  public WarrantyPeriod create(int months);

  public WarrantyPeriod getWarrantyPeriodById(int id);

  public WarrantyPeriod updateWarrantyPeriod(int id, UpdateWarrantyRequest request);

  public WarrantyPeriod activeWarrantyPeriod(int id);

  public void softDeleteWarrantyPeriod(int id);

  public List<WarrantyPeriod> getWarrantyPeriod();

}
