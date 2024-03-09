package com.app.ecommerce.services.implement;

import java.io.File;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import javax.ws.rs.NotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import com.app.ecommerce.DTO.product.CreateProductRequest;
import com.app.ecommerce.DTO.product.ProductCardOfBrandResponse;
import com.app.ecommerce.DTO.product.ProductCardResponse;
import com.app.ecommerce.DTO.product.TopSellingProduct;
import com.app.ecommerce.DTO.product.UpdateProductLineRequest;
import com.app.ecommerce.exceptions.ResourceNotFoundException;
import com.app.ecommerce.models.Brand;
import com.app.ecommerce.models.Product;
import com.app.ecommerce.respositories.BrandRepository;
import com.app.ecommerce.respositories.CategoryRepository;
import com.app.ecommerce.respositories.ProductRepository;
import com.app.ecommerce.respositories.ProductWarrantyRepository;
import com.app.ecommerce.respositories.WarrantyPeriodRepository;
import com.app.ecommerce.services.IProductServices;
import com.app.ecommerce.utils.Utils;

import jakarta.persistence.EntityExistsException;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ProductServicesImp implements IProductServices {

  @Autowired
  private ProductRepository productRepository;

  @Autowired
  private BrandRepository brandRepository;

  @Autowired
  private CategoryRepository categoryRepository;

  @Autowired
  private WarrantyPeriodRepository warrantyPeriodRepository;

  @Autowired
  private ProductWarrantyServicesImp productWarrantyService;

  @Override
  public Product create(CreateProductRequest request, MultipartFile thumbnail, MultipartFile[] productImages)
      throws IOException {

    if (this.productRepository.findByProductLine(request.getProductLine()).isPresent()) {
      throw new EntityExistsException("Product with product line: " + request.getProductLine() + " already exists");
    }

    Product newProduct = Product.builder()
        .productLine(request.getProductLine())
        .productName(request.getProductName())
        .brand(this.brandRepository.findById(request.getBrandId()).get())
        .category(this.categoryRepository.findById(request.getCategoryId()).get())
        .warrantyPeriod(this.warrantyPeriodRepository.findById(request.getWarrantyPeriodId()).get())
        .price(request.getPrice())
        .discount(request.getDiscount())
        .build();

    Product createdProduct = this.productRepository.save(newProduct);

    String fileBasePath = "/app/src/main/resources/thumbnails/" + request.getProductLine() + "/";
    String fileName = StringUtils.cleanPath(thumbnail.getOriginalFilename());
    String fileExtension = StringUtils.getFilenameExtension(fileName);

    Utils.clearFolderContents(fileBasePath);
    Utils.copyFiles(thumbnail, fileBasePath + request.getProductLine() + "." + fileExtension);

    String imageBasePath = "/app/src/main/resources/images/" + request.getProductLine() + "/";
    Utils.clearFolderContents(imageBasePath);
    for (MultipartFile image : productImages) {
      String imageName = StringUtils.cleanPath(image.getOriginalFilename());
      String imageExtension = StringUtils.getFilenameExtension(imageName);
      Utils.copyFiles(image, imageBasePath + request.getProductLine() + "_" + UUID.randomUUID() + "." + imageExtension);
    }

    return createdProduct;
  }

  @Override
  public Product getProduct(String productLine) {
    Optional<Product> productOpt = this.productRepository.findByProductLine(productLine);
    if (!productOpt.isPresent()) {
      throw new ResourceNotFoundException(productLine + "not found");
    }
    Product fetchedProduct = productOpt.get();
    return fetchedProduct;
  }

  @Override
  public List<ProductCardResponse> getProducts() {
    List<Product> products = productRepository.findAll();
    List<ProductCardResponse> productsReponse = new ArrayList<ProductCardResponse>();
    for (Product product : products) {
      productsReponse.add(ProductCardResponse.builder().id(product.getId()).productLine(product.getProductLine())
          .productName(product.getProductName()).price(product.getPrice()).discount(product.getDiscount())
          .thumbnailUri(this.getProductThumbnail(product.getProductLine()))
          .stock(this.productWarrantyService.getProductStock(product.getId())).deletedAt(product.getDeletedAt())
          .brandName(product.getBrand().getBrandName())
          .categoryName(product.getCategory().getName())
          .createdAt(product.getCreatedAt())
          .build());
    }
    return productsReponse;
  }

  @Override
  public List<ProductCardOfBrandResponse> getProductsOfBrand() {
    List<Brand> brands = brandRepository.findAllBrandlActive();
    List<ProductCardOfBrandResponse> productCardOfBrandResponses = new ArrayList<ProductCardOfBrandResponse>();
    for (Brand brand : brands) {
      for (Product product : brand.getProducts()) {
        productCardOfBrandResponses
            .add(ProductCardOfBrandResponse.builder().thumbnailUri(this.getProductThumbnail(product.getProductLine()))
                .id(product.getId())
                .productLine(product.getProductLine())
                .productName(product.getProductName())
                .price(product.getPrice())
                .discount(product.getDiscount())
                .brandName(brand.getBrandName())
                .build());
      }
    }
    return productCardOfBrandResponses;

  }

  @Override
  public List<String> getProductImages(String productLine) {
    String folderBasePath = "/app/src/main/resources/images/" + productLine + "/";
    File folder = new File(folderBasePath);
    File[] listOfFiles = folder.listFiles();
    List<String> imageUris = new ArrayList<String>();

    for (File file : listOfFiles) {
      if (file.isFile()) {
        Path path = Paths.get("images/" + productLine + "/" + file.getName());
        imageUris.add(path.toString());
      }
    }
    return imageUris;
  }

  @Override
  public String getProductThumbnail(String productLine) {
    String folderBasePath = "/app/src/main/resources/thumbnails/" + productLine + "/";
    File folder = new File(folderBasePath);
    File[] listOfFiles = folder.listFiles();

    for (File file : listOfFiles) {
      if (file.isFile()) {
        if (file.getName().startsWith(productLine)) {
          Path path = Paths.get("thumbnails/" + productLine + "/" + file.getName());
          return path.toString();
        }
      }
    }
    throw new NotFoundException("File not found");
  }

  public void removeImage(String imagePath) {
    File fileToRemove = new File(imagePath);
    if (fileToRemove.delete()) {
      System.out.println("Deleted the file: " + fileToRemove.getName());
    } else {
      System.out.println("Failed to delete the file.");
    }
  }

  @Override
  public Product update(UpdateProductLineRequest request, MultipartFile thumbnail, MultipartFile[] productImages)
      throws IOException {
    Product product = this.getProduct(request.getProductLine());

    List<String> currentProductImages = this.getProductImages(product.getProductLine());
    if (currentProductImages.size() != request.getImageUris().size()) {
      String imageBasePath = "/app/src/main/resources/";
      for (String string : currentProductImages) {
        if (request.getImageUris().indexOf(string) == -1) {
          removeImage(imageBasePath + string);
        }
      }
    }

    if (thumbnail != null && !thumbnail.isEmpty()) {
      String fileBasePath = "/app/src/main/resources/thumbnails/" + request.getProductLine() + "/";
      String fileName = StringUtils.cleanPath(thumbnail.getOriginalFilename());
      String fileExtension = StringUtils.getFilenameExtension(fileName);
      Utils.clearFolderContents(fileBasePath);
      Utils.copyFiles(thumbnail, fileBasePath + request.getProductLine() + "." + fileExtension);
    }

    if (productImages != null && productImages.length > 0) {
      String imageBasePath = "/app/src/main/resources/images/" + request.getProductLine() + "/";
      for (MultipartFile image : productImages) {
        String imageName = StringUtils.cleanPath(image.getOriginalFilename());
        String imageExtension = StringUtils.getFilenameExtension(imageName);
        Utils.copyFiles(image,
            imageBasePath + request.getProductLine() + "_" + UUID.randomUUID() + "." + imageExtension);
      }
    }

    product.setBrand(this.brandRepository.findById(request.getBrandId()).get());
    product.setCategory(this.categoryRepository.findById(request.getCategoryId()).get());
    product.setWarrantyPeriod(this.warrantyPeriodRepository.findById(request.getWarrantyPeriodId()).get());
    product.setProductName(request.getProductName());
    product.setPrice(request.getPrice());
    product.setDiscount(request.getDiscount());

    return this.productRepository.save(product);
  }

  @Override
  public Product softDelete(String productLine) {
    Optional<Product> product = this.productRepository.findByProductLine(productLine);
    if (!product.isPresent())
      throw new ResourceNotFoundException(productLine + "not found");
    Product fetchedProduct = product.get();
    Timestamp timestamp = new Timestamp(new Date().getTime());
    fetchedProduct.setDeletedAt(timestamp);
    return this.productRepository.save(fetchedProduct);
  }

  @Override
  public Product undoSoftDelete(String productLine) {
    Optional<Product> product = this.productRepository.findByProductLine(productLine);
    if (!product.isPresent())
      throw new ResourceNotFoundException(productLine + "not found");
    Product fetchedProduct = product.get();
    fetchedProduct.setDeletedAt(null);
    return this.productRepository.save(fetchedProduct);
  }

  @Override
  public List<TopSellingProduct> getTopSellingProducts() {
    return this.productRepository.getTopSellingProduct();
  }

  @Override
  public List<ProductCardResponse> searchProducts(String searchString) {
    List<Product> products = this.productRepository.searchProducts(searchString);
    List<ProductCardResponse> productCards = new ArrayList<ProductCardResponse>();

    for (Product product : products) {
      productCards.add(ProductCardResponse.builder().id(product.getId()).productLine(product.getProductLine())
          .productName(product.getProductName()).price(product.getPrice()).discount(product.getDiscount())
          .thumbnailUri(this.getProductThumbnail(product.getProductLine()))
          .stock(this.productWarrantyService.getProductStock(product.getId())).deletedAt(product.getDeletedAt())
          .brandName(product.getBrand().getBrandName())
          .categoryName(product.getCategory().getName())
          .createdAt(product.getCreatedAt())
          .build());
    }
    return productCards;
  }

}
