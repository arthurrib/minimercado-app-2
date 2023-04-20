package app.minimercado.web.rest;

import static app.minimercado.web.rest.TestUtil.sameNumber;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import app.minimercado.IntegrationTest;
import app.minimercado.domain.VendaProduto;
import app.minimercado.repository.VendaProdutoRepository;
import java.math.BigDecimal;
import java.util.List;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import javax.persistence.EntityManager;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link VendaProdutoResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class VendaProdutoResourceIT {

    private static final Integer DEFAULT_QTD = 1;
    private static final Integer UPDATED_QTD = 2;

    private static final BigDecimal DEFAULT_VALOR_UNITARIO = new BigDecimal(1);
    private static final BigDecimal UPDATED_VALOR_UNITARIO = new BigDecimal(2);

    private static final BigDecimal DEFAULT_DESCONTO = new BigDecimal(1);
    private static final BigDecimal UPDATED_DESCONTO = new BigDecimal(2);

    private static final String ENTITY_API_URL = "/api/venda-produtos";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private VendaProdutoRepository vendaProdutoRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restVendaProdutoMockMvc;

    private VendaProduto vendaProduto;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static VendaProduto createEntity(EntityManager em) {
        VendaProduto vendaProduto = new VendaProduto().qtd(DEFAULT_QTD).valorUnitario(DEFAULT_VALOR_UNITARIO).desconto(DEFAULT_DESCONTO);
        return vendaProduto;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static VendaProduto createUpdatedEntity(EntityManager em) {
        VendaProduto vendaProduto = new VendaProduto().qtd(UPDATED_QTD).valorUnitario(UPDATED_VALOR_UNITARIO).desconto(UPDATED_DESCONTO);
        return vendaProduto;
    }

    @BeforeEach
    public void initTest() {
        vendaProduto = createEntity(em);
    }

    @Test
    @Transactional
    void createVendaProduto() throws Exception {
        int databaseSizeBeforeCreate = vendaProdutoRepository.findAll().size();
        // Create the VendaProduto
        restVendaProdutoMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(vendaProduto)))
            .andExpect(status().isCreated());

        // Validate the VendaProduto in the database
        List<VendaProduto> vendaProdutoList = vendaProdutoRepository.findAll();
        assertThat(vendaProdutoList).hasSize(databaseSizeBeforeCreate + 1);
        VendaProduto testVendaProduto = vendaProdutoList.get(vendaProdutoList.size() - 1);
        assertThat(testVendaProduto.getQtd()).isEqualTo(DEFAULT_QTD);
        assertThat(testVendaProduto.getValorUnitario()).isEqualByComparingTo(DEFAULT_VALOR_UNITARIO);
        assertThat(testVendaProduto.getDesconto()).isEqualByComparingTo(DEFAULT_DESCONTO);
    }

    @Test
    @Transactional
    void createVendaProdutoWithExistingId() throws Exception {
        // Create the VendaProduto with an existing ID
        vendaProduto.setId(1L);

        int databaseSizeBeforeCreate = vendaProdutoRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restVendaProdutoMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(vendaProduto)))
            .andExpect(status().isBadRequest());

        // Validate the VendaProduto in the database
        List<VendaProduto> vendaProdutoList = vendaProdutoRepository.findAll();
        assertThat(vendaProdutoList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkQtdIsRequired() throws Exception {
        int databaseSizeBeforeTest = vendaProdutoRepository.findAll().size();
        // set the field null
        vendaProduto.setQtd(null);

        // Create the VendaProduto, which fails.

        restVendaProdutoMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(vendaProduto)))
            .andExpect(status().isBadRequest());

        List<VendaProduto> vendaProdutoList = vendaProdutoRepository.findAll();
        assertThat(vendaProdutoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkValorUnitarioIsRequired() throws Exception {
        int databaseSizeBeforeTest = vendaProdutoRepository.findAll().size();
        // set the field null
        vendaProduto.setValorUnitario(null);

        // Create the VendaProduto, which fails.

        restVendaProdutoMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(vendaProduto)))
            .andExpect(status().isBadRequest());

        List<VendaProduto> vendaProdutoList = vendaProdutoRepository.findAll();
        assertThat(vendaProdutoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllVendaProdutos() throws Exception {
        // Initialize the database
        vendaProdutoRepository.saveAndFlush(vendaProduto);

        // Get all the vendaProdutoList
        restVendaProdutoMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(vendaProduto.getId().intValue())))
            .andExpect(jsonPath("$.[*].qtd").value(hasItem(DEFAULT_QTD)))
            .andExpect(jsonPath("$.[*].valorUnitario").value(hasItem(sameNumber(DEFAULT_VALOR_UNITARIO))))
            .andExpect(jsonPath("$.[*].desconto").value(hasItem(sameNumber(DEFAULT_DESCONTO))));
    }

    @Test
    @Transactional
    void getVendaProduto() throws Exception {
        // Initialize the database
        vendaProdutoRepository.saveAndFlush(vendaProduto);

        // Get the vendaProduto
        restVendaProdutoMockMvc
            .perform(get(ENTITY_API_URL_ID, vendaProduto.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(vendaProduto.getId().intValue()))
            .andExpect(jsonPath("$.qtd").value(DEFAULT_QTD))
            .andExpect(jsonPath("$.valorUnitario").value(sameNumber(DEFAULT_VALOR_UNITARIO)))
            .andExpect(jsonPath("$.desconto").value(sameNumber(DEFAULT_DESCONTO)));
    }

    @Test
    @Transactional
    void getNonExistingVendaProduto() throws Exception {
        // Get the vendaProduto
        restVendaProdutoMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingVendaProduto() throws Exception {
        // Initialize the database
        vendaProdutoRepository.saveAndFlush(vendaProduto);

        int databaseSizeBeforeUpdate = vendaProdutoRepository.findAll().size();

        // Update the vendaProduto
        VendaProduto updatedVendaProduto = vendaProdutoRepository.findById(vendaProduto.getId()).get();
        // Disconnect from session so that the updates on updatedVendaProduto are not directly saved in db
        em.detach(updatedVendaProduto);
        updatedVendaProduto.qtd(UPDATED_QTD).valorUnitario(UPDATED_VALOR_UNITARIO).desconto(UPDATED_DESCONTO);

        restVendaProdutoMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedVendaProduto.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedVendaProduto))
            )
            .andExpect(status().isOk());

        // Validate the VendaProduto in the database
        List<VendaProduto> vendaProdutoList = vendaProdutoRepository.findAll();
        assertThat(vendaProdutoList).hasSize(databaseSizeBeforeUpdate);
        VendaProduto testVendaProduto = vendaProdutoList.get(vendaProdutoList.size() - 1);
        assertThat(testVendaProduto.getQtd()).isEqualTo(UPDATED_QTD);
        assertThat(testVendaProduto.getValorUnitario()).isEqualByComparingTo(UPDATED_VALOR_UNITARIO);
        assertThat(testVendaProduto.getDesconto()).isEqualByComparingTo(UPDATED_DESCONTO);
    }

    @Test
    @Transactional
    void putNonExistingVendaProduto() throws Exception {
        int databaseSizeBeforeUpdate = vendaProdutoRepository.findAll().size();
        vendaProduto.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restVendaProdutoMockMvc
            .perform(
                put(ENTITY_API_URL_ID, vendaProduto.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(vendaProduto))
            )
            .andExpect(status().isBadRequest());

        // Validate the VendaProduto in the database
        List<VendaProduto> vendaProdutoList = vendaProdutoRepository.findAll();
        assertThat(vendaProdutoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchVendaProduto() throws Exception {
        int databaseSizeBeforeUpdate = vendaProdutoRepository.findAll().size();
        vendaProduto.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restVendaProdutoMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(vendaProduto))
            )
            .andExpect(status().isBadRequest());

        // Validate the VendaProduto in the database
        List<VendaProduto> vendaProdutoList = vendaProdutoRepository.findAll();
        assertThat(vendaProdutoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamVendaProduto() throws Exception {
        int databaseSizeBeforeUpdate = vendaProdutoRepository.findAll().size();
        vendaProduto.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restVendaProdutoMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(vendaProduto)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the VendaProduto in the database
        List<VendaProduto> vendaProdutoList = vendaProdutoRepository.findAll();
        assertThat(vendaProdutoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateVendaProdutoWithPatch() throws Exception {
        // Initialize the database
        vendaProdutoRepository.saveAndFlush(vendaProduto);

        int databaseSizeBeforeUpdate = vendaProdutoRepository.findAll().size();

        // Update the vendaProduto using partial update
        VendaProduto partialUpdatedVendaProduto = new VendaProduto();
        partialUpdatedVendaProduto.setId(vendaProduto.getId());

        restVendaProdutoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedVendaProduto.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedVendaProduto))
            )
            .andExpect(status().isOk());

        // Validate the VendaProduto in the database
        List<VendaProduto> vendaProdutoList = vendaProdutoRepository.findAll();
        assertThat(vendaProdutoList).hasSize(databaseSizeBeforeUpdate);
        VendaProduto testVendaProduto = vendaProdutoList.get(vendaProdutoList.size() - 1);
        assertThat(testVendaProduto.getQtd()).isEqualTo(DEFAULT_QTD);
        assertThat(testVendaProduto.getValorUnitario()).isEqualByComparingTo(DEFAULT_VALOR_UNITARIO);
        assertThat(testVendaProduto.getDesconto()).isEqualByComparingTo(DEFAULT_DESCONTO);
    }

    @Test
    @Transactional
    void fullUpdateVendaProdutoWithPatch() throws Exception {
        // Initialize the database
        vendaProdutoRepository.saveAndFlush(vendaProduto);

        int databaseSizeBeforeUpdate = vendaProdutoRepository.findAll().size();

        // Update the vendaProduto using partial update
        VendaProduto partialUpdatedVendaProduto = new VendaProduto();
        partialUpdatedVendaProduto.setId(vendaProduto.getId());

        partialUpdatedVendaProduto.qtd(UPDATED_QTD).valorUnitario(UPDATED_VALOR_UNITARIO).desconto(UPDATED_DESCONTO);

        restVendaProdutoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedVendaProduto.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedVendaProduto))
            )
            .andExpect(status().isOk());

        // Validate the VendaProduto in the database
        List<VendaProduto> vendaProdutoList = vendaProdutoRepository.findAll();
        assertThat(vendaProdutoList).hasSize(databaseSizeBeforeUpdate);
        VendaProduto testVendaProduto = vendaProdutoList.get(vendaProdutoList.size() - 1);
        assertThat(testVendaProduto.getQtd()).isEqualTo(UPDATED_QTD);
        assertThat(testVendaProduto.getValorUnitario()).isEqualByComparingTo(UPDATED_VALOR_UNITARIO);
        assertThat(testVendaProduto.getDesconto()).isEqualByComparingTo(UPDATED_DESCONTO);
    }

    @Test
    @Transactional
    void patchNonExistingVendaProduto() throws Exception {
        int databaseSizeBeforeUpdate = vendaProdutoRepository.findAll().size();
        vendaProduto.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restVendaProdutoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, vendaProduto.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(vendaProduto))
            )
            .andExpect(status().isBadRequest());

        // Validate the VendaProduto in the database
        List<VendaProduto> vendaProdutoList = vendaProdutoRepository.findAll();
        assertThat(vendaProdutoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchVendaProduto() throws Exception {
        int databaseSizeBeforeUpdate = vendaProdutoRepository.findAll().size();
        vendaProduto.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restVendaProdutoMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(vendaProduto))
            )
            .andExpect(status().isBadRequest());

        // Validate the VendaProduto in the database
        List<VendaProduto> vendaProdutoList = vendaProdutoRepository.findAll();
        assertThat(vendaProdutoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamVendaProduto() throws Exception {
        int databaseSizeBeforeUpdate = vendaProdutoRepository.findAll().size();
        vendaProduto.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restVendaProdutoMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(vendaProduto))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the VendaProduto in the database
        List<VendaProduto> vendaProdutoList = vendaProdutoRepository.findAll();
        assertThat(vendaProdutoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteVendaProduto() throws Exception {
        // Initialize the database
        vendaProdutoRepository.saveAndFlush(vendaProduto);

        int databaseSizeBeforeDelete = vendaProdutoRepository.findAll().size();

        // Delete the vendaProduto
        restVendaProdutoMockMvc
            .perform(delete(ENTITY_API_URL_ID, vendaProduto.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<VendaProduto> vendaProdutoList = vendaProdutoRepository.findAll();
        assertThat(vendaProdutoList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
