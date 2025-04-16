<template><router-view></router-view>;</template>

<script setup>
import HeaderComponent from "./components/HeaderComponent.vue";
import Customers from "./views/Customers.vue";
import Users from "./views/Users.vue";
import Product from "./views/Products.vue";
import Inventory from "./views/Inventory.vue";
import Orders from "./views/Orders.vue";
import Login from "./views/Login.vue";
import { RouterView } from "vue-router";
</script>
