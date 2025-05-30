package app.minimercado.repository;

import app.minimercado.domain.Conta;
import app.minimercado.domain.StatusConta;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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

    Page<Conta> findAllByEquipe(String equipe, Pageable pageable);

    Page<Conta> findAllByStatus(StatusConta statusConta, Pageable pageable);

    Page<Conta> findAllByEquipeAndStatus(String equipe, StatusConta statusConta, Pageable pageable);
}
