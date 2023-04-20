package app.minimercado.repository;

import app.minimercado.domain.VendaProduto;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the VendaProduto entity.
 */
@SuppressWarnings("unused")
@Repository
public interface VendaProdutoRepository extends JpaRepository<VendaProduto, Long> {}
