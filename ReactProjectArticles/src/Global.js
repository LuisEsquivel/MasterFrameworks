

import axios from 'axios';

export default class Global {



  url = function () {
    return 'https://master-framewoks-js.herokuapp.com/api/';
  }

  placeholderurl = function () {
    return 'https://jsonplaceholder.typicode.com/posts';
  }


  urlBase = 'https://master-framewoks-js.herokuapp.com/api/';
  articles = 'articles/null/null';
  get_Image = 'get-image/';


  fd = new FormData();

  getImage = function (id) {
    return this.urlBase + '/get-image/' + id + '.jpg?'+Math.random();
  }


  getArticles = async function (id, last) {


    if (id != null) {
      this.articles = 'articles/null/' + id;
    }

    if (last) {
      this.articles = 'articles/last/null';
    }


    //return response in resolve
    return new Promise((resolve) => {

      axios.get(this.urlBase + this.articles)
        .then(
          res => {
            if (res.data.articles != null) {
              resolve(res.data.articles);
            } else {
              resolve([]);
            }

            // alert(JSON.stringify(res));
          }

        ).catch(
          err => {
            resolve([]);
          }
        )


    });

  }


  search = async function (searched) {


    this.articles = 'search/' + searched;


    //return response in resolve
    return new Promise((resolve) => {

      axios.get(this.urlBase + this.articles)
        .then(
          res => {
            if (res.data.articles != null) {
              resolve(res.data.articles);
            } else {
              resolve([]);
            }

            // alert(JSON.stringify(res));
          }

        ).catch(
          err => {
            resolve([]);
          }
        )


    });

  }


  create = async function (object) {

    return new Promise((resolve) => {

      axios.post(this.urlBase + 'save', object)
        .then(res => {
          if (res != null) {
            resolve(res);
          } else {
            resolve([]);
          }
        }).catch(err => {
          resolve([]);
        })

    });

  }


  update = async function (object, updateImage = false) {


    return new Promise((resolve) => {

      axios.put(this.urlBase + 'article/'+updateImage, object)
        .then(res => {
          if (res != null) {
            resolve(res);
          } else {
            resolve([]);
          }
        }).catch(err => {
          resolve([]);
        });

    });

  }



  delete = async function (id) {

    return new Promise((resolve) => {
      axios.delete(this.urlBase + 'article/'+id)
        .then(res => {
          if (res != null) {
            resolve(res);
          } else {
            resolve([]);
          }
        })
        .catch(
          err => {
            resolve([]);
          }
        )
    });


  }




  uploadImage = async function (image, id) {

    if (image !== null) {

      this.fd.append('file', image, id + ".jpg");

      return new Promise((resolve) => {

        axios.post(this.urlBase + "article-image/", this.fd)
          .then(res => {
            resolve(res.data.status);
          }).catch(err => {
            resolve('error')
          });

      });


    }



  }

  ImagePreview = async function (event) {

    var fileData = event.target.files[0];

    if (fileData != null) {

      // Show preview 
      var mimeType = fileData.type;
      if (!mimeType.match('image.*')) {
        return null;
      }

      //return response in resolve
      return new Promise((resolve) => {

        var reader = new FileReader();
        reader.readAsDataURL(fileData);
        reader.onload = function (_event) {
          resolve(reader.result);
        }

      });


    }//end if fileData


    return null;

  }//end function ImagePreview

}//end class


