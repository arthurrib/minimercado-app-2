package app.minimercado.repository;

import app.minimercado.domain.Conta;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * Spring Data JPA repository for the Conta entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ContaRepository extends JpaRepository<Conta, Long> {
    Optional<Conta> findByTelefone(String telefone);

    boolean existsByTelefone(String telefone);
}
