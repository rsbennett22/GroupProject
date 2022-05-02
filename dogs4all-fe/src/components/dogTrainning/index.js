import axios from "axios";
import React, { useCallback, useState, useEffect } from "react";
import styles from "./style.module.css";
import Slider from "antd/es/slider";
import CheckBox from "antd/es/checkbox";
import Select from "antd/es/select";
import Pagination from "antd/es/pagination";
import message from "antd/es/message";
import _ from "lodash";

const CheckboxGroup = CheckBox.Group;

// 真实联调解开下面的代码
// const apiGetTrainningList = _.debounce((req, cb) => {
//   let data = null,
//     err = null;
//   axios
//     .post("/api/dogTraining/search", req)
//     .then((res) => (data = res.data))
//     .catch((e) => (err = e))
//     .finally(() => cb(err, data));
// }, 300);

// 仅供本地查看页面使用，真实联调需要把此方法注释掉
const apiGetTrainningList = (req, cb) =>
  setTimeout(() => {
    const total = 100;
    cb(null, {
      total,
      list: new Array(20).fill("").map((c, i) => ({
        avatar: "https://react.docschina.org/search.svg",
        title: "Nested media heading",
        desc: "Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis.",
        id: i,
      })),
    });
  }, 1000);

const DogTraining = () => {
  const [dataList, setDataList] = useState([]);
  const [searchVal, setSearchVal] = useState({});
  const [loading, setLoading] = useState(false);
  const [sort, setSort] = useState("RATING DESC");
  const [total, setTotal] = useState(0);
  const [pageNo, setPageNo] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    getDataList();
  }, [searchVal, pageSize, pageNo, sort]);

  const getDataList = useCallback(() => {
    setLoading(true);
    const request = {
      ...searchVal,
      pageNo,
      pageSize,
      sort,
    };
    apiGetTrainningList(request, (err, res) => {
      setLoading(false);
      if (err) {
        message.error("Failed to get search result");
        return;
      }
      const { total, list } = res;
      setTotal(total);
      setDataList(list);
    });
  }, [pageNo, pageSize, searchVal, sort]);

  const handleSearchFieldChange = (fieldName, val) => {
    setSearchVal((s) => ({
      ...s,
      [fieldName]: val,
    }));
  };

  return (
    <div className={styles.screen}>
      <aside className={styles.aside}>
        <div className={styles.formItem}>
          <div className={styles.label}>PRICE ($)</div>
          <div className={styles.control}>
            <Slider
              min={0}
              max={200}
              range
              marks={{
                0: "0",
                200: "200",
              }}
              defaultValue={[0, 0]}
              onChange={(val) => handleSearchFieldChange("price", val)}
            />
          </div>
        </div>
        <div className={styles.formItem}>
          <div className={styles.label}>DISTANCE (miles)</div>
          <div className={styles.control}>
            <Slider
              min={0}
              max={200}
              marks={{
                0: "0",
                200: "200",
              }}
              range
              defaultValue={[0, 0]}
              onChange={(val) => handleSearchFieldChange("distance", val)}
            />
          </div>
        </div>
        <div className={styles.formItem}>
          <div className={styles.label}>RATING</div>
          <div className={styles.control}>
            <CheckboxGroup
              options={[
                { label: "1 Star", value: 1 },
                { label: "2 Star", value: 2 },
                { label: "3 Star", value: 3 },
                { label: "4 Star", value: 4 },
                { label: "5 Star", value: 5 },
              ]}
              onChange={(val) => handleSearchFieldChange("rating", val)}
            />
          </div>
        </div>
        <div className={styles.formItem}>
          <div className={styles.label}>HAS AVAILABILITY</div>
          <div className={styles.control}>
            <CheckboxGroup
              options={[
                { label: "Yes", value: 1 },
                { label: "No", value: 0 },
              ]}
              onChange={(val) =>
                handleSearchFieldChange("has_availability", val)
              }
            />
          </div>
        </div>
        <div className={styles.formItem}>
          <div className={styles.label}>TRAINING STYLE</div>
          <div className={styles.control}>
            <CheckboxGroup
              options={[
                { label: "Obedience", value: "Obedience" },
                { label: "Agility", value: "Agility" },
                { label: "Behvioral", value: "Behvioral" },
                { label: "Service", value: "Service" },
                { label: "Tracking", value: "Tracking" },
                { label: "Protection", value: "Protection" },
              ]}
              onChange={(val) => handleSearchFieldChange("training_style", val)}
            />
          </div>
        </div>
      </aside>
      <main className={styles.main}>
        {loading && <div className={styles.loading}>SEARCHING...</div>}
        <div className={styles.content}>
          <div className={styles.actionBar}>
            <Select
              placeholder="SORT BY"
              value={sort}
              style={{ width: 200 }}
              options={[
                { label: "RATING DESC", value: "RATING DESC" },
                { label: "PRICE DESC", value: "PRICE DESC" },
                { label: "DISTANCE DESC", value: "DISTANCE DESC" },
              ]}
              onChange={(val) => setSort(val)}
            />
            <Pagination
              pageNo={pageNo}
              className={styles.pagenation}
              total={total}
              onChange={(p) => setPageNo(p)}
              onShowSizeChange={(s) => setPageSize(s)}
            />
          </div>
          <div className={styles.list}>
            {dataList.map(({ avatar, title, id, desc }) => (
              <div className={styles.listItem} key={id}>
                <img src={avatar} alt={title} />
                <h4>{title}</h4>
                <p>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};
export default DogTraining;
