export const addOrders = async () => {
   console.log('entro al metodo');

   for (let i = 0; i < receivedData.value.products.length; i++) {
      let pro = receivedData.value.products[i];
      console.log(i);

      datosInventoryId.value = await getInventoryId(pro.productId);

      if (datosInventoryId.value.quantityAvailable < pro.quantity) {
         show_alert(
            `
            El producto ${datosInventoryId.value.productName} solicitado es mayor que el disponible.
            Solo nos quedan ${datosInventoryId.value.quantityAvailable} disponibles.
          `,
            "warning"
         );
      }
   }

   for (let i = 0; i < receivedData.value.products.length; i++) {
      let product = receivedData.value.products[i];

      datosInventoryId.value = await getInventoryId(product.productId);

      let sutTotal = product.quantity * product.price;

      let available =
         datosInventoryId.value.quantityAvailable - product.quantity;

      await postOrderDetails(
         datosOrder.value[0].orderId,
         product.productId,
         product.quantity,
         product.price,
         sutTotal,
         userLogin.value
      );

      await putInventory(
         datosInventoryId.value.inventoryId,
         product.productId,
         datosInventoryId.value.quantityAdded,
         available,
         datosInventoryId.value.notes,
         userLogin.value
      );
   }
}