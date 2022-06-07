import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Capacitor } from '@capacitor/core';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Storage } from '@capacitor/storage';
import { Platform } from '@ionic/angular';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

let API_URL2 = environment.apiBaseUrl + "";

@Injectable({
  providedIn: 'root'
})
export class Photo2Service {
  public photos2: UserPhoto2[] = [];
  private PHOTO_STORAGE2: string = 'photos';
  private platform2: Platform;

  constructor(platform: Platform, private http: HttpClient) {
    this.platform2 = platform;
  }
  public async addNewToGallery2() {
    // Take a photo
    const capturedPhoto2 = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100
    });
    this.photos2.unshift({
      filepath2: "soon...",
      webviewPath2: capturedPhoto2.webPath
    });
    const savedImageFile = await this.savePicture(capturedPhoto2);
    //this.photos.unshift(savedImageFile);
    Storage.set({
      key: this.PHOTO_STORAGE2,
      value: JSON.stringify(this.photos2),
    });
  }
  // Save picture to file on device
  private async savePicture(photo: Photo) {
    // Convert photo to base64 format, required by Filesystem API to save
    const base64Data = await this.readAsBase64_2(photo);

    // Write the file to the data directory
    const fileName = new Date().getTime() + '.jpeg';
    const savedFile = await Filesystem.writeFile({
      path: fileName,
      data: base64Data,
      directory: Directory.Data
    });

    if (this.platform2.is('hybrid')) {
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
      return {
        filepath: fileName,
        webviewPath: photo.webPath
      };
    }
  }
  private async readAsBase64_2(photo: Photo) {
    if (this.platform2.is('hybrid')) {
      // Read the file into base64 format
      const file2 = await Filesystem.readFile({
        path: photo.path
      });

      return file2.data;
    }
    else {
      // Fetch the photo, read as a blob, then convert to base64 format
      const response = await fetch(photo.webPath);
      const blob = await response.blob();

      return await this.convertBlobToBase64_2(blob) as string;
    }
  }

  private convertBlobToBase64_2 = (blob: Blob) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.readAsDataURL(blob);
  });
  public async loadSaved() {
    // Retrieve cached photo array data
    const photoList = await Storage.get({ key: this.PHOTO_STORAGE2 });
    this.photos2 = JSON.parse(photoList.value) || [];

    // Easiest way to detect when running on the web:
    // “when the platform is NOT hybrid, do this”
    if (!this.platform2.is('hybrid')) {
      // Display the photo by reading into base64 format
      for (let photo of this.photos2) {
        // Read each saved photo's data from the Filesystem
        const readFile = await Filesystem.readFile({
          path: photo.filepath2,
          directory: Directory.Data
        });

        // Web platform only: Load the photo as base64 data
        photo.webviewPath2 = `data:image/jpeg;base64,${readFile.data}`;
      }
    }
  }

  public async deletePicture2(photo: UserPhoto2, position: number) {
    // Remove this photo from the Photos reference data array
    this.photos2.splice(position, 1);

    // Update photos array cache by overwriting the existing photo array
    Storage.set({
      key: this.PHOTO_STORAGE2,
      value: JSON.stringify(this.photos2)
    });

    // delete photo file from filesystem
    const filename2 = photo.filepath2
      .substr(photo.filepath2.lastIndexOf('/') + 1);

    await Filesystem.deleteFile({
      path: filename2,
      directory: Directory.Data
    });
  }

  public postData2(formData: FormData): Observable<any> {
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa('abde.banouge2' + ':' + 'abde24') });
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
  public deleteOCR2(id: number): Observable<any> {
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa('abde.banouge2' + ':' + 'abde24') });
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

export interface UserPhoto2 {
  filepath2: string;
  webviewPath2: string;
}
