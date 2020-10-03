

import axios from 'axios';

export default class Global {



  url = function () {
    return 'http://localhost:3900/api/';
  }

  placeholderurl = function () {
    return 'https://jsonplaceholder.typicode.com/posts';
  }


  urlBase = 'http://localhost:3900/api/';
  articles = 'articles/null/null';
  get_Image = 'get-image/';


  fd = new FormData();

  getImage = function (id) {
    return this.urlBase + '/get-image/' + id + '.jpg';
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


  update = async function (object) {

    return new Promise((resolve) => {

      axios.put(this.urlBase + 'update', object)
        .then(res => {
          if (res.data.article != null) {
            resolve(res.data.article);
          } else {
            resolve([]);
          }
        }).catch(err => {
          resolve([]);
        });

    });

  }



  delete = async function (id) {

    this.articles = 'delete/' + id;


    return new Promise((resolve) => {
      axios.delete(this.urlBase + this.articles)
        .then(res => {
          if (res.data.article != null) {
            resolve(res.data.article);
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




  uploadImage = async function (event, id) {

    if (event != null) {

      this.selectedFile = event.target.files[0];
      this.fd.append('file', this.selectedFile, id + ".jpg");

      return new Promise((resolve) => {

        axios.post(this.url + "article-image/", this.fd)
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


