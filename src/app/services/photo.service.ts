import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Capacitor } from '@capacitor/core';
import { Directory, Filesystem } from '@capacitor/filesystem';
import { Storage } from '@capacitor/storage';
import { Platform, ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

let API_URL = environment.apiBaseUrl + "/api/user";
let API_URL2 = environment.apiBaseUrl + "";

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  public photos: UserPhoto[] = [];
  private PHOTO_STORAGE: string = 'photos';
  private platform: Platform;


  constructor(platform: Platform, private http: HttpClient, private toastCtrl: ToastController) {
    this.platform = platform;
  }

  public async addNewToGallery() {
    // Take a photo
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100
    });
    this.photos.unshift({
      filepath: "soon...",
      webviewPath: capturedPhoto.webPath
    });

    // const response = await fetch(capturedPhoto.webPath);
    // const blob = await response.blob();

    const savedImageFile = await this.savePicture(capturedPhoto);

    // const formData = new FormData();
    // formData.append('file', blob, savedImageFile.filepath);
    // formData.append('lang', 'fra');
    // formData.append('id_user', '1');
    // this.postData(formData);

    Storage.set({
      key: this.PHOTO_STORAGE,
      value: JSON.stringify(this.photos),
    });

  }


  // Save picture to file on device
  private async savePicture(photo: Photo) {
    // Convert photo to base64 format, required by Filesystem API to save
    const base64Data = await this.readAsBase64(photo);

    // Write the file to the data directory
    const fileName = new Date().getTime() + '.jpeg';
    //alert("fileName : "+fileName);
    const savedFile = await Filesystem.writeFile({
      path: fileName,
      data: base64Data,
      directory: Directory.Data
    });

    if (this.platform.is('hybrid')) {
      // Display the new image by rewriting the 'file://' path to HTTP
      // Details: https://ionicframework.com/docs/building/webview#file-protocol
      return {
        filepath: savedFile.uri,
        webviewPath: Capacitor.convertFileSrc(savedFile.uri),
      };
    }
    else {
      // Use webPath to display the new image instead of base64 since it's
      // already loaded into memory
      //alert(" photo.webPath : "+ photo.webPath);
      return {
        filepath: fileName,
        webviewPath: photo.webPath
      };
    }
  }
  private async readAsBase64(photo: Photo) {
    if (this.platform.is('hybrid')) {
      // Read the file into base64 format
      const file = await Filesystem.readFile({
        path: photo.path
      });

      return file.data;
    }
    else {
      // Fetch the photo, read as a blob, then convert to base64 format
      const response = await fetch(photo.webPath);
      const blob = await response.blob();
      //alert("blob : " + blob);
      return await this.convertBlobToBase64(blob) as string;
    }
  }

  private convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      resolve(reader.result);
    };
    //alert(reader.readAsDataURL(blob));
    reader.readAsDataURL(blob);
  });

  public async loadSaved() {
    // Retrieve cached photo array data
    const photoList = await Storage.get({ key: this.PHOTO_STORAGE });
    this.photos = JSON.parse(photoList.value) || [];

    // Easiest way to detect when running on the web:
    // “when the platform is NOT hybrid, do this”
    if (!this.platform.is('hybrid')) {
      // Display the photo by reading into base64 format
      for (let photo of this.photos) {
        // Read each saved photo's data from the Filesystem
        const readFile = await Filesystem.readFile({
          path: photo.filepath,
          directory: Directory.Data
        });

        // Web platform only: Load the photo as base64 data
        photo.webviewPath = `data:image/jpeg;base64,${readFile.data}`;
      }
    }
  }

  public async deletePicture(photo: UserPhoto, position: number) {
    // Remove this photo from the Photos reference data array
    this.photos.splice(position, 1);

    // Update photos array cache by overwriting the existing photo array
    Storage.set({
      key: this.PHOTO_STORAGE,
      value: JSON.stringify(this.photos)
    });

    // delete photo file from filesystem
    const filename = photo.filepath
      .substr(photo.filepath.lastIndexOf('/') + 1);

    await Filesystem.deleteFile({
      path: filename,
      directory: Directory.Data
    });
  }


  public postData(formData: FormData): Observable<any> {
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa('banouge' + ':' + 'abde24') });
    //headers.append('Content-Type', 'application/json');
    //headers.append('Accept', '*/*');
    return this.http.post<boolean>(`${API_URL2}/api/ocr/parse`, formData, { headers, responseType: 'text' as 'json' });
    // .subscribe(
    //   (data) => {
    //     console.log(data);
    //   },
    //   (error) => {
    //     console.error(error);
    //   }
    // )
  }

  public deleteOCR1(id: string): Observable<any> {
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa('banouge' + ':' + 'abde24') });
    //headers.append('Content-Type', 'application/json');
    //headers.append('Accept', '*/*');
    return this.http.delete<boolean>(`${API_URL2}/api/ocr/delete/${id}`, { headers, responseType: 'text' as 'json' });
    // .subscribe(
    //   (data) => {
    //     console.log(data);
    //   },
    //   (error) => {
    //     console.error(error);
    //   }
    // )
  }
}

export interface UserPhoto {
  filepath: string;
  webviewPath: string;
}
