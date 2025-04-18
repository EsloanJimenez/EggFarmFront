<template>
  <HeaderComponent />
  <div class="container mt-5">
    <div id="table-header">
      <h2 class="mb-4">Lista De Inventario</h2>
      <NewBotton
        v-if="userRole == 1 || userRole == 4"
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
          <th>Nombre De Producto</th>
          <th>Cantidad Agregada</th>
          <th>Disponibles</th>
          <th>Nota</th>
          <th v-if="userRole == 1">Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, i) in datosInventory" :key="i">
          <td>{{ i + 1 }}</td>
          <td>{{ item.productName }}</td>
          <td>{{ item.quantityAdded }}</td>
          <td>{{ item.quantityAvailable }}</td>
          <td>{{ item.notes }}</td>
          <td class="btn-action" v-if="userRole == 1">
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
                deleteInventory(item.inventoryId, userLogin, item.productName)
              "
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <FormComponent
    :title="modalTitle"
    :fields="modalFields"
    :form-data="selectedInventory"
    @send-data="onSubmit"
  />
</template>

<script setup>
import { onMounted, onUpdated, ref } from "vue";
import HeaderComponent from "../components/HeaderComponent.vue";
import NewBotton from "../components/NewBotton.vue";
import FormComponent from "../components/FormComponent.vue";
import { postInventory } from "../services/inventory/post";
import { getInventory, getInventoryId } from "../services/inventory/get";
import { getProducts } from "../services/products/get";
import { deleteInventory } from "../services/inventory/deleted";

import "../css/table.css";
import { userLogin, userRole } from "../utils/globalVariables";

const receivedData = ref({});
const datosInventory = ref([]);
const datosInventoryId = ref();
const datosProducts = ref([]);
const modalTitle = ref("");
const modalFields = ref([]);
const isEditMode = ref(false);
const selectedInventory = ref({});

onMounted(async () => {
  datosInventory.value = await getInventory();
  datosProducts.value = await getProducts();
});

onUpdated(async () => {
  datosInventory.value = await getInventory();
  datosProducts.value = await getProducts();
});

const openModal = (action = "Registrar Inventario", inventory = null) => {
  isEditMode.value = action === "Actualizar";
  modalTitle.value = isEditMode.value ? "Actualizar" : "Registrar Inventario";

  selectedInventory.value = inventory ? { ...inventory } : {};

  modalFields.value = [
    {
      label: "Nombre del Producto",
      name: "productId",
      type: "select",
      value: inventory ? inventory.productId : "",
      options: datosProducts.value.map((prod) => ({
        label: prod.productName,
        value: prod.productId,
      })),
      required: true,
    },
    {
      label: "Cantidad Agregada",
      name: "quantityAdded",
      type: "number",
      value: inventory ? inventory.quantityAdded : "",
      required: true,
    },
    {
      label: "Nota",
      name: "notes",
      type: "text",
      maxlength: 200,
      value: inventory ? inventory.notes : "",
      required: true,
    },
  ];
};

const onSubmit = async (data) => {
  receivedData.value = data;

  datosInventoryId.value = await getInventoryId(receivedData.value.productId);

  const newQuantityAvailable =
    receivedData.value.quantityAdded + datosInventoryId.value.quantityAvailable;

  if (!isEditMode.value) {
    await postInventory(
      receivedData.value.productId,
      receivedData.value.quantityAdded,
      newQuantityAvailable,
      receivedData.value.notes,
      userLogin
    );
  }
};
</script>

<style scoped></style>
