

import axios from 'axios';

export default class Global {


    urlBase = 'https://master-framewoks-js.herokuapp.com/api/';
    urlPlaceHolder = 'https://jsonplaceholder.typicode.com/posts';
    urlImage = this.urlBase + 'get-image/';


    //sufijos
    SuffixArticlesAll = 'articles/null/null';
    SuffixArticlesLast = 'articles/last/null';

    random = function () {
        return '?' + Math.random();
    }


    ImagePreview = async function (filaData) {

        if (filaData != null) {

            
            return new Promise((resolve) => {

                // Show preview 
                var mimeType = filaData.type;
                if (!mimeType.match('image.*')) {
                    return resolve(null);
                }


                var reader = new FileReader();
                reader.readAsDataURL(filaData);
                reader.onload = function () {
                    resolve(reader.result);
                }

            });

        }

    }


    uploadImage = async function (url, image, id) {

        if (image !== null) {

            var fd = new FormData();

            fd.append('file', image, id + ".jpg");

            return new Promise((resolve) => {

                axios.post(url , fd)
                    .then(res => {
                        resolve(res.data.status);
                    }).catch(() => {
                        resolve('error')
                    });

            });


        }

    }

}//end class
