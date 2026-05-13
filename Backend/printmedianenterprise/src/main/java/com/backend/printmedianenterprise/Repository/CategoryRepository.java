package com.backend.printmedianenterprise.Repository;

import com.backend.printmedianenterprise.Entity.ProductCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface CategoryRepository extends JpaRepository<ProductCategory, Long>{

}

