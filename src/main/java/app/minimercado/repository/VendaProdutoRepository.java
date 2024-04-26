package app.minimercado.repository;

import app.minimercado.domain.VendaProduto;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data JPA repository for the VendaProduto entity.
 */
@SuppressWarnings("unused")
@Repository
public interface VendaProdutoRepository extends JpaRepository<VendaProduto, Long> {
    List<VendaProduto> findAllByVenda_Id(Long idVenda);

    @Query("SELECT n FROM VendaProduto n WHERE n.venda.conta.id = :contaId")
    List<VendaProduto> getAllVendasByConta(Long contaId);
}
