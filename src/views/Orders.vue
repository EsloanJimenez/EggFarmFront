<template>
  <HeaderComponent />
  <div class="container mt-5">
    <div id="table-header">
      <h2 class="mb-4">Lista De Ordenes</h2>
      <input
        type="text"
        v-model="search"
        class="form form-control"
        name="search"
        id="search"
        placeholder="Buscar Por Nombre"
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
          <th>Nombre Del Cliente</th>
          <th>Total A Pagar</th>
          <th>Estado</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody v-if="filterName.length > 0">
        <tr v-for="(item, i) in filterName" :key="i">
          <td>{{ item.orderId }}</td>
          <td>{{ item.firstName }}</td>
          <td>{{ formatCurrency(item.totalAmount) }}</td>
          <td>{{ item.status }}</td>
          <td class="btn-action" v-if="item.userCreation === userLogin">
            <NewBotton
              title="Ver Detalles"
              btnStyle="btn btn-info btn-sm me-2"
              data-bs-toggle="modal"
              data-bs-target="#detailModal"
              @click="openOrderDetailModal(item.orderId)"
            />
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
              @click="deleteOrder(item.orderId, userLogin, item.firstName)"
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <FormComponent
    :title="modalTitle"
    :fields="modalFields"
    :productOptions="
      datosProduct.map((pro) => ({
        label: pro.productName,
        value: pro.productId,
        label2: pro.price,
      }))
    "
    :selectedProducts="[...selectedOrderDetail]"
    :form-data="selectedOrder"
    @send-data="onSubmit"
    @add="addProduct"
    @remove="removeProduct"
  />

  <OrderDetailsModal
    v-if="isOrderDetailModalOpen"
    :order="orderDetail"
    @close="closeModal"
  />
</template>

<script setup>
import { computed, onMounted, onUpdated, ref } from "vue";

import HeaderComponent from "../components/HeaderComponent.vue";
import NewBotton from "../components/NewBotton.vue";
import FormComponent from "../components/FormComponent.vue";
import { postOrder } from "../services/orders/post";
import { getOrder } from "../services/orders/get";
import { getOrderDetailId } from "../services/orderDetail/get";
import { getCustomers } from "../services/customers/get";
import { getProducts } from "../services/products/get";
import { getInventoryId } from "../services/inventory/get";
import { putInventory } from "../services/inventory/put";
import { putOrderDetails } from "../services/orderDetail/put";
import { putOrder } from "../services/orders/put";
import { deleteOrder } from "../services/orders/deleted";
import { deleteOrderDetails } from "../services/orderDetail/deleted";
import { postOrderDetails } from "../services/orderDetail/post";
import OrderDetailsModal from "../components/OrderDetailsModal.vue";
import { formatCurrency } from "../js/formatCurrency";

import "../css/table.css";
import { show_alert } from "../utils/swal";
import { userLogin } from "../utils/globalVariables";

const search = ref("");
const receivedData = ref({});
const datosOrder = ref([]);
const orderDetail = ref([]);
const datosCustomer = ref([]);
const datosProduct = ref([]);
const datosInventoryId = ref();
const datosOrderDetailId = ref();
const modalTitle = ref("");
const modalFields = ref([]);
const isEditMode = ref(false);
const selectedOrder = ref({});
const totalAmo = ref(0);
const selectedOrderDetail = ref([]);
const isOrderDetailModalOpen = ref(false);

const loading = ref(null);

onMounted(async () => {
  datosOrder.value = await getOrder();
  datosCustomer.value = await getCustomers();
  datosProduct.value = await getProducts();
});

const filterName = computed(() =>
  datosOrder.value.filter((n) =>
    n.firstName.toLowerCase().includes(search.value.toLowerCase())
  )
);

const addProduct = () => {
  selectedOrderDetail.value.push({ productId: "", price: "", quantity: 1 });
};

const removeProduct = async (index, productId, quantity, orderDetailId) => {
  selectedOrderDetail.value.splice(index, 1);
  datosInventoryId.value = await getInventoryId(productId);

  let newAvailable = datosInventoryId.value.quantityAvailable + quantity;

  await putInventory(
    datosInventoryId.value.inventoryId,
    productId,
    datosInventoryId.value.quantityAdded,
    newAvailable,
    datosInventoryId.value.notes,
    userLogin
  );

  await deleteOrderDetails(orderDetailId, userLogin);
};

// Función para abrir el modal y pasar los datos
const openOrderDetailModal = async (orderId) => {
  orderDetail.value = await getOrderDetailId(orderId);

  isOrderDetailModalOpen.value = true;
};

// Función para cerrar el modal
const closeModal = () => {
  isOrderDetailModalOpen.value = false;
};

const openModal = async (action = "Registrar Orden", order = null) => {
  loading.value = true;

  isEditMode.value = action === "Actualizar";
  modalTitle.value = isEditMode.value ? "Actualizar" : "Registrar Orden";

  selectedOrder.value = order ? { ...order } : {};

  if (isEditMode.value && order) {
    datosOrderDetailId.value = await getOrderDetailId(order.orderId);

    selectedOrderDetail.value = datosOrderDetailId.value.map((d) => ({
      orderDetailId: d.orderDetailId,
      productId: d.productId,
      quantity: d.quantity,
      price: d.unitPrice,
    }));
  } else {
    selectedOrderDetail.value = [];
  }

  modalFields.value = [
    {
      label: "Nombre del Cliente",
      name: "customerId",
      type: "select",
      value: order ? order.customerId : "",
      options: datosCustomer.value.map((cus) => ({
        label: cus.firstName,
        value: cus.customerId,
      })),
      required: true,
    },
    {
      label: "Estado",
      name: "status",
      type: "select",
      value: order ? order.status : "",
      options: [
        {
          label: "Pendiente",
          value: "pendiente",
        },
        {
          label: "Pagado",
          value: "pagado",
        },
      ],
      required: true,
    },
  ];
  loading.value = false;
};

const onSubmit = async (data) => {
  receivedData.value = data;
  totalAmo.value = 0;
  let quantity = 0;
  let subTotal = 0;
  let newAvailable = 0;
  let product;
  let existingProduct;

  //CALCULAR EL TOTAL A PAGAR
  for (let i = 0; i < receivedData.value.products.length; i++) {
    let price = receivedData.value.products[i].price;
    quantity = receivedData.value.products[i].quantity;

    subTotal = price * quantity;

    totalAmo.value += subTotal;
  }

  if (isEditMode.value) {
    //OBTENER LOS DETALLES ACTUALES DE LA ORDEN
    datosOrderDetailId.value = await getOrderDetailId(
      selectedOrder.value.orderId
    );

    //BUSCANDO PRODUCTOS ACTUALES
    const existinProducts = new Map(
      datosOrderDetailId.value.map((reg) => [reg.productId, reg])
    );

    //ITERACION SOBRE PRODUCTOS RECIVIDOS
    for (let i = 0; i < receivedData.value.products.length; i++) {
      product = receivedData.value.products[i];
      existingProduct = existinProducts.get(product.productId);

      datosInventoryId.value = await getInventoryId(product.productId);

      if (existingProduct) {
        if (product.quantity != existingProduct.quantity) {
          if (datosInventoryId.value.quantityAvailable < product.quantity) {
            show_alert(
              `
                  El producto ${datosInventoryId.value.productName} solicitado es mayor que el disponible.
                  Solo nos quedan ${datosInventoryId.value.quantityAvailable} disponibles.
                `,
              "warning"
            );
            return;
          }

          subTotal = product.quantity * product.price;

          if (product.quantity > existingProduct.quantity)
            newAvailable =
              datosInventoryId.value.quantityAvailable -
              (product.quantity - existingProduct.quantity);
          else if (product.quantity < existingProduct.quantity)
            newAvailable =
              datosInventoryId.value.quantityAvailable +
              (existingProduct.quantity - product.quantity);
          else newAvailable = datosInventoryId.value.quantityAvailable;

          await putOrderDetails(
            datosOrderDetailId.value[i].orderDetailId,
            datosOrder.value[0].orderId,
            product.productId,
            product.quantity,
            product.price,
            subTotal,
            userLogin
          );

          await putInventory(
            datosInventoryId.value.inventoryId,
            product.productId,
            datosInventoryId.value.quantityAdded,
            newAvailable,
            datosInventoryId.value.notes,
            userLogin
          );

          existinProducts.delete(product.productId);
        }
      } else {
        subTotal = product.quantity * product.price;
        newAvailable =
          datosInventoryId.value.quantityAvailable - product.quantity;

        if (newAvailable < 0) {
          show_alert(
            `
                  El producto ${datosInventoryId.value.productName} solicitado es mayor que el disponible.
                  Solo nos quedan ${datosInventoryId.value.quantityAvailable} disponibles.
                `,
            "warning"
          );
          return;
        }

        await postOrderDetails(
          datosOrder.value[0].orderId,
          product.productId,
          product.quantity,
          product.price,
          subTotal,
          userLogin
        );

        await putInventory(
          datosInventoryId.value.inventoryId,
          product.productId,
          datosInventoryId.value.quantityAdded,
          newAvailable,
          datosInventoryId.value.notes,
          userLogin
        );
      }
    }

    await putOrder(
      selectedOrder.value.orderId,
      receivedData.value.customerId,
      totalAmo.value,
      receivedData.value.status,
      userLogin
    );
  } else {
    for (let i = 0; i < receivedData.value.products.length; i++) {
      let pro = receivedData.value.products[i];

      datosInventoryId.value = await getInventoryId(pro.productId);

      if (datosInventoryId.value.quantityAvailable < pro.quantity) {
        show_alert(
          `
            El producto ${datosInventoryId.value.productName} solicitado es mayor que el disponible.
            Solo nos quedan ${datosInventoryId.value.quantityAvailable} disponibles.
          `,
          "warning"
        );
        return;
      }
    }

    await postOrder(
      receivedData.value.customerId,
      totalAmo.value,
      receivedData.value.status,
      userLogin
    );

    for (let i = 0; i < receivedData.value.products.length; i++) {
      product = receivedData.value.products[i];

      datosInventoryId.value = await getInventoryId(product.productId);

      subTotal = product.quantity * product.price;
      newAvailable =
        datosInventoryId.value.quantityAvailable - product.quantity;

      await postOrderDetails(
        datosOrder.value[0].orderId,
        product.productId,
        product.quantity,
        product.price,
        subTotal,
        userLogin
      );

      await putInventory(
        datosInventoryId.value.inventoryId,
        product.productId,
        datosInventoryId.value.quantityAdded,
        newAvailable,
        datosInventoryId.value.notes,
        userLogin
      );
    }
  }

  datosOrder.value = await getOrder();
};
</script>

<style scoped></style>
