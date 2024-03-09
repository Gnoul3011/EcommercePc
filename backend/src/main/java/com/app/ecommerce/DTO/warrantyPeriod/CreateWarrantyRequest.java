package com.app.ecommerce.DTO.warrantyPeriod;

import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CreateWarrantyRequest {
  @NotEmpty
  private String months;
}
