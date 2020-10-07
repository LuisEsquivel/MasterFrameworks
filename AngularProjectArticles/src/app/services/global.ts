

export class Global {

  constructor(
  ) {
  }

  public url = function () {
    return 'http://localhost:3900/api/';
  }

  public placeholderurl = function () {
    return 'https://jsonplaceholder.typicode.com/posts';
  }

  public getImage(id){
    return this.url()+'get-image/'+id+'.jpg?'+Math.random();
  }


  ImagePreview = async function (event) {

    var fileData: File = <File>event.target.files[0];

    if (fileData != null) {

      // Show preview 
      var mimeType = fileData.type;
      if (!mimeType.match('image.*')) {
        return null;
      }

      //return response in resolve
      return new Promise<any>((resolve) => {
        var reader = new FileReader();
        reader.readAsDataURL(fileData);
        reader.onload = function (_event) {
          resolve(reader.result);
        }

      });


    }//end if fileData

    return null;

  }


}


