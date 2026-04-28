import { Component, ViewChild, ElementRef, NgZone } from '@angular/core';
import jsQR, { QRCode } from 'jsqr';
import { DataLocalService } from 'src/app/services/data-local-service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false,
})
export class Tab1Page {

  @ViewChild('videoElement') videoElement!: ElementRef;
  @ViewChild('canvasElement') canvasElement!: ElementRef;

  scanResult: string | null = null;
  scanning: boolean = false;
  private video: HTMLVideoElement | null = null;
  private canvas: HTMLCanvasElement | null = null;
  private animationFrame: number | null = null;

  constructor(
    private ngZone: NgZone,
    private dataLocalService: DataLocalService
  ) { }

  async ionViewWillEnter() {
    console.log('ionViewWillEnter event fired');
    await this.startCamera();
  };

  async ionViewWillLeave() {
    console.log('ionViewWillLeave event fired');
    await this.stopCamera();
  };

  async startCamera() {
    try {
      // Request camera permission
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' } // Use back camera
      });

      this.video = this.videoElement?.nativeElement;
      this.canvas = this.canvasElement?.nativeElement;

      if (this.video) {
        this.video.srcObject = stream;
        this.video.setAttribute('playsinline', 'true');
        this.video.play();
        requestAnimationFrame(this.detectQRCode.bind(this));
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      alert('Camera permission denied or not available');
    }
  }

  async stopCamera() {
    if (this.video) {
      const stream = this.video.srcObject as MediaStream;
      if (stream) {
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
      }
      this.video.srcObject = null;
    }
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
    }
  }

  detectQRCode() {
    if (this.video && this.canvas && this.video.readyState === this.video.HAVE_ENOUGH_DATA) {
      this.canvas.height = this.video.videoHeight;
      this.canvas.width = this.video.videoWidth;
      const ctx = this.canvas.getContext('2d');

      if (ctx) {
        ctx.drawImage(this.video, 0, 0, this.canvas.width, this.canvas.height);
        const imageData = ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
        const code = jsQR(imageData.data, imageData.width, imageData.height);

        if (code && !this.scanning) {
          this.scanning = true;
          this.ngZone.run(() => {
            this.scanResult = code.data;
            console.log('QR Code detected:', code.data);
            alert('Scanned: ' + code.data);
          });
          this.scanning = false;
        }
      }
    }

    this.animationFrame = requestAnimationFrame(this.detectQRCode.bind(this));
  }

  async scan() {
    await this.stopCamera();
    await this.startCamera();
  }

}
