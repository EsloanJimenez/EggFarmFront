<template>
  <HeaderComponent />
  <div class="container mt-5">
    <div id="table-header">
      <h2 class="mb-4">Lista de Clientes</h2>
      <input
        type="text"
        v-model="search"
        class="form form-control"
        name="search"
        id="search"
        placeholder="Buscar Por Nombre o Apellido"
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
          <th>Nombre</th>
          <th>Apellido</th>
          <th>Correo</th>
          <th>Teléfono</th>
          <th>Dirección</th>
          <th v-if="userRole == 1 || userRole == 4">Acciones</th>
        </tr>
      </thead>
      <tbody v-if="filterName.length > 0">
        <tr v-for="(item, i) in filterName" :key="i">
          <td>{{ i + 1 }}</td>
          <td>{{ item.firstName }}</td>
          <td>{{ item.lastName }}</td>
          <td>{{ item.email }}</td>
          <td>{{ item.phone }}</td>
          <td>{{ item.address }}</td>
          <td class="btn-action" v-if="userRole == 1 || userRole == 4">
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
                deleteCustomer(
                  item.customerId,
                  userLogin,
                  item.firstName,
                  item.lastName
                )
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
    :form-data="selectedCustomers"
    @send-data="onSubmit"
  />
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import HeaderComponent from "../components/HeaderComponent.vue";
import NewBotton from "../components/NewBotton.vue";
import FormComponent from "../components/FormComponent.vue";
import { postCustomers } from "../services/customers/post";
import { getCustomers } from "../services/customers/get";
import { putCustomers } from "../services/customers/put";
import { deleteCustomer } from "../services/customers/deleted";

import { userLogin, userRole } from "../utils/globalVariables";

import "../css/table.css";

const search = ref("");
const receivedData = ref({});
const datosCustomers = ref([]);
const modalTitle = ref("");
const modalFields = ref([]);
const isEditMode = ref(false);
const selectedCustomers = ref({});

onMounted(async () => {
  datosCustomers.value = await getCustomers();
});

const filterName = computed(() =>
  datosCustomers.value.filter(
    (n) =>
      n.firstName.toLowerCase().includes(search.value.toLowerCase()) ||
      n.lastName.toLowerCase().includes(search.value.toLowerCase())
  )
);

const openModal = (action = "Registrar Cliente", customer = null) => {
  isEditMode.value = action === "Actualizar";
  modalTitle.value = isEditMode.value ? "Actualizar" : "Registrar Cliente";

  selectedCustomers.value = customer ? { ...customer } : {};

  modalFields.value = [
    {
      label: "Nombre del Cliente",
      name: "firstName",
      type: "text",
      value: customer ? customer.firstName : "",
      maxlength: 25,
      required: true,
    },
    {
      label: "Apellido del Cliente",
      name: "lastName",
      type: "text",
      value: customer ? customer.lastName : "",
      maxlength: 25,
      required: true,
    },
    {
      label: "Correo",
      name: "email",
      type: "email",
      value: customer ? customer.email : "",
      maxlength: 100,
      required: true,
    },
    {
      label: "Telefono",
      name: "phone",
      type: "tel",
      value: customer ? customer.phone : "",
      maxlength: 10,
      required: true,
    },
    {
      label: "Direccion",
      name: "address",
      type: "textarea",
      value: customer ? customer.address : "",
      maxlength: 100,
      required: true,
    },
  ];
};

const onSubmit = async (data) => {
  receivedData.value = data;

  if (isEditMode.value) {
    await putCustomers(
      selectedCustomers.value.customerId,
      receivedData.value.firstName,
      receivedData.value.lastName,
      receivedData.value.email,
      receivedData.value.phone,
      receivedData.value.address,
      userLogin
    );
  } else {
    await postCustomers(
      receivedData.value.firstName,
      receivedData.value.lastName,
      receivedData.value.email,
      receivedData.value.phone,
      receivedData.value.address,
      userLogin
    );
  }

  datosCustomers.value = await getCustomers();
};
</script>

<style scoped></style>
