<script>

</script>


<template>
    <router-view></router-view>
</template>

<style>
  * {
    margin: 0;
    padding: 0;
    font-family: monospace;
    font-size: 30px;
    box-sizing: border-box;
    text-decoration: none;
    color: black;
  }

  body {
    background-color: rgb(255, 250, 246);
  }

  .st-brd {
    border-radius: 8px;
    border: 1px solid rgb(212, 212, 212);
    padding: 0.2%;
  }

  .st-field {
      width: 20%;
      margin: 8px;
      padding: 4px;
      text-align: center;
  }

  .st-input {
      background-color: rgb(255, 248, 236);
      transition: 0.2s;

      &:hover {
          background-color: #f8d5b8;
          transform: scale(1.02);
      }

      &:focus {
        background-color: #f2cdae;
      }
  }

  .st-button {
      background-color: rgb(227, 226, 206);
      transition: 0.2s;

      &:hover {
          background-color: #cb8953;
          transform: scale(1.04);
      }
  }

  .st-back {
    background-color: rgb(227, 226, 206);
  }
</style>