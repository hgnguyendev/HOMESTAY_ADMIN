import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UploadService } from '../../../../service/uploadImage.service';
import { HomestayService } from '../../../../service/homestay.service';
import { firstValueFrom } from 'rxjs';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-modal-add-homestay',
  standalone: false,
  templateUrl: './modal-add-homestay.component.html',
  styleUrl: './modal-add-homestay.component.scss'
})
export class ModalAddHomestay {
  roomForm: FormGroup;
  type: string = '';
  loading: boolean = false;
  amenities = [
    { id: 'wifi', name: 'WIFI miễn phí' },
    { id: 'airConditioner', name: 'Điều hòa' },
    { id: 'tv', name: 'TV' },
    { id: 'kitchen', name: 'Bếp' },
    { id: 'washingMachine', name: 'Máy giặt' },
    { id: 'parking', name: 'Chỗ đậu xe' },
    { id: 'balcony', name: 'Ban công' },
    { id: 'hotWater', name: 'Nước nóng' }
  ];
  selectedAmenities: string[] = [];
  previewImages: { file: File, url: string }[] = [];

  constructor(private fb: FormBuilder, private _uploadService: UploadService, private _homestayService: HomestayService, private _modalRef: NzModalRef, @Inject(NZ_MODAL_DATA) private data: any) {
    this.roomForm = this.fb.group({
      roomName: ['', Validators.required],
      roomType: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(1)]],
      roomAcreage: ['', Validators.required],
      description: ['']
    });
    this.type = data.type;
  }

  ngOnInit(): void {
    if (this.type === 'edit') {
      const passData = this.data.data;
      this.roomForm.patchValue({
        roomName: passData.roomName,
        roomType: passData.roomType,
        price: passData.price,
        roomAcreage: passData.roomAcreage,
        description: passData.description
      })
      this.selectedAmenities = passData.amenities
      this.previewImages = (passData.images || []).map((url: string) => ({
        file: null as any,
        url
      }))
    }
  }

  onAmenityChange(event: any): void {
    const amenityId = event.target.value;
    if (event.target.checked) {
      this.selectedAmenities.push(amenityId);
    } else {
      const index = this.selectedAmenities.indexOf(amenityId);
      if (index > -1) {
        this.selectedAmenities.splice(index, 1);
      }
    }
  }

  onFileSelected(event: any): void {
    const files: FileList = event.target.files;
    if (files) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (file.type.match('image.*')) {
          const reader = new FileReader();
          reader.onload = (e: any) => {
            this.previewImages.push({
              file: file,
              url: e.target.result
            });
          };
          reader.readAsDataURL(file);
        }
      }
    }
  }

  removeImage(index: number): void {
    this.previewImages.splice(index, 1);
  }

  async onSubmit(): Promise<void> {
    this.loading = true;

    if (this.roomForm.valid) {
      // Chỉ lấy ảnh mới (có file)
      const newFiles = this.previewImages.filter(img => img.file).map(img => img.file);
      const oldUrls = this.previewImages.filter(img => !img.file).map(img => img.url);

      try {
        let imageUrls = [...oldUrls];

        // Nếu có ảnh mới thì upload
        if (newFiles.length > 0) {
          const results = await firstValueFrom(this._uploadService.uploadImages(newFiles));
          const uploadedUrls = results.map(r => r.secure_url);
          imageUrls = [...oldUrls, ...uploadedUrls];
        }

        const formData = {
          ...this.roomForm.value,
          amenities: this.selectedAmenities,
          images: imageUrls
        };

        if (this.type === 'create') {
          await this._homestayService.createHomestay(formData);
        } else {
          await this._homestayService.editHomestay(this.data.data._id, formData);
        }

        this.clearForm();
        this._modalRef.close(true);
      } catch (err) {
        console.error('Upload failed:', err);
        alert('Upload ảnh thất bại, thử lại!');
      } finally {
        this.loading = false;
      }
    } else {
      Object.keys(this.roomForm.controls).forEach(key => {
        this.roomForm.get(key)?.markAsTouched();
      });
    }
  }




  clearForm(): void {
    this.roomForm.reset({
      area: '25',
      description: ''
    });
    this.selectedAmenities = [];
    this.previewImages = [];
  }
}
