package app.minimercado.domain;

import java.io.Serializable;
import javax.persistence.*;
import javax.validation.constraints.*;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Conta.
 */
@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "conta")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Conta implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @NotNull
    @Column(name = "nome", nullable = false)
    private String nome;

    @NotNull
    @Column(name = "telefone", nullable = false)
    private String telefone;

    @NotNull
    @Column(name = "equipe", nullable = false)
    private String equipe;

    @Column(name = "status")
    @Enumerated(EnumType.STRING)
    private StatusConta status;

}
