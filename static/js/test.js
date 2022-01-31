console.log('connected')
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";
new Vue({
  el: "#app",
  delimiters: ["[[", "]]"],
  data: function () {
    return {
      allTasks: [],
      newTask: false, // for edit on same place
      newTaskValue: "", // for edit on same place
      editId: null, // for edit on same place
      oldTask: {}, // for edit on same place
    };
  },
  methods: {
    // list all task
    getTasks: function () {
      axios
        .get("/api/v1/list")
        .then((resp) => {
          this.allTasks = resp.data;
        })
        .catch((error) => console.log(error));
    },

    // add task
  submitNewTask: function () {
    var newTask = {
      title: this.newTaskValue,
      completed: false,
    };
    axios
      .post("/api/v1/create", newTask)
      .then((resp) => {
        // console.log(newTask);
        this.newTask = false;
        this.allTasks.push(resp.data);
      })
      .catch((error) => {
        console.log("Error", error);
      });
  },
//   delete task 
  deleteTask: function (id) {
      tasklist = [];
      axios
      .delete('api/v1/delete/'+id)
      .then((resp) => {
        for (let i=0; i<this.allTasks.length; i++){
            if(this.allTasks[i].id != id){
                tsk = this.allTasks[i]
                tasklist.push(tsk)
            }
        }
        this.allTasks=tasklist
      })
      .catch((error) => console.log(error));
  },
//   get task for editmode 
//     getTaskfromID: function(id){
//         for (let i = 0; i<allTasks.length; i++){
//             if ( this.allTasks[i].id == id ){
//                 return this.allTasks[i];
//             }
//         }
// },
getTaskfromID: function (id) {
  for(var i=0; i<this.allTasks.length; i++){
      if (this.allTasks[i].id == id){
          return this.allTasks[i];
      }
  }
},
//   edit task 
    editMode: function (id){
        this.editId = id;
        this.oldTask = Object.assign ({}, this.getTaskfromID(id));
        // console.log(this.oldTask);
    },
    // save for edit mode 
    saveClk: function  (id) {
      var newTask = this.getTaskfromID(id);
      axios
          .post('/api/v1/update/' + id, newTask)
          .then( () => {
              this.editId = null;
              this.oldTask = {};
          })
          .catch(error => {
              console.log("Error", error);
          })
  },
    // cancel for edit mode 
    cancelClk: function(id){
        this.editId = null;
            for(let i=0; i<this.allTasks.length; i++){
                if (this.allTasks[i].id == id){
                    this.allTasks[i] = this.oldTask;
                    this.oldTask = {};
                    return
                }
            }
    }
  },

  mounted: function () {
    this.getTasks();
  },
});



// axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
// axios.defaults.xsrfCookieName = "csrftoken";

// new Vue({
//     el: '#app',
//     delimiters: ['[[', ']]'],
//     data: function () {
//         return {
//             allTasks: [],
//             newTask: false,
//             newTaskValue: "",
//             editId: null,
//             oldTask: {}
//         }
//     },
//     methods:  {
//         // All task 
//         getTasks: function () {
//             axios
//                 .get('/api/v1/list')
//                 .then((resp) => {
//                     this.allTasks = resp.data
//                 })
//                 .catch(error => console.log(error))
//         },
        
//         // add task 
//         submitNewTask: function () {
//             var newTask = {
//                 'title': this.newTaskValue,
//                 'completed': false
//             }
//             axios
//                 .post('/api/v1/create', newTask)
//                 .then( resp => {
//                     this.newTask = false;
//                     this.allTasks.push(resp.data)
//                 })
//                 .catch (error => {
//                     console.log("Error", error);
//                 })
//         }
//     },
//     mounted: function () {
//         this.getTasks();
//     }
// })