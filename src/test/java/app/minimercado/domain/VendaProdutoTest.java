package app.minimercado.domain;

import static org.assertj.core.api.Assertions.assertThat;

import app.minimercado.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class VendaProdutoTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(VendaProduto.class);
        VendaProduto vendaProduto1 = new VendaProduto();
        vendaProduto1.setId(1L);
        VendaProduto vendaProduto2 = new VendaProduto();
        vendaProduto2.setId(vendaProduto1.getId());
        assertThat(vendaProduto1).isEqualTo(vendaProduto2);
        vendaProduto2.setId(2L);
        assertThat(vendaProduto1).isNotEqualTo(vendaProduto2);
        vendaProduto1.setId(null);
        assertThat(vendaProduto1).isNotEqualTo(vendaProduto2);
    }
}
