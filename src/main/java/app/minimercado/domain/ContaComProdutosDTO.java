package app.minimercado.domain;

import java.io.Serializable;
import java.util.List;
import javax.persistence.*;
import javax.validation.constraints.*;

import lombok.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Conta.
 */
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ContaComProdutosDTO implements Serializable {

    private static final long serialVersionUID = 1L;

    private Conta conta;

    private List<VendaComProdutos> produtos;

}
