<template>
  <div>
    <Main_header />
    <!-- ------------------------Upper Nevigation------------------- -->
    <div class="upper-product-nav">
      <span class="home-page-link">
        <router-link to="/">Home</router-link>
      </span>
      <span class="navigation-arrow">></span>
      <span class="current-product-name"> {{ this.ProductName }}</span>
      <!-- <span>/</span> -->
    </div>

    <div class="single-product">
      <div class="single-product-img">
        <carousel :items-to-show="2" class="first-img">
          <slide v-for="item in singleProducts" :key="item.id_product">
            <div class="carousel__item">
              <img :src="item.image" alt="" />
            </div>
          </slide>

          <template #addons>
            <navigation />
          </template>
        </carousel>
      </div>
      <!-- <div
          class="first-img"
          v-for="item in singleProducts"
          :key="item.id_product"
          v-bind="imageURl"
        >
        
          <img :src="item.image" alt="" />
        </div> -->

      <div class="product-info-box">
        <div class="product-info-name">{{ ProductsInfo.name }}</div>
        <div class="rating">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            enable-background="new 0 0 24 24"
            height="24px"
            viewBox="0 0 24 24"
            width="24px"
            fill="#000000"
          >
            <g>
              <path d="M0,0h24v24H0V0z" fill="none" />
              <path d="M0,0h24v24H0V0z" fill="none" />
            </g>
            <g>
              <path
                d="M12,17.27L18.18,21l-1.64-7.03L22,9.24l-7.19-0.61L12,2L9.19,8.63L2,9.24l5.46,4.73L5.82,21L12,17.27z"
              />
            </g>
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            enable-background="new 0 0 24 24"
            height="24px"
            viewBox="0 0 24 24"
            width="24px"
            fill="#000000"
          >
            <g>
              <path d="M0,0h24v24H0V0z" fill="none" />
              <path d="M0,0h24v24H0V0z" fill="none" />
            </g>
            <g>
              <path
                d="M12,17.27L18.18,21l-1.64-7.03L22,9.24l-7.19-0.61L12,2L9.19,8.63L2,9.24l5.46,4.73L5.82,21L12,17.27z"
              />
            </g>
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            enable-background="new 0 0 24 24"
            height="24px"
            viewBox="0 0 24 24"
            width="24px"
            fill="#000000"
          >
            <g>
              <path d="M0,0h24v24H0V0z" fill="none" />
              <path d="M0,0h24v24H0V0z" fill="none" />
            </g>
            <g>
              <path
                d="M12,17.27L18.18,21l-1.64-7.03L22,9.24l-7.19-0.61L12,2L9.19,8.63L2,9.24l5.46,4.73L5.82,21L12,17.27z"
              />
            </g>
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            enable-background="new 0 0 24 24"
            height="24px"
            viewBox="0 0 24 24"
            width="24px"
            fill="#000000"
          >
            <g>
              <path d="M0,0h24v24H0V0z" fill="none" />
              <path d="M0,0h24v24H0V0z" fill="none" />
            </g>
            <g>
              <path
                d="M12,17.27L18.18,21l-1.64-7.03L22,9.24l-7.19-0.61L12,2L9.19,8.63L2,9.24l5.46,4.73L5.82,21L12,17.27z"
              />
            </g>
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 0 24 24"
            width="24px"
            fill="#000000"
          >
            <path d="M0 0h24v24H0z" fill="none" />
            <path
              d="M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4V6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z"
            />
          </svg>
        </div>
        <span class="product-info-selling_price"
          >Rs: {{ ProductsInfo.selling_price }}</span
        >
        <span class="product-info-discount"
          >{{ ProductsInfo.discount }}%off</span
        >
        <div class="product-info-price">
          <span>
            <s> MRP:{{ ProductsInfo.price }}</s
            >(inclusive of all taxes)</span
          >
        </div>
        <div class="product-info-description">
          {{ ProductsInfo.description }}
        </div>
        <div class="product-info-color">COLOR: {{ ProductsInfo.color }}</div>
        <div class="size-box">
          <span class="size">SIZE : <span class="size-no">6</span></span>
          <span class="size-char">SIZE CHART</span>
        </div>

        <div class="product-info-size-box">
          <span
            class="product-info-Product_Title_FH"
            v-for="size in NewSizeInfo"
            :key="size.id_product"
            >{{ size.size }}</span
          >
        </div>
        <div class="add-to-cart">
          <button>ADD TO CART</button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 0 24 24"
            width="24px"
            fill="#000000"
          >
            <path d="M0 0h24v24H0V0z" fill="none" />
            <path
              d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z"
            />
          </svg>
        </div>
        <div class="product-attributes-box">
          <div class="product-info">
            <div class="lable-box">
              <ul class="product-attributes">
                <li v-for="Attribute in Attributes" :key="Attribute.id">
                  <span class="lable"> {{ Attribute.label }}</span>
                  <span class="value">{{ Attribute.value }}</span>
                </li>
                <!-- <span class="value">{{Attribute.value}}</span> -->
              </ul>
            </div>

            <!-- <span>{{Attribute.value}}</span> -->
          </div>
        </div>
        <div class="location">
          <label for="pin">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 0 24 24"
              width="24px"
              fill="#000000"
            >
              <path d="M0 0h24v24H0V0z" fill="none" />
              <path
                d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zM7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 2.88-2.88 7.19-5 9.88C9.92 16.21 7 11.85 7 9z"
              />
              <circle cx="12" cy="9" r="2.5" />
            </svg>
          </label>
          <input
            id="pin"
            name="pin"
            type="tel"
            pattern="[0-9]*"
            maxlength="6"
            placeholder="Enter pincode"
          />
          <span>Change Pin</span>
        </div>
      </div>
    </div>

    <div class="similarProduct">
      <h2>Similar Products</h2>
    </div>
   
    <div class="best-product">
<Carousel :settings="settings" :breakpoints="breakpoints">
<Slide  class="best-product-img carousel__item"
        v-for="BestProduct in BestProducts"
        :key="BestProduct.id_product">
        <div>
 <div class=""> <img :src="BestProduct.image" alt="" /></div>
 <p class=" bestproduct-name">{{ BestProduct.name }}</p>
        <span class=" bestproduct-selling-price"
          >Rs: {{ BestProduct.selling_price }}</span
        >
        <span class=" bestproduct-price">
          Rs: <s>{{ BestProduct.price }}</s>
        </span>
        <span class=" bestproduct-discount"
          >{{ BestProduct.discount }}% off</span
        >

</div>
 <!-- <div class="carousel__item">{{ slide }}</div>
 <div class="carousel__item">{{ slide }}</div>
 <div class="carousel__item">{{ slide }}</div>
 <div class="carousel__item">{{ slide }}</div>
 <div class="carousel__item">{{ slide }}</div>
 -->

</Slide>




      <!-- <div
        class="best-product-img"
        v-for="BestProduct in BestProducts"
        :key="BestProduct.id_product">


        <img :src="BestProduct.image" alt="" />
        <p class="bestproduct-name">{{ BestProduct.name }}</p>
        <span class="bestproduct-selling-price"
          >Rs: {{ BestProduct.selling_price }}</span
        >
        <span class="bestproduct-price">
          Rs: <s>{{ BestProduct.price }}</s>
        </span>
        <span class="bestproduct-discount"
          >{{ BestProduct.discount }}% off</span
        >
      </div> -->

 <template #addons>
      <Navigation />
    </template>





</Carousel>
    </div>









  </div>
</template>
<script>
import Main_header from "./Main_header.vue";
import "vue3-carousel/dist/carousel.css";
// import { defineComponent } from 'vue';
import { Carousel, Slide, Navigation } from "vue3-carousel";
import axios from "axios";
export default {
  name: "SingleProductPage",
  components: {
    Main_header,
    Carousel,
    Slide,
    Navigation,
   
  },

  data() {
    return {
      id_product: "",
      ProductName: "",
      singleProducts: [],
      ProductsInfo: [],
      NewSizeInfo: [],
      Attributes: [],
      BestProducts: [],
      imageURl: "",
       settings: {
      itemsToShow: 1,
      snapAlign: 'center',
    },
     breakpoints: {
      // 700px and up
      700: {
        itemsToShow: 3.5,
        snapAlign: 'center',
      },
      // 1024 and up
      1024: {
        itemsToShow: 5,
        snapAlign: 'star'
    }
  }
  }},

  methods: {
    async singleProductInfo() {
      let data = await axios.get(
        `https://pim.wforwoman.com/pim/pimresponse.php/`,

        {
          params: {
            service: "product",
            store: 1,
            url_key: this.id_product,
          },
        }
      );

      console.log("this is a single product data", data.data);

      console.log("this is product", this.imageURl);

      this.ProductName = data.data.result.name;
      console.log("this is a product name", this.ProductName);
      this.singleProducts = data.data.result.gallery;
      this.ProductsInfo = data.data.result;
      this.NewSizeInfo = data.data.result.new_size_chart.result;
      this.Attributes = data.data.result.visible_attributes;
      this.BestProducts = data.data.result.bestseller_products;
      console.log("this is bestseller product", this.BestProducts);

      console.log("this is a single size data", this.NewSizeInfo);
      console.log("this is a single product data", this.singleProducts);
      console.log("this is a single product info", this.ProductsInfo);
    },
    created() {},
  },

  mounted() {
    this.id_product = this.$route.params.id_product;
    this.singleProductInfo();
    console.log("router", this.$router);
  },
};
</script>
<style>
.upper-product-nav {
  padding: 14px 51px;
  padding-top: 20px;
}
.home-page-link a,
.navigation-arrow {
  font-size: 12px;
  color: #565656;
  margin-right: 5px;
  text-decoration: none;
}

.carousel__item {
  min-height: 200px;
  width: 100%;
 color: var(--vc-clr-white);
  font-size: 20px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.carousel__prev,
.carousel__next {
  box-sizing: content-box;
  border: 5px solid white;
}

.current-product-name {
  font-size: 12px;
  color: #000000;
  margin-right: 5px;
  font-weight: 600;
}

.first-img img {
  width: 100%;
}
.single-product-img {
  width: 60%;
}
.product-info-box {
  width: 40%;
}
.product-info-name {
  margin-bottom: 12px;
  font-weight: 600;
  font-size: 20px;
}
.rating {
  width: 30%;
}
.rating svg {
  margin: 0px 0px;
}
.product-info-selling_price {
  margin: 13px 0px;
}
.single-product {
  display: flex;

  padding: 0px 50px;
}
.product-info-discount {
  margin: 0px 9px;
  color: #ff0000;
}
.product-info-price {
  color: #7e7e7e;
  border-bottom: 1px solid #7e7e7e;
  margin-bottom: 5px;
  margin-top: 1px;
  padding-bottom: 13px;
  font-size: 14px;
}

.product-info-description {
  font-size: 13px;
  border-bottom: 1px solid #7e7e7e;
  margin-bottom: 12px;
  padding: 11px 0px;
}
.product-info-size-box {
  display: flex;
  flex-wrap: wrap;
  left: -7px;
  position: relative;
}
.product-info-Product_Title_FH {
  cursor: pointer;
  margin: 30px 10px;
  padding: 4px 12px;

  margin: 7px;
  padding: 0px 12px;

  border: 1px solid gray;
  border-radius: 7px;
}

/* .product-info ul{
    height: 40px;
} */
.size-box {
  display: flex;
  justify-content: space-between;
  margin-bottom: 7px;
}
.size {
  font-weight: 600;
  font-size: 12px;
}
.size-no {
  color: #7e7e7e;
}
.size-char {
  text-decoration: underline;
  font-weight: 600;
  font-size: 12px;
}
.add-to-cart {
  display: flex;
  align-items: center;
  margin-top: 16px;
}
.add-to-cart button {
  cursor: pointer;
  border: none;
  padding: 20px 0px;
  border-radius: 10px;
  background-color: black;
  color: #ffffff;
  width: 100%;
}
.add-to-cart button:hover {
  background-color: rgb(55, 53, 53);
}
.add-to-cart svg {
  width: 47px;
  margin: 8px;
}
.product-info {
  display: flex;
}
.product-info-color {
  margin-bottom: 6px;
}
.first-img {
  width: 90%;
}
.product-attributes-box {
  margin-top: 23px;
}
.product-attributes {
  padding-left: 0;
  margin-bottom: 0;
  margin-top: 12px;
  display: flex;
  flex-flow: row wrap;
}
.product-attributes li {
  list-style: none;
  vertical-align: top;
  line-height: 15px;
  border-bottom: 1px solid #eaeaec;
  margin: 0 0 8px;
  padding: 0 0 7px;
  width: 45%;
}
.product-attributes li:nth-child(odd) {
  margin-right: 10%;
}
.product-attributes li span {
  line-height: 18px;
  display: inline-block;
  vertical-align: top;
}
/* .lable-box {
  width: 32%;
} */
.lable {
  float: left;
  width: 100%;
  text-align: left;
  font-size: 12px;
  color: #7e818c;
  position: relative;
}
.value {
  width: 100%;
  text-align: left;
  color: #282c3f;
  font-size: 15px;
  word-break: break-word;
  font-size: 12px;

  /* width: 100%;
  text-align: left;
  color: #282c3f;
  font-size: 15px;
  word-break: break-word; */
}
.best-product {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 0px 23px;
}
.best-product-img {
  width: 25%;
  margin-bottom: 31px;
}
.similarProduct {
  margin: 30px 27px;
  margin-bottom: 15px;
  justify-content: center;
  align-items: center;
  display: flex;
}
.location {
  /* display: flex; */
  justify-content: flex-start;
  align-items: center;
  /* width: 82%; */
  background-color: #d0cece;
  border-radius: 6px;
  margin-top: 20px;
  padding: 6px;
}
.location svg {
  width: 23px;
  margin: -7px 5px;
  cursor: pointer;
}
.location span {
  cursor: pointer;
  float: right;
  margin-right: 16px;
  font-weight: 600;
}
.location input {
  border: none;
  background: #e8e8e8ed;
  padding: 6px;
  border-radius: 4px;
}
.location input:focus {
  outline: none;
}
.bestproduct-name,
.bestproduct-price {
  color: #7e7e7e;
}
.bestproduct-discount {
  color: #ff0000;
  margin-left: 6px;
}

@media (max-width: 767px) {
  .upper-product-nav {
    padding: 0px 23px;
    padding-top: 15px;
  }
  .single-product-img {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
  }
  .first-img {
    width: 50%;
  }
  .product-info-box {
    width: 100%;
  }
  .single-product {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding: 23px;
  }
  .nav_links {
    z-index: 22222;
    /* justify-content: center; */
    display: flex;
    flex-direction: row;
    position: absolute;
    top: 14vh;
    background-color: #272727d1;
    transform: translateX(-100vw);
    transition: all 0.5s ease-in-out;
    width: 100%;
    top: -16px;
    left: 0;
  }
  .active {
    transform: translateX(0vw);
  }
  .product-info-description {
    width: 90vw;
  }
  .rating {
    width: 33vw;
  }

  .product-info-price {
    width: 90vw;
  }
  .product-info-size-box {
    width: 100%;
  }
  .best-product {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    /* flex-direction: column; */
    /* /* padding: 23px; */
  }
  .best-product-img {
    width: 50%;
    margin-bottom: 31px;
  }
  .best-product-img img {
    width: 97%;
  }
  .location .lable {
    margin: -6px -8px;
  }
  .location svg {
    margin: 0px 0px;
  }
  .location span {
    margin: auto;
    padding-left: 3px;
  }
  .similarProduct {
    margin: 6px 28px;
  }
  .add-to-cart button {
    cursor: pointer;
    border: none;
    width: 95vw;
    padding: 17px 57px;
    border-radius: 10px;
    background-color: black;
    color: #ffffff;
    width: 100%;
  }
  .location {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: auto;
    background-color: #d0cece;
    border-radius: 6px;
    margin-top: 20px;
    padding: 6px;
  }
}
</style>
