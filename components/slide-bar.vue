<template >
<div>
<b-button v-b-toggle.my-sidebar>
  <b-icon icon="list" variant="light" font-scale="2"></b-icon>
</b-button>
<b-sidebar id="my-sidebar" title="Menu" shadow bg-variant="dark" text-variant="light">
     <template #default="{ hide }">
        <div class="p-3">         
          <nav class="mb-3">
            <b-nav vertical>
              <b-nav-item to="/" @click="hide" >Now Playing</b-nav-item>
              <b-nav-item to="" @click="hide" >Review Article</b-nav-item>
              <b-nav-item to="/about" @click="hide">About</b-nav-item>
              <b-nav-item to="/member" @click="hide">Member</b-nav-item>
            </b-nav>
          </nav>        
        </div>
      </template>
    </b-sidebar>
    <nuxt />
</div>
</template>