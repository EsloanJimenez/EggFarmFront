<template>
  <HeaderComponent />
  <div class="container mt-5">
    <div id="table-header">
      <h2>Lista De Productos</h2>
      <input
        type="text"
        v-model="search"
        class="form form-control"
        name="search"
        id="search"
        placeholder="Buscar Producto"
      />
      <NewBotton
        title="+"
        btnStyle="btn btn-primary btn-add"
        data-bs-toggle="modal"
        data-bs-target="#contactModal"
        @click="openModal"
      />
    </div>
    <table class="table table-striped table-hover table-bordered">
      <thead class="table-success">
        <tr>
          <td>#</td>
          <th>Nombre Producto</th>
          <th>Descripcion</th>
          <th>Precio</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody v-if="filteredProduct.length">
        <tr v-for="(item, i) in filteredProduct" :key="i">
          <td>{{ i + 1 }}</td>
          <td>{{ item.productName }}</td>
          <td>{{ item.description }}</td>
          <td>{{ item.price }}</td>
          <td class="btn-action">
            <NewBotton
              title="Actualizar"
              btnStyle="btn btn-warning btn-sm me-2"
              data-bs-toggle="modal"
              data-bs-target="#contactModal"
              @click="openModal('Actualizar', item)"
            />
            <NewBotton
              title="Eliminar"
              btnStyle="btn btn-danger btn-sm"
              @click="
                deleteProduct(item.productId, userLogin, item.productName)
              "
            />
          </td>
        </tr>
      </tbody>
      <tr v-else>
        <td style="text-align: center" colspan="6">
          No se encontraron resultados.
        </td>
      </tr>
    </table>
  </div>

  <FormComponent
    :title="modalTitle"
    :fields="modalFields"
    :form-data="selectedProducts"
    @send-data="onSubmit"
  />
</template>

<script setup>
import { onMounted, onUpdated, ref, watch } from "vue";
import HeaderComponent from "../components/HeaderComponent.vue";
import NewBotton from "../components/NewBotton.vue";
import FormComponent from "../components/FormComponent.vue";
import { postProducts } from "../services/products/post";
import { getProducts } from "../services/products/get";
import { putProduct } from "../services/products/put";
import { deleteProduct } from "../services/products/deleted";

import { userLogin } from "../utils/globalVariables";

import "../css/table.css";

const search = ref("");
const filteredProduct = ref([]);
const receivedData = ref({});
const datosProducts = ref([]);
const modalTitle = ref("");
const modalFields = ref([]);
const selectedProducts = ref({});
const isEditMode = ref(false);

onMounted(async () => {
  datosProducts.value = await getProducts();
  filteredProduct.value = datosProducts.value;
});

onUpdated(async () => {
  datosProducts.value = await getProducts();
  filteredProduct.value = datosProducts.value;
});

watch(search, (newQuery) => {
  if (newQuery.trim().length >= 2) {
    filteredProduct.value = datosProducts.value.filter((product) =>
      product.productName.toLowerCase().includes(newQuery.toLowerCase())
    );
  } else filteredProduct.value = [];
});

const openModal = (action = "Registrar Producto", product = null) => {
  isEditMode.value = action === "Actualizar";
  modalTitle.value = isEditMode.value ? "Actualizar" : "Registrar Producto";

  selectedProducts.value = product ? { ...product } : {};

  modalFields.value = [
    {
      label: "Nombre del Producto",
      name: "productName",
      type: "text",
      value: product ? product.productName : "",
      maxlength: 50,
      required: true,
    },
    {
      label: "Descripción",
      name: "description",
      type: "textarea",
      value: product ? product.description : "",
      maxlength: 200,
      required: true,
    },
    {
      label: "Precio",
      name: "price",
      type: "number",
      value: product ? product.price : 0,
      required: true,
    },
  ];
};

const onSubmit = async (data) => {
  receivedData.value = data;

  if (isEditMode.value) {
    await putProduct(
      selectedProducts.value.productId,
      receivedData.value.productName,
      receivedData.value.description,
      receivedData.value.price,
      userLogin
    );
  } else {
    await postProducts(
      receivedData.value.productName,
      receivedData.value.description,
      receivedData.value.price,
      userLogin
    );
  }
};
</script>

<style scoped>
.form {
  width: 30%;
  height: 40px;
}
</style>
