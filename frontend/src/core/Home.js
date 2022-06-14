import React, { useState, useEffect } from "react";
import "../styles.css";
import { API } from "../backend";
import Base from "./Base";
import Card from "./Card"
import { getProducts } from "./helper/coreapicalls";
import { getCategories } from "../admin/helper/adminapicall";
const Home = () => {
  const [products, setProducts] = useState([])
  const [error, setError] = useState(false)
  const [refresh, setRefresh] = useState(false);
  const [category, setCategory] = useState("all");
  const [categories, setCategories] = useState("");
  const loadAllProduct = () => {
    getProducts().then(data => {
      if (data.error) {
        setError(data.error)
      } else {
        setProducts(data);
      }
    })
  }

  const preload = () => {
    getCategories().then(data => {
      //console.log(data);
      if (data.error) {
        setError(true);
      } else {
        setCategories(data)
      }
    });
  };


  const handleChange = name => event => {

    const value = event.target.value;
    console.log(value);
    setCategory(value);
  };

  useEffect(() => {
    loadAllProduct()
    preload()
  }, [])
  return (
    <Base title="Home Page" description="Welcome to the PCMB book store">
      <div className="btn btn-secondary dropdown-toggle" style={{float: 'right'}}>
        <select
          onChange={handleChange("category")}
          className="form-control textAlign=right"
          placeholder="Category"
        >
          <option value={"all"}>Select</option>
          {categories &&
            categories.map((cate, index) => (
              <option key={index} value={cate.name}>
                {cate.name}
              </option>
            ))}
        </select>
      </div>

      <div className="row text-center">

        <div className="row">

          { category!=="all"&& products.map((product, index) => {
            return (product.category.name==category&&
              <div key={index} className="col-4 mb-4">
                <Card product={product} refresh={refresh} setRefresh={setRefresh} />
              </div>
            )

          })}


            { category==="all"&& products.map((product, index) => {
            return (
              <div key={index} className="col-4 mb-4">
                <Card product={product} refresh={refresh} setRefresh={setRefresh} />
              </div>
            )

          })}
        </div>


      </div>
    </Base>
  );
}

export default Home;