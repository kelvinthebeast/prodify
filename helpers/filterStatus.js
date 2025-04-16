/**
 * 
 * @param {*} query 
 * @returns filterStatus
 * @description Filter status for products
 */
module.exports = (query) => {
  const filterStatus =  [
      {
        name: "All",
        status:"",
        class: "",
  
      }, {
        name:"Active",
        status:"active",
        class: "",
      },
      {
        name: "Inactive",
        status: "inactive",
        class: "",
      }
    ]
  
    if (query.status) {
      const statusIndexOfObject = filterStatus.findIndex((item)=> item.status == query.status)
      filterStatus[statusIndexOfObject].class = "active";
    } else {
      const statusIndexOfObject = filterStatus.findIndex((item)=> item.status == "")
      filterStatus[statusIndexOfObject].class = "active";
    }
    return filterStatus;
}