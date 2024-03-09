package com.app.ecommerce.respositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.app.ecommerce.models.Brand;

public interface BrandRepository extends JpaRepository<Brand, Integer> {
    @Query(value = "select * from brand where brand_name = ?1 and category_id = ?2", nativeQuery = true)
    Optional<Brand> findBrandByName(String name, Integer categoryId);

    @Query(value = "select * from brand where deleted_at is null", nativeQuery = true)
    List<Brand> findAllBrandlActive();

    @Query(value = "select * from brand where deleted_at is not null", nativeQuery = true)
    List<Brand> findAllBrandNotActive();

    @Query(value = "SELECT brand.* FROM public.brand " + //
                    "WHERE brand.category_id = ?1 " + //
                    "ORDER BY brand.id ASC", nativeQuery = true)
    List<Brand> getCategoryBrands(Integer categoryId);
}
