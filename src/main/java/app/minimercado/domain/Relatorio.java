package app.minimercado.domain;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.math.BigInteger;

@Getter
@Setter
@NoArgsConstructor
public class Relatorio {

    private String produtoNome;
    private Long quantidadeVendida;
    private BigDecimal totalVendido;

    public Relatorio(String produtoNome, BigInteger quantidadeVendida, BigDecimal totalVendido) {
        this.produtoNome = produtoNome;
        this.quantidadeVendida = quantidadeVendida == null ? 0L : quantidadeVendida.longValue();
        this.totalVendido = totalVendido;
    }
}
