<template>
  <div class="beers">
    <img class="beers--image" :src="currentBeer.image_url">
    <span class="beers--description-title"> Description </span>
    <p class="beers--description-text" v-if="currentBeer.description">
      {{ currentBeer.description }}
    </p>
    <span class="beers--food-affinity"> Food affinity </span>
    <div v-for="(food,index) in currentBeer.food_pairing" :key="index">
      <span class="beers--food-affinity-item"> {{ food }} </span>
    </div>
    <span class="beers--tips"> Brewer Tips </span>
    <p class="beers--tips-text">
      {{ currentBeer.brewers_tips }}
    </p>
  </div>
</template>

<script>
export default {
  name: 'Beers',
  data () {
    return {
      currentBeer: {}
    }
  },
  async mounted () {
    this.currentBeer = await this.axios.get('https://api.punkapi.com/v2/beers/random')
      .then(response => response.data[0])
  }
}
</script>

<style lang="scss">
  .beers {
    display: flex;
    flex-direction: column;
    align-items: center;
    &--image {
      width: 10%;
    }
    &--description-title,
    &--food-affinity,
    &--tips {
      font-weight: bold;
      color:darkcyan;
      padding: 10px;
    }
    &--food-affinity-item{
      padding: 0 20px 10px 20px;
    }
    &--description-text,
    &--tips-text {
      padding: 0 20px 10px 20px;
      width: 70%;
    }
  }
</style>
