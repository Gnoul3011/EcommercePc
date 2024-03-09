package com.app.ecommerce.respositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.app.ecommerce.models.Category;

public interface CategoryRepository extends JpaRepository<Category, Integer> {
    @Query(value = "select * from category where name = ?1", nativeQuery = true)
    Optional<Category> findCategoryByName(String name);

    @Query(value = "select * from category where deleted_at is null", nativeQuery = true)
    List<Category> findAllCategoryActive();

    @Query(value = "select * from category where deleted_at is not null", nativeQuery = true)
    List<Category> findAllCategoryNotActive();
}
