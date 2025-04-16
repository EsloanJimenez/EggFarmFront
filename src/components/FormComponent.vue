<template>
  <div class="mt-5">
    <div
      class="modal fade"
      id="contactModal"
      tabindex="-1"
      aria-labelledby="contactModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="contactModalLabel">
              {{ props.title }}
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Cerrar"
            ></button>
          </div>

          <div class="modal-body">
            <form @submit.prevent="handleAction">
              <div
                v-for="(field, index) in formFields"
                :key="index"
                class="mb-3"
              >
                <label :for="field.name" class="form-label">
                  {{ field.label }}
                </label>

                <input
                  v-if="field.type !== 'textarea' && field.type !== 'select'"
                  :type="field.type"
                  v-model="field.value"
                  :name="field.name"
                  :id="field.name"
                  :maxlength="field.maxlength"
                  @input="(e) => limitInput(e, field)"
                  class="form-control"
                  :required="field.required"
                />

                <textarea
                  v-else-if="field.type === 'textarea'"
                  v-model="field.value"
                  :name="field.name"
                  :id="field.name"
                  :maxlength="field.maxlength"
                  @input="(e) => limitInput(e, field)"
                  rows="3"
                  class="form-control"
                  :required="field.required"
                ></textarea>

                <select
                  v-else-if="field.type === 'select'"
                  v-model="field.value"
                  :name="field.name"
                  :id="field.name"
                  class="form-control"
                  :required="field.required"
                >
                  <option
                    v-for="option in field.options"
                    :key="option.value"
                    :value="option.value"
                  >
                    {{ option.label }}
                  </option>
                </select>
              </div>

              <!-- Sección de Productos Dinámicos -->
              <div class="mb-3" v-if="isInput === 'customerId'">
                <label class="form-label">Productos</label>
                <div
                  v-for="(product, index) in props.selectedProducts"
                  :key="index"
                  class="d-flex gap-2 mb-2"
                >
                  <select
                    v-model="product.productId"
                    class="form-control"
                    @change="() => updatePrice(product)"
                  >
                    <option
                      v-for="option in productOptions"
                      :key="option.value"
                      :value="option.value"
                    >
                      {{ option.label }}
                    </option>
                  </select>
                  <input
                    type="text"
                    v-model="product.price"
                    class="form-control"
                    placeholder="Precio"
                    readonly
                    disabled
                    min="1"
                  />
                  <input
                    type="number"
                    v-model="product.quantity"
                    class="form-control"
                    placeholder="Cantidad"
                    min="1"
                  />
                  <button
                    type="button"
                    class="btn btn-danger"
                    @click="
                      removeProduct(
                        index,
                        product.productId,
                        product.quantity,
                        product.orderDetailId
                      )
                    "
                  >
                    X
                  </button>
                </div>
                <button
                  type="button"
                  class="btn btn-secondary mt-2"
                  @click="addProduct"
                >
                  Agregar Producto
                </button>
              </div>
            </form>
          </div>

          <div class="modal-footer">
            <NewBotton
              :title="title"
              btnStyle="btn btn-primary"
              data-bs-dismiss="modal"
              @click="handleAction"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, ref, watch } from "vue";
import NewBotton from "./NewBotton.vue";

const props = defineProps({
  title: String,
  fields: {
    type: Array,
    required: true,
  },
  productOptions: {
    type: Array,
    required: true,
  },
  selectedProducts: {
    type: Array,
    default: () => [],
  },
});

const formFields = ref([...props.fields]);
const isInput = ref();

const limitInput = (e, field) => {
  const inputValue = e.target.value;

  if (inputValue.length > field.maxlength) {
    field.value = inputValue.slice(0, field.maxlength);
  }
};

const updatePrice = (product) => {
  const selectedProduct = props.productOptions.find(
    (p) => p.value === product.productId
  );
  if (selectedProduct) {
    product.price = selectedProduct.label2;
  }
};

const emit = defineEmits(["send-data", "add", "remove"]);

// Mantener los datos actualizados si cambian las props
watch(
  () => props.fields,
  (newFields) => {
    formFields.value = [...newFields];
    isInput.value = formFields.value[0].name;
  }
);

const addProduct = () => {
  emit("add");
};

const removeProduct = (index, productId, quantity, orderDetailId) => {
  emit("remove", index, productId, quantity, orderDetailId);
};

const handleAction = () => {
  const formData = {};

  formFields.value.forEach((field) => {
    formData[field.name] = field.value;
  });

  formData.products = props.selectedProducts;

  emit("send-data", formData);
};
</script>
