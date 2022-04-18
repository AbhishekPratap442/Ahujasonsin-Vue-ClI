<template>
  <Main_header />
  <div>
    <div v-if="loading" class="loader"></div>
    <div>{{ spinner }}</div>
    <div>
      <div class="container">
        <div id="proheading">
          <p>{{ productName }}</p>
          <span>{{ productCount }} Items</span>
          <span v-show="this.productCount < 1"> No result found </span>
        </div>
      </div>
    </div>

    <div class="filters">
      <div class="applied_filter">
        <ul
          v-for="(checkedValues, index) in checkedValues"
          :key="checkedValues.index"
        >
          <li>
            {{ checkedValues }}
            <svg
              v-on:click="closedFilter(index)"
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 0 24 24"
              width="24px"
              fill="#000000"
            >
              <path d="M0 0h24v24H0V0z" fill="none" />
              <path
                d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"
              />
            </svg>
          </li>
        </ul>
      </div>
      <div class="left_filter" v-on:click="filterSeen = !filterSeen">
        <h3 v-on:click="showfilter = !showfilter">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18.467"
            height="11.654"
            viewBox="0 0 18.467 11.654"
          >
            <g transform="translate(-1149.5 42.429)">
              <rect
                width="8.992"
                height="1.869"
                transform="translate(1149.5 -40.656)"
              />
              <rect
                width="3.932"
                height="1.869"
                transform="translate(1164.035 -40.656)"
              />
              <rect
                width="8.992"
                height="1.869"
                transform="translate(1167.967 -32.406) rotate(-180)"
              />
              <rect
                width="3.932"
                height="1.869"
                transform="translate(1153.432 -32.406) rotate(-180)"
              />
              <rect
                width="1.74"
                height="5.35"
                transform="translate(1160.393 -42.429)"
              />
              <rect
                width="1.74"
                height="5.35"
                transform="translate(1154.987 -36.124)"
              />
            </g>
          </svg>
          <span @click="toggleDetails">{{
            detailsAreVisible ? "HIDE FILTER" : "SHOW FILTER"
          }}</span>
        </h3>
      </div>

      <div class="right_filter">
        <select
          name="shrot_by"
          id="shrot_by"
          @change="sortingdatabyprice()"
          v-model="shrot_by"
        >
          <option value="" selected>SORT BY</option>
          <option
            :value="sort.code"
            v-for="sort in productsSort"
            :key="sort.id"
          >
            {{ sort.label }}
          </option>
        </select>
      </div>
    </div>

    <div class="products_img">
      <div class="side_filter" v-if="filterSeen">
        <div>
          <div class="btn" :class="[ this.productFilterCetegory.length==0 ? 'removefilterbox' : 'block'  ]">
            <button @click="removeFilter">Remove Filter</button>
          </div>
          <h3
            class="filter_type"
            v-for="filters in productFilter"
            :key="filters.id"
          >
            <div
              v-on:click="filters.isVisible = !filters.isVisible"
              class="filter_type_option"
            >
              <span>{{ filters.filter_lable }}</span>
              <span>
                <svg
                  v-show="!filters.isVisible"
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 0 24 24"
                  width="24px"
                  fill="#000000"
                >
                  <path d="M0 0h24v24H0V0z" fill="none" />
                  <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
                </svg>
                <svg
                  v-show="filters.isVisible"
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 0 24 24"
                  width="24px"
                  fill="#000000"
                >
                  <path d="M0 0h24v24H0V0z" fill="none" />
                  <path d="M19 13H5v-2h14v2z" />
                </svg>
              </span>
            </div>

            <div class="options_box">
              <div class="filter_type_sub_option" v-show="filters.isVisible">
                <ul v-for="option in filters.options" :key="option.value_key">
                  <label class="checkbox" >
                   

                  <input

                  v-model="option.value_key"
                  type="checkbox"
                  checked
                    @click="
                      sortingdatabyfilter(checkbox, option.value, option.code)
                    "
                  />
                  <span class="checkmark" :class="[ getFilterStatus(option) ? 'checkmarkbg' : ''  ]"></span>
                    <span class="labels"> {{ option.value }} ({{ option.total }})</span>
                  </label
                  >
                </ul>
              </div>
            </div>
          </h3>
        </div>
      </div>

      <div class="api_products" :disabled="loading">
        <div v-for="item in list" :key="item.id" class="api_products_img">
          <div class="productImg">
            <img :src="item.image" />
            <div class="productsSpecs">
              <h4>{{ item.name }}</h4>
              <span>Rs{{ item.selling_price }}</span>
              <span id="discount">-{{ item.discount }}%</span>
              <span id="stock">{{ item.stock_status }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ---------------------------page------------------------ -->

    <div class="pagesnation">
      <div class="page" v-if="this.productCount / 20 > 1">
        <p>
          Page {{ this.pageofpagination }} of
          {{ Math.ceil(this.productCount / 20) }}
        </p>
      </div>

      <div class="Pagenation_count">
        <ul class="no_pages" v-if="this.productCount / 20 > 1">
          <li
            class="active"
            v-for="page in paginationLoopMethod()"
            :key="page"
            @click="pagination(page)"
          >
            {{ page }}
          </li>

          <li v-if="this.productCount / 20 > 1">.....</li>

          <li
            v-if="this.productCount / 20 > 1"
            @click="pagination( Math.ceil(this.productCount / 20))"
          >
            {{ Math.ceil(this.productCount / 20) }}
            <!-- v-bind="page" -->
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Main_header from "./Main_header.vue";

export default {
  name: "ProductsPage",
  components: {
    Main_header,
  },
  props: {
    productFilter: Array,
  },
  data() {
    return {
      list: [],
      productsSort: [],
      productCount: "",
      productName: "",
      selected: "selected",
      detailsAreVisible: false,
      filterSeen: false,
      showfilter: false,
      isVisible: false,
      closeFilter: false,
      shrot_by: "",
      value: "",
      filtersoptions: "",
      checkparam: "",
      pageofpagination: 1,
      productFilterCetegory: [],
       loading: false,
      spinner: "",
      checkedValues: [],
    };
  },
  methods: {
    paginationLoopMethod(){
       if(this.pageofpagination <  Math.ceil(this.productCount / 20 )){

     return  this.getNumbers(this.pageofpagination,this.pageofpagination+6)
       }
       else if(this.pageofpagination >=  Math.ceil(this.productCount / 20 )){
         return this.getNumbers(this.pageofpagination-6,this.pageofpagination)
       }
    },

      getNumbers(start,stop){
            return new Array(stop-start).fill(start).map((n,i)=>n+i);
        },




    getFilterStatus(option){
      return this.productFilterCetegory.includes(option.code+'-'+option.value)
    },
    async productInfoData() {

          
this.$router.push({
           query: {
            service: "category",
            store: 1,
            url_key: "top-wear-kurtas",
            page: this.pageofpagination,
            count: 20,
            sort_by: this.shrot_by,
            sort_dir: "desc",
            filter: this.filtersoptions,
      }})

console.log("before");
      this.loading = true;
      let data = await axios.get(
        `  https://pim.wforwoman.com/pim/pimresponse.php`,
        {
          params: {
            service: "category",
            store: 1,
            url_key: "top-wear-kurtas",
            page: this.pageofpagination,
            count: 20,
            sort_by: this.shrot_by,
            sort_dir: "desc",
            filter: this.filtersoptions,
          },
        }
      );
console.log("after");

      this.loading = false;
      this.list = data.data.result.products;
      this.productsSort = data.data.result.sort;
      this.productCount = data.data.result.count;
      this.productName = data.data.result.name;
console.log("after-after");

    },

    sortingdatabyfilter(checked, value, code) {
      console.log("checked=", checked, "value=", value, "code=", code);

      if (
        !this.productFilterCetegory.includes(`${code}-${value}`  || !this.checkedValues.includes(`${value}`))
      ) { 
        this.productFilterCetegory.push(`${code}-${value}`);
        this.checkedValues.push(`${value}`);
        this.filtersoptions = this.productFilterCetegory.toString();
       } else {
        let checkingIndex = this.productFilterCetegory.indexOf(
          `${code}-${value}`
        );
        let checkedValuesIndex = this.checkedValues.indexOf(`${value}`);
        this.productFilterCetegory.splice(checkingIndex, 1);
        this.checkedValues.splice(checkedValuesIndex, 1);
        this.filtersoptions = this.productFilterCetegory.toString();
      }

      
       this.productInfoData();
    },

    closedFilter(index) {
      console.log("this function is called" ,this.value);
      console.log("AAA", this.checkedValues);
      if(this.checkedValues.includes(index)==this.productFilterCetegory.includes(index)){
      this.checkedValues.splice(index, 1);
      this.productFilterCetegory.splice(index, 1)
      this.filtersoptions = this.productFilterCetegory.toString();
      }
      this.productInfoData();

      
    },

    removeFilter() {
         this.productFilterCetegory = [];
        this.shrot_by = "";
        this.checkedValues=[]
        this.filtersoptions = this.productFilterCetegory.toString();
       this.productInfoData();
    },

    sortingdatabyprice(shrot_by) {
      this.checkparam = shrot_by;
      // console.log("this is sort filter", this.shrot_by);
      this.productInfoData();
    },

    toggleDetails() {
      this.detailsAreVisible = !this.detailsAreVisible;
    },

    pagination(paginationNumbers) {
      this.pageofpagination = paginationNumbers;
      console.log(this.pageofpagination);

      this.productInfoData();
    },
  },

  mounted() {
    this.productInfoData();
  },
};
</script>
<style scoped>
.loader {
  position: absolute;

  left: 48vw;
  top: 35vh;
  border: 6px solid #f3f3f3;
  border-top: 6px solid #720c03;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

.hide {
  display: none;
}

body {
  box-sizing: border-box;
  margin: 0 auto;
  padding: 20px;
}

.filters {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 26px;
}

.left_filter {
  border: 1px solid;
  padding: 12px 12px;
  cursor: pointer;
}

.left_filter h3 {
  font-size: 12px;
  font-weight: 100;
}

.left_filter h3 svg {
  width: 14px;
  padding: 0px 9px;
}

.right_filter {
  border: 1px solid;
}

.right_filter select {
  border: none;
  padding: 12px 15px;
  cursor: pointer;
  width: 226px;
  height: 41px;
  font-weight: 100;
  font-size: 13px;
  font-family: "Jost";
}

.right_filter select option {
  padding: 12px 12px;
}

/* Customize the label (the container) */

.checkbox {
  cursor: pointer;
  display: flex;
  align-items: center;
  margin: 10px 0;
}

.checkbox .label {
  font-size: 12px;
  margin: 0 10px;
}
.uncheckmark{
   width: 12px;
  height: 12px;
  border: 1px solid;
  display: inline-block;
  border-radius: 0px;
  background: #fcfcfc
    url(https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/White_check.svg/1200px-White_check.svg.png)
    center/1250% no-repeat;
}
.checkbox .checkmark {
  width: 12px;
  height: 12px;
  border: 1px solid;
  display: inline-block;
  border-radius: 0px;
  margin-right: 12px;
  
}

.checkbox input:checked + .checkmark {
  background-size: 60%;


}
.removefilterbox{
  display: none;
}
.checkmarkbg{
  background: #4c0b36
    url(https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/White_check.svg/1200px-White_check.svg.png)
    center/1250% no-repeat;
}
.checkbox input {
  display: none;
}

.options_box {
  border-bottom: 1px solid;
  margin-bottom: 8px;
}

.applied_filter {
     display: flex;
    position: absolute;
    left: 17vw;
    max-width: 57%;
    flex-wrap: wrap;
}

.applied_filter ul {
    border: 1px solid;
    border-radius: 20px;
    margin: 7px 12px;

}

.applied_filter ul li {
  list-style: none;
  font-weight: 900;
  font-size: 9px;
  display: flex;
  padding: 1px 12px;
  align-items: center;
}

/* -------------------------------------Products -------------------- */
.products_img {
  display: flex;
  padding: 26px;
  box-shadow: 0px 5px 0px -4px #e4e4e4;
}

.side_filter {
  padding-right: 22px;
  width: 18%;
}

.filter_type {
  font-size: 14px;
  font-weight: 100;
}

.filter_type_option {
  display: flex;
  align-items: center;
  justify-content: space-between;

  margin-bottom: 1px;
}

.filter_type_option span {
  margin: 9px 0px;
}

.filter_type_sub_option ul {
  max-height: 250px;
  overflow: auto;
  display: flex;
  align-items: center;
  /* padding: 0px 4px; */
  list-style: none;
}

.filter_type_sub_option ul li {
  padding-left: 12px;
  /* width: 300px; height: 200px; overflow: auto */
}

svg {
  width: 15px;
}

#checkbox {
  color: red;
}

.api_products {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.api_products_img {
  width: 22%;
}

.productImg img {
  width: 100%;
}

.productsSpecs {
  margin-bottom: 29px;
}

.productImg h4 {
  font-size: 14px;
  font-weight: 100;
}

.productImg span {
  font-size: 14px;
  color: #4c0b36;
}

#discount {
  padding: 0px 22px;
  color: red;
}

#stock {
  font-size: 14px;
  color: green;
}

/* .btn{
    position: relative;
    left: 18vw;
    top: 12vh;
    display: inline-block;
} */
.btn button {
  font-size: 12px;
  font-weight: 100;
  border: 1px solid;
  padding: 12px 12px;
  cursor: pointer;
  background-color: #ffffff;
}

/* -------------------------page------------------------------  */
.page {
  margin-top: 15px;
  margin-left: 23px;
  margin-right: 0px;
  position: absolute;
}

.no_pages {
  display: flex;
  list-style: none;
  position: absolute;
  left: 38vw;
}

.no_pages li {
  cursor: pointer;
  padding: 9px 15px;
  margin: 5px 0px;
}

/* .active, .no_pages li:hover {
  background-color: #666;
  color: white;
} */
.no_pages li .active {
  background-color: #4c0b36;
  color: #ffffff;
}

.no_pages li:hover {
  background-color: #4c0b36;
  color: #ffffff;
}

.no_of_pages {
  display: flex;
}

.Pagenation_count {
  display: flex;
  position: absolute;
}

.pagesnation {
  margin: 35px 0px;
  display: flex;
  position: relative;
}

.midPageCount {
  position: absolute;
  cursor: pointer;
  left: 60vw;
  list-style: none;
}

.lastPageCount {
  position: absolute;
  cursor: pointer;
  left: 63vw;
  list-style: none;
}

.no_pages span {
  font-family: "Jost";
  font-size: 18px;
  margin: 8px;
  padding: 9px;
}

.no_pages span:last-child {
  border: 1px solid #e4e4e4;
}

.no_pages span:hover {
  cursor: pointer;
  color: white;
  background-color: #4c0b36;
}

@media (max-width: 767px) {
  .btn {
    position: absolute;
    right: 26px;
  }

  .api_products_img {
    width: 49%;
  }
  .applied_filter{
    display:none;
  }

  .filters {
    display: flex;
    padding: 0px;
    width: 100%;
    z-index: 2222;
    position: fixed;
    bottom: 0;
    background-color: white;
    justify-content: space-evenly;
  }

  .left_filter {
    width: 48%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .right_filter {
    width: 52%;
  }

  .right_filter select {
    padding: 13px 7px;
  }

  .options_box {
    border-bottom: 1px solid;
    margin-bottom: 8px;
  }

  .side_filter {
    width: 100%;
    position: relative;
    background: #ffffff;
    border: none;
    top: -30vh;
    z-index: 1;
    left: 0px;
    padding: 26px;
  }

  .products_img {
    padding: 4px;
  }

  #shrot_by {
    width: 93%;
  }

  /* -----------------------page------------------ */
  .page {
    font-size: 12px;
    margin-top: 5px;
    margin-left: 23px;
    margin-right: 0px;
  }

  .no_pages {
    margin: 0px 1px;
    font-size: 12px;
  }

  .no_pages li {
    cursor: pointer;
    padding: 0px 5px;
  }

  .no_pages span {
    font-family: "Jost";
    font-size: 14px;
    margin: 2px;
    padding: 8px;
  }

  .loader {
    position: absolute;

    left: 42vw;
    top: 35vh;
    border: 6px solid #f3f3f3;
    border-top: 6px solid #720c03;
    border-radius: 50%;
    width: 36px;
    height: 36px;
    animation: spin 2s linear infinite;
  }
}
</style>
