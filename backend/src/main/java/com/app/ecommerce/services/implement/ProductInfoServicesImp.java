package com.app.ecommerce.services.implement;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.ecommerce.DTO.productInfo.ProductInfoDTO;
import com.app.ecommerce.exceptions.ResourceNotFoundException;
import com.app.ecommerce.models.Product;
import com.app.ecommerce.models.ProductInfo;
import com.app.ecommerce.respositories.ProductInfoRepository;
import com.app.ecommerce.respositories.ProductRepository;
import com.app.ecommerce.services.IProductInfoServices;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ProductInfoServicesImp implements IProductInfoServices {
  @Autowired
  private ProductRepository productRepository;

  @Autowired
  private ProductInfoRepository productInfoRepository;

  // BUG: Meaningless return, change required
  @Override
  public Product addProductInfos(String productLine, List<String> productInfos) {
    Optional<Product> product = this.productRepository.findByProductLine(productLine);
    if (!product.isPresent())
      throw new ResourceNotFoundException(productLine + "not found");
    Product fetchedProduct = product.get();
    for (String info : productInfos) {
      ProductInfo newInfo = ProductInfo.builder().product(fetchedProduct).productInformation(info).build();
      this.productInfoRepository.save(newInfo);
    }
    return fetchedProduct;
  }

  @Override
  public List<ProductInfoDTO> getProductInfos(Integer productId) {
    List<ProductInfo> productInfos = this.productInfoRepository.getProductInformation(productId);
    List<ProductInfoDTO> response = new ArrayList<ProductInfoDTO>();
    for (ProductInfo productInfo : productInfos) {
      response.add(ProductInfoDTO.builder().id(productInfo.getId())
          .productInformation(productInfo.getProductInformation()).build());
    }
    return response;
  }

  @Override
  public List<ProductInfo> getProductInfosAllAttributes(Integer productId) {
    return this.productInfoRepository.getProductInformationAllAttributes(productId);
  }

  @Override
  public List<ProductInfo> deleteProductInfos(List<Integer> infoIds) {
    this.productInfoRepository.deleteAllById(infoIds);
    return null;
  }

  @Override
  public List<ProductInfoDTO> updateProductInfo(List<ProductInfoDTO> productInfos, String productLine) {
    Optional<Product> productOpt = this.productRepository.findByProductLine(productLine);
    if (!productOpt.isPresent()) {
      throw new ResourceNotFoundException(productLine + "not found");
    }
    Product product = productOpt.get();
    this.productInfoRepository.deleteAllByProductId(product.getId());
    for (ProductInfoDTO productInfo : productInfos) {
      this.productInfoRepository.save(
          ProductInfo.builder().productInformation(productInfo.getProductInformation())
          .product(product).build());
    }
    return getProductInfos(product.getId());
  }

  public ProductInfo updateSingleInfo(int id, String information, Product product) {
    Optional<ProductInfo> productInfo = this.productInfoRepository.findById(id);
    if (!productInfo.isPresent() && !information.isEmpty())
      return this.productInfoRepository.save(ProductInfo.builder().productInformation(information)
          .product(product).build());
    ProductInfo fetchedProductInfo = productInfo.get();
    fetchedProductInfo.setProductInformation(information);
    return this.productInfoRepository.save(fetchedProductInfo);
  }
}
