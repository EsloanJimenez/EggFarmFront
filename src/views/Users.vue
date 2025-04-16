<template>
  <HeaderComponent />
  <div class="container mt-5">
    <div id="table-header">
      <h2 class="mb-4">Lista De Usuarios</h2>
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
          <th>Nombre De Usuario</th>
          <th>Contraseña</th>
          <th>Role</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, i) in datosUsers" :key="i">
          <td>{{ i + 1 }}</td>
          <td>{{ item.userName }}</td>
          <td>##########</td>
          <td>{{ item.roleName }}</td>
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
              @click="deleteUsers(item.userId, userLogin, item.userName)"
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <FormComponent
    :title="modalTitle"
    :fields="modalFields"
    :form-data="selectedUsers"
    @send-data="onSubmit"
  />
</template>

<script setup>
import { onMounted, onUpdated, ref } from "vue";
import NewBotton from "../components/NewBotton.vue";
import FormComponent from "../components/FormComponent.vue";
import { postUsers } from "../services/users/post";
import { getUsers } from "../services/users/get";
import { getRole } from "../services/role/get";
import { putUsers } from "../services/users/put";
import { deleteUsers } from "../services/users/delete";

import "../css/table.css";
import HeaderComponent from "../components/HeaderComponent.vue";

const receivedData = ref({});
const datosUsers = ref([]);
const datosRole = ref([]);
const modalTitle = ref("");
const modalFields = ref([]);
const isEditMode = ref(false);
const selectedUsers = ref({});
const userLogin = ref(localStorage.getItem("userId"));

onMounted(async () => {
  datosUsers.value = await getUsers();
});

onUpdated(async () => {
  datosUsers.value = await getUsers();
});

const openModal = async (action = "Registrar Usuario", users = null) => {
  datosRole.value = await getRole();
  isEditMode.value = action === "Actualizar";
  modalTitle.value = isEditMode.value ? "Actualizar" : "Registrar Usuario";

  selectedUsers.value = users ? { ...users } : {};

  modalFields.value = [
    {
      label: "Nombre del Usuario",
      name: "userName",
      type: "text",
      value: users ? users.userName : "",
      maxlength: 25,
      required: true,
    },
    {
      label: "Contraseña",
      name: "passwordHash",
      type: "password",
      value: users ? users.passwordHash : "",
      required: true,
    },
    {
      label: "Role",
      name: "role",
      type: "select",
      value: users ? users.role : "",
      options: datosRole.value.map((r) => ({
        label: r.roleName,
        value: r.roleId,
      })),
      required: true,
    },
  ];
};

const onSubmit = async (data) => {
  receivedData.value = data;

  if (isEditMode.value) {
    await putUsers(
      selectedUsers.value.userId,
      receivedData.value.userName,
      receivedData.value.passwordHash,
      receivedData.value.role,
      userLogin.value
    );
  } else {
    await postUsers(
      receivedData.value.userName,
      receivedData.value.passwordHash,
      receivedData.value.role,
      userLogin.value
    );
  }
};
</script>

<style scoped></style>
