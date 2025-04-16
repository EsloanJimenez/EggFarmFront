<template>
  <div class="mt-5">
    <div
      class="modal fade"
      id="detailModal"
      tabindex="-1"
      aria-labelledby="detailModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="detailModal">Detalle de la orden</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Cerrar"
            ></button>
          </div>

          <div class="modal-body">
            <div class="mb-3">
              <div class="container mt-4">
                <div class="row">
                  <!-- Primera columna -->
                  <div class="col-md-6">
                    <h5><strong>NOMBRE</strong></h5>
                    <p>{{ order[0].firstName }}</p>

                    <h5><strong>TELEFONO</strong></h5>
                    <p>{{ order[0].phone }}</p>

                    <h5><strong>DIRECCIÓN</strong></h5>
                    <p>{{ order[0].address }}</p>
                  </div>

                  <!-- Segunda columna -->
                  <div class="col-md-6">
                    <h5><strong>NÚMERO DE ORDEN</strong></h5>
                    <p>{{ order[0].orderId }}</p>

                    <h5><strong>ESTADO</strong></h5>
                    <p>{{ order[0].status }}</p>

                    <h5><strong>FECHA</strong></h5>
                    <p>{{ order[0].creationDate.split("T")[0] }}</p>
                  </div>
                </div>
              </div>
              <br /><br />
              <div class="ul">
                <ul>
                  <li>Nombre Prod.</li>
                  <li>Precio</li>
                  <li>Cantidad</li>
                  <li>Sub Total</li>
                </ul>
                <ul v-for="(item, i) in order" :key="i">
                  <li>{{ item.productName }}</li>
                  <li>{{ formatCurrency(item.unitPrice) }}</li>
                  <li>{{ item.quantity }}</li>
                  <li>{{ formatCurrency(item.subTotal) }}</li>
                </ul>
                <br /><br />
                <ul id="total">
                  <li colspan="2">Total</li>
                  <li></li>
                  <li></li>
                  <li colspan="2">
                    {{ formatCurrency(order[0].totalAmount) }}
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div class="modal-footer">
            <NewBotton
              title="Descargar Factura"
              btnStyle="btn btn-secondary"
              @click="generatePDF"
            />
            <NewBotton
              title="Cerrar"
              btnStyle="btn btn-danger"
              data-bs-dismiss="modal"
              @click="closeModal"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";
import NewBotton from "./NewBotton.vue";
import { formatCurrency } from "../js/formatCurrency";
import html2pdf from "html2pdf.js";

const props = defineProps({
  order: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(["close"]);

const generatePDF = () => {
  const element = document.getElementById("detailModal");

  const opt = {
    margin: 1,
    filename: "factura.pdf",
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
  };

  html2pdf().from(element).set(opt).save();
};
</script>

<style scoped>
.ul {
  padding: 20px 0;
  background-color: rgb(234, 234, 234);
}
.ul ul:first-child {
  font-weight: bold;
}
ul {
  display: flex;
  justify-content: space-around;
  align-items: center;
  text-align: center;
  list-style: none;
}
ul li {
  width: 100%;
}
</style>
