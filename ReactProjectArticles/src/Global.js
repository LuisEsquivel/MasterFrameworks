



export default class Global {

 
  
    url = function() {
      return 'http://localhost:3900/api/';
    }
  
     placeholderurl = function () {
      return 'https://jsonplaceholder.typicode.com/posts';
    }
  
  
    articles = 'articles/null/null';


    /*
  
    ImagePreview = async function (event) {
  
      var fileData: File = <File>event.target.files[0];
  
      if (fileData != null) {
  
        // Show preview 
        var mimeType = fileData.type;
        if (!mimeType.match('image.*')) {
          return null;
        }
  
        //return response in resolve
        return new Promise<object>((resolve) => {
          var reader = new FileReader();
          reader.readAsDataURL(fileData);
          reader.onload = function (_event) {
            resolve(reader.result);
          }
  
        });
  
  
      }//end if fileData
  
      return null;
  
    }
  
    */
  
  }
  
  
  